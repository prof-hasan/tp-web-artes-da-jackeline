"use client"

import React, { useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

export default function Update({
  id,
  caption,
  setMoreProducts,
}: any) {
  const [cCaption, setCaption] = useState(caption)
  const { toast } = useToast()

  const editProduct = async () => {
    await fetch("/api/changeProduct", {
      method: "POST",
      body: JSON.stringify({
        id: id,

        type: "edit",
        product: {
          caption: cCaption,
        },
      }),
    })

    toast({
      title: "Sucesso",
      description:
        "Produto editado com sucesso",
    })
  }

  const deleteProduct = async () => {
    await fetch("/api/changeProduct", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        type: "delete",
      }),
    })

    setMoreProducts((prev: any) => {
      const newArray = [...prev]

      return newArray.filter((p) => p.id !== id)
    })

    toast({
      title: "Sucesso",
      description:
        "Produto removido com sucesso",
    })
  }

  return (
    <div>
      <>Id do produto: {id}</>
      <Textarea
        className="min-h-[200px] w-full bg-primary-foreground"
        value={cCaption}
        onChange={(e) => setCaption(e.target.value)}
      ></Textarea>
      <Button onClick={editProduct}>Editar</Button>
      <Button variant={"destructive"} onClick={deleteProduct}>
        Deletar
      </Button>
    </div>
  )
}
