/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Utensils className="h-6 w-6" />
          <span className="text-sm text-gray-400">support@recipeapp.com</span>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" className={isActive('/') ? 'underline' : ''}>Home</Button>
          </Link>
          <Link href="/browse">
            <Button variant="ghost" className={isActive('/browse') ? 'underline' : ''}>Browse</Button>
          </Link>
          <Link href="/categories">
            <Button variant="ghost" className={isActive('/categories') ? 'underline' : ''}>Categories</Button>
          </Link>
          <Link href="/generate">
            <Button variant="ghost" className={isActive('/generate') ? 'underline' : ''}>Generate</Button>
          </Link>
          <div className="flex-grow"></div>
          <Link href="/login" className={`flex items-center text-white hover:text-gray-300 ${isActive('/login') ? 'underline' : ''}`}>
            <LogIn className="h-4 w-4 mr-2" />
            <span>Login</span>
          </Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
