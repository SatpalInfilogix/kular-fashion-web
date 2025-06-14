"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CartItemCard from '@/components/checkout/cart-item-card';
import PaymentSummary from '@/components/checkout/payment-summary';
import CartButtons from '@/components/checkout/cart-buttons';
import { apiBaseUrl, apiBaseRoot } from "@/config";
import { toast } from "react-toastify";
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  variant_id: number;
  quantity: number;
  total_quantity: number;
  image: string;
  brand: string;
}

const OrderSummary = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails") || "null");
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const couponCode = localStorage.getItem("coupon_code") || null;
      const addressId = localStorage.getItem("selectedAddressId");
      const paymentMode = localStorage.getItem("selectedPaymentMethod");

      if (!userDetails && !cart.length) {
        toast.warning("Your cart is empty.");
        return;
      }

      if (!addressId || !paymentMode) {
        toast.warning("Please select a delivery address and payment method.");
        return;
      }

      const payload = {
        user_id: userDetails?.id || null,
        cart: cart?.cart_items?.length ? cart : null,
        coupon_code: couponCode,
        delivery_address_id: addressId,
        payment_mode: paymentMode,
      };

      const { data: result } = await axios.post(`${apiBaseUrl}place-order`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const newOrderId = result.order_id;
      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      localStorage.removeItem("coupon_code");
      localStorage.removeItem("coupon_discount");
      localStorage.removeItem("final_after_coupon_code");
      setShowSuccess(true);

      setTimeout(() => {
        router.push(`/orders/${newOrderId}`);
      }, 1000);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Something went wrong while placing the order.";
      toast.error(errMsg);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const user_details_str = localStorage.getItem("userDetails");
      const user_details = user_details_str ? JSON.parse(user_details_str) : null;
      const user_id = user_details ? user_details.id : null;
      const token = localStorage.getItem("authToken");

      try {
        if (token && user_id) {
          const { data: json } = await axios.get(`${apiBaseUrl}cart/show`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const cartItems = json.cart?.cart_items?.map((cartItem: any) => {
            const product = cartItem.variant?.product;
            const imageFile = product?.web_image?.[0];
            const image = imageFile ? `${apiBaseRoot}${imageFile.path}` : "/images/temp/product1.jpg";

            return {
              id: cartItem.id,
              name: product?.name || "Unknown Product",
              color: cartItem.variant?.colors?.color_detail?.name || "Unknown Color",
              size: cartItem.variant?.sizes?.size_detail?.size || "Unknown Size",
              price: product?.price || 0,
              variant_id: cartItem.variant.id,
              quantity: cartItem.quantity || 1,
              image,
              brand: product?.brand?.name || "Unknown Brand",
              total_quantity: cartItem.variant?.total_quantity || 10,
            };
          }) || [];

          setCartItems(cartItems);
        } else {
          const cart_str = localStorage.getItem("cart");
          const cart = cart_str ? JSON.parse(cart_str) : null;
          const cart_items = Array.isArray(cart?.cart_items) ? cart.cart_items : [];

          const cartItems = cart_items.map((cartItem: any) => {
            const image = cartItem?.image ? `${apiBaseRoot}${cartItem.image}` : "/images/temp/product1.jpg";

            return {
              id: cartItem.id,
              name: cartItem?.name || "Unknown Product",
              color: cartItem?.color || "Unknown Color",
              size: cartItem?.size || "Unknown Size",
              price: cartItem?.price || 0,
              variant_id: cartItem.variant_id,
              quantity: cartItem.quantity || 1,
              image,
              brand: cartItem?.brand || "Unknown Brand",
              total_quantity: cartItem?.total_quantity || 10,
            };
          });

          setCartItems(cartItems);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCartItems();
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col px-4 pt-4 bg-white max-h-[90vh]">
      <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p className="text-center py-10 text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="mt-4 overflow-y-auto max-h-[300px] pr-2 space-y-4">
          {cartItems.map((product) => (
            <CartItemCard key={product.id} {...product} />
          ))}
        </div>
      )}
      <PaymentSummary
        subtotal={subtotal}
        promoMessage={promoMessage}
        setPromoMessage={setPromoMessage}
      />
      {promoMessage && <p className="text-sm text-red-500 mt-2">{promoMessage}</p>}
      <div className="mt-6">
        <CartButtons productsLength={cartItems.length} onPlaceOrder={handlePlaceOrder} />
      </div>
      {showSuccess && (
        <p className="text-center mt-6 text-green-600 font-medium text-lg">
          ✅ Order Placed Successfully!
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
