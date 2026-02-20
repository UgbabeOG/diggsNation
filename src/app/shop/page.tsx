import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"

const products = [
  { id: 1, name: "Elite Crimson Jersey", price: "$120", category: "Apparel", popular: true },
  { id: 2, name: "Silver Performance Cap", price: "$35", category: "Headwear", popular: false },
  { id: 3, name: "Nation Training Hoodie", price: "$85", category: "Apparel", popular: true },
  { id: 4, name: "Signed Digital Art #01", price: "$45", category: "Digital", popular: false },
  { id: 5, name: "Game Day Gloves", price: "$65", category: "Gear", popular: false },
  { id: 6, name: "Diggs Nation Wristband", price: "$15", category: "Accessories", popular: false },
]

export default function ShopPage() {
  const merchImage = PlaceHolderImages.find(img => img.id === "merch-jersey")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">The Collection</h1>
          <p className="text-muted-foreground mt-2">Authentic gear for true members of Diggs Nation.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center gap-4">
          <Star className="text-primary fill-current" />
          <p className="text-sm font-bold">VVIP Members get 10% off automatically</p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all">
            <CardHeader className="p-0">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={merchImage?.imageUrl || ""}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                {product.popular && (
                  <Badge className="absolute top-4 left-4 bg-primary">Best Seller</Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs uppercase text-muted-foreground font-bold tracking-widest">{product.category}</p>
                  <CardTitle className="text-xl font-bold mt-1">{product.name}</CardTitle>
                </div>
                <span className="text-2xl font-black italic text-primary">{product.price}</span>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button className="w-full gap-2 font-bold uppercase tracking-tighter">
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