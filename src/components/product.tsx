import React from "react"
import Image from "next/image"
import { Instagram, PlusSquare } from "lucide-react"
import tags from '../public/tagsFile.json';

import ProductModal, { ProductType } from "./product-modal"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

export default function Product({
    id,
    title,
    caption,
    price,
    permalink
}: ProductType) {
    return (
        <>
            <Dialog>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comprar produto</DialogTitle>
                        <ProductModal
                            id={id}
                            title={title}
                            caption={caption}
                            price={price}
                            permalink={permalink}
                        />
                    </DialogHeader>
                </DialogContent>
                <div className="mx-auto max-w-lg max-h-lg">
                    <div className="max-w-sm rounded-lg bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                        <DialogTrigger className="w-full">
                            <Image
                                src={require(`../public/${id}.png`)}
                                className="aspect-square rounded-[40px] object-cover p-8"
                                alt={`product image_${id}`}
                                width={300}
                                height={300}
                            />
                        </DialogTrigger>
                        <div className="px-5 pb-5">
                            <DialogTrigger>
                              <div className="max-w-[250px] rounded-lg bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div className="px-5 pb-5">
                                    <h3 className="line-clamp-2 h-[60px] text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                                        {title}
                                    </h3>
                                    <p className="text-left text-lg font-semibold tracking-tight text-gray-700 dark:text-gray-300 text-center">
                                        {price ? `R$${price}` : "Preços variados"}
                                    </p>
                                    <p className="text-left text-base tracking-tight text-gray-700 dark:text-gray-300 overflow-hidden overflow-ellipsis whitespace-nowrap w-[100%] text-center">
                                        {caption}
                                    </p>
                                </div>
                              </div>

                                <div className="mb-5 mt-2.5 flex items-center">
                                    {
                                        tags.map(tag => {
                                            if (caption?.toLowerCase().includes(tag.id)) {
                                                return (
                                                    <div
                                                        key={tag.id}
                                                        className="mx-auto flex items-center justify-center rounded-lg bg-green-200 px-2 py-1"
                                                        style={{ backgroundColor: tag.backgroundColor }}
                                                    >
                                                        <span className="text-xs font-semibold text-white">
                                                            {tag.name}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </DialogTrigger>
                            <div className="flex items-center justify-end gap-2">
                                {permalink && (
                                    <a target="_blank" rel="noopener noreferrer" href={permalink}>
                                        <Instagram />
                                    </a>
                                )}
                                <PlusSquare />
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://api.whatsapp.com/send?phone=1531998648448&text=Olá!%20Gostaria%20de%20saber%20a%20disponibilidade%20do%20produto:%20${permalink}`}
                                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Comprar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
