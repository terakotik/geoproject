'use server';

/**
 * @fileOverview Cost estimation AI agent.
 *
 * - estimateCost - A function that estimates the cost of geodesy services based on project details.
 * - CostEstimationInput - The input type for the estimateCost function.
 * - CostEstimationOutput - The return type for the estimateCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CostEstimationInputSchema = z.object({
  projectType: z.string().describe('The type of geodesy project (e.g., land surveying, construction staking).'),
  projectSize: z.string().describe('The size of the project area in square meters.'),
  location: z.string().describe('The location of the project (city, state).'),
  complexity: z.string().describe('The complexity of the project (low, medium, high).'),
  additionalServices: z.string().describe('Any additional services required for the project.'),
});
export type CostEstimationInput = z.infer<typeof CostEstimationInputSchema>;

const CostEstimationOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated cost of the geodesy services in USD.'),
  costBreakdown: z.string().describe('A breakdown of the estimated cost, including labor, materials, and other expenses.'),
  confidenceLevel: z.string().describe('The confidence level of the estimated cost (low, medium, high).'),
});
export type CostEstimationOutput = z.infer<typeof CostEstimationOutputSchema>;

export async function estimateCost(input: CostEstimationInput): Promise<CostEstimationOutput> {
  return estimateCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'costEstimationPrompt',
  input: {schema: CostEstimationInputSchema},
  output: {schema: CostEstimationOutputSchema},
  prompt: `You are an expert cost estimator for geodesy services.

  Based on the project details provided, estimate the cost of the services in USD. Provide a breakdown of the estimated cost, including labor, materials, and other expenses. Also, provide a confidence level for the estimated cost (low, medium, high).

  Project Type: {{{projectType}}}
  Project Size: {{{projectSize}}} square meters
  Location: {{{location}}}
  Complexity: {{{complexity}}}
  Additional Services: {{{additionalServices}}}

  Consider market rates and complexity when estimating the cost, referencing details extracted from a proprietary knowledge base.
  `,
});

const estimateCostFlow = ai.defineFlow(
  {
    name: 'estimateCostFlow',
    inputSchema: CostEstimationInputSchema,
    outputSchema: CostEstimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
