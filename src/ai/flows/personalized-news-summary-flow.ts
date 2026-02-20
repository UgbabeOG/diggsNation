'use server';
/**
 * @fileOverview An AI agent that summarizes news about Steffon Diggs, tailored to specific user interests.
 *
 * - personalizedNewsSummary - A function that generates a personalized news summary.
 * - PersonalizedNewsSummaryInput - The input type for the personalizedNewsSummary function.
 * - PersonalizedNewsSummaryOutput - The return type for the personalizedNewsSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedNewsSummaryInputSchema = z.object({
  userInterests: z
    .array(z.string())
    .describe(
      "A list of topics or interests the user has regarding Steffon Diggs (e.g., 'game stats', 'personal life', 'team performance')."
    ),
  latestNewsArticles: z
    .string()
    .describe(
      'A collection of recent news articles about Steffon Diggs, provided as a single string concatenation of multiple articles.'
    ),
});
export type PersonalizedNewsSummaryInput = z.infer<
  typeof PersonalizedNewsSummaryInputSchema
>;

const PersonalizedNewsSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'An AI-generated summary of the most important news and updates about Steffon Diggs, tailored to the user interests. The summary should be concise and highlight key information relevant to the specified interests.'
    ),
});
export type PersonalizedNewsSummaryOutput = z.infer<
  typeof PersonalizedNewsSummaryOutputSchema
>;

export async function personalizedNewsSummary(
  input: PersonalizedNewsSummaryInput
): Promise<PersonalizedNewsSummaryOutput> {
  return personalizedNewsSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedNewsSummaryPrompt',
  input: {schema: PersonalizedNewsSummaryInputSchema},
  output: {schema: PersonalizedNewsSummaryOutputSchema},
  prompt: `You are an AI assistant specialized in sports news, particularly focusing on the American footballer Steffon Diggs. Your task is to provide a concise summary of the latest news about Steffon Diggs, specifically tailored to the user's expressed interests.\n\nThe user's interests are: {{#each userInterests}}- {{this}}\n{{/each}}\n\nThe latest news articles provided are:\n{{{latestNewsArticles}}}\n\nPlease provide a summary that focuses on the most important updates relevant to these interests, ensuring it's easy to read and captures the highlights without unnecessary detail.`,
});

const personalizedNewsSummaryFlow = ai.defineFlow(
  {
    name: 'personalizedNewsSummaryFlow',
    inputSchema: PersonalizedNewsSummaryInputSchema,
    outputSchema: PersonalizedNewsSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
