import { useRouter } from "next/router"
import Link from "next/link"
import { MdOutlineLanguage } from "react-icons/md"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "src/components/ui/navigation-menu"

type Translation = {
  t: {
    lang: string,
    kan: string,
    eng: string
  }
}

const LanguageDropdown = ({t}: Translation) => {
  const router = useRouter()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="outline-none hover:text-secondary-100 align-middle"><MdOutlineLanguage className="text-base sm:text-lg md:text-xl lg:text-2xl align-middle"></MdOutlineLanguage></NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col py-3 px-4 gap-1">
            <NavigationMenuLink className=""><Link href={router.pathname} locale="kn">{t.kan}</Link></NavigationMenuLink>
            <NavigationMenuLink className=""><Link href={router.pathname} locale="en">{t.eng}</Link></NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default LanguageDropdown