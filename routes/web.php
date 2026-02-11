<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [VideoController::class, 'index'])->name('home');

Route::get('/dashboard', [VideoController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/user/{user}', [UserController::class, 'show'])->name('users.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('videos', VideoController::class)->only(['create', 'store', 'show']);
    Route::post('/videos/{video}/reactions', [\App\Http\Controllers\LikeController::class, 'store'])->name('videos.reactions.store');
    Route::post('/videos/{video}/comments', [\App\Http\Controllers\CommentController::class, 'store'])->name('videos.comments.store');
    Route::post('/videos/{video}/view', [\App\Http\Controllers\ViewController::class, 'store'])->name('videos.view');
});

require __DIR__.'/auth.php';

Route::middleware(['auth', 'verified', 'role:super_admin|moderator'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    // Admin Management (Only Super Admin can manage other admins)
    Route::resource('admins', \App\Http\Controllers\Admin\AdminController::class)->middleware(['role:super_admin']);
    
    // Moderation Routes
    Route::group(['middleware' => ['permission:manage_videos']], function () {
        Route::get('/videos', [\App\Http\Controllers\Admin\VideoController::class, 'index'])->name('videos.index');
        Route::delete('/videos/{video}', [\App\Http\Controllers\Admin\VideoController::class, 'destroy'])->name('videos.destroy');
    });

    Route::group(['middleware' => ['permission:manage_users']], function () {
        Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
        Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');
    });
});
