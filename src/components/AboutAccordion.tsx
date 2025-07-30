import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AccordionData {
  title: string;
  content: string | string[];
}

interface AboutAccordionProps {
  items: AccordionData[];
}

export default function AboutAccordion({ items }: AboutAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
          <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-gray-600 py-4">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-gray-700 pb-4">
            {Array.isArray(item.content) ? (
              item.content.map((paragraph, pIndex) => (
                <p key={pIndex} className={pIndex > 0 ? "mt-4" : ""}>
                  {paragraph}
                </p>
              ))
            ) : (
              item.content
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
} 