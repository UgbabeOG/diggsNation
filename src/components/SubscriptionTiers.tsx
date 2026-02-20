
"use client"

import { Check, Crown, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "VIP",
    price: "$499.99",
    description: "Perfect for casual fans who want to get closer.",
    icon: ShieldCheck,
    features: [
      "Access to Exclusive Articles",
      "Member-only Community Forum",
      "Behind-the-scenes Photos",
      "Monthly Newsletter",
    ],
    color: "bg-slate-800",
    buttonVariant: "outline" as const,
  },
  {
    name: "VVIP",
    price: "$995.99",
    description: "The ultimate fan experience with live access.",
    icon: Crown,
    features: [
      "All VIP Features",
      "Live Monthly Q&A with Steffon",
      "Exclusive Workout Videos",
      "10% Off Official Merch",
    ],
    popular: true,
    color: "crimson-gradient",
    buttonVariant: "default" as const,
  },
  {
    name: "Premium VIP",
    price: "$1,480.99",
    description: "For the die-hard fans who want it all.",
    icon: Zap,
    features: [
      "All VVIP Features",
      "Signed Digital Memorabilia",
      "Early Access to Merch Drops",
      "Personalized Birthday Video",
    ],
    color: "bg-zinc-700",
    buttonVariant: "outline" as const,
  },
]

export default function SubscriptionTiers() {
  return (
    <section id="memberships" className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-4xl font-black uppercase tracking-tight md:text-5xl">Join Diggs Nation</h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground">
          Unlock exclusive content, behind-the-scenes access, and join an elite community of fans.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={cn(
                "relative flex flex-col border-2 transition-all hover:scale-105 group",
                tier.popular ? "border-primary shadow-2xl shadow-primary/20" : "border-border"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary px-3 py-1 text-white animate-pulse">MOST POPULAR</Badge>
                </div>
              )}
              <CardHeader>
                <div className={cn("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110", tier.color)}>
                  <tier.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-left">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={tier.buttonVariant} 
                  className={cn(
                    "w-full h-12 text-lg font-bold uppercase tracking-widest transition-all active:scale-95",
                    tier.popular ? "bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20" : "hover:scale-[1.02]"
                  )}
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
