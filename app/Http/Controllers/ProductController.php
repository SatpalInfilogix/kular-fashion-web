<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('department')->latest()->get();

        return view('products.index', compact('products'));
    }

    public function create()
    {
        //
    }

    public function store()
    {
        //
    }

    public function show(Product $product)
    {
        //
    }

    public function productView() 
    {
        return view('products.view');
    }
}
