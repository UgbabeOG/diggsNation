
"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Star, LayoutDashboard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SubscriptionTiers from "@/components/SubscriptionTiers"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const featuredCards = [
  {
    title: "The Daily Digest",
    description: "Get AI-summarized news and updates tailored to your interests.",
    icon: LayoutDashboard,
    link: "/feed",
    image: "exclusive-content-1",
    tag: "Personalized"
  },
  {
    title: "Locker Room Chat",
    description: "Connect with the most dedicated fans in the nation's community.",
    icon: Users,
    link: "/community",
    image: "avatar-fan",
    tag: "Social"
  },
  {
    title: "Join The Nation",
    description: "Explore our exclusive membership tiers and elite perks.",
    icon: Star,
    link: "#memberships",
    image: "hero-diggs",
    tag: "Elite Access"
  }
]

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-diggs")
  const merchImage = PlaceHolderImages.find(img => img.id === "merch-jersey")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src={heroImage?.imageUrl || ""}
          alt={heroImage?.description || ""}
          fill
          className="object-cover brightness-50"
          priority
          data-ai-hint="american football player"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
          <Badge className="w-fit mb-6 bg-primary text-white font-bold uppercase tracking-widest px-4 py-1 animate-in fade-in slide-in-from-bottom-4 duration-700">Official Platform</Badge>
          <h1 className="max-w-4xl text-6xl font-black uppercase italic tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            DIGGS <span className="text-primary">NATION</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-medium text-slate-300 md:text-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Your front-row seat to the life and career of Steffon Diggs. Exclusive content, elite community, and unique experiences.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Button 
              size="lg" 
              className="h-14 px-8 text-xl font-bold bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 group" 
              asChild
            >
              <Link href="#memberships">
                Join The Nation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-xl font-bold border-white text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all" 
              asChild
            >
              <Link href="/feed">Explore Content</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Carousel Section */}
      <section className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Explore the Nation</h2>
              <p className="text-muted-foreground mt-2">Discover what's happening inside the platform.</p>
            </div>
          </div>

          <div className="relative group/carousel px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredCards.map((card, index) => {
                  const cardImg = PlaceHolderImages.find(img => img.id === card.image)
                  return (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Link href={card.link}>
                        <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all h-full shadow-lg">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={cardImg?.imageUrl || ""}
                              alt={card.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-110 duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <Badge className="absolute top-4 left-4 bg-primary font-bold">
                              {card.tag}
                            </Badge>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <card.icon className="h-6 w-6 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold uppercase italic">{card.title}</h3>
                            </div>
                            <p className="text-muted-foreground mb-6 line-clamp-2">
                              {card.description}
                            </p>
                            <div className="flex items-center text-primary font-bold text-sm">
                              Learn More <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 border-primary text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 border-primary text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <SubscriptionTiers />

      {/* Merch Teaser */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-black uppercase italic mb-6">Rep the Nation</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Official Steffon Diggs gear designed for performance and style. VVIP members get early access and exclusive discounts.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20" asChild>
                <Link href="/shop">Shop the Collection</Link>
              </Button>
            </div>
            <div className="flex-1 relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl">
              <Image 
                src={merchImage?.imageUrl || ""}
                alt={merchImage?.description || ""}
                fill
                className="object-cover"
                data-ai-hint="football jersey"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Badge className="bg-primary text-white mb-2">LIMITED EDITION</Badge>
                <p className="text-xl font-bold text-white uppercase italic">Official Player Jersey</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
