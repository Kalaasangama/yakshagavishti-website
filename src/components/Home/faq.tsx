import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import Reveal from "~/components/Animations/reveal"
import Link from "next/link"
import { useTranslations } from "next-intl"

const Faq = () => {
  const t = useTranslations("Home");

  const faqs = [
    {
      q: t("q1").split("&")[0],
      ans: <div className="">{t("q1").split("&")[1]}</div>
    },
    {
      q: t("q2").split("&")[0],
      ans: <div className="">{t("q2").split("&")[1]}</div>
    },
    {
      q: t("q3").split("&")[0],
      ans: <div className="">{t("q3").split("&")[1]}</div>
    },
    {
      q: t("q4_q"),
      ans: <div className="">{t("q4_ans").split("&")[0]}<Link href='#about' className='text-secondary-100'>{t("q4_ans").split("&")[1]}</Link>{t("q4_ans").split("&")[2]}</div>
    },
    {
      q: t("q5").split("&")[0],
      ans: <div className="">{t("q5").split("&")[1]}</div>
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full  text-base md:text-lg xl:text-xl">
      <Reveal classes="">
        <p className="font-rhomdon text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl text-center md:text-left">{t("FAQ")}</p>
      </Reveal>
      {faqs.map((faq, idx) => {
        return (
          <AccordionItem value={`item-${idx+1}`} key={idx}>
            <AccordionTrigger className="py-3 sm:py-4 text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-base md:text-lg xl:text-xl text-gray-400">
              {faq.ans}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Faq