import { useRouter } from "next/router"
import Link from "next/link"
// import { ChevronDown } from "lucide-react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { IoIosArrowDown } from "react-icons/io"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "src/components/ui/navigation-menu"
import { useState } from "react"

const LanguageDropdown = () => {
  const router = useRouter()
  const [active, setActive] = useState(false)

  // const click = () => {
  //   setActive()
  // }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="outline-none">Lang</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col py-3 px-4 gap-1">
            <NavigationMenuLink className=""><Link href={router.pathname} locale="kn">Kannada</Link></NavigationMenuLink>
            <NavigationMenuLink className=""><Link href={router.pathname} locale="en">English</Link></NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    // <DropdownMenu>
    //   <DropdownMenuTrigger className="flex items-center gap-1 group">Lang <IoIosArrowDown className="font-bold text-xs sm:text-sm md:text-base 2xl:text-lg text-center group-:rotate-180" ></IoIosArrowDown></DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuItem><Link className="w-full h-full inline-block font-sans" href={router.pathname} locale="kn">Kannada</Link></DropdownMenuItem>
    //     <DropdownMenuItem ><Link className="w-full h-full inline-block font-sans" href={router.pathname} locale="en">English</Link></DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}

export default LanguageDropdown