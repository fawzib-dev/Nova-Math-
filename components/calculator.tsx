"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, History, X, ArrowRight, Brain } from "lucide-react"

// Add utility functions for trigonometric calculations
const degToRad = (degrees: number) => degrees * (Math.PI / 180)
const radToDeg = (radians: number) => radians * (180 / Math.PI)

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [history, setHistory] = useState<string[]>([])
  const [memory, setMemory] = useState<number>(0)
  const [showChat, setShowChat] = useState(false)

  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG")
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string; isLoading?: boolean }[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Nova, your AI math assistant. I can help with calculations, explain math concepts, and solve problems step-by-step. Try asking me something!",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num))
  }

  const handleOperatorClick = (operator: string) => {
    setDisplay((prev) => prev + operator)
  }

  const handleClear = () => {
    setDisplay("0")
  }

  // Add trigonometric function handler
  const handleTrigFunction = (func: string) => {
    try {
      let value = Number.parseFloat(display)
      let result: number

      // Convert to radians if in DEG mode
      if (angleMode === "DEG" && ["sin", "cos", "tan"].includes(func)) {
        value = degToRad(value)
      }

      switch (func) {
        case "sin":
          result = Math.sin(value)
          break
        case "cos":
          result = Math.cos(value)
          break
        case "tan":
          result = Math.tan(value)
          break
        case "asin":
          result = Math.asin(value)
          result = angleMode === "DEG" ? radToDeg(result) : result
          break
        case "acos":
          result = Math.acos(value)
          result = angleMode === "DEG" ? radToDeg(result) : result
          break
        case "atan":
          result = Math.atan(value)
          result = angleMode === "DEG" ? radToDeg(result) : result
          break
        case "log":
          result = Math.log10(value)
          break
        case "ln":
          result = Math.log(value)
          break
        case "sqrt":
          result = Math.sqrt(value)
          break
        case "square":
          result = value * value
          break
        case "reciprocal":
          result = 1 / value
          break
        case "abs":
          result = Math.abs(value)
          break
        default:
          result = value
      }

      // Format the result to avoid extremely small numbers due to floating point precision
      const formattedResult = Math.abs(result) < 1e-10 ? 0 : result

      // Add to history
      setHistory((prev) => [...prev, `${func}(${display}) = ${formattedResult}`])

      // Update display
      setDisplay(formattedResult.toString())
    } catch (error) {
      setDisplay("Error")
    }
  }

  const handleCalculate = () => {
    try {
      // This is a simplified version - in a real app, you'd want to use a proper math evaluation library
      const result = eval(display).toString()
      setHistory((prev) => [...prev, `${display} = ${result}`])
      setDisplay(result)
    } catch (error) {
      setDisplay("Error")
    }
  }

  const handleChatSubmit = async () => {
    if (!inputMessage.trim()) return

    // Add user message to chat
    const newMessages = [...chatMessages, { role: "user", content: inputMessage }]
    setChatMessages(newMessages)

    // Add loading message
    setChatMessages([...newMessages, { role: "assistant", content: "", isLoading: true }])
    setInputMessage("")

    // Simulate AI thinking time
    setTimeout(async () => {
      try {
        // In a real implementation, this would call the AI API
        // const response = await fetch('/api/chat', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ messages: newMessages })
        // });
        // const data = await response.json();

        // For demo, simulate a response based on the query
        let aiResponse = ""

        if (inputMessage.toLowerCase().includes("quadratic")) {
          aiResponse =
            "To solve a quadratic equation (ax² + bx + c = 0):\n\n1. Try to factor it\n2. If not factorable, use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n3. Calculate the discriminant (b² - 4ac) to determine how many solutions exist\n\nNeed me to solve a specific equation?"
        } else if (inputMessage.toLowerCase().includes("derivative")) {
          aiResponse =
            "The derivative measures the rate of change of a function. Common derivatives:\n\n• d/dx(x^n) = nx^(n-1)\n• d/dx(sin x) = cos x\n• d/dx(e^x) = e^x\n• d/dx(ln x) = 1/x\n\nI can help with specific derivatives if you need!"
        } else if (inputMessage.toLowerCase().includes("integral")) {
          aiResponse =
            "Integration is the reverse of differentiation. Common integrals:\n\n• ∫x^n dx = x^(n+1)/(n+1) + C (n≠-1)\n• ∫sin x dx = -cos x + C\n• ∫e^x dx = e^x + C\n\nDo you need help with a specific integral?"
        } else if (
          inputMessage.toLowerCase().includes("trigonometric") ||
          inputMessage.toLowerCase().includes("sin") ||
          inputMessage.toLowerCase().includes("cos") ||
          inputMessage.toLowerCase().includes("tan")
        ) {
          aiResponse =
            "Trigonometric functions relate angles to the sides of a right triangle:\n\n• sin(θ) = opposite/hypotenuse\n• cos(θ) = adjacent/hypotenuse\n• tan(θ) = opposite/adjacent = sin(θ)/cos(θ)\n\nRemember to check if you're working in degrees or radians. Our calculator supports both modes!"
        } else if (inputMessage.toLowerCase().includes("help") || inputMessage.toLowerCase().includes("can you")) {
          aiResponse =
            "I can help with many math topics including:\n\n• Basic arithmetic\n• Algebra and equations\n• Calculus (derivatives, integrals)\n• Statistics\n• Geometry\n• Trigonometry\n\nJust ask a specific question, and I'll provide a detailed explanation!"
        } else {
          aiResponse = `I understand you're asking about "${inputMessage}". I can provide step-by-step explanations for math problems, define mathematical concepts, or help with calculations. Could you provide more details about what you'd like to know?`
        }

        // Remove loading message and add actual response
        setChatMessages((prevMessages) =>
          prevMessages.filter((msg) => !msg.isLoading).concat({ role: "assistant", content: aiResponse }),
        )
      } catch (error) {
        console.error("Error getting AI response:", error)
        setChatMessages((prevMessages) =>
          prevMessages
            .filter((msg) => !msg.isLoading)
            .concat({
              role: "assistant",
              content: "Sorry, I encountered an error. Please try again.",
            }),
        )
      }
    }, 1500)
  }

  // Toggle between degrees and radians
  const toggleAngleMode = () => {
    setAngleMode((prev) => (prev === "DEG" ? "RAD" : "DEG"))
  }

  return (
    <Card className="w-full max-w-[400px] mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">NovaCalc</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowChat(!showChat)}
              className={showChat ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" : ""}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setHistory([])}>
              <History className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {!showChat ? (
          <>
            <Input className="text-right text-2xl font-mono mb-4 h-14" value={display} readOnly />
            {/* Add a new AI suggestion feature to the calculator */}
            {/* Add this after the display input */}
            <div className="text-sm text-purple-600 text-right mb-2 h-6 italic">
              {display.length > 0 && display !== "0" && display !== "Error" && (
                <>
                  <Brain className="inline h-3 w-3 mr-1" />
                  {display.includes("+") || display.includes("-") || display.includes("*") || display.includes("/")
                    ? "Nova suggests: Try calculating this!"
                    : "Nova suggests: Try an operation with this number"}
                </>
              )}
            </div>
            <Tabs defaultValue="standard">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="scientific">Scientific</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" onClick={() => handleClear()}>
                    C
                  </Button>
                  <Button variant="outline">±</Button>
                  <Button variant="outline" onClick={() => handleOperatorClick("%")}>
                    %
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("/")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    ÷
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("7")}>
                    7
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("8")}>
                    8
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("9")}>
                    9
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("*")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    ×
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("4")}>
                    4
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("5")}>
                    5
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("6")}>
                    6
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("-")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    −
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("1")}>
                    1
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("2")}>
                    2
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("3")}>
                    3
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("+")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    +
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("0")} className="col-span-2">
                    0
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick(".")}>
                    .
                  </Button>
                  <Button
                    onClick={() => handleCalculate()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  >
                    =
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="scientific" className="space-y-2">
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAngleMode}
                    className="text-xs bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    {angleMode}
                  </Button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleTrigFunction("sin")}>
                    sin
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTrigFunction("cos")}>
                    cos
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTrigFunction("tan")}>
                    tan
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTrigFunction("log")}>
                    log
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTrigFunction("ln")}>
                    ln
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => handleNumberClick(Math.PI.toString())}>
                    π
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleNumberClick(Math.E.toString())}>
                    e
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleOperatorClick("(")}>
                    (
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleOperatorClick(")")}>
                    )
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleOperatorClick("**")}>
                    ^
                  </Button>

                  <Button variant="outline" onClick={() => handleClear()}>
                    C
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDisplay((prev) => (Number.parseFloat(prev) * -1).toString())}
                  >
                    ±
                  </Button>
                  <Button variant="outline" onClick={() => handleOperatorClick("%")}>
                    %
                  </Button>
                  <Button variant="outline" onClick={() => handleTrigFunction("sqrt")}>
                    √
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("/")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    ÷
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("7")}>
                    7
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("8")}>
                    8
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("9")}>
                    9
                  </Button>
                  <Button variant="outline" onClick={() => handleTrigFunction("square")}>
                    x²
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("*")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    ×
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("4")}>
                    4
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("5")}>
                    5
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("6")}>
                    6
                  </Button>
                  <Button variant="outline" onClick={() => handleTrigFunction("reciprocal")}>
                    1/x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("-")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    −
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("1")}>
                    1
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("2")}>
                    2
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick("3")}>
                    3
                  </Button>
                  <Button variant="outline" onClick={() => handleTrigFunction("abs")}>
                    |x|
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperatorClick("+")}
                    className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    +
                  </Button>

                  <Button variant="outline" onClick={() => handleNumberClick("0")} className="col-span-2">
                    0
                  </Button>
                  <Button variant="outline" onClick={() => handleNumberClick(".")}>
                    .
                  </Button>
                  <Button variant="outline" onClick={() => handleOperatorClick("e")}>
                    EXP
                  </Button>
                  <Button
                    onClick={() => handleCalculate()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  >
                    =
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          // Update the chat UI rendering to include loading indicators
          // Replace the chat UI section in the showChat conditional with:
          <div className="flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center">
                <Brain className="h-4 w-4 mr-2 text-purple-600" />
                Chat with Nova
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setShowChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-md p-3 mb-3 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800"
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
                      <div className="whitespace-pre-line">{msg.content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask Nova about math..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              />
              <Button
                onClick={handleChatSubmit}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
                disabled={!inputMessage.trim()}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {!showChat && history.length > 0 && (
        <CardFooter className="flex-col items-start pt-0">
          <h3 className="text-sm font-semibold mb-2">History</h3>
          <div className="w-full max-h-32 overflow-y-auto space-y-1">
            {history.map((item, index) => (
              <div key={index} className="text-sm text-gray-500 dark:text-gray-400">
                {item}
              </div>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
