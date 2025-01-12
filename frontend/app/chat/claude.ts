// utils/claude.ts
import { Anthropic } from '@anthropic-ai/sdk';
import { TextBlock } from '@anthropic-ai/sdk/resources/index.mjs';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to fetch and convert image URL to base64
async function urlToBase64(imageUrl: string): Promise<{ data: string; type: string }> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve({
        data: base64String.split(',')[1], // Remove the data URL prefix
        type: blob.type
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function askClaude(
  prompt: string, 
  systemPrompt: string = '',
  imagePath?: string
) {
  try {
    let messages: Array<any> = [];
    
    if (imagePath) {
      // Convert image URL to base64
      const { data, type } = await urlToBase64(imagePath);
      
      messages = [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: type,
              data: data
            }
          },
          {
            type: 'text',
            text: prompt
          }
        ]
      }];
    } else {
      messages = [{ 
        role: 'user', 
        content: prompt 
      }];
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    });

    return (response.content[0] as TextBlock).text;
  } catch (error) {
    console.error('Error communicating with Claude:', error);
    throw error;
  }
}