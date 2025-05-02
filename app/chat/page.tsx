"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calculator, Brain } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  // Enhance the chat page with more sophisticated AI features

  // Replace the messages state with a more realistic version
  const [messages, setMessages] = useState<{ role: string; content: string; isLoading?: boolean }[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Nova, your AI math assistant. I can help with:\n\n• Solving equations\n• Explaining math concepts\n• Step-by-step problem solving\n• Checking your work\n• Generating practice problems\n\nWhat would you like help with today?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Replace the handleSendMessage function with this enhanced version
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user", content: inputMessage }]
    setMessages(newMessages)
    setInputMessage("")

    // Add loading indicator
    setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "", isLoading: true }])

    // Simulate AI processing
    setTimeout(async () => {
      try {
        // In a real implementation, this would call the AI API
        // const response = await fetch('/api/chat', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
        // });
        // const data = await response.json();

        // For demo, generate a response based on the query
        let aiResponse = ""
        const userQuery = inputMessage.toLowerCase()

        if (userQuery.includes("quadratic")) {
          aiResponse =
            "## Quadratic Equations\n\nA quadratic equation has the form: **ax² + bx + c = 0**\n\nThere are three main ways to solve it:\n\n1. **Factoring**: If the equation can be written as (px+q)(rx+s)=0\n\n2. **Completing the square**: Rearranging to (x+d)²=e\n\n3. **Quadratic formula**: x = (-b ± √(b² - 4ac)) / 2a\n\nThe discriminant (b² - 4ac) tells you how many solutions exist:\n- If > 0: Two real solutions\n- If = 0: One real solution (repeated)\n- If < 0: Two complex solutions\n\nWould you like me to solve a specific quadratic equation for you?"
        } else if (userQuery.includes("derivative") || userQuery.includes("differentiate")) {
          aiResponse =
            "## Derivatives\n\nThe derivative f'(x) measures the rate of change of a function f(x).\n\n### Common Derivative Rules:\n\n1. **Power Rule**: d/dx(x^n) = nx^(n-1)\n\n2. **Sum Rule**: d/dx(f(x) + g(x)) = f'(x) + g'(x)\n\n3. **Product Rule**: d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)\n\n4. **Quotient Rule**: d/dx(f(x)/g(x)) = (f'(x)·g(x) - f(x)·g'(x))/[g(x)]²\n\n5. **Chain Rule**: d/dx(f(g(x))) = f'(g(x))·g'(x)\n\n### Common Functions:\n- d/dx(sin x) = cos x\n- d/dx(cos x) = -sin x\n- d/dx(e^x) = e^x\n- d/dx(ln x) = 1/x\n\nWould you like me to find a specific derivative?"
        } else if (userQuery.includes("pythagorean")) {
          aiResponse =
            "## Pythagorean Theorem\n\nThe Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) equals the sum of squares of the other two sides (a and b):\n\n**a² + b² = c²**\n\nThis fundamental theorem works only for right triangles (triangles with one 90° angle).\n\n### Applications:\n\n1. **Finding the hypotenuse**: c = √(a² + b²)\n\n2. **Finding a leg**: a = √(c² - b²) or b = √(c² - a²)\n\n3. **Checking if a triangle is right**: If a² + b² = c², then the triangle has a right angle\n\n4. **Distance formula**: The distance between points (x₁,y₁) and (x₂,y₂) is √((x₂-x₁)² + (y₂-y₁)²)\n\nWould you like to see a specific example?"
        } else if (userQuery.includes("logarithm")) {
          aiResponse =
            "## Logarithms\n\nA logarithm is the inverse operation to exponentiation. If b^x = y, then log_b(y) = x.\n\n### Key Properties:\n\n1. **Basic definition**: If b^x = y, then log_b(y) = x\n\n2. **Product rule**: log_b(xy) = log_b(x) + log_b(y)\n\n3. **Quotient rule**: log_b(x/y) = log_b(x) - log_b(y)\n\n4. **Power rule**: log_b(x^n) = n·log_b(x)\n\n5. **Change of base**: log_b(x) = log_c(x) / log_c(b)\n\n### Common Bases:\n\n- **Natural logarithm**: ln(x) = log_e(x) where e ≈ 2.71828\n- **Common logarithm**: log(x) = log_10(x)\n- **Binary logarithm**: log_2(x)\n\nLogarithms are useful for solving exponential equations, modeling growth/decay, and measuring quantities that vary widely in scale.\n\nDo you have a specific logarithm problem you'd like help with?"
        } else if (userQuery.includes("integral") || userQuery.includes("integrate")) {
          aiResponse =
            "## Integration\n\nIntegration is the inverse of differentiation and can be used to find areas, volumes, and solutions to differential equations.\n\n### Common Integration Rules:\n\n1. **Power Rule**: ∫x^n dx = x^(n+1)/(n+1) + C (for n≠-1)\n\n2. **Sum Rule**: ∫[f(x) + g(x)] dx = ∫f(x) dx + ∫g(x) dx\n\n3. **Constant Multiple**: ∫k·f(x) dx = k·∫f(x) dx\n\n### Common Integrals:\n\n- ∫sin(x) dx = -cos(x) + C\n- ∫cos(x) dx = sin(x) + C\n- ∫e^x dx = e^x + C\n- ∫(1/x) dx = ln|x| + C\n\n### Types of Integrals:\n\n- **Indefinite integral**: ∫f(x) dx = F(x) + C\n- **Definite integral**: ∫[a to b]f(x) dx = F(b) - F(a)\n\nWould you like me to solve a specific integral?"
        } else {
          aiResponse = `I'd be happy to help with your question about "${inputMessage}".\n\nAs your AI math assistant, I can:\n\n• Solve equations and systems\n• Explain mathematical concepts\n• Provide step-by-step solutions\n• Help with calculus, algebra, geometry, and more\n• Generate practice problems\n\nCould you provide more details about what specific aspect you'd like me to explain or solve?`
        }

        // Remove loading message and add actual response
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => !msg.isLoading).concat({ role: "assistant", content: aiResponse }),
        )
      } catch (error) {
        console.error("Error getting AI response:", error)
        setMessages((prevMessages) =>
          prevMessages
            .filter((msg) => !msg.isLoading)
            .concat({
              role: "assistant",
              content: "Sorry, I encountered an error processing your request. Please try again.",
            }),
        )
      }
    }, 2000)
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Chat with Nova</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Your personal AI math tutor. Ask any math question and get step-by-step explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Nova AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Update the chat message rendering to include loading indicators and better formatting */}
              {/* Replace the messages rendering section with: */}
              <div className="flex-1 overflow-y-auto border rounded-md p-4 mb-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {msg.isLoading ? (
                        <div className="flex space-x-2 h-6 items-center">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      ) : (
                        <div className="whitespace-pre-line prose prose-sm max-w-none dark:prose-invert">
                          {msg.content.split("\n").map((line, i) => {
                            if (line.startsWith("##")) {
                              return (
                                <h2 key={i} className="text-lg font-bold mt-2 mb-1">
                                  {line.replace("##", "").trim()}
                                </h2>
                              )
                            } else if (line.startsWith("#")) {
                              return (
                                <h3 key={i} className="text-md font-bold mt-2 mb-1">
                                  {line.replace("#", "").trim()}
                                </h3>
                              )
                            } else if (line.startsWith("•")) {
                              return (
                                <div key={i} className="flex">
                                  <span className="mr-1">•</span>
                                  <span>{line.replace("•", "").trim()}</span>
                                </div>
                              )
                            } else if (line.startsWith("-")) {
                              return (
                                <div key={i} className="flex">
                                  <span className="mr-1">-</span>
                                  <span>{line.replace("-", "").trim()}</span>
                                </div>
                              )
                            } else if (line.includes("**")) {
                              return (
                                <p key={i}>
                                  {line
                                    .split("**")
                                    .map((part, j) => (j % 2 === 0 ? part : <strong key={j}>{part}</strong>))}
                                </p>
                              )
                            } else {
                              return <p key={i}>{line}</p>
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && !messages.some((m) => m.isLoading) && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask Nova about math..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          {/* Update the example questions to be more specific and helpful */}
          {/* Replace the example questions section with: */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Example Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  setInputMessage("How do I solve the quadratic equation 2x² - 5x + 3 = 0?")
                }}
              >
                How do I solve the quadratic equation 2x² - 5x + 3 = 0?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  setInputMessage("Explain the Pythagorean theorem and give a real-world example")
                }}
              >
                Explain the Pythagorean theorem and give a real-world example
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  setInputMessage("What is the derivative of f(x) = x³ - 2x² + 4x - 7?")
                }}
              >
                What is the derivative of f(x) = x³ - 2x² + 4x - 7?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  setInputMessage("Help me understand logarithms and their properties")
                }}
              >
                Help me understand logarithms and their properties
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  setInputMessage("Calculate the integral of sin(x)cos(x)")
                }}
              >
                Calculate the integral of sin(x)cos(x)
              </Button>

              <div className="pt-4">
                <Link
                  href="/calculator"
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Calculator className="h-4 w-4" />
                  Switch to Calculator
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
