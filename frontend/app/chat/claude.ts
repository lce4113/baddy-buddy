import { Anthropic } from '@anthropic-ai/sdk';
import { TextBlock } from '@anthropic-ai/sdk/resources/index.mjs';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askClaude(prompt: string, systemPrompt: string = '') {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    return (response.content[0] as TextBlock).text;
  } catch (error) {
    console.error('Error communicating with Claude:', error);
    throw error;
  }
}