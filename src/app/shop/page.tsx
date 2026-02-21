"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Lock, LogIn } from "lucide-react"
import { useUser, useAuth } from "@/firebase"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Skeleton } from "@/components/ui/skeleton"

const products = [
  { id: 1, name: "Elite Crimson Jersey", price: "$120", category: "Apparel", popular: true },
  { id: 2, name: "Silver Performance Cap", price: "$35", category: "Headwear", popular: false },
  { id: 3, name: "Nation Training Hoodie", price: "$85", category: "Apparel", popular: true },
  { id: 4, name: "Signed Digital Art #01", price: "$45", category: "Digital", popular: false },
  { id: 5, name: "Game Day Gloves", price: "$65", category: "Gear", popular: false },
  { id: 6, name: "Diggs Nation Wristband", price: "$15", category: "Accessories", popular: false },
]

export default function ShopPage() {
  const { user, loading } = useUser()
  const auth = useAuth()
  const merchImage = PlaceHolderImages.find(img => img.id === "merch-jersey")

  const handleSignIn = async () => {
    if (!auth) return
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Sign in failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 w-full" />)}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 p-8 rounded-full mb-8">
          <Lock className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Pro Shop Restricted</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-10">
          Exclusive gear is reserved for registered members of Diggs Nation. Sign in to browse the official collection.
        </p>
        <Button onClick={handleSignIn} size="lg" className="bg-primary font-black uppercase tracking-widest h-14 px-10 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
          <LogIn className="mr-2 h-5 w-5" />
          Sign In to Shop
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">The Collection</h1>
          <p className="text-muted-foreground mt-2">Authentic gear for true members of Diggs Nation.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center gap-4">
          <Star className="text-primary fill-current h-5 w-5 shrink-0" />
          <p className="text-sm font-bold">VVIP Members get 10% off automatically</p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all bg-card/50">
            <CardHeader className="p-0">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={merchImage?.imageUrl || "/IMG-20260219-WA0017.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-500"
                />
                {product.popular && (
                  <Badge className="absolute top-4 left-4 bg-primary font-black uppercase tracking-tighter">Best Seller</Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2 gap-4">
                <div>
                  <p className="text-xs uppercase text-muted-foreground font-black tracking-widest">{product.category}</p>
                  <CardTitle className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
                </div>
                <span className="text-2xl font-black italic text-primary">{product.price}</span>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button className="w-full gap-2 font-black uppercase tracking-widest group-hover:scale-105 transition-transform active:scale-95">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
