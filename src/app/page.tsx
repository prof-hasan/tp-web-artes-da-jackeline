import Link from "next/link"

import Intro from "@/components/Intro/Intro"
import { Cards } from "@/components/cards"
import Categories from "@/components/categories"
import { FooterImage } from "@/components/footer-image"
import { Products } from "@/components/products"
import { SearchBar } from "@/components/search-bar"

export default function IndexPage() {
    return (
        <>
            <section className="container grid items-center gap-6 space-y-5 pb-8 md:py-10">
                <Intro />
                <h1 className="text-center text-4xl font-bold text-primary">
                    Confira nossos produtos mais recentes!
                </h1>
                <SearchBar />
                <Categories />
                <div className="flex gap-4">
                    <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <Products amount={8} />
                    </div>
                </div>
                <div className="mx-auto rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <Link href="/store">Confira todos os produtos</Link>
                </div>
                <Cards />
                <FooterImage />
            </section>
        </>
    )
}
