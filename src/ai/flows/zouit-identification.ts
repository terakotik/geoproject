'use server';

/**
 * @fileOverview This file defines a Genkit flow for ZOUIT (zones with special conditions of use) identification.
 *
 * - zouitIdentification - A function that takes a location or property as input and determines if it falls within a ZOUIT zone.
 * - ZouitIdentificationInput - The input type for the zouitIdentification function.
 * - ZouitIdentificationOutput - The return type for the zouitIdentification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ZouitIdentificationInputSchema = z.object({
  location: z
    .string()
    .describe('The location or property to check, such as an address or coordinates.'),
});
export type ZouitIdentificationInput = z.infer<typeof ZouitIdentificationInputSchema>;

const ZouitIdentificationOutputSchema = z.object({
  isInZouit: z
    .boolean()
    .describe('Whether the location or property is within a ZOUIT zone.'),
  regulations: z
    .string()
    .describe('A summary of the regulations applicable to the ZOUIT zone, if any.'),
});
export type ZouitIdentificationOutput = z.infer<typeof ZouitIdentificationOutputSchema>;

export async function zouitIdentification(input: ZouitIdentificationInput): Promise<ZouitIdentificationOutput> {
  return zouitIdentificationFlow(input);
}

const zouitIdentificationPrompt = ai.definePrompt({
  name: 'zouitIdentificationPrompt',
  input: {schema: ZouitIdentificationInputSchema},
  output: {schema: ZouitIdentificationOutputSchema},
  prompt: `You are an expert in land use regulations, specifically regarding Zones with Special Conditions of Use (ZOUIT).

  Given the following location, determine if it falls within a ZOUIT zone. If it does, provide a summary of the applicable regulations.

  Location: {{{location}}}

  Consider current regulations and common ZOUIT types such as protected areas, utility corridors, and historical sites.

  Format your response as a JSON object with the following keys:
  - isInZouit: true if the location is in a ZOUIT zone, false otherwise.
  - regulations: A summary of the regulations applicable to the ZOUIT zone, if any.  If it is not in a ZOUIT zone, this should be an empty string.

  Ensure the response is concise and directly answers the question of whether the location is in a ZOUIT zone and what regulations apply.
  `,
});

const zouitIdentificationFlow = ai.defineFlow(
  {
    name: 'zouitIdentificationFlow',
    inputSchema: ZouitIdentificationInputSchema,
    outputSchema: ZouitIdentificationOutputSchema,
  },
  async input => {
    const {output} = await zouitIdentificationPrompt(input);
    return output!;
  }
);
