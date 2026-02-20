"use client"

import { useState, useEffect } from "react"
import { personalizedNewsSummary, type PersonalizedNewsSummaryOutput } from "@/ai/flows/personalized-news-summary-flow"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Newspaper, Star, MessageSquare, Share2 } from "lucide-react"

const MOCK_NEWS = `
  Steffon Diggs breaks personal receiving record in spectacular fashion. 
  Diggs opens up about his journey from high school to the pro leagues.
  The latest training routine that keeps Diggs at the top of his game.
  Diggs Nation members to get exclusive behind-the-scenes tour next month.
`

export default function FeedPage() {
  const [summary, setSummary] = useState<PersonalizedNewsSummaryOutput | null>(null)
  const [loading, setLoading] = useState(true)
  const [interests] = useState(["game stats", "training habits", "community events"])

  useEffect(() => {
    async function fetchSummary() {
      try {
        const result = await personalizedNewsSummary({
          userInterests: interests,
          latestNewsArticles: MOCK_NEWS,
        })
        setSummary(result)
      } catch (error) {
        console.error("Failed to fetch news summary:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [interests])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase italic italic tracking-tighter">Your Daily Diggs</h1>
          <p className="text-muted-foreground mt-2">Personalized updates based on your interests.</p>
        </div>
        <div className="flex gap-2">
          {interests.map(i => (
            <Badge key={i} variant="secondary" className="bg-zinc-800 text-zinc-300">
              {i}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* AI Summary Card */}
        <Card className="lg:col-span-2 border-primary/30 bg-card/50">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Curated Summary</span>
            </div>
            <CardTitle className="text-2xl font-bold">The Latest Digest</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-slate-300">
                  {summary?.summary || "No recent updates available at this moment. Check back soon!"}
                </p>
                <div className="flex gap-4 mt-8">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Discuss
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Side Content / Trending */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg uppercase">Trending in Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Predicted stats for next Sunday?",
                "Who's going to the meet-and-greet?",
                "Thoughts on the new crimson cleats?",
              ].map((topic, i) => (
                <div key={topic} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0">
                  <span className="text-primary font-bold">#{i + 1}</span>
                  <p className="text-sm font-medium hover:text-primary cursor-pointer">{topic}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg uppercase">Member Exclusive</CardTitle>
              <CardDescription>Only for VVIP & Premium</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">The exclusive live Q&A session with Steffon starts in 4 hours!</p>
              <Button size="sm" className="w-full bg-primary font-bold">Join Waiting Room</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}