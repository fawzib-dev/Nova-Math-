"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PLANS, type SubscriptionStatus } from "@/lib/subscription"

interface SubscriptionButtonProps {
  subscriptionStatus: SubscriptionStatus
  isPremium: boolean
}

export function SubscriptionButton({ subscriptionStatus, isPremium }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscription = async () => {
    setIsLoading(true)

    try {
      if (isPremium) {
        // Handle cancellation
        const response = await fetch("/api/cancel-subscription", {
          method: "POST",
        })

        const data = await response.json()

        if (response.ok) {
          toast({
            title: "Subscription canceled",
            description: "Your subscription will remain active until the end of the billing period.",
          })
        } else {
          throw new Error(data.error || "Failed to cancel subscription")
        }
      } else {
        // Handle new subscription
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: PLANS.premium.stripePriceId,
          }),
        })

        const data = await response.json()

        if (data.url) {
          window.location.href = data.url
        } else {
          throw new Error(data.error || "Failed to create checkout session")
        }
      }
    } catch (error: any) {
      console.error("Error managing subscription:", error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSubscription}
      disabled={isLoading}
      className={isPremium ? "bg-gray-900" : "bg-gradient-to-r from-purple-600 to-pink-600"}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : isPremium ? (
        "Cancel Subscription"
      ) : (
        "Upgrade to Premium"
      )}
    </Button>
  )
}
