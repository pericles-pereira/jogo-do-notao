<?php

namespace App\Http\Controllers;

use Source\Helpers\Controllers\Page;
use App\Http\Requests\ProfileUpdateRequest;
use DateTimeImmutable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Source\Helpers\Utils\Common\Toast;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Page::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateProfileImage(FormRequest $request)
    {
        $user = $request->user();

        $imageData = base64_decode($request->get('image'));

        $mimeType = finfo_buffer(finfo_open(FILEINFO_MIME_TYPE), $imageData);

        if (strpos($mimeType, 'image/') !== 0) {
            return back()->with('status', Toast::error('O arquivo fornecido não é uma imagem.'));
        }

        if (strlen($imageData) > (2 * 1024 * 1024)) {
            return back()->with('status', Toast::error('A imagem fornecida é muito grande (maior que 2 MB).'));
        }

        $fileName = '/public/images/users/' . 'user-id--' . Auth::user()->id . '_profile_image_' . date_format(new DateTimeImmutable(), 'd-m-Y_H.i.s') . '_img-id--' . uniqid() . '.' . explode('/', $mimeType)[1];

        Storage::put($fileName, $imageData);

        $databaseFileName = str_replace('public', 'storage', $fileName);

        if (!is_null($user->profile_img)) {
            Storage::delete(str_replace('storage', 'public', $user->profile_img));
        }

        $user->profile_img = $databaseFileName;
        $user->save();

        return Redirect::route('profile.edit')->with('status', Toast::success('Imagem de perfil atualizada.'));
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
