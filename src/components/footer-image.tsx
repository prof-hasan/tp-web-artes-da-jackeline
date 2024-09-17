import * as React from "react"
import Image from "next/image"

export function FooterImage() {
  return (
    <div>
        <Image
            width={1920}
            height={1080}
            alt="..."
            src={"/footer.png"}
        />
    </div>
  )
}
