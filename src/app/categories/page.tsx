'use client';

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, ArrowRight, Search } from 'lucide-react'
import { getRecipesByCategory, Recipe } from '@/lib/firebase'
import Link from 'next/link'

const categories = ['Breakfast', 'Lunch', 'Dinner']

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast')
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await getRecipesByCategory(selectedCategory)
      setRecipes(fetchedRecipes)
    }
    fetchRecipes()
  }, [selectedCategory])

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-center space-x-4">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "" : "text-black hover:text-white"}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="relative max-w-xl mx-auto">
          <Input
            type="text"
            placeholder={`Search ${selectedCategory.toLowerCase()} recipes...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

function RecipeCard({ id, title, difficulty, prepTime, cookTime, color, category }: Recipe) {
  const bgColor = category === 'Dinner' ? 'bg-blue-400' : color;
  return (
    <Card className={`${bgColor} text-black`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <ChefHat className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Difficulty:</span>
            <span>{difficulty}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Time:</span>
            <span>{`${prepTime} + ${cookTime}`}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/recipe/${id}`} passHref>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            View Recipe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}