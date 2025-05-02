import { Calculator, Brain, Zap, History, Lock, MessageSquare } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">AI-powered math at your fingertips</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              NovaCalc combines powerful calculation capabilities with advanced AI assistance to help you understand and
              master any math concept.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800/20">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Basic & Scientific</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              From simple arithmetic to complex scientific calculations, with AI-powered suggestions.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800/20">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Nova AI Assistant</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Ask questions in natural language, get step-by-step explanations, and solve complex problems instantly.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800/20">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Smart Results</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Get answers with AI-powered insights, alternative approaches, and related concepts.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800/20">
              <History className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Learning History</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Nova remembers your calculations and adapts explanations to your learning style.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800/20">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">AI Math Chat</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Have in-depth conversations about math concepts with detailed explanations and visualizations.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800/20">
              <Lock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Premium AI Features</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Unlock advanced AI capabilities like problem generation, formula recognition, and personalized tutoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
