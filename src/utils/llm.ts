import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ScoredQuestion {
  question: string;
  relevance: number;
  insightDepth: number;
  relationshipUsage: number;
  visualizationFit: number;
  totalScore: number;
}

export async function generateSmartQuestionsFromLLM(schema: any): Promise<ScoredQuestion[]> {
  const messages = [
    {
      role: 'system',
      content: `You are a senior data analyst. Given the structure of a MongoDB database (collections, fields, and relationships), generate as many valuable business questions as possible that could be asked based on this data.

For each question, rate it on a scale of 1 to 5 for the following:
- relevance
- insightDepth
- relationshipUsage
- visualizationFit

Respond in JSON format as an array.`
    },
    {
      role: 'user',
      content: JSON.stringify(schema, null, 2)
    }
  ];

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.7,
    messages: messages as any // ✅ force acceptable structure without fake types
  });

  try {
    const parsed = JSON.parse(res.choices[0].message.content || '[]');
    return parsed.map((q: any) => ({
      ...q,
      totalScore:
        (q.relevance || 0) +
        (q.insightDepth || 0) +
        (q.relationshipUsage || 0) +
        (q.visualizationFit || 0)
    }));
  } catch (e) {
    console.error('❌ Failed to parse AI response:', e);
    return [];
  }
}
