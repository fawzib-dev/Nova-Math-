import { Pricing } from "@/components/pricing"

export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pricing Plans</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Choose the plan that works best for you. All plans include access to our calculator.
        </p>
      </div>
      <Pricing />
    </div>
  )
}
