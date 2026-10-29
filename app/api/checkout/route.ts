import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    //เรียก Stripe SDK เพื่อขอสร้าง Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: "Hotel Booking - Test",
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      //ออกไปหน้าไหนหลังออกจาก Checkout แนะก่อนกออกจากหน้าควรตรวจสถานะการชำระเงินก่อน
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    });

    return NextResponse.json({
      //success_url คือ URL สำหรับเปิด Checkout
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { message: "Unable to create checkout session" },
      { status: 500 },
    );
  }
}
