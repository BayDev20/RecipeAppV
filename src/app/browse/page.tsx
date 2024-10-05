'use client';

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import { getAllRecipes, Recipe } from '@/lib/firebase'
import Link from 'next/link'

export default function BrowseRecipesPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await getAllRecipes();
      console.log('Fetched recipes:', fetchedRecipes);
      console.log('Number of fetched recipes:', fetchedRecipes.length);
      setRecipes(fetchedRecipes);
    }
    fetchRecipes();
  }, [])

  const recipesPerPage = 6
  const totalPages = Math.ceil(recipes.length / recipesPerPage)

  const changePage = (direction: 'next' | 'prev') => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage((prev) => {
        if (direction === 'next') {
          return (prev + 1) % totalPages
        } else {
          return (prev - 1 + totalPages) % totalPages
        }
      })
      setIsTransitioning(false)
    }, 150)
  }

  const visibleRecipes = recipes.slice(currentPage * recipesPerPage, (currentPage + 1) * recipesPerPage);
  console.log('Visible recipes:', visibleRecipes);

  return (
    <Layout>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Browse All Recipes</h1>
        <p className="text-xl">Discover new dishes to cook!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleRecipes.map((recipe) => (
          <div 
            key={recipe.id} // Changed from `${currentPage}-${index}` to `recipe.id`
            className={`transition-opacity duration-150 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            <RecipeCard {...recipe} />
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16">
        <Button 
          onClick={() => changePage('prev')} 
          className="px-2 py-6 bg-yellow-400 text-black rounded-l-full hover:bg-yellow-500 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 sm:-mr-8 md:-mr-12 lg:-mr-16">
        <Button 
          onClick={() => changePage('next')} 
          className="px-2 py-6 bg-yellow-400 text-black rounded-r-full hover:bg-yellow-500 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </Layout>
  )
}

function RecipeCard({ id, title, category, difficulty, prepTime, cookTime, color }: Recipe) {
  console.log('RecipeCard props:', { id, title, category, difficulty, prepTime, cookTime, color });
  return (
    <Card className={`${color} text-black`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <ChefHat className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Category:</span>
            <span>{category}</span>
          </div>
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