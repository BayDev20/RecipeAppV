'use client';

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Loader2 } from 'lucide-react'

export default function GenerateRecipePage() {
  const [ingredients, setIngredients] = useState("")
  const [generatedRecipe, setGeneratedRecipe] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateRecipe = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })
      const data = await response.json()
      setGeneratedRecipe(data.recipe)
    } catch (error) {
      console.error('Error generating recipe:', error)
      setGeneratedRecipe("Sorry, there was an error generating the recipe. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <Layout>
      <Card className="w-full max-w-2xl mx-auto bg-green-500 text-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <ChefHat className="h-6 w-6 mr-2" />
            AI Recipe Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium mb-1">
                Enter your ingredients (comma-separated):
              </label>
              <Input
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., chicken, rice, broccoli"
                className="w-full bg-green-400 border-green-600 text-black placeholder-green-700"
              />
            </div>
            <Button 
              onClick={generateRecipe} 
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Recipe'
              )}
            </Button>
          </div>
          {generatedRecipe && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Generated Recipe:</h3>
              <div className="bg-green-400 p-4 rounded-md whitespace-pre-wrap">
                {generatedRecipe}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}
