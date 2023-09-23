import Image from "next/image"

const Prizes = () => {
  return (

    <div className="w-full justify-between flex flex-col items-center gap-3">

      <p className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left md:self-start">Prizes</p>

      <div className="flex flex-col md:flex-row gap-7 md:gap-24 lg:gap-32 text-sm sm:text-lg md:text-xl 2xl:text-4xl max-w-fit">

        {/* Second */}
        <div className="flex flex-col order-2 md:order-1 items-center justify-center gap-2 md:gap-3 hover:scale-110 transition duration-300 ease-linear">
          <p className="font-semibold">Second</p>
          <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-44 md:w-44 ">
            <Image src={'/Silver.png'} alt="Silver" fill className="" />
          </div>
          <p className="font-tourney font-black">YTA</p>
        </div>

        {/* First */}
        <div className="flex flex-col order-1 md:order-2 items-center justify-center gap-2 md:gap-3 hover:scale-110 transition duration-300 ease-linear">
          <p className="font-semibold">First</p>
          <div className="relative h-36 w-36 sm:h-40 sm:w-40 md:h-52 md:w-52">
            <Image src={'/Gold.png'} alt="Gold" fill className="" />
          </div>
          <p className="font-tourney font-black">YTA</p>
        </div>

        {/* Third */}
        <div className="flex flex-col order-3 md:order-3 items-center justify-center gap-2 md:gap-3 hover:scale-110 transition duration-300 ease-linear">
          <p className="font-semibold">Third</p>
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40">
            <Image src={'/Bronze.png'} alt="Bronze" fill className="" />
          </div>
          <p className="font-tourney font-black">YTA</p>
        </div>
      </div>
    </div>
  )
}

export default Prizes