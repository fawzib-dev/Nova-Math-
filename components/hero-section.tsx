import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Brain } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Powered by Nova AI: The Smart Calculator
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                More than just a calculator. Nova AI understands your questions, solves complex problems, explains math
                concepts, and helps you learn as you calculate.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/calculator"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Try Calculator
              </Link>
              <Link
                href="/chat"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Chat with Nova <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <div className="mr-2 mt-1 rounded-full bg-purple-100 p-1 dark:bg-purple-800/20">
                  <Brain className="h-3 w-3 text-purple-600" />
                </div>
                <span>Step-by-step explanations</span>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1 rounded-full bg-purple-100 p-1 dark:bg-purple-800/20">
                  <Brain className="h-3 w-3 text-purple-600" />
                </div>
                <span>Natural language math queries</span>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1 rounded-full bg-purple-100 p-1 dark:bg-purple-800/20">
                  <Brain className="h-3 w-3 text-purple-600" />
                </div>
                <span>Formula suggestions</span>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1 rounded-full bg-purple-100 p-1 dark:bg-purple-800/20">
                  <Brain className="h-3 w-3 text-purple-600" />
                </div>
                <span>Personalized learning</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-950 border rounded-2xl shadow-xl overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center px-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white rounded-md p-1">
                      <span className="text-purple-600 font-bold text-xs">N</span>
                    </div>
                    <span className="text-white font-medium">NovaCalc AI</span>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  </div>
                </div>
                <div className="pt-16 p-4 h-full flex flex-col">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-4">
                    <div className="text-right text-2xl font-mono">125 × 7 = 875</div>
                    <div className="text-right text-sm text-purple-600 mt-1 flex items-center justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10Z"></path>
                        <path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"></path>
                      </svg>
                      Nova: That's the weekly total
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 flex-1">
                    {[
                      "C",
                      "±",
                      "%",
                      "÷",
                      "7",
                      "8",
                      "9",
                      "×",
                      "4",
                      "5",
                      "6",
                      "−",
                      "1",
                      "2",
                      "3",
                      "+",
                      "0",
                      ".",
                      "AI",
                      "=",
                    ].map((btn, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-lg ${
                          ["÷", "×", "−", "+", "="].includes(btn)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : btn === "AI"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-gray-100 dark:bg-gray-800"
                        } ${btn === "0" ? "col-span-2" : ""} p-2 text-lg font-medium`}
                      >
                        {btn === "AI" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10Z"></path>
                            <path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"></path>
                          </svg>
                        ) : (
                          btn
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
