@extends('layouts.app')
@section('content')
<style>
.btn-link {
    color: #eeeef5 !important;
}
.checkout textarea.form-control {
    min-height: 79px !important;
}
</style>
<div class="page-header text-center" style="background-image: url('assets/images/page-header-bg.jpg')">
    <div class="container">
        <h1 class="page-title">Checkout<span>Shop</span></h1>
    </div>
</div>
<nav aria-label="breadcrumb" class="breadcrumb-nav">
    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Shop</a></li>
            <li class="breadcrumb-item active" aria-current="page">Checkout</li>
        </ol>
    </div>
</nav>

<div class="page-content">
    <div class="checkout">
        <div class="container">
            <div class="row">
                <!-- Accordion Section -->
                <div class="col-md-8">
                    <div id="checkoutAccordion">

                        <!-- Login / Register Section -->
                        <div class="card">
                            <div class="card-header" id="headingLogin">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseLogin" aria-expanded="true" aria-controls="collapseLogin">
                                        Login / Register
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseLogin" class="collapse show" aria-labelledby="headingLogin" data-parent="#checkoutAccordion">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <form action="#" method="POST">
                                                @csrf
                                                <label for="email" class="form-label">Enter Email/Mobile number</label>
                                                <input type="email" class="form-control" id="email" name="email" required>
                                                <button type="submit" class="btn btn-primary">CONTINUE</button>
                                            </form>
                                            <p class="mt-3">By continuing, you agree to Flipkart’s <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
                                        </div>
                                        <div class="col-sm-6">
                                            <h6>Advantages of our secure login</h6>
                                            <ul>
                                                <li><input type="checkbox" disabled> Easily Track Orders, Hassle free Returns</li>
                                                <li><input type="checkbox" checked disabled> Get Relevant Alerts and Recommendations</li>
                                                <li><input type="checkbox" disabled> Wishlist, Reviews, Ratings and more.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Delivery Address Section -->
                        <div class="card">
                            <div class="card-header" id="headingDelivery">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseDelivery" aria-expanded="false" aria-controls="collapseDelivery">
                                        Delivery Address
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseDelivery" class="collapse" aria-labelledby="headingDelivery" data-parent="#checkoutAccordion">
                                <div class="card-body">
                                    <form action="#" method="POST">
                                        @csrf
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label for="name" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="name" name="name" placeholder="Name" value="" required>
                                            </div>
                                            <div class="col-sm-4">
                                                <label for="phone_number" class="form-label">Phone Number</label>
                                                <input type="number" class="form-control" id="phone_number" name="phone_number" placeholder="Phone Number" value="" required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label for="postcode" class="form-label">Postcode</label>
                                                <input type="number" class="form-control" id="postcode" name="postcode" placeholder="postcode" value="" required>
                                            </div>
                                            <div class="col-sm-4">
                                                <label for="locality" class="form-label">Locality</label>
                                                <input type="text" class="form-control" id="locality" name="locality" placeholder="Locality" >
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <label for="locality" class="form-label">Address</label>
                                                <textarea class="form-control" id="locality" name="locality" placeholder="Enter your address"></textarea>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label for="city" class="form-label">City/District/Town</label>
                                                <input type="text" class="form-control" id="city" name="city" placeholder="Enter City" required>
                                            </div>
                                            <div class="col-sm-4">
                                                <label for="locality" class="form-label">State</label>
                                                <input type="text" class="form-control" id="locality" name="locality" placeholder="Locality" >
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label for="landmark" class="form-label">Landmark (Optional)</label>
                                                <input type="text" class="form-control" id="landmark" name="landmark" placeholder="Enter Landmark" required>
                                            </div>
                                            <div class="col-sm-4">
                                                <label for="alternate-phone-number" class="form-label">Alternate Phone(Optional)</label>
                                                <input type="number" class="form-control" id="alternate-phonenumber" name="alternate-phonenumber" placeholder="Alternate Phone(Optional)" >
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Save Address</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary Section -->
                        <div class="card">
                            <div class="card-header" id="headingOrderSummary">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOrderSummary" aria-expanded="false" aria-controls="collapseOrderSummary">
                                        Order Summary
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseOrderSummary" class="collapse" aria-labelledby="headingOrderSummary" data-parent="#checkoutAccordion">
                                <div class="card-body">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Item</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Product 1</td>
                                                <td>2</td>
                                                <td>$50.00</td>
                                            </tr>
                                            <tr>
                                                <td>Product 2</td>
                                                <td>1</td>
                                                <td>$30.00</td>
                                            </tr>
                                            <tr>
                                                <td>Product 3</td>
                                                <td>3</td>
                                                <td>$90.00</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="text-right"><strong>Total:</strong></td>
                                                <td><strong>$170.00</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Options Section -->
                        <div class="card">
                            <div class="card-header" id="headingPayment">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapsePayment" aria-expanded="false" aria-controls="collapsePayment">
                                        Payment Options
                                    </button>
                                </h5>
                            </div>
                            <div id="collapsePayment" class="collapse" aria-labelledby="headingPayment" data-parent="#checkoutAccordion">
                                <div class="card-body">
                                    <form action="#" method="POST">
                                        @csrf
                                            <div class="mb-3">
                                                <label for="paymentMethod" class="form-label">Payment Method</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="payment_method" id="creditCard" value="credit_card" checked>
                                                    <label class="form-check-label" for="creditCard">Credit Card</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="payment_method" id="paypal" value="paypal">
                                                    <label class="form-check-label" for="paypal">PayPal</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="payment_method" id="bankTransfer" value="bank_transfer">
                                                    <label class="form-check-label" for="bankTransfer">Bank Transfer</label>
                                                </div>
                                                <!-- UPI Option -->
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="payment_method" id="upi" value="upi">
                                                    <label class="form-check-label" for="upi">UPI Payment (PhonePe, Google Pay, etc.)</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                            <div id="upiSection" style="display: none;">
                                                <div class="mb-3">
                                                    <label for="upiId" class="form-label">Enter your UPI ID</label>
                                                    <input type="text" class="form-control" id="upiId" name="upi_id" placeholder="example@upi" required>
                                                </div>
                                            </div>
                                        </div>
        
                                        <button type="submit" class="btn btn-primary">Proceed to Payment</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Price Detail Section -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Price Details</h4>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Product 1 (x2)</span>
                                    <span>$50.00</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Product 2 (x1)</span>
                                    <span>$30.00</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Product 3 (x3)</span>
                                    <span>$90.00</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <strong>Total</strong>
                                    <strong>$170.00</strong>
                                </li>
                            </ul>
                            <button class="btn btn-primary btn-block mt-3">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
<x-include-plugins :plugins="['tabs']"></x-include-plugins>
@endsection
