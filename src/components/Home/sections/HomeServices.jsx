import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomeAbout() {
  return (
    <section id="services" className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
        <div>
          <h1 className="text-5xl font-bold">Services</h1>
          <p className="py-6">
            This site allows users to control AGVs and see data returned from
            them as they move, as simple as that.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-medium">
                Authentication
              </AccordionTrigger>
              <AccordionContent>
                You need to login in order to access Dashboard and Manage Order
                pages via buttons on the top navigation bar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium">
                Dashboard
              </AccordionTrigger>
              <AccordionContent>
                View live parameters such as speed, battery percentage,
                location, etc. as AGVs travel based on schedules you made.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-medium">
                Manage Orders
              </AccordionTrigger>
              <AccordionContent>
                Create{" "}
                <span className="font-bold italic text-primary">orders</span>-
                forms containing instructions for AGVs to operate on. Inputs can
                be modified or removed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
