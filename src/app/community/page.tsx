import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, TrendingUp, Search } from "lucide-react"

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
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Locker Room Chat</h1>
          <p className="text-muted-foreground mt-2">Connect with the most dedicated fans in the nation.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 font-bold px-8 h-12 text-lg">
          Start a Discussion
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Forum List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 h-12 bg-card border-border" placeholder="Search discussions..." />
          </div>

          {threads.map((thread) => (
            <Card key={thread.id} className="hover:border-primary/40 transition-all cursor-pointer">
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
                  <CardTitle className="text-xl font-bold">{thread.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-6 line-clamp-2">{thread.content}</p>
                <div className="flex gap-6 items-center border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thread.replies} Replies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="crimson-gradient text-white border-0">
            <CardHeader>
              <CardTitle className="uppercase italic tracking-tighter">Member Only Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90 mb-6">
                Connect in real-time with Steffon during post-game debriefs. Exclusive to VVIP and Premium members.
              </p>
              <Button variant="secondary" className="w-full font-bold">Upgrade to Access</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}