<?php

namespace App\Http\Controllers\Admin\Questions;

use App\Http\Controllers\Controller;
use App\Models\Groups\Disciplines\Discipline;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Delete;
use Source\Helpers\Models\Search;
use Source\Helpers\Utils\Common\Str;

class QuestionController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        try {
            $questions = Search::allDataInCamel($request->user()->group->question);
            foreach ($questions as $key => $value) {
                $questions[$key]['discipline'] = Discipline::find($value['disciplineId'])->name;
                $questions[$key]['difficulty'] = match ($value['difficulty']) {
                    "1" => "Muito Fácil",
                    "2" => "Fácil",
                    "3" => "Intermediário",
                    "4" => "Difícil",
                    "5" => "Muito Difícil",
                    "6" => "Impossível",
                    default => "?? erro ??"
                };
            }
            $disciplines = Search::allDataInCamel($request->user()->group->discipline);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Admin/Questions/Manage/Questions', ['questions' => $questions, 'disciplines' => $disciplines]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $request->user()->group->question()->create(Str::camelToSnake($request->only(array_keys($validation))));
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return Redirect::back($th, 'Erro no servidor! Questão não cadastrada.');
        }

        return Redirect::route('questions', 'Questão cadastrada.');
    }

    public function update(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $question = $request->user()->group->question->find($request->only('id')['id']);

            if (!$question) {
                throw new \Error();
            }

            $question->fill(Str::camelToSnake($request->only(array_keys($validation))));
            $question->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Questão não atualizada.');
        }

        return Redirect::route('questions', 'Questão atualizada.');
    }

    public function delete(FormRequest $request): RedirectResponse
    {
        $request->validate(['deleteData' => ['required', 'array']]);
        $data = $request->validationData()['deleteData'];
        $s = count($data) > 1 ? 's' : '';
        $ao = count($data) > 1 ? 'ões' : 'ão';

        try {
            Delete::multipleRecords($data, $request->user()->group->question);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Quest' . $ao . ' não excluída' . $s . '.');
        }

        return Redirect::route('questions', 'Quest' . $ao . ' excluída' . $s . '.');
    }

    private function fieldsAndValidation(): array
    {
        return [
            'title' => ['required', 'max:500'],
            'theme' => ['required', 'max:500'],
            'statement' => ['required', 'max:500'],
            'correctOption' => ['required', 'max:255'],
            'wrongOption1' => ['required', 'max:255'],
            'wrongOption2' => ['required', 'max:255'],
            'wrongOption3' => ['required', 'max:255'],
            'wrongOption4' => ['required', 'max:255'],
            'disciplineId' => ['required', 'integer'],
            'difficulty' => ['required', 'integer']
        ];
    }
}
