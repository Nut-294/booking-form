"use client";
export default function TestPaymentPage() {
  async function handleCheckout() {
    const response = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert(data.message ?? "Checkout failed");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <button onClick={handleCheckout}>
      Test Stripe Checkout
    </button>
  );
}