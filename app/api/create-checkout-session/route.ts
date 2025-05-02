import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In a real app, this would be an environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_your_key", {
  apiVersion: "2023-10-16",
})

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json()

    // Get the URL for redirecting after checkout
    const origin = req.headers.get("origin") || "http://localhost:3000"

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/account?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        priceId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 })
  }
}
