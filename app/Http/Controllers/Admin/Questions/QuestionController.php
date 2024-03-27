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

class QuestionController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        try {
            // $paymentMethods = Search::allDataInCamel($request->user()->enterprise->paymentMethod);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Falha ao carregar os dados da página.');
        }

        return Page::render('Admin/Questions/Questions');
    }

    public function store(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $request->user()->enterprise->paymentMethod()->create(Str::camelToSnake($request->only(array_keys($validation))));
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Forma de pagamento não cadastrada.');
        }

        return Redirect::route('payments.payment-methods', 'Forma de pagamento cadastrada.');
    }

    public function update(FormRequest $request): RedirectResponse
    {
        $validation = $this->fieldsAndValidation();
        $request->validate($validation);

        try {
            $paymentMethod = $request->user()->enterprise->paymentMethod->find($request->only('id')['id']);

            if (!$paymentMethod) {
                throw new \Error();
            }

            $paymentMethod->fill(Str::camelToSnake($request->only(array_keys($validation))));
            $paymentMethod->save();
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Forma de pagamento não atualizada.');
        }

        return Redirect::route('payments.payment-methods', 'Forma de pagamento atualizada.');
    }

    public function delete(FormRequest $request): RedirectResponse
    {
        $request->validate(['deleteData' => ['required', 'array']]);
        $data = $request->validationData()['deleteData'];
        $s = count($data) > 1 ? 's' : '';

        try {
            Delete::multipleRecords($data, $request->user()->enterprise->paymentMethod);
        } catch (\Throwable $th) {
            return Redirect::back($th, 'Erro no servidor! Forma' . $s . ' de pagamento não excluída' . $s . '.');
        }

        return Redirect::route('payments.payment-methods', 'Forma' . $s . ' de pagamento excluída' . $s . '.');
    }

    private function fieldsAndValidation(): array
    {
        return [
            "code" => ['required', 'max:255'],
            "name" => ['required', 'max:255'],
            "installments" => ['required', 'integer'],
            "term" => ['required', 'integer'],
        ];
    }
}
