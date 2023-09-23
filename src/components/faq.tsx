import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "~/components/ui/accordion"

const Faq = () => {
  return (
    <Accordion type="single" collapsible className="w-full  text-xs sm:text-sm md:text-base xl:text-lg">
      <p className="font-hindi text-xl sm:text-4xl md:text-4xl 2xl:text-5xl text-center md:text-left">FAQ</p>
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-3 sm:py-4">Is it accessible?</AccordionTrigger>
        <AccordionContent className="text-xs sm:text-sm md:text-base xl:text-lg">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="py-3 sm:py-4">Is it styled?</AccordionTrigger>
        <AccordionContent className="text-xs sm:text-sm md:text-base xl:text-lg">
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="py-3 sm:py-4">Is it animated?</AccordionTrigger>
        <AccordionContent className="text-xs sm:text-sm md:text-base xl:text-lg">
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Faq