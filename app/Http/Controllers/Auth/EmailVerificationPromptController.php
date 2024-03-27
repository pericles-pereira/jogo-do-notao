<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Source\Helpers\Controllers\Page;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended(RouteServiceProvider::HOME)
            : Page::render('Auth/VerifyEmail');
    }
}
