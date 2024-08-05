import Intro from "@/components/Intro/Intro"
import { Cards } from "@/components/cards"
import Categories from "@/components/categories"
import { FooterImage } from "@/components/footer-image"
import { SearchBar } from "@/components/search-bar"
import { SearchProducts } from "@/components/search-products"

export default function SearchPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 md:py-10">
        <SearchBar />
        <Categories />
        <div className="flex gap-4">
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <SearchProducts />
          </div>
        </div>
        <Cards />
        <FooterImage />
      </section>
    </>
  )
}
