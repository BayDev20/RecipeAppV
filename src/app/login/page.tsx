/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, ChefHat, Mail, Lock, GithubIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Utensils className="h-6 w-6" />
          <span className="text-sm text-gray-400">support@recipeapp.com</span>
        </div>
        <Link href="/" className="text-white hover:text-gray-300">
          Back to Home
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md bg-green-500 text-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <ChefHat className="h-6 w-6 mr-2" />
              Login to Recipe App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-green-400 border-green-600 text-black placeholder-green-700"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-700" />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-green-400 border-green-600 text-black placeholder-green-700"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-700" />
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Log In
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-green-400"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-green-500 text-green-700">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-green-400 border-green-600 hover:bg-green-300 text-black">
                  <GithubIcon className="h-5 w-5 mr-2" /> GitHub
                </Button>
                <Button variant="outline" className="bg-green-400 border-green-600 hover:bg-green-300 text-black">
                  <TwitterIcon className="h-5 w-5 mr-2" /> Twitter
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-green-700">
              Don&apos;t have an account? <a href="#" className="text-black hover:underline">Sign up</a>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
