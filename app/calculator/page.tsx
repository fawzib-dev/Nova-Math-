import { Calculator } from "@/components/calculator"

export default function CalculatorPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Calculator</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Use our powerful calculator with Nova AI assistance to solve any math problem.
        </p>
      </div>
      <div className="mx-auto max-w-[500px]">
        <Calculator />
      </div>
    </div>
  )
}
