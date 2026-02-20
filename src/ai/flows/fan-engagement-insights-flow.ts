'use server';
/**
 * @fileOverview An AI-powered tool for platform administrators to analyze fan engagement data
 * and suggest content or experiences to increase membership sales for Diggs Nation.
 *
 * - analyzeFanEngagement - A function that handles the fan engagement analysis process.
 * - FanEngagementInsightsInput - The input type for the analyzeFanEngagement function.
 * - FanEngagementInsightsOutput - The return type for the analyzeFanEngagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const FanEngagementInsightsInputSchema = z.object({
  membershipSalesSummary: z
    .string()
    .describe(
      'A summary of current membership sales data, including trends and tier performance.'
    ),
  contentEngagementSummary: z
    .string()
    .describe('A summary of which content types (e.g., videos, articles) are most engaging.'),
  communityActivitySummary: z
    .string()
    .describe('A summary of fan community activity, popular topics, and engagement levels.'),
  qnaAttendanceSummary: z
    .string()
    .describe('A summary of attendance rates and engagement during live Q&A sessions.'),
  merchandiseSalesSummary: z
    .string()
    .describe('A summary of merchandise sales data, popular items, and trends.'),
  feedbackSummary: z
    .string()
    .describe('A summary of direct fan feedback, survey results, or common complaints/suggestions.'),
});
export type FanEngagementInsightsInput = z.infer<typeof FanEngagementInsightsInputSchema>;

// Output Schema
const FanEngagementInsightsOutputSchema = z.object({
  contentSuggestions: z
    .array(z.string())
    .describe('An array of specific content ideas (e.g., "Exclusive workout videos", "Deep-dive article on game strategy") to increase engagement and sales.'),
  experienceSuggestions: z
    .array(z.string())
    .describe('An array of specific experience ideas (e.g., "Virtual meet-and-greet", "Fantasy football league with Diggs Nation members") to increase engagement and sales.'),
  membershipTierOptimization: z
    .string()
    .describe('Recommendations on how to optimize current membership tiers, pricing, or exclusive benefits to drive more sales.'),
  overallStrategySummary: z
    .string()
    .describe('A concise summary of the recommended overall strategy to boost membership sales.'),
});
export type FanEngagementInsightsOutput = z.infer<typeof FanEngagementInsightsOutputSchema>;

// Wrapper function
export async function analyzeFanEngagement(
  input: FanEngagementInsightsInput
): Promise<FanEngagementInsightsOutput> {
  return fanEngagementInsightsFlow(input);
}

// Prompt definition
const fanEngagementInsightsPrompt = ai.definePrompt({
  name: 'fanEngagementInsightsPrompt',
  input: {schema: FanEngagementInsightsInputSchema},
  output: {schema: FanEngagementInsightsOutputSchema},
  prompt: `You are an AI-powered insights tool for the "Diggs Nation" fan platform for American footballer Steffon Diggs. Your goal is to help platform administrators optimize their content strategy and increase membership sales across VIP, VVIP, and Premium tiers.

Analyze the provided fan engagement data summaries and generate actionable suggestions for content, experiences, and membership tier optimization.

Aim for creative and impactful suggestions that resonate with fans of an American football player.

Fan Engagement Data Summaries:
- Membership Sales: {{{membershipSalesSummary}}}
- Content Engagement: {{{contentEngagementSummary}}}
- Community Activity: {{{communityActivitySummary}}}
- Q&A Attendance: {{{qnaAttendanceSummary}}}
- Merchandise Sales: {{{merchandiseSalesSummary}}}
- Fan Feedback: {{{feedbackSummary}}}

Based on the above data, provide:
1. An array of content suggestions that would likely drive engagement and membership sales.
2. An array of experience suggestions that would likely drive engagement and membership sales.
3. Recommendations for optimizing membership tiers, pricing, or exclusive benefits.
4. An overall summary of the recommended strategy.`,
});

// Flow definition
const fanEngagementInsightsFlow = ai.defineFlow(
  {
    name: 'fanEngagementInsightsFlow',
    inputSchema: FanEngagementInsightsInputSchema,
    outputSchema: FanEngagementInsightsOutputSchema,
  },
  async input => {
    const {output} = await fanEngagementInsightsPrompt(input);
    return output!;
  }
);
