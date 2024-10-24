import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomeAbout() {
  return (
    <section id="about" className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-10 lg:flex-row">
        <div>
          <h1 className="text-5xl font-bold">About</h1>
          <p className="py-6">
            Main techniques that we considered while writing programs for this
            system:
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-medium">
                Image processing
              </AccordionTrigger>
              <AccordionContent>
                Python OpenCV library manipulates camera images then gives
                instructions for AGVs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium">
                Efficiency
              </AccordionTrigger>
              <AccordionContent>
                Dijkstra algorithm is used to find shortest paths for each
                order.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
