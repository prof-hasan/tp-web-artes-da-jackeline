import * as React from "react"
import Image from "next/image"

export function AboutImage() {
  return (
    <div>
      <Image width={1920} height={1080} alt="About image" src={"/about.png"} />
    </div>
  )
}
