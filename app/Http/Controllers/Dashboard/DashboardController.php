<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Source\Helpers\Controllers\Page;
use Inertia\Response;
use Source\Helpers\Utils\Common\Str;
use Source\Helpers\Utils\Common\Toast;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Page::render('Dashboard/Dashboard');
    }
}
