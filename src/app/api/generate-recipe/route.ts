import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { ingredients } = await req.json()

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates recipes based on given ingredients. Include relevant emojis in your response to make it more engaging and visually appealing."
        },
        {
          role: "user",
          content: `Generate a recipe using these ingredients: ${ingredients}. Include a title with an emoji, an ingredients list with emojis for each item, and step-by-step instructions with relevant emojis. Make it fun and visually appealing!`
        }
      ],
    })

    const recipe = completion.choices[0].message.content

    return NextResponse.json({ recipe })
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json({ error: 'Error generating recipe' }, { status: 500 })
  }
}
