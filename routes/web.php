<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MyAccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\AboutController;

Route::get('abc', function () {
    return view('abc');
});


Route::post('authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products/view', [ProductController::class, 'productView'])->name('products.view');
Route::get('/new-checkout', [CheckoutController::class, 'checkout'])->name('new-checkout');
Route::resources([
    'products' => ProductController::class,
    'my-account' => MyAccountController::class,
    'cart'     => CartController::class,
    'checkout' => CheckoutController::class,
    'contact'  => ContactUsController::class,
    'about'    => AboutController::class,
]);

Route::get('wishlist', [CartController::class, 'wishlist'])->name('wishlist');
Route::get('faq', [ContactUsController::class, 'faq'])->name('faq');
Route::get('404', function () { return view('404'); });