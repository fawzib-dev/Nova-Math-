import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_your_key", {
  apiVersion: "2023-10-16",
})

// This is your Stripe webhook secret for testing your endpoint locally
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_your_webhook_secret"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature") as string

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session

        // Here you would update your database to record the subscription
        // For example:
        // await db.user.update({
        //   where: { id: checkoutSession.client_reference_id },
        //   data: { subscriptionStatus: 'active', subscriptionId: checkoutSession.subscription }
        // })

        console.log(`🔔 Checkout completed for session: ${checkoutSession.id}`)
        break

      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription

        // Update subscription status in your database
        // For example:
        // await db.subscription.update({
        //   where: { stripeSubscriptionId: subscription.id },
        //   data: { status: subscription.status }
        // })

        console.log(`🔔 Subscription updated: ${subscription.id}, status: ${subscription.status}`)
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription

        // Update subscription status in your database
        // For example:
        // await db.subscription.update({
        //   where: { stripeSubscriptionId: deletedSubscription.id },
        //   data: { status: 'canceled' }
        // })

        console.log(`🔔 Subscription canceled: ${deletedSubscription.id}`)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
