"use client"

import React, { useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

export default function Update() {
  const [id, setId] = useState("")
  const [cCaption, setCaption] = useState("")
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
    toast({
      title: "Sucesso",
      description:
        "Produto removido com sucesso",
    })
  }

  return (
    <div>
      <>Id do produto: {id}</>
      <Input value={id} onChange={(e) => setId(e.target.value)} className="mb-4" />
      <Textarea
        className="mb-4 min-h-[200px] w-full bg-primary-foreground"
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
