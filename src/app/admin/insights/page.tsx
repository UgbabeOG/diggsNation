"use client"

import { useState } from "react"
import { analyzeFanEngagement, type FanEngagementInsightsOutput } from "@/ai/flows/fan-engagement-insights-flow"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, Lightbulb, Target, Users } from "lucide-react"

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<FanEngagementInsightsOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateInsights = async () => {
    setLoading(true)
    try {
      const result = await analyzeFanEngagement({
        membershipSalesSummary: "VIP tier up 15%, VVIP steady, Premium down 5%.",
        contentEngagementSummary: "Workout videos performing 2x better than lifestyle articles.",
        communityActivitySummary: "High activity around game-day predictions and merchandise leaks.",
        qnaAttendanceSummary: "Average 85% attendance for VVIP members.",
        merchandiseSalesSummary: "New crimson jerseys sold out in 2 hours.",
        feedbackSummary: "Fans requesting more direct interaction and training drills.",
      })
      setInsights(result)
    } catch (error) {
      console.error("Failed to generate insights:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Fan Insights Console</h1>
          <p className="text-muted-foreground mt-2">AI-driven strategy optimization for Diggs Nation.</p>
        </div>
        <Button 
          onClick={handleGenerateInsights} 
          disabled={loading}
          className="bg-primary hover:bg-primary/90 h-12 px-6 font-bold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Data...
            </>
          ) : (
            "Generate New Insights"
          )}
        </Button>
      </div>

      {!insights && !loading && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl opacity-50">
          <TrendingUp className="h-16 w-16 mb-4" />
          <p className="text-xl font-medium">Click generate to analyze current platform metrics.</p>
        </div>
      )}

      {insights && (
        <div className="grid gap-8">
          {/* Strategy Summary */}
          <Card className="border-primary bg-primary/5">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="uppercase tracking-widest text-sm text-primary font-black">Overall Strategy</CardTitle>
                <CardDescription className="text-lg font-bold text-foreground">{insights.overallStrategySummary}</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Content Suggestions */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                <CardTitle className="uppercase tracking-tighter">Content Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {insights.contentSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex gap-4 items-start p-3 rounded-lg bg-white/5">
                      <span className="font-bold text-primary">0{i+1}</span>
                      <p className="text-sm font-medium">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Experience Suggestions */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="uppercase tracking-tighter">Experience Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {insights.experienceSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex gap-4 items-start p-3 rounded-lg bg-white/5">
                      <span className="font-bold text-primary">0{i+1}</span>
                      <p className="text-sm font-medium">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Membership Optimization */}
          <Card>
            <CardHeader>
              <CardTitle className="uppercase tracking-tighter">Tier Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed border-l-4 border-primary pl-4 italic">
                {insights.membershipTierOptimization}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}