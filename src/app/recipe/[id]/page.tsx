'use client';

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Clock, Users, Utensils } from 'lucide-react'
import { getRecipeById, Recipe } from '@/lib/firebase'

export default function RecipePage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    async function fetchRecipe() {
      if (typeof id === 'string') {
        const fetchedRecipe = await getRecipeById(id)
        setRecipe(fetchedRecipe)
      }
    }
    fetchRecipe()
  }, [id])

  if (!recipe) {
    return <Layout><div>Loading...</div></Layout>
  }

  return (
    <Layout>
      <Card className={`${recipe.color} text-black max-w-4xl mx-auto`}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            {recipe.title}
            <ChefHat className="h-8 w-8" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{recipe.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
              <Utensils className="h-5 w-5 mr-2" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 mb-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">Instructions</h3>
          <ol className="list-decimal pl-5 mb-6">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>

          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Save Recipe
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}