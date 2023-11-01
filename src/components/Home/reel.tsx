import ScrollVelocityCarousel from "~/components/Animations/scrollVelocityCarousel"
import Image from "next/image"

type ReelImg = {
  src: string,
}

const Reel = ({reelImg, angle, baseVelocity, classes} : {reelImg: ReelImg[], angle: number, baseVelocity: number, classes: string}) => {
  return (
    <div className={classes}>
      <ScrollVelocityCarousel baseVelocity={baseVelocity} angle={angle}>
        <div className="flex gap-2 bg-orange-600/40 p-2">
          {reelImg.map((img, idx) => {
            return (
              <div className="h-[8.5rem] w-48 sm:h-44 sm:w-60 md:h-52 md:w-72 lg:h-64 lg:w-96 relative " key={idx}>
                <Image src={img.src} fill className="object-cover object-center rounded-md" alt={`reel-image-${idx}`} />
              </div>
            )
          })}
        </div>
      </ScrollVelocityCarousel>
    </div>
  )
}

export default Reel