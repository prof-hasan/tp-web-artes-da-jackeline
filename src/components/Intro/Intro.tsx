"use client"

import Image from "next/image"

import "./Intro.css"
import { useEffect, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  CircleDot,
  Dot,
} from "lucide-react"

function Intro() {
  const slides = [
    {
      url: "/carousel_christmas_1.png",
    },
    {
      url: "/carousel_christmas_2.png",
    },
    {
      url: "/carousel_christmas_3.png",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3) // Change the number 3 to match the total number of carousel items
    }, 10000) // Change the time interval (in milliseconds) to 30 seconds or any desired value

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="group relative m-auto aspect-auto w-full px-4 pb-4">
      <Image
        alt="..."
        width={1920}
        height={1080}
        src={slides[currentIndex].url}
        className="hidden h-full w-full rounded-2xl bg-cover bg-center duration-500 sm:block"
      />

      <Image
        alt="..."
        width={1080}
        height={1080}
        src={`${slides[currentIndex].url.split(".")[0]}_mobile.png`}
        className="h-full w-full rounded-2xl bg-cover bg-center duration-500 sm:hidden"
      />

      {/* Left Arrow */}
      <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>
      <div className="top-4 flex justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="flex cursor-pointer justify-between text-2xl"
          >
            {slideIndex === currentIndex ? <CircleDot /> : <CircleDashed />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Intro
