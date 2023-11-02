import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "~/components/ui/accordion"
import Reveal from "../Animations/reveal"

type Faq = {
  q: string,
  ans: string
}

const Faq = ({faqs, title}: {faqs: Faq[], title: string}) => {
  return (
    <Accordion type="single" collapsible className="w-full  text-xs sm:text-sm md:text-base xl:text-lg">
      <Reveal classes="">
        <p className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left">{title}</p>
      </Reveal>
      {faqs.map((faq, idx) => {
        return (
          <AccordionItem value={`item-${idx+1}`} key={idx}>
            <AccordionTrigger className="py-3 sm:py-4">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm md:text-base xl:text-lg text-gray-400">
              {faq.ans}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Faq