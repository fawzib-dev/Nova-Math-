"use client"

import { useState, useEffect } from "react"
import { type SubscriptionStatus, hasAccess, getRemainingQueries } from "@/lib/subscription"

export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [usedQueries, setUsedQueries] = useState(0)

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch("/api/subscription-status")
        // const data = await response.json()
        // setStatus(data.status)
        // setUsedQueries(data.usedQueries)

        // For demo purposes, we'll just use localStorage to track queries
        const storedQueries = localStorage.getItem("usedQueries")
        if (storedQueries) {
          setUsedQueries(Number.parseInt(storedQueries, 10))
        }

        // Check if we have a stored subscription status
        const storedStatus = localStorage.getItem("subscriptionStatus") as SubscriptionStatus
        setStatus(storedStatus)
      } catch (error) {
        console.error("Error fetching subscription data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionData()
  }, [])

  const incrementUsedQueries = () => {
    const newCount = usedQueries + 1
    setUsedQueries(newCount)
    localStorage.setItem("usedQueries", newCount.toString())
  }

  const canUseFeature = (feature: string) => {
    return hasAccess(status, feature)
  }

  const remainingQueries = getRemainingQueries(status, usedQueries)

  return {
    status,
    isLoading,
    usedQueries,
    remainingQueries,
    incrementUsedQueries,
    canUseFeature,
    isPremium: status === "active" || status === "trialing",
  }
}
