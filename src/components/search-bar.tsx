"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const { push } = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    push(`/search?query=${query}`)
  }

  return (
    <div className="relative flex w-full items-center space-x-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
        type="search"
        placeholder="Pesquisar"
      />
      <Button onClick={handleSearch}>
        <Search className="mr-2 h-4 w-4" />
        Pesquisar
      </Button>
    </div>
  )
}
