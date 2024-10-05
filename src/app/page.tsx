/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'
import { getFeaturedRecipes, Recipe } from '@/lib/firebase'
import { getAllRecipes } from '@/lib/firebase'; // Update this import

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const fetchedRecipes = await getFeaturedRecipes();
        console.log('Fetched recipes:', fetchedRecipes);
        setFeaturedRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <Layout>
      <div className="text-center mb-8 relative">
        {/* Yellow curly arrow pointing to the Generate tab */}
        <div className="absolute -top-10 -right-14 w-29 h-28">
          <svg width="100%" height="100%" viewBox="0 0 288 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M130 180 Q 76 100 156 100 Q 236 100 236 20" stroke="#FFD700" strokeWidth="4" fill="none"/>
            <polygon points="231,20 236,10 241,20" fill="#FFD700"/>
          </svg>
          <div className="absolute inset-x-0 top-28 flex justify-start pl-5">
            <div className="text-yellow-500 font-bold text-lg text-center w-56">
              Try our AI recipe generator!
            </div>
          </div>
        </div>

        <div className="inline-block bg-green-500 text-black font-medium rounded-full px-4 py-1 text-sm mb-4">
          <ChefHat className="inline-block h-4 w-4 mr-2" />
          We&apos;ve added 1000+ new recipes!
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Get the Recipe you<br />Want for Delicious Meals
        </h1>
        <div className="relative max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Search recipes, ingredients & more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Recipes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </section>

      {/* The "Explore All Categories" button has been removed */}
    </Layout>
  )
}

function RecipeCard({ id, title, servings, color, description, category }: Recipe) {
  if (!id || !title) {
    console.error('Invalid recipe data:', { id, title, servings, color, description, category });
    return null;
  }
  return (
    <Card className={`${color || 'bg-gray-200'} text-black`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span className="text-sm font-medium">{category}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium">Servings</div>
            <div className="text-2xl font-bold">{servings || 'N/A'}</div>
          </div>
        </div>
        <p className="mt-2">{description || 'No description available'}</p>
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