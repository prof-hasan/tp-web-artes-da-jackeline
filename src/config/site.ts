export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Artes da Jackeline",
  description: "Uma loja de artesanatos",
  mainNav: [
    {
      title: "Página inicial",
      href: "/",
    },
    {
        title: "Loja",
        href: "/store",
    },
    {
        title: "Sobre nós",
        href: "/about",
    },
    {
        title: "Perguntas frequentes",
        href: "/faq",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
