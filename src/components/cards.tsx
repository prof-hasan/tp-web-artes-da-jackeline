import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

const cards = [
  {
    description:
      "Realizamos entregas para todo o Brasil, converse conosco para verificar nossas taxas!",
    url: "/card_1.png",
  },
  {
    description:
      "Criamos produtos artesanais personalizados a cada compra, converse conosco e saiba mais!",
    url: "/card_2.png",
  },
  {
    description:
      "Atenção: Nossas estampas estão sujeitas a estoque, verifique a que mais te agrada.",
    url: "/card_3.png",
  },
]

export function Cards() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Card>
          <CardHeader>
            <CardTitle>{card.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image width={1080} height={1080} alt="..." src={card.url} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
