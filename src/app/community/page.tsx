
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, TrendingUp, Search, Lock, LogIn } from "lucide-react"
import { useUser, useAuth } from "@/firebase"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Skeleton } from "@/components/ui/skeleton"

const threads = [
  {
    id: 1,
    author: "DiggsFan4Life",
    title: "Predictions for this Sunday's matchup?",
    content: "I'm thinking 120 yards and at least 2 TDs. Defense looks shaky.",
    replies: 42,
    likes: 128,
    tier: "VVIP",
    time: "2h ago",
  },
  {
    id: 2,
    author: "BuffaloBill77",
    title: "New Crimson Jersey has arrived!",
    content: "The quality is insane. Totally worth the wait. Anyone else get theirs?",
    replies: 15,
    likes: 56,
    tier: "VIP",
    time: "5h ago",
  },
  {
    id: 3,
    author: "ProFootballExpert",
    title: "Analyzing the footwork on that last highlight reel",
    content: "If you watch frame by frame, his release is unmatched in the league right now.",
    replies: 89,
    likes: 342,
    tier: "Premium",
    time: "12h ago",
  },
]

export default function CommunityPage() {
  const { user, loading } = useUser()
  const auth = useAuth()

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
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
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
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Locker Room Restricted</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-10">
          The Locker Room is an elite space for registered fans. Sign in to join the conversation and connect with the Nation.
        </p>
        <Button onClick={handleSignIn} size="lg" className="bg-primary font-black uppercase tracking-widest h-14 px-10 hover:scale-105 active:scale-95 transition-all">
          <LogIn className="mr-2 h-5 w-5" />
          Sign In to Join
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Locker Room Chat</h1>
          <p className="text-muted-foreground mt-2">Connect with the most dedicated fans in the nation.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 font-bold px-8 h-12 text-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          Start a Discussion
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Forum List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 h-12 bg-card border-border focus:ring-primary" placeholder="Search discussions..." />
          </div>

          {threads.map((thread) => (
            <Card key={thread.id} className="hover:border-primary/40 transition-all cursor-pointer group">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-zinc-800">{thread.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-primary">{thread.author}</span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1 border-primary/40 text-primary">
                      {thread.tier}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{thread.time}</span>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{thread.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-6 line-clamp-2">{thread.content}</p>
                <div className="flex gap-6 items-center border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thread.replies} Replies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{thread.likes} Likes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="uppercase tracking-widest text-sm">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["#GamePredictions", "#MerchDrop", "#Stats", "#Training", "#HighlightReel", "#Offseason"].map(tag => (
                <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-400 hover:text-white hover:bg-primary transition-all cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="crimson-gradient text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <MessageSquare className="h-24 w-24 rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="uppercase italic tracking-tighter">Member Only Chat</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm opacity-90 mb-6 font-medium">
                Connect in real-time with Steffon during post-game debriefs. Exclusive to VVIP and Premium members.
              </p>
              <Button variant="secondary" className="w-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">Upgrade to Access</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
