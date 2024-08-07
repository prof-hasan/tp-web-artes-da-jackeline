import Intro from "@/components/Intro/Intro"
import { AboutImage } from "@/components/about-image"
import { Cards } from "@/components/cards"
import { FooterImage } from "@/components/footer-image"
import Product from "@/components/product"
import { SearchBar } from "@/components/search-bar"

export default function About() {
  return (
    <>
		<section className="container grid items-center gap-6 pb-8 md:py-10">
        <AboutImage />
		<FooterImage />
		</section>
    </>
  )
}
