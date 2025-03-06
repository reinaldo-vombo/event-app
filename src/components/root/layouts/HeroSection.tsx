import MarqueeVertical from "@/components/shared/Marque";
import { Button } from "@/components/ui/button"
import { ColourfulText } from "@/components/ui/colourful-text";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20">
        <MarqueeVertical />
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" /> */}
      <div className="container text-white relative flex min-h-[100vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Transforme seu tempo livre em experiências <ColourfulText text="inesquecíveis!" />
          <span className="text-blue-600 dark:text-blue-400"> Descubra, conecte-se e participe </span>
          dos melhores eventos perto de você. 🎉
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Explore eventos incríveis, conheça pessoas novas e viva experiências inesquecíveis.
          De conferências a festivais, tudo acontece aqui. 🚀
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" className="h-12 px-8">
            <Link href='/party-twon'>Entrar no app</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8">
            Ler Mais
          </Button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <div className="flex items-center rounded-full border bg-background/95 px-3 py-1 text-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <span>Made by Reinaldo</span>
        </div>
      </div>
    </section>
  )
}
export default HeroSection;
