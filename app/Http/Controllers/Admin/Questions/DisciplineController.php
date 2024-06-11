<?php

namespace App\Http\Controllers\Admin\Questions;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Source\Helpers\Controllers\Page;
use Source\Helpers\Controllers\Redirect;
use Source\Helpers\Models\Delete;
use Source\Helpers\Models\Search;
use Source\Helpers\Utils\Common\Str;

class DisciplineController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        try {
            $disciplines = Search::allDataInCamel($request->user()->group->discipline);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Admin/Questions/Discipline/Discipline', ['disciplines' => $disciplines]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $request->user()->group->discipline()->create(Str::camelToSnake($request->only(array_keys($validation))));
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Disciplina não cadastrada.');
        }

        return Redirect::route('discipline', 'Disciplina cadastrada.');
    }

    public function update(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $discipline = $request->user()->group->discipline->find($request->only('id')['id']);

            if (!$discipline) {
                throw new \Error();
            }

            $discipline->fill(Str::camelToSnake($request->only(array_keys($validation))));
            $discipline->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Disciplina não atualizada.');
        }

        return Redirect::route('discipline', 'Disciplina atualizada.');
    }

    public function delete(FormRequest $request): RedirectResponse
    {
        $request->validate(['deleteData' => ['required', 'array']]);
        $data = $request->validationData()['deleteData'];
        $s = count($data) > 1 ? 's' : '';

        try {
            Delete::multipleRecords($data, $request->user()->group->discipline);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Disciplina' . $s . ' não excluída' . $s . '.');
        }

        return Redirect::route('discipline', 'Disciplina' . $s . ' excluída' . $s . '.');
    }

    private function fieldsAndValidation(): array
    {
        return [
            "name" => ['required', 'max:255'],
        ];
    }
}
