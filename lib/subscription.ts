// Utility functions for subscription management

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid"
  | null

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
  features: string[]
}

export const PLANS: Record<string, SubscriptionPlan> = {
  free: {
    name: "Free",
    description: "Perfect for casual users",
    stripePriceId: "",
    features: [
      "Basic calculator functions",
      "Limited AI assistance (5 queries/day)",
      "Calculation history (last 10)",
      "Basic scientific functions",
    ],
  },
  premium: {
    name: "Premium",
    description: "For power users and students",
    stripePriceId: "price_premium_monthly",
    features: [
      "All free features",
      "Unlimited AI assistance",
      "Advanced scientific calculator",
      "Unlimited calculation history",
      "Step-by-step solutions",
      "Formula library access",
    ],
  },
}

// Check if a user has access to a specific feature
export function hasAccess(subscriptionStatus: SubscriptionStatus | undefined, feature: string): boolean {
  // If the feature doesn't require a subscription
  if (["basic_calculator", "limited_ai", "basic_history", "basic_scientific"].includes(feature)) {
    return true
  }

  // Premium features require an active subscription
  if (
    ["unlimited_ai", "advanced_scientific", "unlimited_history", "step_by_step", "formula_library"].includes(feature)
  ) {
    return subscriptionStatus === "active" || subscriptionStatus === "trialing"
  }

  return false
}

// Get the remaining AI queries for a user
export function getRemainingQueries(subscriptionStatus: SubscriptionStatus | undefined, usedQueries: number): number {
  if (subscriptionStatus === "active" || subscriptionStatus === "trialing") {
    return Number.POSITIVE_INFINITY
  }

  // Free tier gets 5 queries per day
  return Math.max(0, 5 - usedQueries)
}
