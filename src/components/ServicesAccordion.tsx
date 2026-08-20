import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const VIDEO_TRAILER_ID = "1La4QzGeaaQ";

const services = [
  {
    id: "01",
    n: "01",
    t: "eBook Writing",
    desc: "We help you write and design beautiful e-books, digital books in ePub, PDF or Word format, and prepare them for all major e-reading devices and platforms.",
  },
  {
    id: "02",
    n: "02",
    t: "Video Trailer",
    desc: "We combine visuals, story and suspense of your story and convert it into cinematic trailers. Give your book a visual effect with us.",
    youtubeId: VIDEO_TRAILER_ID,
  },
  {
    id: "03",
    n: "03",
    t: "Book Marketing",
    desc: "Amazon ads, media outreach, external traffic, our book marketing plans make everything accessible for you.",
  },
  {
    id: "04",
    n: "04",
    t: "Author's Website",
    desc: "It's your central book store to showcase all your collections. We create professional author websites and gives readers a dedicated home for your books and updates.",
  },
  {
    id: "05",
    n: "05",
    t: "Audiobook",
    desc: "Choose your voice actor and let your readers listen your story on all major platforms like Audible and others.",
  },
];

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState("01");

  return (
    <Accordion
      type="single"
      collapsible
      value={openId}
      onValueChange={setOpenId}
      className="rounded-xl bg-white/75 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
    >
      {services.map((s) => (
        <AccordionItem
          key={s.id}
          value={s.id}
          className="overflow-hidden border-b border-ink/10 bg-transparent last:border-b-0"
        >
          <AccordionTrigger className="group gap-4 p-5 hover:no-underline [&>svg]:hidden">
            <span className="flex flex-1 items-center gap-4 text-left">
              <span className="text-sm font-semibold text-muted-foreground">{s.n}</span>
              <span className="text-lg font-bold">{s.t}</span>
            </span>
            <ChevronDown className="h-5 w-5 shrink-0 text-ink transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            {s.youtubeId ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr]">
                <div className="aspect-video overflow-hidden rounded-lg bg-ink">
                  {openId === s.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${s.youtubeId}?rel=0&modestbranding=1`}
                      title={`${s.t} video`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-white/70">
                      Open this section to load the video.
                    </div>
                  )}
                </div>
                <p className="body-copy">{s.desc}</p>
              </div>
            ) : (
              <p className="body-copy">{s.desc}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
