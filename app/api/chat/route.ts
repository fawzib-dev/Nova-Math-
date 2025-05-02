import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Extract the last user message
    const lastMessage = messages[messages.length - 1]
    const userQuery = lastMessage.content.toLowerCase()

    // In a real implementation, you would use the AI SDK with OpenAI
    /*
    import { generateText } from 'ai'
    import { openai } from '@ai-sdk/openai'

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: lastMessage.content,
      system: "You are Nova, an AI math assistant. You help users solve math problems and explain mathematical concepts clearly and concisely. Always provide step-by-step explanations when solving problems."
    });
    
    return NextResponse.json({
      response: text
    })
    */

    // For demonstration, provide more realistic responses based on query content
    let response = ""

    if (userQuery.includes("quadratic")) {
      response = `# Solving Quadratic Equations

For a quadratic equation in the form ax² + bx + c = 0, we can solve it using the quadratic formula:

x = (-b ± √(b² - 4ac)) / 2a

Let me solve your equation step by step:

1. First, identify the values of a, b, and c
2. Calculate the discriminant: b² - 4ac
3. Apply the quadratic formula
4. Simplify the results

For example, if you have 2x² - 5x + 3 = 0:
- a = 2, b = -5, c = 3
- Discriminant = (-5)² - 4(2)(3) = 25 - 24 = 1
- x = (5 ± √1) / 4 = (5 ± 1) / 4
- x = 6/4 or 4/4
- x = 3/2 or 1

Therefore, the solutions are x = 3/2 and x = 1.

Would you like me to solve another quadratic equation?`
    } else if (userQuery.includes("derivative")) {
      response = `# Finding Derivatives

To find the derivative of a function, I'll apply the differentiation rules:

1. Power Rule: d/dx(x^n) = nx^(n-1)
2. Sum Rule: d/dx(f(x) + g(x)) = f'(x) + g'(x)
3. Product Rule: d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)

For a polynomial like f(x) = x³ - 2x² + 4x - 7:

f'(x) = 3x² - 4x + 4

Let me break this down:
- d/dx(x³) = 3x²
- d/dx(-2x²) = -4x
- d/dx(4x) = 4
- d/dx(-7) = 0

The derivative represents the slope of the tangent line at any point on the original function.

Would you like me to find another derivative or explain a different calculus concept?`
    } else if (userQuery.includes("integral")) {
      response = `# Calculating Integrals

To find the integral of sin(x)cos(x), I'll use the substitution method:

Let u = sin(x), which means du = cos(x)dx

∫sin(x)cos(x)dx = ∫u·du = u²/2 + C = sin²(x)/2 + C

Alternatively, we can use the identity sin(x)cos(x) = sin(2x)/2:

∫sin(x)cos(x)dx = ∫sin(2x)/2 dx = -cos(2x)/4 + C = -cos(2x)/4 + C

Both approaches give equivalent results (they differ only by a constant).

Would you like me to calculate another integral or explain a different integration technique?`
    } else if (userQuery.includes("pythagorean")) {
      response = `# The Pythagorean Theorem

The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) equals the sum of squares of the other two sides (a and b):

a² + b² = c²

## Real-World Applications:

1. **Construction**: Builders use the 3-4-5 triangle method to ensure corners are square (90°)

2. **Navigation**: Calculating the direct distance between two points

3. **Physics**: Resolving vectors into components

4. **Computer Graphics**: Calculating distances in 2D and 3D space

For example, if you're standing 3 miles east and 4 miles north of your starting point, the direct distance back to the starting point is:
c = √(3² + 4²) = √(9 + 16) = √25 = 5 miles

The theorem can be extended to 3D space as a² + b² + c² = d²

Would you like me to explain another geometric concept or solve a specific Pythagorean theorem problem?`
    } else {
      response = `I'd be happy to help with your question about "${lastMessage.content}".

As your AI math assistant, I can:

• Solve equations step-by-step
• Explain mathematical concepts
• Help with calculus, algebra, geometry, and more
• Verify your solutions
• Generate practice problems

Could you provide more details about what specific aspect you'd like me to explain or solve?

For example:
- "Solve this equation: ..."
- "Explain the concept of ..."
- "How do I find the area of ..."
- "What's the derivative of ..."

I'm designed to provide clear, educational explanations that help you understand the underlying concepts.`
    }

    return NextResponse.json({
      response: response,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
