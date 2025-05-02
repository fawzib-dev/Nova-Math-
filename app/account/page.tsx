"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SubscriptionButton } from "@/components/subscription-button"
import { useToast } from "@/hooks/use-toast"
import { PLANS, type SubscriptionStatus } from "@/lib/subscription"

export default function AccountPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Check for success parameter from Stripe redirect
  useEffect(() => {
    const success = searchParams.get("success")
    const sessionId = searchParams.get("session_id")

    if (success === "true" && sessionId) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to NovaCalc Premium!",
      })

      // In a real app, you would verify the session with your backend
      setSubscriptionStatus("active")
    }
  }, [searchParams, toast])

  // Fetch user subscription status
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch("/api/subscription-status")
        // const data = await response.json()
        // setSubscriptionStatus(data.status)

        // For demo purposes, we'll just use the success parameter or default to null
        if (!searchParams.get("success")) {
          setSubscriptionStatus(null)
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error)
        toast({
          title: "Error",
          description: "Failed to load subscription information",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionStatus()
  }, [searchParams, toast])

  const isPremium = subscriptionStatus === "active" || subscriptionStatus === "trialing"
  const currentPlan = isPremium ? PLANS.premium : PLANS.free

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Account Settings</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Manage your NovaCalc subscription and account preferences.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your NovaCalc subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Current Plan</h3>
                <p className="text-gray-500 dark:text-gray-400">{currentPlan.name}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Status</h3>
                <p className="text-gray-500 dark:text-gray-400 capitalize">
                  {isLoading ? "Loading..." : subscriptionStatus || "Free"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-gray-400">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubscriptionButton subscriptionStatus={subscriptionStatus} isPremium={isPremium} />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive email notifications about your subscription and NovaCalc updates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Data Privacy</h3>
                <p className="text-gray-500 dark:text-gray-400">Manage how your calculation data is stored and used.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
