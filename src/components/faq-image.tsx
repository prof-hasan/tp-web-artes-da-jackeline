import * as React from "react"
import Image from "next/image"

export function FaqImage() {
  return (
    <div>
        <Image
            width={1920}
            height={1080}
            alt="..."
            src={"/faq.png"}
        />
    </div>
  )
}
