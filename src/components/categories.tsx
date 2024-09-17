import React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function Categories() {
  const categories = ["Divino", "Mandala", "Madeira", "Mdf", "Natal", "Tecido", "Crochê"]
  return (
    <div>
      <div className="hidden h-5 items-center space-x-4 text-sm md:flex">
        {categories.map((category) => (
          <>
            <Link
              className="rounded-lg bg-primary-foreground p-4 font-bold uppercase"
              href={`/search?query=${category}`}
            >
              {category}
            </Link>
          </>
        ))}
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center rounded-lg bg-primary-foreground p-4 font-bold">
            <ChevronDown
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
            <span>Categorias</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category) => (
              <DropdownMenuItem>
                <Link className="font-bold" href={`/search?query=${category}`}>
                  {category}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
