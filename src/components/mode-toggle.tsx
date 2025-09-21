"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuPortal } from '@radix-ui/react-dropdown-menu'
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun, Laptop } from 'lucide-react'

export default function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align="end" sideOffset={5} className="bg-white dark:bg-gray-800 rounded-md shadow-md p-1">
          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            Light 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            Dark 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            System 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
