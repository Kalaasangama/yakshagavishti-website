interface Button {
  children: string | JSX.Element
}

export const Button = ({children}: Button) => {
  return (
    <div className="px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-sm sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-semibold bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer align-middle hover:from-secondary-100 hover:to-secondary-200 active:scale-90 transition duration-150 ease-linear select-none">{children}</div>
  )
}

export const OutlineButton = ({children} : Button) => {
  return (
      <div className="px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-sm sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-semibold cursor-pointer align-middle hover:border-secondary-200 hover:text-secondary-200 active:scale-90 transition duration-150 ease-linear select-none border-2 md:border-[3px] border-secondary-100 text-secondary-100">{children}</div>
  )
}

export const InactiveButton = ({children}: Button) => {
  return (
    <div className="px-3 py-2 lg:px-6 2xl:px-10 lg:py-3 2xl:py-5 text-sm sm:text-sm md:text-base lg:text-lg 2xl:text-2xl rounded-full font-light cursor-pointer align-middle select-none border-gray-400 border-2 text-gray-400">{children}</div>
  )
}

export const InactiveSmallButton = ({children}: Button) => {
  return (
    <div className="px-2 py-1 lg:px-4 2xl:px-6 lg:py-2 2xl:py-3 text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-lg rounded-full font-light cursor-pointer align-middle select-none border-gray-400 border-2 text-gray-400">{children}</div>
  )
}

export const SmallButton = ({children}: {children: JSX.Element | string}) => {
  return (
      <div className="px-2 py-1 lg:px-4 2xl:px-6 lg:py-2 2xl:py-3 text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-lg rounded-full font-semibold bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer align-middle hover:from-secondary-100 hover:to-secondary-200 active:scale-90 transition duration-150 ease-linear select-none">{children}</div>
    )
}