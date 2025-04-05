"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { useEffect } from "react";

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      const segments = pathname.split("/");
      segments[1] = newLocale;
      router.replace(segments.join("/"));
    }
  };
  
  useEffect(() => {
    router.refresh();
  }, [pathname, currentLocale, router]);

  return (
    <div className="lg:p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="font-rhomdon">
          <Button variant="outline" className="w-fit py-4 bg-gradient-to-br from-secondary-200 to-secondary-100 cursor-pointer align-middle hover:from-secondary-100 hover:to-secondary-200 hover:text-[#080b1e] rounded-full lg:text-lg border-0">
            {/* <BsGlobeCentralSouthAsia className="mr-2" /> */}
            <FaGlobe className="lg:mr-2" />
            {currentLocale === "kn" ? "ಕನ್ನಡ" : "English"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-rhomdon bg-gradient-to-br from-secondary-200 to-secondary-100 w-fit border-0 text-[#080b1e]">
          <DropdownMenuItem onClick={() => switchLocale("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLocale("kn")}>
            ಕನ್ನಡ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LocaleSwitcher;
