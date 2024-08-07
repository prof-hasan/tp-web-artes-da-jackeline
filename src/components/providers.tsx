"use client"

import React, { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default Providers
