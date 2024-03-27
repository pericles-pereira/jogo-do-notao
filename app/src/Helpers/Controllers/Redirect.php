<?php

namespace Source\Helpers\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect as FacadesRedirect;
use Source\Helpers\Utils\Common\Toast;
use Source\Helpers\Utils\Errors\ProcessErrorMessage;

final class Redirect
{
    /**
     * Redirects the user to a specific route with a success message.
     * @param string $successMessage The message to be presented to the user.
     */
    public static function route(string $route, string $successMessage): RedirectResponse
    {
        return FacadesRedirect::route($route)->with('status', Toast::success($successMessage));
    }

    /**
     * Redirects to the previous route with an error message.
     * @param \Throwable $th The Throwable.
     * @param ?string $defaultMessage The default message to be presented to the user.
     */
    public static function back(\Throwable $th, ?string $defaultMessage): RedirectResponse
    {
        return FacadesRedirect::back()->with('status', Toast::error(ProcessErrorMessage::getMessage($th, $defaultMessage)));
    }

    /**
     * Redirects to the previous route with an success message.
     * @param string $successMessage The message to be presented to the user.
     */
    public static function backSuccess(string $successMessage): RedirectResponse
    {
        return FacadesRedirect::back()->with('status', Toast::success($successMessage));
    }
}
