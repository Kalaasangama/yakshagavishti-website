import Image from "next/image"

const Footer = () => {
  return (
    <div className="min-h-[10rem] relative overflow-hidden">
      <div className="absolute -z-10 h-60 w-60 top-full -translate-y-[50%] left-[50%] opacity-50">
        <Image src={'/mandala.png'} height={500} width={500} alt='' className="opacity-70 bg-blend-luminosity" />
      </div> 
    </div>
  )
}

export default Footer