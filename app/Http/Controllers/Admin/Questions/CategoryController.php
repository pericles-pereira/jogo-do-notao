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

class CategoryController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        try {
            $categories = Search::allDataInCamel($request->user()->group->category);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Admin/Questions/Category/Category', ['categories' => $categories]);
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $request->user()->group->category()->create(Str::camelToSnake($request->only(array_keys($validation))));
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Categoria não cadastrada.');
        }

        return Redirect::route('category', 'Categoria cadastrada.');
    }

    public function update(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $category = $request->user()->group->category->find($request->only('id')['id']);

            if (!$category) {
                throw new \Error();
            }

            $category->fill(Str::camelToSnake($request->only(array_keys($validation))));
            $category->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Categoria não atualizada.');
        }

        return Redirect::route('category', 'Categoria atualizada.');
    }

    public function delete(FormRequest $request): RedirectResponse
    {
        $request->validate(['deleteData' => ['required', 'array']]);
        $data = $request->validationData()['deleteData'];
        $s = count($data) > 1 ? 's' : '';

        try {
            Delete::multipleRecords($data, $request->user()->group->category);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Categoria' . $s . ' não excluída' . $s . '.');
        }

        return Redirect::route('category', 'Categoria' . $s . ' excluída' . $s . '.');
    }

    private function fieldsAndValidation(): array
    {
        return [
            "name" => ['required', 'max:255'],
        ];
    }
}
