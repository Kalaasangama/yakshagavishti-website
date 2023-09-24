import Link from "next/link"

interface Button {
  buttonString: string
  url: string
}

export const Button = ({buttonString, url}: Button) => {
  return (
    <Link href={url}>
      <div className="px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-semibold bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer align-middle hover:from-secondary-100 hover:to-secondary-200 active:scale-90 transition duration-150 ease-linear select-none">{buttonString}</div>
    </Link>
  )
}

export const OutlineButton = ({buttonString, url} : Button) => {
  return (
    <Link href={url}>
      <div className="px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-semibold cursor-pointer align-middle hover:border-secondary-200 hover:text-secondary-200 active:scale-90 transition duration-150 ease-linear select-none border-2 md:border-[3px] border-secondary-100 text-secondary-100">{buttonString}</div>
    </Link>
  )
}

export const InactiveButton = ({buttonString}: Button) => {
  return (
    <div className="px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-light cursor-pointer align-middle select-none border-gray-400 border-2 text-gray-400">{buttonString}</div>
  )
}