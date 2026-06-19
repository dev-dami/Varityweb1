import { useScreenSize } from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"

function GooeyDemo() {
  const screenSize = useScreenSize()

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center gap-8 bg-black text-center text-pretty overflow-hidden rounded-2xl border border-border">
      <img
        src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
        alt="impressionist painting"
        className="w-full h-full object-cover absolute inset-0 opacity-70"
      />

      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <p className="text-white text-7xl z-10 font-bold max-w-lg leading-tight select-none pointer-events-none drop-shadow-lg">
        Speaking things into existence
      </p>
    </div>
  )
}

export { GooeyDemo }
