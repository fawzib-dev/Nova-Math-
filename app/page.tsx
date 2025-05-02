import Link from "next/link"
import { Calculator } from "@/components/calculator"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-md p-1.5">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-bold text-xl">NovaCalc</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/calculator" className="font-medium">
              Calculator
            </Link>
            <Link href="/chat" className="font-medium">
              AI Chat
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:inline-flex font-medium text-sm">
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <Features />
        <div className="container py-12 md:py-24">
          <div className="mx-auto max-w-[800px]">
            <Calculator />
          </div>
        </div>
        <Pricing />
      </main>
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-md p-1">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-medium">NovaCalc AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NovaCalc AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
