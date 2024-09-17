"use client"

import React, { useEffect, useState } from "react"

import Product from "./product"
import { Button } from "./ui/button"

export default function MoreProducts({
  alreadyShown,
}: {
  alreadyShown: number
}) {
  const [moreProducts, setMoreProducts] = useState([])
  const [total, setTotal] = useState(null)

  useEffect(() => {
    ;(async () => {
      const resolve = await fetch("/api/getMoreProducts", {
        method: "GET",
      })

      setTotal(await resolve.json())
    })()
  }, [])

  const onClick = async () => {
    const alreadyDisplayedNumber = moreProducts.length + alreadyShown

    const resolve = await fetch("/api/getMoreProducts", {
      method: "POST",
      body: JSON.stringify({
        skip: alreadyDisplayedNumber,
      }),
    })

    const mProducts = await resolve.json()

    setMoreProducts((prev) => {
      const newArray = [...prev]

      return newArray.concat(mProducts)
    })
  }

  return (
    <div className="grid w-full place-content-center">
      <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {moreProducts &&
          moreProducts.length > 0 &&
          moreProducts.map((product: any) => (
            <Product
              id={product.id}
              title={product.title}
              caption={product.caption}
              price={product.price}
              permalink={product.permalink}
            />
          ))}
      </div>
      <div className="mt-4 grid w-full place-content-center">
        {moreProducts && moreProducts.length + alreadyShown === total ? (
          <>Todos os produtos estão listados</>
        ) : (
          <Button onClick={onClick}>Mostrar mais produtos</Button>
        )}
      </div>
    </div>
  )
}
