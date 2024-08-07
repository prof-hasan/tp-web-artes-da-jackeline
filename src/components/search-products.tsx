"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AlertCircle } from "lucide-react"

import Product from "./product"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { useToast } from "./ui/use-toast"

interface ProductType {
    id: string
    title: string
    caption: string
    price: string
    permalink: string
}

export function SearchProducts() {
    const searchParams = useSearchParams()
    const query = searchParams?.get("query")
    const { toast } = useToast()

    const [products, setProducts] = useState<ProductType[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!query) return

        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/productsSearch", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query }),
                })

                if (!response.ok) {
                    throw new Error('Ocorreu um erro inesperado')
                }

                const resultProducts: ProductType[] = await response.json()

                if (!resultProducts || !resultProducts.length) {
                    toast({
                        variant: "destructive",
                        title: "Erro ao pesquisar produtos",
                        description: "Nenhum produto corresponde a sua pesquisa",
                    })
                }

                setProducts(resultProducts)
            } catch (error: any) {
              toast({
                variant: "destructive",
                title: "Erro ao pesquisar produtos",
                description: error.message || "Ocorreu um erro inesperado",
              })
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [query, toast])

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : products && products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id}>
                        <Product
                            id={product.id}
                            title={product.title}
                            caption={product.caption}
                            price={product.price}
                            permalink={product.permalink}
                        />
                    </div>
                ))
            ) : (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>
                        Não foi possível carregar produtos com a sua pesquisa
                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}
