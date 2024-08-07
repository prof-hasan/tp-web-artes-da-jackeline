import { FooterImage } from "@/components/footer-image"
import MoreProducts from "@/components/more-products"
import { Products } from "@/components/products"
import { SearchBar } from "@/components/search-bar"

export default function Store() {
  const AMOUNT = 20
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 md:py-10">
        <SearchBar />
        <div className="flex gap-4">
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Products amount={AMOUNT} />
          </div>
        </div>
        <MoreProducts alreadyShown={AMOUNT} />
        <FooterImage />
      </section>
    </>
  )
}
