import {
  Award,
  BookOpen,
  Briefcase,
  FileEdit,
  FileText,
  Gem,
  Globe,
  Headphones,
  Heart,
  Layers,
  Lightbulb,
  Megaphone,
  Mic,
  Palette,
  PenLine,
  Search,
  Send,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Users,
  UserRound,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceDetailContent } from "@/components/ServiceDetailPage";
import type { ServiceSlug } from "@/data/services-menu";
import ghostwritingAboutImg from "@/assets/Ace Book Publishers Is A Top Ghostwriting Company Committed to Your Success.png";
import maximizeInfluenceImg from "@/assets/Maximize Your Influence with Our Professional Book Writing Services.png";
import penDownImg from "@/assets/Pen down Your Thoughts With Ace Book Publishers.png";
import bookMarketingImg from "@/assets/book marketing.png";
import bookCoverImg from "@/assets/book cover design.png";
import audiobookImg from "@/assets/audiobook.png";
import pictureBooksImg from "@/assets/Picture Books.png";
import writerPortrait from "@/assets/writer-portrait.jpg";

type Step = ServiceDetailContent["procedureSteps"][number];
type ExpertiseItem = ServiceDetailContent["expertise"]["items"][number];
type BenefitItem = ServiceDetailContent["benefits"]["items"][number];

function steps(
  mainStep: { t: string; d: string; icon?: LucideIcon },
): Step[] {
  return [
    {
      n: "01",
      icon: Search,
      t: "Registration",
      d: "Share your project goals, timeline and vision through a simple intake form so we understand exactly what you need.",
    },
    {
      n: "02",
      icon: Users,
      t: "Discussion & Planning",
      d: "We consult with you to shape scope, priorities and a clear roadmap before production begins.",
    },
    {
      n: "03",
      icon: mainStep.icon ?? PenLine,
      t: mainStep.t,
      d: mainStep.d,
    },
    {
      n: "04",
      icon: FileEdit,
      t: "Review & Refinement",
      d: "Collaborative review rounds refine quality, clarity and polish until the deliverable meets professional standards.",
    },
    {
      n: "05",
      icon: Send,
      t: "Final Delivery",
      d: "Receive your completed work — ready for publishing, distribution, marketing or your next stage of launch.",
    },
  ];
}

function benefits(items: BenefitItem[]): ServiceDetailContent["benefits"]["items"] {
  return items;
}

function expertise(title: string, items: ExpertiseItem[]): ServiceDetailContent["expertise"] {
  return { title, items };
}

const serviceDetailContent: Record<ServiceSlug, ServiceDetailContent> = {
  ghostwriting: {
    label: "Ghostwriting",
    intro: {
      headingLines: ["Turn Your Ideas Into A Book With Best Ghostwriting Services"],
      paragraphs: [
        "Ace Book Publishers writes the book you have been meaning to write. Our talented ghostwriters shape your ideas into stories that hold readers from the first page. The work is careful, professional, and built around your voice, never a template. This is professional ghostwriting services done the way a serious author deserves.",
        "We deliver strong book ghostwriting services for print and online publication. Our ebook ghostwriting services handle your project from first draft to final file. Find out why authors trust Ace Book Publishers as the ghostwriting partner behind their best work.",
      ],
    },
    about: {
      image: ghostwritingAboutImg,
      imageAlt: "Illustration of a ghostwriter at work",
      heading: "Hire A Ghostwriter And Succeed Today!",
      paragraphs: [
        "Tired of ghostwriting companies that treat your book like one more job in the queue? You want a real partnership, where your ideas are heard, valued, and put on the page. Ace Book Publishers believes your story deserves more than the rushed approach a standard ghostwriting service hands out.",
        "We are a ghostwriting agency that works differently. Our writers give your story the attention it has earned. We believe your book can leave a mark on readers, and we help you find what makes it matter.",
        "We go past clean sentences and correct grammar. Our team knows character, plot, and pacing, so your book moves and holds attention from start to finish. We write gripping stories across fiction, memoir, and commercial work. Our fiction ghostwriting services turn a strong idea into a book readers cannot put down.",
        "Our approach is personal and collaborative. We study your vision, your voice, and the readers you want to reach. That is how your book comes out polished and honest, the kind of story that stays with people long after the last page.",
        "Working with us is like availing top notch book writing services in the business. We want to help you write a book that hooks readers and earns its place on the shelf. We care about your story, and we put a dedicated team behind it, turning your ideas into fiction or nonfiction that lands.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Getting started is simple. Fill out a short form and tell us about your book. We use this first step to understand what you want your story to do. Once your form is in, we set up a free consultation to talk through your premise, genre, and any special needs so your book gets ghostwriting writing service accordingly.",
      },
      {
        n: "02",
        icon: PenLine,
        t: "Manuscript Formation",
        d: "Our professional ghostwriters then start writing your manuscript while keeping your careful instructions in mind. Making sure your exact idea for your book remains intact. Our ghostwriters write the book just like you want it to be written as.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Once done writing the manuscript, our ghostwriters start checking every sentence for grammar, punctuation, and syntax. We go past the mechanics too, improving the voice, clarity, and rhythm of your book. The result is a story that moves smoothly and connects with readers, while your own style and tone stay intact.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "Presentation matters, so we set your text to a professional standard. Our team formats your book with care, handling indentation, pagination, and chapter breaks. This stage lifts readability and gets your manuscript ready for self-publishing whether print or ebook without a hitch.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Your book is now ready to meet its readers. Whether you self publish or choose our advanced publishing services, we help you choose the right path. Our team answers your questions all the way through, so your book reaches the marketplace smoothly.",
      },
    ],
    expertise: expertise("Expert Book Writing Services Across Every Book Genre", [
      {
        icon: FileText,
        t: "Non-fiction Writing",
        d: "From history to self-help, we write non-fiction that informs and holds interest. We turn your knowledge, ideas, or real-life stories into books that teach readers lessons you want them to learn.",
      },
      {
        icon: Sparkles,
        t: "Comic Book Writing",
        d: "Step into the fast-growing comic book market with us. Our writers work alongside you to build sharp scripts for superhero adventures and graphic novels alike.",
      },
      {
        icon: BookOpen,
        t: "Fiction Writing",
        d: "Our fiction book writing services will keep the readers hanging to your every word by writing a gripping, intense, drama filled story or a heart melting romantic story whatever you want.",
      },
      {
        icon: UserRound,
        t: "Autobiography Writing",
        d: "We help you write a compelling autobiography about the life you have lived. Together we find your voice and put your story on the page with honesty.",
      },
      {
        icon: Heart,
        t: "Memoir Ghostwriting",
        d: "We help you shape a memoir around the themes and moments that matter most. The result is thoughtful, meaningful, and written to resonate with your readers.",
      },
      {
        icon: Lightbulb,
        t: "Children's Book Writing",
        d: "Our writers craft fun, teachable children's books. We use age-appropriate language and ideas that entertain young readers and spark their imagination.",
      },
    ]),
    highlights: {
      title: "Hire A Ghostwriter To Write A Best-selling Book",
      items: [
        {
          title: "We Are Ghostwriting Experts",
          description:
            "The right ghostwriter matters. Readers are far more likely to pick up a book carrying the author's name, and our writers are built to deliver it. They are storytellers who take what you describe out loud and turn it into pages that grip. Whether you want a seasoned pro or fresh talent, Ace Book Publishers matches you with the right writer.",
        },
        {
          title: "Top Bookwriters For Hire Are Here",
          description:
            "We pay close attention to your voice, vision, and genre, so the finished book reads like you wrote it. Our collaborative method blends your imagination with book writers who know how to hold a reader. The story that comes out attracts the audience you are after.",
        },
        {
          title: "Presenting and Marketing Your Book",
          description:
            "Readers do judge a book by its cover. We do more than write, we format your book to industry standards for submission or self-publishing. We proofread and edit with care, so your finished work reaches readers clean and error-free.",
        },
      ],
    },
    whyUs: {
      heading: "Why Hire A Ghostwriter From Ace Book Publishers?",
      paragraphs: [
        "We believe ghostwriting should be collaborative and genuinely interesting. Our process blends your vision with skilled writers, so the finished book stays true to your voice. Your input shapes every stage, and the result meets professional publication standards. That is what sets us apart from other ghostwriting service providers.",
        "With us, you get writers who bring skill, professionalism, and real passion to your project. Let us help you write a book that engages readers, strengthens your story, and earns its success. If you are ready to hire a book writer for a masterpiece, connect with our team today.",
      ],
    },
    benefits: {
      titleLines: ["Lets Find a Ghostwriter That Matches Your Voice"],
      subtitle:
        "Do you have a fascinating narrative to tell but struggling to write? Ace Book Publishers specializes in finding the right book writers to flesh out your ideas. Hire a ghostwriter from Ace Book Publishers to put your ideas together in a book!",
      items: benefits([
        {
          icon: Shield,
          t: "100% Originals",
          d: "All content is original and customized to your vision.",
        },
        {
          icon: FileEdit,
          t: "Reviewed by Editors",
          d: "To eliminate errors, your work will be edited.",
        },
        {
          icon: SlidersHorizontal,
          t: "Unlimited Revisions",
          d: "Unlimited revisions for all book projects to ensure satisfaction.",
        },
        {
          icon: Gem,
          t: "Ownership Rights Guaranteed",
          d: "You are the sole owner of your book and its royalties.",
        },
      ]),
    },
    maximize: {
      heading: "Maximize Your Reach With Our Book Writing Services",
      paragraphs: [
        "Do you want to share your story? Whether it is a thriller, a biography, or a comic book, your book can move readers. If you need help getting it written, we are the team to call. Our book writing services turn your ideas into gripping, professionally written stories.",
        "Ace Book Publishers believes every story deserves to be told, so we put expert writers behind your ideas and carry them through to a published book. Ready to hire a book writer who will shape your story and see it finished? Book your free consultation now and start turning your idea into a full book.",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Writer at work",
      consultationNote:
        "Put your book's potential to work today. With skilled guidance and steady support from Ace Book Publishers, your book's success is just one click away. Reach out today.",
    },
    faqs: [
      {
        q: "Which novels can you help me write?",
        a: "Ace Book Publishers handles fiction, non-fiction, memoirs, children's books, and more. Our expert book writers can write your thriller, biography, self-help book, or any other genre.",
      },
      {
        q: "How does ghostwriting work?",
        a: "You share your ideas, and we do the writing under your name. We interview you, study your voice, and draft the book while you review each stage.",
      },
      {
        q: "What are ghostwriting's advantages?",
        a: "You get a finished, professional book without spending months at the keyboard. A skilled writer shapes your ideas, sharpens the pacing, and handles the craft, so your story reaches readers polished and on time.",
      },
      {
        q: "How long will it take to finish my book?",
        a: "Timelines depend on length and genre, but most books take a few months from first interview to final draft. We set a clear schedule at the start and keep you updated at every milestone.",
      },
      {
        q: "Will I own the rights to my book?",
        a: "Yes. You own your book in full. We never resell your work or attach our name to it. The story is yours to publish, sell, and profit from however you choose.",
      },
      {
        q: "Can I stay involved while you write?",
        a: "Absolutely. Ace Book Publishers works collaboratively from day one. You review drafts, share feedback, and guide the direction, so the finished book reflects exactly what you set out to say.",
      },
    ],
    faqAsideText:
      "If you're still curious about our ghostwriting services or need additional clarification about book writing services, our team is always here to answer all of your questions.",
  },

  "book-publishing": {
    label: "Book Publishing",
    intro: {
      headingLines: ["Share Your Story With Our Book Publishing Services"],
      paragraphs: [
        "Stop letting your novel live rent-free in your laptop notes and publish it with us.",
        "No agent, no query letters, no pile of rejection emails, that's the version of self publishing a book most authors quietly give up on but unlike other book publishing companies, with us you skip all of it. We give all authors complete self-publishing support that is fast and entirely on your terms.",
      ],
    },
    about: {
      image: penDownImg,
      imageAlt: "Amazon self-publishing editing and publishing services",
      heading: "Your Quality Partner For Self-Publishing a Book",
      paragraphs: [
        "Let's be honest: writing a book is exciting but also frustrating. Dealing with writer's block, critics, and self-doubt—all while trying to get your message across—is tough. But once you hit “Save Final Draft,” the real ordeal begins. Margins, trim sizes, cover bleed, ISBNs—it's enough to make any author want to quit.",
        "That's where we come in. Think of us as your self publishing book co-pilots. We handle all the technical and time-consuming details so you can focus on the fun stuff.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: PenLine,
        t: "Ghostwriting & Editing",
        d: "Got a wild first draft or a great idea? Let us write your book and you get full ownership. That's not all. Our expert editors fix plots, grammar, punctuation, and provide a new perspective on your book. Fix plot holes and pacing. Smooth flow and snappy dialogue. Hunt down typos and grammar errors. Ghostwrite from your outline.",
      },
      {
        n: "02",
        icon: Palette,
        t: "Cover Design",
        d: "Give your book a stunning outlook so even readers who judge your cover can't help but buy it. Genre-targeted, market-savvy art. Bold, mobile-optimized thumbnails. Perfect print, paperback, and audiobook formats.",
      },
      {
        n: "03",
        icon: Layers,
        t: "Interior Formatting",
        d: "We format the critical aspects of your book to give readers an uninterrupted reading experience—no weird gaps or misplaced pictures. Custom fonts and elegant headers. Flawless layouts for eBooks and print. Bleed, margin, and gutter consistent format.",
      },
      {
        n: "04",
        icon: FileText,
        t: "Compatible Formatting",
        d: "We make sure your file is compatible with major retailers, online websites, and physical stores. Your front, back cover, or full spread illustrations are formatted in PDF or JPG files to market on social media sites.",
      },
      {
        n: "05",
        icon: Globe,
        t: "Distribution & Launch",
        d: "Our team handles your online book publishing, uploads, metadata, and global print-on-demand so you keep 100% of your rights and royalties. Smooth platform setup. ISBNs, barcodes, and keyword optimization. Global availability without storage hassles.",
      },
      {
        n: "06",
        icon: Megaphone,
        t: "Printing & Marketing",
        d: "We provide crisp printed books with high resolution color pages. Our marketers make sure your book reaches the right readers on Amazon and other major sites. SEO marketing. Social media and email marketing. Ranking and Sales through A10 algorithm. Amazon ads. Let us be your publishing pit crew so you can enjoy the ride!",
      },
    ],
    expertise: expertise("Launch With Top Book Publishers In The US", [
      {
        icon: BookOpen,
        t: "Multiple Genre",
        d: "Fiction, nonfiction, memoir, children's book, and Christian books—we have professionals for every genre of publishing.",
      },
      {
        icon: Layers,
        t: "Everything At One Place",
        d: "Stop your never- ending search for every service. Get editors, designers, formatters, illustrators, self book publishers, and marketers under one roof.",
      },
      {
        icon: Megaphone,
        t: "Advance Marketing",
        d: "Take your marketing game to the next level and become an authority outside Amazon and overcome the A10 algorithm through our smart strategies.",
      },
      {
        icon: Award,
        t: "Author's Satisfaction",
        d: "Our dedication to quality and author first sets us apart from other famous book publishers.",
      },
      {
        icon: Globe,
        t: "Physical Distribution",
        d: "Attend events, promote your book physically, publish limited editions, giveaway discounts with our distribution channels.",
      },
      {
        icon: Gem,
        t: "Long Term Support",
        d: "We will never forget you. We stay connected with you even after publishing to support until you reach dream goals.",
      },
    ]),
    highlights: {
      title: "Affordable Kindle Book Publishing for Self Writers",
      items: [
        {
          title: "Quality Publishing",
          description:
            "We want every self publisher to have access to professional services. That's why we provide special packages which are affordable for Amazon self publishing with quality.",
        },
        {
          title: "Personalized For Every Author",
          description:
            "Unlike other self publishing book companies, we customize your plans to your requirements. You can trust us to format, design, and edit your book to industry standards.",
        },
        {
          title: "Amazon KDP Expertise",
          description:
            "We have years of expertise as a book publishing company and know the ins and outs of the market trends on Amazon. Let us take the reins and make your book successful.",
        },
      ],
    },
    whyUs: {
      heading: "Why So Many Great Books Never Reach Their Readers",
      paragraphs: [
        "If I write something incredible, readers will come. The most comforting—and frustrating—truth for authors is that writing quality is rarely the reason a book fails. A book's survival depends on Positioning + Presentation + Discovery.",
        "We provide you with strategic packaging, targeted reader alignment, and active online book marketing of 12 months that will carry the story into the hands of your readers. Consult us today and become an author!",
      ],
    },
    benefits: {
      titleLines: ["The Hidden Services Every Self Publisher Overlook"],
      subtitle:
        "We offer a full range of services — formatting, cover design, SEO, editing, and multi-platform publishing — to make your book stand out in the competitive Amazon book publishing industry.",
      items: benefits([
        {
          icon: FileText,
          t: "ISBN Registration",
          d: "We assist you through setups like purchasing ISBNs, Copyright registration and LLCN for academic libraries.",
        },
        {
          icon: Shield,
          t: "Rights & Licensing",
          d: "We guide through foreign and translation rights. You will get strategic Film & TV rights guidance for potential screen adaptations.",
        },
        {
          icon: Sparkles,
          t: "Post-Publication",
          d: "Our post-publication services cover everything from complete book rebranding, cover redesigns, and launching revised new or special anniversary editions to revitalize your backlist catalog.",
        },
        {
          icon: UserRound,
          t: "Author Branding",
          d: "Get author website, professional press kits, media kits, sample Q&As, podcast hosts, and industry reviewers to build your brand.",
        },
      ]),
    },
    maximize: {
      heading: "Join Hundreds of Successfully Published Authors",
      paragraphs: [
        "Consult with us today and get a customized package with quality services aligned with the best book publishing companies and work with a team that supports till you reach your goals.",
        "Claim Your Publishing Spot Today!",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Self publishing consultation",
      consultationNote:
        "Contact us today to learn more about our services and launch your publishing career with a trusted name! Let's make your writing great!",
    },
    faqs: [
      {
        q: "What genres and manuscript lengths do you publish?",
        a: "You can write any genre book—fiction, non-fiction, memoirs, children's books, young adult, poetry, devotionals, business guides, and academic texts. We don't restrict word count and so go with the flow of your story.",
      },
      {
        q: "Do you format books for audio and digital reading devices?",
        a: "Yes—indeed. In addition to print PDF wraps, we provide reflowable EPUB files for Kindle, Apple Books, and Kobo, as well as 1:1 square audiobook cover art and script preparation.",
      },
      {
        q: "What is a Library of Congress Control Number (LCCN)?",
        a: "If you want to publish in US libraries and archivists then you need an LCCN. It helps reader order your book for public or academic collections.",
      },
      {
        q: "How do royalties work, and how much do I earn per sale?",
        a: "You receive 100% of your net royalties from our side. In the case of Amazon, it ranges between 40% and 70% of the list price, while eBook royalties range between 35% and 70%, depending on price point and platform.",
      },
      {
        q: "Can I publish a new edition or redesign my cover later?",
        a: "Yes. If you decide to update your manuscript for an anniversary edition, rebrand an older backlist title, or refresh your cover to match modern genre trends, we are ready to help you.",
      },
    ],
    faqAsideText:
      "If you have more questions about our book publishing services, Amazon self-publishing, or packages, our team is ready to walk you through every step.",
  },

  "kdp-publishing": {
    label: "KDP Publishing",
    intro: {
      headingLines: ["Simplify Your KDP Book Publishing Journey from Manuscript to Market"],
      paragraphs: [
        "Ace Book Publishers gives authors a clear path to publish well. Our Amazon Kindle Direct Publishing (KDP) team handles editing, formatting, cover design, illustrations, and marketing, so you can focus on crafting your next bestseller. Our amazon kdp publishing experts shape your book to meet every guideline, then put it in front of readers across the globe. You write the story that your readers can remember for ages and we'll make sure that your book can capture their first look while keeping them hooked up till the end.",
      ],
    },
    about: {
      image: penDownImg,
      imageAlt: "Professional Amazon KDP publishing success",
      heading: "Reach Bestseller Status with Skilled KDP Amazon Publishing Support",
      paragraphs: [
        "Our team lifts the weight off your shoulders by managing the technicalities of book publishing to build your confidence in your book. Ace Book Publishers follows proven kdp amazon self publishing standards to turn your manuscript into an amazing book.",
        "Publishing your first book is hard but real professional guidance makes it lighter. From smooth layout to creative book cover, our team polishes every page of your book because we respect the hours you gave it writing. Your manuscript becomes a book with a sharp cover, clean layout, and content that will demand attention.",
        "Ace Book Publishers give authors more room to succeed as kdp self publishing specialists. That means your book will get best quality formatting, close proofreading, original cover, appealing internal layout, and reliable printing. Your paperback reaches readers worldwide through Amazon KDP self publishing.",
        "Standing out among many books takes a carefully designed strategy. Our Amazon KDP book publishing knowledge tunes your book for search and sales, so readers find you faster. We carry it from smooth editing and formatting through expert marketing so your book can reach the highest ranking number on Amazon KDP self publishing platform.",
        "Ace Book Publishers hands you every right and royalty, so you can remain the sole owner of your masterpiece. You keep full control of your creative work while we do the heavy lifting. Print or digital, we help you publish on your terms.",
        "You focus on the story that only you can write best and we manage the KDP publishing amazon process that we excel in from start to finish. Our aim is simple: More eyes on your book and more readers who stay till the end.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Connect With Us",
        d: "Reach out to Ace Book Publishers to start the process of publishing. We make onboarding smooth so you feel supported from day one. First, we talk through your goals and your vision for the book. Then our experts guide you with solutions built around you. We keep communication open so you always know what comes next. Let's begin, and make amazon kdp self publishing rewarding.",
      },
      {
        n: "02",
        icon: Search,
        t: "Assessment of Manuscript",
        d: "Every project opens with a full manuscript review. Our editors study your structure, flow, and substance, then sharpen the work for the next stage. We protect your voice and hold your book to market standards. After the review, you get a clear plan for edits and improvements. The result is a book that speaks to your readers and rises above the crowd in amazon kdp self publishing.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Formatting and Proofreading",
        d: "Careful editing is a very important step to make your book clean and ready. We fix grammar, set suitable font styles, and correct spacing for both digital and print. The layout is built for Amazon Kindle Direct Publishing (kdp) and paperback so every page sits right. Our attention to detail leaves your book polished, professional, and set up to earn strong reviews.",
      },
      {
        n: "04",
        icon: Palette,
        t: "Book Cover Design",
        d: "A cover that earns the first look and keeps it engaged is our main design goal. Our designers craft covers that fit your topic and genre, built to stand out in a crowded market. We use professional visuals made to draw your readers in. Whether your taste runs simple or refined, your cover meets every standard for amazon kdp book publishing. A strong cover lifts both sales and shelf appeal.",
      },
      {
        n: "05",
        icon: Globe,
        t: "Publish Your Book",
        d: "Once your manuscript and cover are set, we move to the launching phase. Our team builds your author profile, upload your book, and tune it for discovery. Our team sets your metadata, keywords, and categories so the right readers find you. Publishing on amazon kdp puts your work in front of a global audience for which we run the full launch to give your book its strongest start.",
      },
      {
        n: "06",
        icon: Gem,
        t: "Book Royalties",
        d: "Your book earnings matter to us. Our Amazon KDP publishing services hand you full rights and royalties, with guidance on the options that fit your goals. We walk you through eBook and print royalty structures and help you set pricing with intent. You write the next book while we handle the details and protect your returns. Strong kdp book publishing keeps your effort working for you.",
      },
    ],
    expertise: expertise("Round-the-Clock Help from Our Amazon KDP Publishing Team", [
      {
        icon: Headphones,
        t: "Amazon KDP Customer Service",
        d: "Ace Book Publishers stands out for real support. Our team answers your questions and walks you through each step of the process. From formatting to marketing to royalties, our trusted amazon kdp publishing service helps you release your book with calm and confidence.",
      },
      {
        icon: FileEdit,
        t: "KDP Editing Services",
        d: "Our proficient editors turn your draft into a book worth buying. We sharpen clarity, hold consistency, and keep readers engaged from the first page. Then we help you promote it for the widest reach through smart Amazon marketing so it can climb Amazon book ranking charts.",
      },
      {
        icon: Megaphone,
        t: "KDP Marketing Support",
        d: "We guide your book marketing as closely as we guide your publishing. With keyword tuning and smart pricing, we help you grow readers and lift sales. Our know-how in kdp amazon self publishing helps your book cut through a crowded market and reach the people meant to read it.",
      },
      {
        icon: BookOpen,
        t: "Kindle & Print Publishing",
        d: "Our amazon kdp book publishing package brings together expert editing, formatting, cover design, and marketing so your book looks its best. A well written and designed book gives readers a better experience and earns the kind of reviews that draw more people in.",
      },
      {
        icon: Target,
        t: "Global Reader Reach",
        d: "Kdp amazon publishing opens the door to eBooks and paperbacks that reach millions of readers worldwide while specifically targeting your book audience. Our team supports you from manuscript prep through marketing to widen your visibility and pull in new readers.",
      },
      {
        icon: Wand2,
        t: "Automated Publishing Workflow",
        d: "Our experts automate formatting, editing, cover design, and distribution work flow, so your book goes through each phase without skipping any part. Technology shapes your book to Amazon standards, which saves time and sharpens quality while giving it a professional finish readers notice.",
      },
    ]),
    highlights: {
      title: "Ace Book Publishers KDP Customer Service",
      items: [
        {
          title: "Experience Excellent Amazon KDP Publishing Customer Service",
          description:
            "Ace Book Publishers stands out for real support. Our team answers your questions and walks you through each step of the Amazon process making your publishing journey smooth and relaxing. From formatting to marketing to royalties, our trusted kdp self publishing service helps you release your book with calm and confidence.",
        },
        {
          title: "Expert Support, Ready When You Are",
          description:
            "Put your book's potential to work today. With skilled guidance and steady 24/7 support from Ace Book Publishers, KDP success sits one click away. Reach out today.",
        },
        {
          title: "Work With Us to Make Your Book a Bestseller",
          description:
            "Our editors turn your draft into a book worth buying. We sharpen clarity, hold consistency, and keep readers engaged from the first page. Then we help you promote it for the widest reach through smart Amazon marketing. Work with us and make your book a bestseller.",
        },
      ],
    },
    whyUs: {
      heading: "Turn Your Manuscript into a Bestseller with Our KDP Editing Services",
      paragraphs: [
        "Our editing services give your book a polished look by sharpening the words for clarity, improving readability and removing any fluff content that can drag your book down. Then we help you promote it for the widest reach through amazon kindle direct publishing (kdp) support. Work with us and make your book a bestseller.",
        "We help authors reach their dream of publishing a best-selling book. Our Amazon Kindle Direct Publishing services let you focus on writing while we handle the work of getting your book to the readers who want it. Let us promote and grow your book today.",
      ],
    },
    benefits: {
      titleLines: ["Grow Your Reach with Amazon Kindle Direct Publishing (KDP) Services"],
      subtitle:
        "Authors have to grow their readership to make a mark. Ace Book Publishers offers full kdp publishing amazon services that widen your reach and help your book stand out in a busy market. Our knowledge in the field makes self publishing feel clear and steady.",
      items: benefits([
        {
          icon: Globe,
          t: "Global Distribution",
          d: "Amazon kdp self publishing puts your eBooks and paperbacks in front of millions of readers worldwide.",
        },
        {
          icon: Layers,
          t: "Full KDP Package",
          d: "Expert editing, cover design, and formatting that make your book look its best on Kindle and in print.",
        },
        {
          icon: Target,
          t: "Personalized Support",
          d: "We shape our services around you, whether this is your first book or your tenth our support will be the same.",
        },
        {
          icon: Sparkles,
          t: "Marketing Guidance",
          d: "Keyword tuning, promotions, and pricing advice to lift your book's visibility and sales on Amazon.",
        },
      ]),
    },
    maximize: {
      heading: "Automate Your Publishing on Amazon to Top Ranking Charts",
      paragraphs: [
        "Success in publishing takes efficiency in today's market. Ace Book Publishers delivers professional publishing services that simplify the work so you can focus on writing. Our skill with amazon kdp book publishing streamlines and automates the path from manuscript to finished book.",
        "As a leading book publisher on the world's largest marketplace, we know its ins and outs. Our experts automate formatting, editing, cover design, and distribution. Publishing on amazon kdp through our service clears away the slow, tedious tasks of self publishing your own book.",
        "Technology sits at the heart of what we do. With years of working experience in this field, we know how to use advanced tools to shape your book to Amazon standards. Automation saves time and sharpens quality while giving your book a professional finish.",
        "As kdp book publishing experts, we back you with deep support and automation. We give you the resources and clear guidance to make smart release decisions, from keyword choices to book visibility on the platform. You can review and give feedback on everything and we'll fine tune it for you.",
        "Ace Book Publishers helps you automate the whole process with confidence. Our skilled team helps you reach your audience well after launch. Once your book is published you can just sit back and watch your revenues grow while writing your next big book.",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Amazon KDP publisher services",
      consultationNote:
        "Put your book's potential to work today. With skilled guidance and steady support from Ace Book Publishers, your book's success on Kindle sits one click away. Reach out today.",
    },
    faqs: [
      {
        q: "What is KDP Publishing by Amazon?",
        a: "Amazon KDP (Kindle Direct Publishing) lets authors publish eBooks and paperbacks straight to Amazon, reaching millions of readers. It makes self-publishing easy and gives authors full control.",
      },
      {
        q: "Which services do you offer for KDP users?",
        a: "Ace Book Publishers provides manuscript evaluation, professional editing, cover design, formatting, and Amazon KDP marketing techniques. Our purpose is to shorten the publishing process and polish your work for publication.",
      },
      {
        q: "What is the procedure for automation using your services?",
        a: "Advanced software automates formatting and distribution in publication. This saves time and guarantees your book meets Amazon's professional presentation standards.",
      },
      {
        q: "Will I be able to retain my book right?",
        a: "Yes, our Amazon KDP services give you complete rights and royalties. You have full control over your book's marketing and sales.",
      },
      {
        q: "How can Ace Book Publishers market my book?",
        a: "To boost your book's Amazon visibility, we offer keyword optimization, promotional campaigns, and pricing advice. We want your book to reach the appropriate people.",
      },
      {
        q: "What are your publication fees?",
        a: "Pricing depends on the services you need. We offer affordable and flexible packages to meet your publication goals. Contact us for an individualized quote.",
      },
    ],
    faqAsideText:
      "If you have more questions about our Amazon KDP publishing services, customer support, or packages, our team is ready to help you every step of the way.",
  },

  "apple-book-publishing": {
    label: "Apple Book Publishing",
    intro: {
      headingLines: ["Expert Apple Book Publishing Service"],
      paragraphs: [
        "Ace Book Publishers gives you a smooth, no-fuss way to publish your print books and ebooks. We put your work in front of a large, ready-to-buy readership that will generate your increased revenue. Best thing, you keep the rights, royalties, and sole ownership of your book. And you never have to guess from where to start your Apple book publishing journey.",
      ],
    },
    about: {
      image: penDownImg,
      imageAlt: "Professional Apple Book publishing for self-published authors",
      heading: "Professional Apple Book Self Publishing for Every Author",
      paragraphs: [
        "If you are looking for an Apple book publisher that can help you at every stage, from first-timers to seasoned authors, you are at the right place. We use advanced tools to increase your Apple Book's reach worldwide helping independent authors and creators sell more than ever.",
        "Everything Your Book Needs — Proofreading. Creative cover design. Clean interior layout. Professional formatting.",
        "Publish Everywhere Readers Buy — We list your book on KDP, Kobo, Smashwords, the Apple iBook Store, Ingram Spark, Google Books, and more.",
        "Your Book, Your Money — We handle paperback printing and distribution. You keep full ownership of every right and every royalty.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Starting is simple. Fill out a short form and tell us your book idea. We learn your goals first. Then we book a free call to talk through your premise, genre, and needs. This first chat shapes how we build the plan around you.",
      },
      {
        n: "02",
        icon: Search,
        t: "Manuscript Assessment",
        d: "Our writers read your book and take notes with care. We study what you have and show you ways to make it stronger. Your story gets clearer and sharper. Then we map out a plan to bring your full vision to life.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Next, our editors polish every page. We check each sentence for grammar, punctuation, and flow. We go past the small fixes and lift your book's voice and clarity. The story simply reads better than before.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "Presentation matters, so we format your book to a professional standard. We handle indentation, page numbers, and chapter breaks with care. Your book looks sharp in print and on screen which boosts readability and style.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Congratulations. Your ibooks publishing is done and ready to meet its readers. We help you self-publish or take the traditional route. Our team answers your questions at every step, so your book reaches the market with ease.",
      },
    ],
    expertise: expertise("Start Your Apple Book Publishing Journey", [
      {
        icon: Users,
        t: "Get Connected",
        d: "Message us to talk through your project. Our friendly project managers reply fast and answer every question you bring, no matter how small it seems.",
      },
      {
        icon: Search,
        t: "Manuscript Assessment",
        d: "Send us your book and our experts weigh its market fit and readiness. We finalize your front and back matter, and every detail before your book goes live.",
      },
      {
        icon: FileEdit,
        t: "Proofreading and Formatting",
        d: "Our team formats your book to meet Apple Books specs down to the last page. Then our proofreaders comb through it and clear out every error.",
      },
      {
        icon: Palette,
        t: "Book Cover Design",
        d: "Our designers craft unique cover art that captures your book's heart and sets the right mood. A cover that pulls the eye and pulls readers in.",
      },
      {
        icon: Globe,
        t: "Book Publishing",
        d: "We run the whole Apple book publishing process from start to finish. You do nothing but relax while your book gets professionally published, ready to sell.",
      },
      {
        icon: Gem,
        t: "Book Royalties",
        d: "Your effort earns its reward. Payments land in your bank fast, and every royalty comes straight to you. All of it. No cuts, no delays.",
      },
    ]),
    highlights: {
      title: "Publishing A Book On Apple ibooks Is Never Too Late",
      items: [
        {
          title: "All Your Publishing Needs in One Place",
          description:
            "Ace Book Publishers brings every part of ibooks publishing under one roof. One team, one plan, one place to get your book out to the world.",
        },
        {
          title: "Talk to Our Friendly Experts",
          description:
            "Give us a call or start a Live Chat at (212)-784-6769. Our experts will show you how we help you write and publish a book successfully.",
        },
        {
          title: "Achieve Through Publishing",
          description:
            "Our team can turn you into a bestselling author with a single click. Nothing to stress over. We carry the hard part so you can enjoy the win.",
        },
      ],
    },
    whyUs: {
      heading: "Become An Apple Book Publisher Without Delay",
      paragraphs: [
        "Our publishers can help you become a bestselling author with just one click. Ace Book Publishers provides all your book printing needs in one convenient place. So become an Apple book publisher today with our help.",
      ],
    },
    benefits: {
      titleLines: ["Apple Book Publishing for Authors"],
      subtitle:
        "We provide proofreading, creative book cover design, interior layout, professional formatting, multi-platform publishing, paperback printing and distribution, and complete ownership of all rights and royalties.",
      items: benefits([
        {
          icon: BookOpen,
          t: "Multi-Platform Publishing",
          d: "Publish on Apple iBook Store, KDP, Kobo, Smashwords, Ingram Spark, Google Books, and more.",
        },
        {
          icon: Palette,
          t: "Cover & Interior Design",
          d: "Creative book cover design and professional interior layout tailored to your genre and vision.",
        },
        {
          icon: FileEdit,
          t: "Proofreading & Formatting",
          d: "Professional proofreading and formatting so your book meets Apple Books and industry standards.",
        },
        {
          icon: Gem,
          t: "Full Rights & Royalties",
          d: "Complete ownership of all rights and royalties. Your hard work earns the rewards you deserve.",
        },
      ]),
    },
    maximize: {
      heading: "Wait No More And Start Your Success Today!",
      paragraphs: [
        "Feel free to connect with us via phone call. Our friendly experts will explain how we can help you publish your book on Apple Books and beyond.",
        "Just call or start a Live Chat at (212)-784-6769. We're here to help!",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Apple Book publishing consultation",
      consultationNote:
        "Our publishers can help you become a bestselling author with just one click. Connect with us today — call or start a Live Chat at (212)-784-6769.",
    },
    faqs: [
      {
        q: "How can I publish my book with Ace Book Publishers?",
        a: "It's easy just submit your manuscript, pick a package, and work with our team on design, formatting, and distribution. Once every step is done, we publish your book on Apple Books and other stores.",
      },
      {
        q: "How long does publishing a book on apple ibooks take?",
        a: "Most books go live within a few weeks. The exact time depends on length, editing needs, and formatting. We move fast without cutting corners and keep you posted at every stage.",
      },
      {
        q: "Will Apple Books sell my book exclusively?",
        a: "No. You are never locked in. We publish across Apple Books, KDP, Kobo, and more, so your book reaches readers on every platform they already use to buy and read.",
      },
      {
        q: "Does your company market my book after publication?",
        a: "Yes. We help your book find readers once it goes live. From listing details to promotion tips, we work to get your title seen by the people most likely to buy it.",
      },
      {
        q: "What are the manuscript formatting requirements?",
        a: "Send us your draft in Word or a similar file. Our team handles the rest, from spacing to chapter breaks, so your book meets every Apple Books and industry standard with ease.",
      },
      {
        q: "What if I wish to change my published book?",
        a: "You can update your book after it goes live. Send us the changes and our team revises the file and pushes the new version to every store where your book is sold.",
      },
    ],
    faqAsideText:
      "If you have more questions about our Apple Book publishing services, packages, or timelines, our team is ready to help you every step of the way.",
  },

  "barnes-and-noble-publishing": {
    label: "Barnes Publishing",
    intro: {
      headingLines: ["Trusted Barnes and Noble Book Publishing"],
      paragraphs: [
        "Publishing a book is hard but Ace Book Publishers make it easy. Our Barnes and Noble publishing team edits and formats your manuscript until every page reads clean. We proofread with care, catch the flaws you miss, and hand you a book ready for shelves and screens.",
        "Our Barnes and Noble book publishing is fast and professional meeting all your deadlines and following exact platform structure and instructions. Keeping your work SEO based to reach best-selling status is our main goal.",
      ],
    },
    about: {
      image: penDownImg,
      imageAlt: "Barnes and Noble ebook publishing services",
      heading: "Reach More Readers, Sell More Books!",
      paragraphs: [
        "Your story deserves a wide audience. As a Barnes and Noble publisher, we place your title where millions of readers browse and buy every day.",
        "Every new author hits the same wall. The manuscript is ready, but the publishing part feels like a maze. That's where we come in. Ace Book Publishers turns first-time writers into best-selling names.",
        "We aim past your expectations, not just up to them. Our support in barnes and noble self publishing pushes your ebook forward in a crowded market. Start today, and become the author readers remember.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Starting is simple. Fill in a short form with your book idea, then connect with us for a free consultation on your idea, genre, and needs — where we shape the plan around you.",
      },
      {
        n: "02",
        icon: Search,
        t: "Manuscript Assessment",
        d: "Our team of experts study your concept and take notes with care, then create drafts showing you exactly how to sharpen it, so your message lands clear, compelling, and true.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Our editors polish every line for grammar, punctuation, and flow. They sharpen clarity and voice while keeping your style intact, so the book reads smoothly and sounds like you.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "Presentation sells. We format your book to professional standards. That includes indentation, pagination, and chapter breaks, so it looks right in print and digital, increasing readability.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Your book is ready for Barnes and Noble publishing. We prepare it for release and guide you through self-publishing or traditional submission, answering every question to the finish.",
      },
    ],
    expertise: expertise("What Our Barnes and Noble Book Publishing Covers", [
      {
        icon: FileEdit,
        t: "Quality Proofreading",
        d: "Every line gets a careful read. We remove errors, tighten sentences, and hand back a clean, polished book your readers will trust.",
      },
      {
        icon: Layers,
        t: "Professional Formatting",
        d: "Your book meets industry standards on every page. We set the layout for print and digital so it looks sharp wherever it sells.",
      },
      {
        icon: Palette,
        t: "Cover & Interior Design",
        d: "A strong cover earns the first click. Our designers craft the outside and lay out the inside to match the heart of your story.",
      },
      {
        icon: Globe,
        t: "Multi-Platform Publication",
        d: "We list your title across the biggest stores, including KDP, Barnes & Noble, Kobo, Smashwords, Apple iBooks, IngramSpark, and Google Books.",
      },
      {
        icon: BookOpen,
        t: "Print & Paperback Distribution",
        d: "Readers still love paper. We handle printing and paperback distribution so your book reaches shelves and hands far beyond the screen.",
      },
      {
        icon: Gem,
        t: "Full Rights & Royalties",
        d: "The book is yours, start to finish. You keep every right and every royalty, with no strings attached.",
      },
    ]),
    highlights: {
      title: "Self Publishing a Book Barnes and Noble Without Hassle",
      items: [
        {
          title: "Skilled Manuscript Editing",
          description:
            "Turn a rough draft into a book worth reading. Our editors refine clarity, flow, and quality, so every chapter earns its place.",
        },
        {
          title: "Reach Readers Everywhere",
          description:
            "Ready to go wider? Call or start a Live Chat at (212)-784-6769. We're here to help your words find their audience.",
        },
        {
          title: "Reliable Book Proofreading",
          description:
            "We chase perfection line by line. Don't let small mistakes cost you readers. Start with our professional proofreading today.",
        },
      ],
    },
    whyUs: {
      heading: "Flawless Books Through Barnes and Noble Self Publishing",
      paragraphs: [
        "Ace Book Publishers has made its name as a top Barnes and Noble books publisher through our dedication and expertise.",
        "Small errors cost big readers. One typo can pull a reader out of your story and straight into doubt. Our proofreaders read every line to catch what slips past tired eyes, then polish your manuscript until it reads clean and confident.",
        "Refine your book today and reach readers worldwide. Call or start a Live Chat at (212)-784-6769. We're glad to help.",
      ],
    },
    benefits: {
      titleLines: ["Better Books Through Barnes and Noble Publishing"],
      subtitle:
        "Make your rough manuscript a gem. Our skilled editors sharpen your book's clarity, flow, and quality until it reads its best.",
      items: benefits([
        {
          icon: FileEdit,
          t: "Quality Proofreading",
          d: "A careful read that leaves your final book clean and error-free.",
        },
        {
          icon: Layers,
          t: "Professional Formatting",
          d: "Layouts built to industry standards for print and digital.",
        },
        {
          icon: Palette,
          t: "Cover & Interior Design",
          d: "Creative covers and clean interiors that capture your book's spirit.",
        },
        {
          icon: Gem,
          t: "Full Rights & Royalties",
          d: "You own every right and keep every royalty. Always.",
        },
      ]),
    },
    maximize: {
      heading: "Start Your Book Publishing Barnes and Noble Journey Today!",
      paragraphs: [
        "Turn a rough draft into a book people finish. Our skilled editors sharpen your clarity, flow, and quality, then prepare your title for a wide release across the stores readers trust. The right polish is the difference between a book that sits and a book that sells. Call or start a Live Chat at (212)-784-6769.",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Barnes and Noble publishing consultation",
      consultationNote:
        "Request a free consultation today! Our experts will turn your idea into a stunning book perfectly designed for Barnes and Noble reaching your targeted audience at once. Contact Ace Book Publishers now!",
    },
    faqs: [
      {
        q: "What services do you offer for book publishing at Barnes and Noble?",
        a: "We cover the full path to publication. That includes manuscript editing, cover design, print and eBook formatting, distribution across major stores, and hands-on marketing support to help your book find readers.",
      },
      {
        q: "How much time does the book publication process take?",
        a: "Timelines depend on your book's length and the services you choose. Most projects run a few weeks from editing to release. We share a clear schedule upfront, so you always know what comes next.",
      },
      {
        q: "Can I keep my book rights?",
        a: "Yes. You keep full ownership of your rights and every royalty your book earns. We publish on your behalf, but the work stays yours from first draft to final sale, with no hidden claims.",
      },
      {
        q: "What are my book publication costs?",
        a: "Cost depends on the services your book needs, from editing alone to a full publishing package. We quote clear pricing before we start, with no surprise fees added later. Ask us for a free estimate.",
      },
      {
        q: "Can I get book marketing help?",
        a: "Yes. A finished book still needs readers. Our team builds marketing support around your title, from store placement to promotion, so your work reaches the audience it was written for.",
      },
      {
        q: "Why choose Ace Book Publishers?",
        a: "We treat every book like our own. You get expert editors, sharp designers, and honest guidance at each step, plus placement in the stores readers browse most. Your success is how we measure ours.",
      },
    ],
    faqAsideText:
      "If you have more questions about our Barnes and Noble ebook publishing services, packages, or timelines, our team is ready to help you every step of the way.",
  },

  "kobo-book-publishing": {
    label: "Kobo Book Publishing",
    intro: {
      headingLines: [
        "All-Inclusive Kobo Self Publishing Services",
        "For Kobo Books & Ebooks",
      ],
      paragraphs: [
        "Ace Book Publishers is a trusted publishing house that works across every genre, format, and platform. Our team has helped thousands of writers become published authors.",
        "We make kobo books self publishing quick and simple, from your first draft to your first sale. Aspiring writers come to us and walk away as recognized Kobo authors, with a book they are proud to put their name on.",
      ],
    },
    about: {
      image: penDownImg,
      imageAlt: "Kobo comprehensive book publishing services",
      heading: "Kobo Book Publishing Services For Every Author",
      paragraphs: [
        "Our team has helped thousands of fiction and nonfiction new and old writers become published authors. We are home to seasoned writing experts who know nearly every field. We promise a quick, easy path to self publishing kobo books, and aspiring authors leave as recognized Kobo names.",
        "Experts Who Know Every Platform — Our publishing agents understand the fine details of each platform, so your book gets top quality and service you can count on. Fiction, autobiography, or a commercial title, we match your project with an agent who fits your needs.",
        "On Time, Every Time — Good work and punctuality have earned us a spot among the top publishing firms. We take in every request, build a clear plan, and deliver it inside the time we promise.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Starting is simple. Fill out a short form and tell us your book idea. We learn your goals first. Then we book a free call to talk through your premise, genre, and needs. This first chat shapes how we build the plan around you.",
      },
      {
        n: "02",
        icon: Search,
        t: "Manuscript Assessment",
        d: "Our writers read your book, outline, or notes with care. We study what you have and show you ways to make it stronger. Your story gets clearer and sharper. Then we map out a plan to bring your full vision to life.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Next, our editors polish every page. We check each sentence for grammar, punctuation, and flow. We go past the small fixes and lift your book's voice and clarity. The story simply reads better than ever.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "Presentation matters, so we format your book to a professional standard. We handle indentation, page numbers, and chapter breaks with care. Your book looks sharp in print and on screen which boosts readability across platforms.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Congratulations, your Kobo book publishing is done and ready to meet its readers. We help you self-publish or take the traditional route. Our team answers your questions at every step, so your book reaches the market with ease.",
      },
    ],
    expertise: expertise("Start Your Kobo Book Publishing Journey", [
      {
        icon: Users,
        t: "Get Connected",
        d: "Message us to talk through your project. Our friendly project managers reply fast and answer every question you bring, no matter how small it seems.",
      },
      {
        icon: Search,
        t: "Manuscript Assessment",
        d: "Send us your book and our experts weigh its market fit and readiness. We finalize your front matter, back matter, and every detail before your book goes live on Kobo.",
      },
      {
        icon: FileEdit,
        t: "Proofreading and Formatting",
        d: "Our team formats your book to meet Kobo specs down to the last page. Then our proofreaders comb through it and clear out every error, big or small.",
      },
      {
        icon: Palette,
        t: "Book Cover Design",
        d: "Our designers craft cover art that captures your book's heart and sets the right mood. A cover that pulls the eye and pulls readers in.",
      },
      {
        icon: Globe,
        t: "Book Publishing",
        d: "We run the whole publishing process from start to finish. You do nothing until your book sits on the shelf, ready for readers to buy.",
      },
      {
        icon: Gem,
        t: "Book Royalties",
        d: "Your effort earns its reward. Payments land in your bank fast, and every royalty comes straight to you. All of it. No cuts, no delays.",
      },
    ]),
    highlights: {
      title: "Self Publishing Kobo Books Made Easy!",
      items: [
        {
          title: "All Your Book Printing Needs in One Place",
          description:
            "Ace Book Publishers brings every part of kobo publishing under one roof. One team, one plan, one place to get your book printed.",
        },
        {
          title: "Talk to Our Helpful Professionals",
          description:
            "Call or start a Live Chat at (212)-784-6769. Our helpful team will walk you through your book writing project and show you what comes next.",
        },
        {
          title: "Achieve Through Publishing",
          description:
            "Our team can turn you into a bestselling author with a single click. Nothing to stress over. We carry the hard part so you get to enjoy the reward at the end.",
        },
      ],
    },
    whyUs: {
      heading: "Become a Published Kobo Author",
      paragraphs: [
        "Our publishers can help you become a bestselling author with just one click. So don't worry, Ace Book Publishers provides all your book printing needs in one convenient place. Kobo Book Publishing was never this easy!",
      ],
    },
    benefits: {
      titleLines: ["Trustworthy Kobo Book Publishing Services"],
      subtitle:
        "Our team of skilled book publishing agents is well-versed in the complexities of different publishing platforms, ensuring exceptional quality and unmatched service for Kobo authors.",
      items: benefits([
        {
          icon: BookOpen,
          t: "Kobo Digital Publishing",
          d: "Publish your books in digital format on Kobo for global distribution and readership.",
        },
        {
          icon: Palette,
          t: "Cover Design & Formatting",
          d: "Professional cover design and formatting so your book looks optimal on the Kobo platform.",
        },
        {
          icon: Layers,
          t: "Multiple Formats",
          d: "Your book will be available in multiple formats, from digital format to printed one.",
        },
        {
          icon: Megaphone,
          t: "Kobo Marketing Support",
          d: "After publishing on Kobo, we offer marketing ideas, promotional possibilities, and advice on how to boost sales and visibility.",
        },
      ]),
    },
    maximize: {
      heading: "Wait No More And Start Kobo Self Publishing Now!",
      paragraphs: [
        "Still having a hard time deciding? To resolve any doubts, why not give us a chance to guide you on your journey of Kobo publishing. Trust us, it's easy and affordable!",
        "Just call or start a Live Chat at (212)-784-6769. We're here to help!",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Kobo book publishing consultation",
      consultationNote:
        "Our publishers can help you become a bestselling author with just one click. Connect with us today — call or start a Live Chat at (212)-784-6769.",
    },
    faqs: [
      {
        q: "What does the Kobo Book Publishing Service include?",
        a: "We publish your book in digital format on Kobo for global reach. The service covers editing, formatting, cover design, and distribution, so your title is ready for readers around the world.",
      },
      {
        q: "How do I start the Kobo book publishing project?",
        a: "Fill out our short form and tell us about your book. We set up a free call to go over your goals, then build a plan around them. From there, our team takes the work off your hands.",
      },
      {
        q: "What types of books can you publish on Kobo?",
        a: "We publish nearly every kind, from novels and memoirs to poetry and business titles. Fiction or nonfiction, short or long, our team matches the right approach to your book.",
      },
      {
        q: "What does a kobo book publishing service cost?",
        a: "Cost depends on your book's length and the services you pick. We give you a clear quote before any work starts, with no hidden fees and no surprises later on.",
      },
      {
        q: "What other formats can you publish my book in?",
        a: "Alongside Kobo digital, we can prepare your book in print and other ebook formats. This puts your title on more shelves and in front of more readers who buy in different ways.",
      },
      {
        q: "Do you offer marketing to promote my book on Kobo?",
        a: "Yes. Once your book is live, we share marketing ideas, promotion options, and tips to lift your sales and visibility. We help your title get seen by the right readers.",
      },
    ],
    faqAsideText:
      "If you have more questions about our Kobo book publishing services, packages, or timelines, our team is ready to help you every step of the way.",
  },

  "book-marketing": {
    label: "Book Marketing",
    intro: {
      headingLines: ["Sell More Copies With Book Marketing Services That Work Wonders"],
      paragraphs: [
        "Most books do not fail because they are bad. They fail because no one hears about them but unlike other book marketing companies, Ace Book Publishers changes that. We are a book marketing agency built around one job: putting your title in front of readers who will actually buy it. Our book marketing experts run focused social media campaigns, sharpen your Amazon listing, and write copy people want to read. Every plan is shaped around your book, your genre, and your goals, so nothing gets wasted. First novel or fifth backlist title, the aim stays the same. More readers. More reviews. More sales. Most importantly more revenue. Work with a team that treats your book like it matters, because to you it does.",
      ],
    },
    about: {
      image: bookMarketingImg,
      imageAlt: "Amazon book marketing services for self-published authors",
      heading: "Turn Your Self-Published Book Into A Bestseller",
      paragraphs: [
        "Want your book to sell out fast? Ace Book Publishers offers self publishing book marketing that gets real results. Marketing a book feels hard without expertise. Our team takes that weight off your shoulders and puts your title where readers can find it.",
        "We handle the full picture. Targeted promotions, press coverage in print and online, honest reviews, and advertising that pulls its weight. Proven methods lift your sales, widen your reach, and give your book a real shot at a global audience.",
        "Our ebook marketing, sharp promotional copy, and Amazon listing tune-ups make sure your book gets noticed instead of getting buried. Come work with the best book marketing services around and watch your sales climb from a quiet start to a strong finish.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Marketing Consultation",
        d: "Our team sits down with you first to learn your goals. From there we map out a marketing plan built for your title, not a template pulled off a shelf. We pin down exactly who your readers are and choose the smartest ways to reach them. This is book marketing for authors who want a plan that fits, not guesswork.",
      },
      {
        n: "02",
        icon: Megaphone,
        t: "Social Media Marketing",
        d: "Readers live on Facebook, Instagram, and X, so that is where your book needs to be. Ace Book Publishers builds social campaigns that pull people in with strong visuals, sharp writing, and posts worth stopping for. We keep your audience engaged and curious, turning quiet scrolls into clicks, comments, and sales.",
      },
      {
        n: "03",
        icon: FileText,
        t: "Content Publication",
        d: "Good content keeps your book in front of readers long after launch day. Ace Book Publishers places your material where it counts, across websites, social channels, and email newsletters. We reach the right people through targeted social posts and email outreach, lifting your book's visibility for potential readers.",
      },
      {
        n: "04",
        icon: Star,
        t: "Book Promotion",
        d: "Ace Book Publishers promotes your book across every channel that fits your story. Virtual launch events, book signings, social campaigns, influencer partnerships. We use each one to put your title in the spotlight and keep it there, so more readers find their next favorite book in yours.",
      },
      {
        n: "05",
        icon: Globe,
        t: "Your Very Own Website",
        d: "A sharp author website earns readers' trust and helps them find you. Ace Book Publishers designs custom sites that match your voice, your genre, and your style. We also tune each one for search engines, so new readers land on your page and stay.",
      },
      {
        n: "06",
        icon: Wand2,
        t: "Interactive Flipbook Features",
        d: "Give readers something they can play with. Ace Book Publishers' interactive flipbook lets people turn pages, zoom into text and images, and tap into embedded video, audio clips, and links. It turns a simple read into an experience worth sharing.",
      },
      {
        n: "07",
        icon: Sparkles,
        t: "Dynamic Flip Book Trailer",
        d: "A book trailer gives readers a reason to look twice. Ace Book Publishers creates dynamic flipbook trailers that make promotion feel fun instead of forced. Share yours across social media and marketing sites to spark interest, pull in new readers, and keep the buzz around your book alive.",
      },
      {
        n: "08",
        icon: Briefcase,
        t: "Custom Goods",
        d: "Ace Book Publishers helps authors build a brand that reaches past the page. We craft branded books, learning products, stationery, clothing, and accessories that carry your style and connect with the readers who love your work.",
      },
      {
        n: "09",
        icon: Target,
        t: "Social Monitoring And Reporting",
        d: "Numbers tell you what is working. Ace Book Publishers tracks your book's marketing with detailed social analytics, showing you how each campaign performs. We use that insight to fine-tune your approach and deepen the connection between your book and its readers.",
      },
    ],
    expertise: expertise("Grow Your Sales With Expert Amazon Book Marketing Services", [
      {
        icon: Target,
        t: "Amazon Listing Optimization",
        d: "We manage every part of your Amazon presence, from listing setup to a description that sells, so your book stands out where readers are already shopping.",
      },
      {
        icon: Megaphone,
        t: "Amazon Ads And Promotion",
        d: "We run Amazon Ads and smart promotions that put your book in front of eager readers and turn their attention into steady, lasting sales.",
      },
      {
        icon: Lightbulb,
        t: "Market Research Strategy",
        d: "We study market trends and reader habits, then shape a marketing plan built around your goals and the readers you want to reach.",
      },
      {
        icon: Globe,
        t: "Global Book Impact",
        d: "We use proven methods to lift your sales, spread the word, and carry your book to readers well beyond your home market.",
      },
      {
        icon: Star,
        t: "Reviews And Press Coverage",
        d: "Our full service covers targeted promotions, print and online press, honest reviews, and advertising that helps your book earn real attention.",
      },
      {
        icon: Gem,
        t: "Affordable Custom Packages",
        d: "Our affordable book marketing services come with clear pricing and packages you can shape to fit, so every dollar you spend works as hard as you do.",
      },
    ]),
    highlights: {
      title: "Grow Your Book Sales With A Trusted Book Marketing Agency",
      items: [
        {
          title: "A Book Marketing Company Authors Trust",
          description:
            "Trying to lift your book sales on your own? The right partner changes everything. Ace Book Publishers offers full book marketing services that help you find readers and get noticed. As a leading book marketing company, we know the walls authors run into when promoting their work, and we know how to get past them. So let us fix that.",
        },
        {
          title: "Reach The Right Readers On Every Platform",
          description:
            "Our book marketing experts build a plan around the exact readers your book needs. We place your title on the platforms that matter most, from social feeds to paid ads that convert. Smart self publishing book marketing on Amazon sharpens your visibility and drives the sales that follow.",
        },
        {
          title: "Marketing Built On What Works Now",
          description:
            "Ace Book Publishers draws on the methods that top book marketing companies rely on. Our team tracks fresh trends and proven tactics to keep your book moving online while others stall. Take charge of your book's future. With the right team behind it, your work can win in a crowded market.",
        },
      ],
    },
    whyUs: {
      heading: "See What Amazon Book Marketing Can Do For Your Book",
      paragraphs: [
        "Want to promote and sell your book on the biggest online store there is? Ace Book Publishers delivers standout Amazon marketing for authors like you. We know how to make your book rise above the noise, reach the readers who want it, and give your title its best shot at real success on the platform.",
        "Marketing a book on Amazon gets complicated fast. That is where we come in. Our team uses proven tactics to widen your book's reach and pull readers in. Team up with us and see what sharp marketing can do. Let us push your book forward in Amazon's crowded market and help it find the readers it was written for.",
      ],
    },
    benefits: {
      titleLines: ["Lift Your Book Sales With The Best Book Marketing Services"],
      subtitle:
        "Ace Book Publishers shape the best book marketing services around your book. Focused social ads, clean SEO, sharp copy, and proven methods that carry your title to the readers you want.",
      items: benefits([
        {
          icon: Megaphone,
          t: "Social Media Advertising",
          d: "Focused social ads and campaigns that pull readers in and build real, lasting relationships with your audience.",
        },
        {
          icon: Search,
          t: "SEO And Listing Optimization",
          d: "Clean SEO and a tuned Amazon listing, so your book gets the attention it deserves.",
        },
        {
          icon: Target,
          t: "Targeted Promotions",
          d: "Focused promotions, press coverage, honest reviews, and advertising that pushes your sales higher.",
        },
        {
          icon: Headphones,
          t: "Always Here 24/7",
          d: "Reach out anytime. We are ready to help with whatever your book needs, day or night, no waiting.",
        },
      ]),
    },
    maximize: {
      heading: "Reach Us Anytime. We Are Here 24/7",
      paragraphs: [
        "We are ready to help with whatever your book needs, any hour of any day.",
        "Team up with Ace Book Publishers today, honor the work you put in, and watch your book sales climb from a quiet start to a strong finish.",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Book marketing consultation",
      consultationNote:
        "Still thinking? Reach out to us today and get yourself a free consultation. We are here around the clock to help with every part of your book marketing. Don't hesitate!",
    },
    faqs: [
      {
        q: "How long until I see results?",
        a: "Timelines shift by campaign type, but most authors start seeing movement four to six weeks after launch. Steady growth builds from there.",
      },
      {
        q: "What book promotion services do you offer?",
        a: "We cover social media promotion, book reviews, press releases, book trailer videos, and online advertising, all aimed at lifting your sales and reaching more readers.",
      },
      {
        q: "Do you have affordable marketing prices?",
        a: "Yes we do, we have different packages available to choose from. We will guide you which package is best for your very book.",
      },
      {
        q: "Do you tailor strategies for each author?",
        a: "Yes. We build every marketing plan around your book's genre, audience, and goals. Our team works closely with authors to bring out what makes each title stand apart.",
      },
      {
        q: "Can you promote my book on Amazon and Goodreads?",
        a: "Absolutely. We sharpen your listings, gather honest reviews, and run ads on both Amazon and Goodreads to lift your book's visibility.",
      },
      {
        q: "What promotional content do you create?",
        a: "We write book blurbs, author bios, social posts, newsletters, and polished visuals, each one shaped to catch your target readers and move them toward buying your book.",
      },
    ],
    faqAsideText:
      "If you're still curious about our book marketing services or want help planning a launch, our team is here to answer your questions.",
  },

  "book-editing": {
    label: "Book Editing",
    intro: {
      headingLines: ["Get The Best Book Editing Services For Your Book!"],
      paragraphs: [
        "Ace Book Publishers is a trusted book editing company that pays close attention to every line of your manuscript. Our professional book editors refine your writing so well that it increases overall readability and focus of your readers. We offer skilled book editors for hire, ready to shape your story and prepare it for print. Our fiction book editors sharpen plot, pacing, and voice until your book is ready to publish.",
      ],
    },
    about: {
      image: writerPortrait,
      imageAlt: "Professional book editing services",
      heading: "Professional Book Editing Services That Brings Out Perfection",
      paragraphs: [
        "Ace Book Publishers offers affordable book editing services you can rely on. Our trained editors correct errors, tighten your prose, and prepare your manuscript for publication. You write with confidence while your reader turns pages without losing focus.",
        "We provide substantial editing that strengthens structure and flow with clean grammar and punctuation throughout. Our professional book editing team takes a close look at plot gaps and loose ends and carefully rewrites while protecting and sharpening your voice.",
        "Choose Ace Book Publishers for the best book editing services online.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Getting started is simple. Fill out a short form and tell us about your book. We use this first step to understand what you want your story to do. Once your form is in, we set up a free consultation to talk through your premise, genre, and any special needs so your book gets an editing plan built around it.",
      },
      {
        n: "02",
        icon: Search,
        t: "Manuscript Assessment",
        d: "Our professional book editors then read your full manuscript while taking notes with extra care. We study what you have written and point out clear ways to make it stronger. From there, our team maps out a detailed plan to bring your vision to the page in a way readers will follow.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Once done with assessment, our editors start checking every sentence for grammar, punctuation, and syntax. We go past the mechanics too, improving the voice, clarity, and rhythm of your book. The result is a story that moves smoothly and connects with readers, while your own style and tone stay intact.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "Presentation matters, so we set your text to a professional standard. Our team formats your book with care, handling indentation, pagination, and chapter breaks. This stage lifts readability and gets your manuscript ready for self-publishing whether print or ebook without a hitch.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Your book is now ready to meet its readers. Whether you self publish or choose our advanced publishing services, we help you choose the right path. Our team answers your questions all the way through, so your book reaches the marketplace smoothly.",
      },
    ],
    expertise: expertise("Budget Friendly Book Editing And Formatting Services", [
      {
        icon: Search,
        t: "Proofreading for Perfect Writing",
        d: "Our proofreading catches the errors others miss and leaves you with clean, professional text that readers respect.",
      },
      {
        icon: FileEdit,
        t: "Line Editing for Clarity and Flow",
        d: "Our line editing improves clarity, flow, and consistency. We read every sentence closely to lift your manuscript's readability and impact.",
      },
      {
        icon: FileText,
        t: "Copyediting for Style & Grammar",
        d: "Our copyediting sharpens style, grammar, and punctuation. We cut tangled phrasing and raise readability, so your book reads well and stands ready to publish.",
      },
      {
        icon: Layers,
        t: "Substantial Editing",
        d: "Substantial editing strengthens structure and flow. We examine plot weaknesses and loose ends so your story holds firm from first page to last.",
      },
      {
        icon: PenLine,
        t: "Rewrite & Voice Improvement",
        d: "We rewrite and paraphrase to lift your voice, so your manuscript reads with clarity, consistency, and the style that is yours alone.",
      },
      {
        icon: BookOpen,
        t: "Amazon-Ready Formatting",
        d: "Our editors prepare your manuscript to meet every formatting and quality standard for Kindle or paperback publication.",
      },
    ]),
    highlights: {
      title: "Affordable Book Editors And Formatters In One Place",
      items: [
        {
          title: "Complete Book Editing and Formatting",
          description:
            "Ace Book Publishers offers full book editing and formatting services. Our skilled editors improve clarity, structure, and language across fiction and non-fiction. We bring the best out of every page so your book can stand tall. Our book editing services cover the whole manuscript.",
        },
        {
          title: "Amazon Book Editing Services",
          description:
            "Our Amazon book editing service makes sure your manuscript meets every formatting and quality standard for a clean publication. We prepare your Kindle or paperback book to look its best on the page.",
        },
        {
          title: "Affordable Online Book Editing",
          description:
            "Ace Book Publishers offers strong book editing services online. Our editors work with you to improve your manuscript at a fair price. You get sharp results without the high cost, thanks to our cheap book editing services and affordable book editors.",
        },
      ],
    },
    whyUs: {
      heading: "Get Proficient Editing Done Today!",
      paragraphs: [
        "Ace Book Publishers have a team of specialized editors for every genre, whether you want children's book editors or fiction book editors, we have you covered. So start your journey toward becoming a best-selling author today and get in touch.",
        "Sharpen Your Manuscript With Ace Book Publishers!",
      ],
    },
    benefits: {
      titleLines: ["Get Expert Book Editing On Any Genre"],
      subtitle:
        "Unlike other book editing companies, you can trust us to provide book editing services for many genres, like children's book editing services, fiction, and non fiction with key features like:",
      items: benefits([
        {
          icon: Layers,
          t: "Structure & Flow",
          d: "Substantial editing that strengthens structure and flow.",
        },
        {
          icon: FileEdit,
          t: "Grammar & Punctuation",
          d: "Clean grammar and punctuation for polished, publishable prose.",
        },
        {
          icon: Search,
          t: "Plot Review",
          d: "A close look at plot weaknesses and loose ends to strengthen your story.",
        },
        {
          icon: Gem,
          t: "Full Editing Support",
          d: "Formatted manuscripts, professionally organized text, and full support from edit to publication.",
        },
      ]),
    },
    maximize: {
      heading: "Become a Best Selling Author Through Ace Book Publishers",
      paragraphs: [
        "Ace Book Publishers turns your ideas into books worth reading. Our experts guide you toward a standout book at every step. Start your journey toward becoming a best-selling author today and get in touch.",
        "Ace Book Publishers gives you the best book editing services in the USA.",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Book editing consultation",
      consultationNote:
        "Start your journey toward becoming a best-selling author today and get in touch. Our professional book editors are ready to polish your manuscript.",
    },
    faqs: [
      {
        q: "Do you edit children's books?",
        a: "Yes. Our children's book editors handle rhythm, reading level, and word choice with care, so your story fits its young readers and keeps them turning pages.",
      },
      {
        q: "Which book editing services do you offer?",
        a: "We offer copy editing, line editing, proofreading, and manuscript formatting, along with book marketing and publishing support.",
      },
      {
        q: "Do you offer book editing services for Amazon?",
        a: "Yes. Our Amazon book editing services prepare your manuscript to meet every Kindle and paperback standard, so your book is formatted, clean, and ready for a smooth release.",
      },
      {
        q: "How much do your editing services cost?",
        a: "Our affordable book editing services are priced by manuscript length and the depth of editing you need. Tell us about your book and we will send you a clear quote at a fair rate.",
      },
      {
        q: "How can I hire Ace Book Publishers for my project?",
        a: "Fill out our short online form or book a free consultation. We review your manuscript, discuss your goals, and match you with the book editors for hire best suited to your genre.",
      },
    ],
    faqAsideText:
      "If you have more questions about our book editing services, Amazon editing, or packages, our team is happy to help.",
  },

  "book-cover-design": {
    label: "Book Cover Design",
    intro: {
      headingLines: ["Win Readers With Our Book Cover Designs"],
      paragraphs: [
        "Give your book, main character energy with our professional book cover design services. First impressions make or break book potential. Our designers create custom artwork that fits your genre requirement.",
        "Partner with us to design a book cover that captivates readers and keeps them coming back.",
      ],
    },
    about: {
      image: bookCoverImg,
      imageAlt: "Unique book cover designs by experts",
      heading: "Showcase Your Story With Our Custom Book Cover",
      paragraphs: [
        "Your book cover is key to turning browsers into readers. It sets the tone, shows the genre, and tells if your book is worth their time. Our custom book cover design services connect your story to your audience with visuals that highlight your themes and boost discoverability.",
        "Get professional, genre-specific covers that compete with top releases. Files ready for Kindle, print, and audiobooks. Hand-drawn cover illustration. Includes 3D mockups and social media graphics to boost your launch.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "First Meeting",
        d: "We start with consultation and questionnaires to discuss your book cover special requirements. We assign designers that fit your genre.",
      },
      {
        n: "02",
        icon: PenLine,
        t: "Sketches & Samples",
        d: "Our team starts sketching and designing your front and back book cover. You can select your preferred design from multiple samples.",
      },
      {
        n: "03",
        icon: Palette,
        t: "Final Cover",
        d: "We design the final book cover and ask for your feedback before formatting. You make changes and revise in this stage.",
      },
      {
        n: "04",
        icon: Send,
        t: "Formatting and Publishing",
        d: "Our team start formatting your book cover files for multiple retailers and publish it.",
      },
    ],
    expertise: expertise("Why Refresh Your Book With Our Cover Design", [
      {
        icon: Sparkles,
        t: "Visually Appealing Designs",
        d: "Update old visuals using captivating, genre-specific artwork that gets the right audience attention.",
      },
      {
        icon: Award,
        t: "Genre-Specific Expertise",
        d: "Fiction, nonfiction, children book, christian book—our team has profound design skills that make your story the centre of the spotlight.",
      },
      {
        icon: SlidersHorizontal,
        t: "Customized Redesign Process",
        d: "Work with a designer that will match not only your story of the novel but also your audience's perception.",
      },
      {
        icon: Users,
        t: "Seamless Collaboration",
        d: "Benefit from transparent communication and feedback loops during the development stage right up to handing you the final file.",
      },
      {
        icon: Gem,
        t: "Budget-Friendly Upgrades",
        d: "Give your backlist a professional facelift with our affordable book cover design services without sacrificing studio quality.",
      },
      {
        icon: Shield,
        t: "100% Rights & Ownership",
        d: "You are the sole owner of new designs in every format - print, ebook or audiobook.",
      },
    ]),
    highlights: {
      title: "Explore Our Cover Design Portfolio",
      items: [
        {
          title: "Explore Our Cover Design Portfolio",
          description:
            "Take a look at our latest published projects. We are committed to converting the essence of your story into a piece of art that is reader-friendly.",
        },
        {
          title: "Creative Book Covers to Make Your Book Unique",
          description:
            "Work with our expert team to design an awesome and professional cover that is just the right fit for your publication.",
        },
        {
          title: "Precision Design",
          description:
            "Kindle thumbnails, full print-ready wrappers and audiobook square art—We create a cover in every format and make it discoverable.",
        },
      ],
    },
    whyUs: {
      heading: "Get Artisan Christian Book Cover Design Services",
      paragraphs: [
        "We believe a Christian book cover carries a special responsibility: it must honor your message and reflect spiritual depth.",
        "Church Resource Cover Design — We help design an eye-catching, clean and meaningful cover for various church publications like sermon collections, Bible study guides, discipleship resources, ministry handbooks etc.",
        "Book Series Cover Design — Bible study anthologies, Christian fiction or teaching series, we design consistent visual identity across all books to build a strong brand presence for the author.",
      ],
    },
    benefits: {
      titleLines: ["Explore Our Diverse Book Cover Design Services Online"],
      subtitle:
        "We know the importance of an engaging cover to attract people and make your book unique. Our creative covers make a lasting impression on readers.",
      items: benefits([
        {
          icon: BookOpen,
          t: "Printed Books",
          d: "We have curated a collection of printed books showcasing various genres and creative cover designs.",
        },
        {
          icon: Layers,
          t: "Photo Albums",
          d: "Discover a fantastic world of creativity and adventure in a diverse comic book collection.",
        },
        {
          icon: Sparkles,
          t: "Comic Books",
          d: "Our online book cover design services include comic book illustrations full of creativity and adventure.",
        },
        {
          icon: FileText,
          t: "Magazines, Yearbooks & Ebooks",
          d: "Magazines with engaging layouts, personalized yearbooks, and a digital library of ebooks with captivating covers — available anytime, anywhere.",
        },
      ]),
    },
    maximize: {
      heading: "Your One-Stop Illustration Book Cover Design Services",
      paragraphs: [
        "Our team believes readers judge books by their covers every single second. So why not give them a cover they can't look away from. We promised to provide top book cover design services with hand drawn illustrations accessible for every author.",
        "Children's Book Illustration — We provide front, back and full spread illustrations for your cover that is warm-hearted, imaginative, and engaging.",
        "Character Illustration — Based on your descriptions, our team will develop expressive figures so that your readers will immediately identify with your characters.",
        "Educational Book Illustration — Transform the difficult and boring subject material into the fun and approachable one with our best book cover design services.",
      ],
      image: bookCoverImg,
      imageAlt: "Creative book cover design examples",
      consultationNote:
        "Are you ready to become the Next Best-Selling Author? Contact us at info@acebookpublishers.com or (212)-784-6769. We're excited to bring your vision to life!",
    },
    faqs: [
      {
        q: "What information do I need to provide before starting a project?",
        a: "We start with a questionnaire where you can answer specific queries related to your book genre, target audience, or example covers you love.",
      },
      {
        q: "Can I order an illustrated cover if my manuscript isn't finished yet?",
        a: "Yes! We can start working on the main illustration, character design, and eBook layout while your manuscript is in editing.",
      },
      {
        q: "How far in advance should I book my cover design service?",
        a: "We recommend booking your cover design 4 to 8 weeks before your planned release or pre-order launch date. This allows ample time for concept sketches, color rendering, feedback revisions, and final print formatting.",
      },
      {
        q: "How many rounds of revisions are included?",
        a: "We provide 2 to 3 rounds of revisions during both the sketch stage and the final color stage. We make sure you are completely confident in the artwork before finalizing the files.",
      },
      {
        q: "Do you design hardcover jackets and dust jackets?",
        a: "Yes–we format files for case laminate hardcovers as well as traditional dust jackets with custom flap copy formatting.",
      },
      {
        q: "Who owns the copyright to the final cover design and illustration?",
        a: "You can own the copyrights to the final cover art for your book, eBook, audiobook, and related promotional materials after full service payment.",
      },
    ],
    faqAsideText:
      "If you have more questions about our book cover design process, revisions, or file delivery, our team is ready to help.",
  },

  "childrens-book": {
    label: "Children's Book Publishing",
    intro: {
      headingLines: ["Choose The Best Children's Book Publishers"],
      paragraphs: [
        "As professional children's book publishers, Ace Book Publishers shape your idea into a story that sticks. Our team handles storytelling, illustration, formatting, and marketing under one roof.",
        "First-time writers and seasoned authors both find a home here. We are among the best children's book publishers, with the people and skill to see your book through.",
        "Quality Guaranteed — We are one of the top children's book publishers who help authors write stories kids remember. As kids book publishers, we bring your idea to life with warm tales and bright pictures. If you want a smooth, honest publishing experience, you have found your children's book publishing company you can trust for quality and proficiency.",
        "Authors choose us because we treat each book as its own project. We help you find your readers and grow in a crowded market.",
        "Work with us and see why so many authors return. We are the partner that makes children's book publishing feel simple, clear, and worth every step.",
      ],
    },
    about: {
      image: pictureBooksImg,
      imageAlt: "Publishing a children's book on Amazon",
      heading: "Sell More Copies With Our Children's Book Publishing Services",
      paragraphs: [
        "Ready to reach more young readers and sell more books? Ace Book Publishers makes self publishing a children's book on Amazon simple and successful. As an established children's book publisher, we design books that catch the eye and hold their place on a busy Amazon page.",
        "Clean And Attractive Book — Our children's book publishing services are built around what authors actually need. That means sharp editing, bright drawings, clean formatting, and a cover that earns the click. We know what makes kids lean in and what makes parents buy.",
        "SEO Based Book Publishing — We help you publish by writing a description that sells, picking the right categories, and choosing keywords Amazon rewards. Our aim is simple. We want your book to find its readers and keep finding them.",
        "Unforgettable Book — At Ace Book Publishers, children's book publishing is what we do best. Every piece, from the first sketch to the final print, is handled with care, because we can make self publishing children's books easier for you.",
        "Reach Wider Audience — Beyond publishing, we help you reach a wider audience. We build Amazon ad campaigns and use every promotion the platform offers to lift your book higher. So start self-publishing a children's book today with our help.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Getting started is easy. Fill out a short form and tell us your book idea. This first step is how we learn what you want. Once your form is in, we set up a free call to talk through your book's premise, genre, and any special needs.",
      },
      {
        n: "02",
        icon: Search,
        t: "Manuscript Assessment",
        d: "Our writers read your book and take notes carefully. We study what you have and point out where it can grow stronger. Then we lay out a plan to reach your vision in a way that pulls readers in from the start.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Once your manuscript takes shape, our editors go to work. Every line is checked for grammar, punctuation, and rhythm. But we do more than fix errors. We sharpen your book's voice, clarity, and flow.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "We format your text to a clean, professional standard because looks matters. That covers indentation, page numbers, and chapter breaks. Your book will look right in print and on screen. This step lifts readability and success rate.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Here it is. Your manuscript is ready to meet the world. Whether you self-publish or go the traditional route, we walk with you. Our team answers your questions and stays close through the whole process.",
      },
    ],
    expertise: expertise("Expert Book Services Across Every Children's Genre", [
      {
        icon: Sparkles,
        t: "Stories of Adventure",
        d: "Adventure stories carry kids off to strange and thrilling places. They follow brave characters who meet trouble and come out wiser. These books wake up a child's imagination and turn reading into something they chase.",
      },
      {
        icon: Wand2,
        t: "Fantasy Books",
        d: "Fantasy opens the door to worlds where anything can happen. Magical creatures, enchanted lands, and bold heroes push children to dream past what they thought was possible.",
      },
      {
        icon: Search,
        t: "Mystery Books",
        d: "Kids love to chase a secret and crack a puzzle beside a favorite character. Mystery books sharpen thinking and attention through clever plots and turns they never see coming.",
      },
      {
        icon: Lightbulb,
        t: "Books on Education",
        d: "Learning and fun belong together. These books make science, history, language, and math feel like play, with lively activities and pictures that pull kids in and keep them there.",
      },
      {
        icon: Palette,
        t: "Picture Books",
        d: "Picture books draw kids into stories with bold art and simple words. They often carry a quiet lesson, teaching friendship, kindness, and courage without ever sounding like a lecture.",
      },
      {
        icon: Heart,
        t: "Fairy Tales Books",
        d: "Fairy tales mix magic, morals, and adventure to hold a child close. Mythic figures, brave quests, and good against evil teach kindness, courage, and the strength to keep going.",
      },
    ]),
    highlights: {
      title: "Best Children's Book Publishers For New Authors Are Here!",
      items: [
        {
          title: "Complete Children's Book Publishing",
          description:
            "Ace Book Publishers turn your first idea into a kids treasure. From early manuscript to polished edit, we ready your tale for young eyes. Our artists work beside you to bring your characters and settings to life on the page. And we stay with you until the book is truly done.",
        },
        {
          title: "Self-Publish Children's Books With Ease",
          description:
            "Self-publishing a children's book can feel heavy, but our proficiency makes it light. We prepare your kids book for print and digital shelves alike. We also guide your marketing, so your book reaches every reader it can.",
        },
        {
          title: "From Concept to Print",
          description:
            "At Ace Book Publishers, every story deserves to be told well. Poetic, factual, or full of adventure, we are ready to help you self publish children's book projects now. Reach out and watch your book come alive.",
        },
      ],
    },
    whyUs: {
      heading: "Self Publishing a Children's Book Is Easier With Us",
      paragraphs: [
        "Ready for the adventure of self publishing a children's book? Reach out to Ace Book Publishers, bring your ideas to life, and step into the author's chair. Our experts guide you through children's book self publishing at every turn, so you never feel lost.",
        "From a manuscript that grips to art that dazzles, we tailor our help to your book. We format, distribute, and market, so you reach the readers waiting for you. We have the skill to self publish children's book titles in digital or print.",
        "For self publishing children book projects, Ace Book Publishers is the partner you can lean on. Our custom services let you shape your vision while keeping full control of it. Start building a self-published book that earns its place today.",
      ],
    },
    benefits: {
      titleLines: ["Sales Skyrocket With Ace Book Publishers"],
      subtitle:
        "Ace Book Publishers ranks among the best children's book publishing companies for work that is reliable and priced fairly. We handle editing, illustration, design, and marketing, all under one roof. One team, one standard, start to finish.",
      items: benefits([
        {
          icon: FileEdit,
          t: "Editing & Illustration",
          d: "Expert editing and stunning illustrations that bring your characters and settings to life.",
        },
        {
          icon: Palette,
          t: "Design & Formatting",
          d: "Visually appealing layouts that engage and resonate with youngsters.",
        },
        {
          icon: Globe,
          t: "Wide Distribution",
          d: "Our large distribution network helps get your book to eager readers worldwide.",
        },
        {
          icon: Megaphone,
          t: "Amazon Marketing",
          d: "Amazon advertising campaigns and promotional features to boost visibility and sales.",
        },
      ]),
    },
    maximize: {
      heading: "Turn Your Idea Into a Real Book Today!",
      paragraphs: [
        "Will you finally turn those stories into a book kids will hold? Ace Book Publishers makes publishing a children's book easy from the very first day. From idea to finished title, with us here, you can just relax and let your book earn more revenue.",
        "Let us help you publish your own children's book today. Start with Ace Book Publishers, one of the most trusted childrens book publishing companies around. You get personal support at every step. You could be a published author sooner than you think.",
      ],
      image: pictureBooksImg,
      imageAlt: "Children's book publishing consultation",
      consultationNote:
        "Put your book's potential to work today. With skilled guidance and steady support from Ace Book Publishers, your book's success is just one click away. Reach out today.",
    },
    faqs: [
      {
        q: "What services do you offer for children's book publishing?",
        a: "Ace Book Publishers handles it all. We edit your manuscript, create illustrations, format the pages, design the cover, publish the book, and market it.",
      },
      {
        q: "How do I publish my children's book?",
        a: "Start with a short form telling us your idea. We set up a free call, then map out a plan. From there we edit, illustrate, format, and publish for you. As one of the top children's book publishers, we make each step simple for you.",
      },
      {
        q: "Can you help with my children's book illustrations?",
        a: "Yes. Our artists create bright, original art that fits your story and your characters. Good pictures are half of any kids book, so we treat them with real care. As experienced kids book publishers, we make sure every image pulls young readers deeper in.",
      },
      {
        q: "What formats do you publish children's books in?",
        a: "We publish in both print and digital. Your book can reach readers as a paperback, a hardcover, or an ebook, whatever suits your goals. Our children's book publishing services prepare each format to a clean, professional standard.",
      },
      {
        q: "How long does children's book publishing take?",
        a: "Timing depends on your book's length and how much help it needs. A simple picture book moves faster than a longer story. Once we see your manuscript, we give you a clear schedule.",
      },
      {
        q: "Will I keep book rights after publication?",
        a: "Yes. You keep full rights to your book, start to finish. We help you publish, but the work stays yours. That is the honest way we run self publishing a children's book, so you stay in control of your story and any earnings it brings.",
      },
    ],
    faqAsideText:
      "If you have more questions about children's book publishing, illustrations, or timelines, our team is here to help.",
  },

  "christian-book": {
    label: "Christian Book Publishing",
    intro: {
      headingLines: ["Top Christian Book Publishers In Town!"],
      subheading: "Publish Your Faith. Be Read by the World.",
      paragraphs: [
        "Your story can move thousands — if the right people help you tell it. Ace Book Publishers ranks among the top Christian book publishers in the USA, guiding new writers into print and into readers' hearts.",
        "What working with us gives you: A dedicated team of Christian literature experts with you from first idea to finished manuscript. A completed Christian book shaped around your distinctive voice crafted by the best Christian book publishers. A proven path to your targeted audience, backed by a record other christian book publishers rarely match.",
      ],
    },
    about: {
      image: penDownImg,
      imageAlt: "Christian book publishing company services",
      heading: "Reach a Wider Audience With Our Christian Book Publishing Company",
      paragraphs: [
        "Want the world to hear your message? Ace Book Publishers delivers expert christian book publishing that carries your words further. As a leading christian book publishing company, we craft persuasive, faith-grounded writing that speaks straight to the readers you want.",
        "We walk with you at every step, from the first concept to the finished book. Among self publishing Christian books companies, we know your choice of publisher decides everything, so we work to earn that trust.",
        "Your voice stays yours. Our tailored approach guards your message while holding it to the highest standard. We handle ghostwriting, editing, formatting, and distribution — refining your manuscript to compete and win in a crowded Christian market.",
        "Years of experience in publishing a christian book stand behind every project. Our team manages the process so you can do the one thing only you can: tell your story and change lives. We exist to lift up voices that inspire and strengthen faith.",
        "Talk to us today. See how our christian book publishing services can make your message stand out and reach readers worldwide. Together we'll spread your experience and grow your influence across the Christian community.",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "Sign Up",
        d: "Starting is simple. Fill in a short form with your book idea, then connect with us for a free consultation on your idea, genre, and needs — where we shape the plan around you.",
      },
      {
        n: "02",
        icon: Search,
        t: "Manuscript Assessment",
        d: "Our team of experts study your concept and take notes with care, then create drafts showing you exactly how to sharpen it, so your message lands clear, compelling, and true.",
      },
      {
        n: "03",
        icon: FileEdit,
        t: "Editing and Proofreading",
        d: "Our editors polish every line for grammar, punctuation, and flow. They sharpen clarity and voice while keeping your style intact, so the book reads smoothly and sounds like you.",
      },
      {
        n: "04",
        icon: Layers,
        t: "Formatting",
        d: "Presentation sells. We format your book to professional standards. That includes indentation, pagination, and chapter breaks, so it looks right in print and digital, increasing readability.",
      },
      {
        n: "05",
        icon: Send,
        t: "Final Delivery",
        d: "Your book is ready to meet the world. We prepare it for release and guide you through self-publishing or traditional submission, answering every question to the finish.",
      },
    ],
    expertise: expertise("Expert Christian Children's Book Publishers", [
      {
        icon: Heart,
        t: "Faith-Based Children's Stories",
        d: "As trusted christian childrens book publishers, we understand what faith-based storybooks need, helping writers create moving, inspiring books that reach young readers.",
      },
      {
        icon: BookOpen,
        t: "Picture & Chapter Books",
        d: "Whether it's a chapter book on biblical truth or a picture book on kindness, we make sure every project matches the author's vision and message.",
      },
      {
        icon: Palette,
        t: "Editors & Illustrators",
        d: "Editors, illustrators, formatting artists, and expert ghostwriters all are part of Ace Book Publishers' complete christian book publishing services.",
      },
      {
        icon: Lightbulb,
        t: "Imagination & Empathy",
        d: "A story that holds a young reader's attention needs imagination, empathy, and real knowledge of child development — the very things we bring to every project.",
      },
      {
        icon: Megaphone,
        t: "Marketing & Distribution",
        d: "As respected christian children book publishers, we help with distribution and marketing built to reach young readers, parents, and educators.",
      },
      {
        icon: Sparkles,
        t: "Faith & Love for God",
        d: "We succeed as christian children's book publishers by creating content that grows children's faith and love for God, in your own writing style.",
      },
    ]),
    highlights: {
      title: "Best Book Publishing Services For Christian Authors",
      items: [
        {
          title: "A Special Approach for Faith-Based Kids' Books",
          description:
            "Faith-based books for children ask for a special touch. We specialize in christian book publishing services that bring your message of hope, love, and faith to life. Years of experience make us your trusted partner.",
        },
        {
          title: "Full Concept-to-Format Support",
          description:
            "Whether you're self publishing christian books or want us to publish for you, our writers, editors, and illustrators deliver concept, structure, editing, illustration, and formatting, all true to your faith.",
        },
        {
          title: "Marketing That Reaches Families",
          description:
            "We make Christian book self-publishing simple with clear advice and real solutions, plus the marketing and distribution to put your book in front of the families who need it.",
        },
      ],
    },
    whyUs: {
      heading: "Why Choose Our Christian Book Publishing Services?",
      paragraphs: [
        "We are among top christian book publishers in the industry, inspiring, educating, and entertaining kids for years. Our experts understand faith-based literature for children and offer comprehensive solutions to turn your work into an engaging and meaningful book.",
        "Our competence in traditional and self publishing a christian book is a major benefit of working with us. We believe in letting authors pick the publication path that fits their ideas and aspirations. If you are looking for the best Christian book publishers, we are here to provide top-notch services including editing, formatting, cover design, and distribution.",
        "Ace Book Publishers will help you achieve bestseller status with your next book so reach us today to spread your inspiring message and encourage the future generations!",
      ],
    },
    benefits: {
      titleLines: ["Put Your Faith In Our Christian Book Publishing Services"],
      subtitle:
        "Written a powerful faith-based story? Bring it to Ace Book Publishers. Our skill and our standards turn your work into a book children and families will treasure.",
      items: benefits([
        {
          icon: Heart,
          t: "Christian Principles",
          d: "We work with authors who want to share Christian principles through storytelling.",
        },
        {
          icon: FileEdit,
          t: "Editing & Illustration",
          d: "Professional editing, cover design, and illustration that make your book stand out to young readers.",
        },
        {
          icon: SlidersHorizontal,
          t: "Self or Traditional",
          d: "We help with publishing a christian book independently or traditionally, with support at every step.",
        },
        {
          icon: Gem,
          t: "Faith, Hope & Love",
          d: "We help your story reach its readers and carry faith, hope, and love.",
        },
      ]),
    },
    maximize: {
      heading: "Affordable Christian Book Publishing Services",
      paragraphs: [
        "Publishing a Christian book has never been easier before and with such affordable rates that will surely make your publishing journey smooth and simple while turning your idea into a stunning book.",
        "Learn how our specialized services can help you create your next bestseller. Get in touch with us today to get a quotation that you won't be able to turn down.",
      ],
      image: maximizeInfluenceImg,
      imageAlt: "Christian children's book publishing consultation",
      consultationNote:
        "Request a free consultation today! Our experts will turn your idea into a stunning Christian book for your targeted audience. Contact Ace Book Publishers now.",
    },
    faqs: [
      {
        q: "What categories of kids' literature does Ace Book Publishers focus on?",
        a: "Ace Book Publishers publishes Christian picture books, early readers, chapter books, and middle-grade novels, along with most other faith-based formats. If the idea fits a growing child's heart, we can help you publish it.",
      },
      {
        q: "Can I pick between self-publishing and traditional publishing?",
        a: "Yes. You choose the path that fits your goals. Whether you prefer self publishing christian books or a traditional route, we guide you through both and help you decide what serves your message best.",
      },
      {
        q: "What types of services are included in the publishing process?",
        a: "Everything from concept to finished book: ghostwriting, editing, proofreading, formatting, cover design, illustration, and distribution. Our christian book publishing services cover each stage, so nothing is left to chance.",
      },
      {
        q: "How long does book publishing take?",
        a: "It depends on length, format, and how much writing support you need. After your free consultation, we give you a clear, realistic timeline before any work begins.",
      },
      {
        q: "Do your books have marketing support?",
        a: "Yes. We help your book reach readers with marketing and distribution built for parents, educators, and young audiences, so your faith message finds the families it was written for.",
      },
      {
        q: "How do I start publishing my children's book?",
        a: "Simple. Send a short online form with your idea and book a free consultation. From there, we map out every step of publishing a christian book your readers will love.",
      },
    ],
    faqAsideText:
      "If you have more questions about Christian book publishing or how we can support your project, reach out anytime.",
  },

  "audiobook": {
    label: "Audiobook Book Publishing",
    intro: {
      headingLines: ["Reboot Your Book in Audio"],
      paragraphs: [
        "Make your story more accessible with our audiobook publishing services. Wake up backlist sales, reach audiences who prefer listening over reading, and open entirely new revenue streams across platforms like Audible and Apple Books.",
        "Grow your audience with our talented team across today's most popular listening platforms.",
      ],
    },
    about: {
      image: audiobookImg,
      imageAlt: "Audiobook production illustration",
      heading: "Work With Studio-Grade Audiobook Publisher",
      paragraphs: [
        "The audiobook market continues to grow and listeners demand high quality and natural voices. Independent authors struggle with technical specs, voice casting, and production costs.",
        "What we do is provide you a studio with expert voice actors for your story and a platform that can market it to the right listeners, all in affordable packages.",
        "Expert voice casting. Studio-quality audio. Custom effects for select fiction titles. Upload and distribute on Audible, and more. Metadata optimization.",
        "Amplify your book now with us!",
      ],
    },
    procedureSteps: [
      {
        n: "01",
        icon: Users,
        t: "First Meeting",
        d: "We start with a questionnaire or a short interview to know your audiobook requirements.",
      },
      {
        n: "02",
        icon: Search,
        t: "Discussion & Planning",
        d: "We discuss your story pace and style. We provide sample voice actors recordings for you to select the best that fits your book.",
      },
      {
        n: "03",
        icon: Mic,
        t: "Studio Recording",
        d: "We start recording page by page and ask for your feedback to approve for further continuation.",
      },
      {
        n: "04",
        icon: Headphones,
        t: "Editing and Cinematic Sound",
        d: "We start editing your audiobook and add cinematic effects with subtle sound.",
      },
      {
        n: "05",
        icon: Send,
        t: "Review & Final Delivery",
        d: "You listen to your audiobook and after approval we publish it on Audible, Apple Books, and more.",
      },
    ],
    expertise: expertise("Get Professional Amazon Audiobook Publishing Services", [
      {
        icon: Shield,
        t: "Amazon ACX & Audible Standards",
        d: "We strictly comply with Amazon guidelines like loudness, peak limit and the noise floor.",
      },
      {
        icon: Mic,
        t: "Voice Matching",
        d: "Our skilled voice actors comply with Amazon's human-narration rules.",
      },
      {
        icon: Headphones,
        t: "Audio Editing",
        d: "Our engineers clean up background noises to keep the sound uninterrupted.",
      },
      {
        icon: FileEdit,
        t: "File formatting",
        d: "High-quality MP3 files, add credits, and make a 1-5 mins audio sample for Amazon.",
      },
      {
        icon: BookOpen,
        t: "Amazon & Whispersync Setup",
        d: "We manage metadata and sync it with your Kindle ebook.",
      },
      {
        icon: Users,
        t: "Multi-Voice Projects",
        d: "Casting and production for titles that benefit from multiple narrators.",
      },
    ]),
    highlights: {
      title: "How Amazon Self Publishing Audiobook Benefits You",
      items: [
        {
          title: "A growing audience",
          description:
            "Listeners consume books during commutes, workouts and daily routines — audiobooks open a channel print alone can't reach.",
        },
        {
          title: "Professional sound quality",
          description:
            "Studio production ensures your audiobook sounds polished and competitive on every major platform.",
        },
        {
          title: "End-to-end support",
          description:
            "We handle narration coordination, production and delivery so you don't have to navigate the technical maze alone.",
        },
      ],
    },
    whyUs: {
      heading: "Why Produce Your Audiobook With Us",
      paragraphs: [
        "With an explosion of audiobooks entering the market every day, the biggest obstacle is not production but finding ways to get your audiobook noticed.",
        "We provide well-crafted metadata, optimizing keywords for the platform, reviews, and a smart marketing strategy to reach global listeners.",
      ],
    },
    benefits: {
      titleLines: ["What's Included in Our Self Publishing", "Audiobook Services"],
      subtitle:
        "We pair narration talent with professional production so your audiobook sounds as compelling as it reads.",
      items: benefits([
        { icon: Mic, t: "Expert Narration", d: "Voice talent selected to match your book's tone and genre." },
        { icon: Headphones, t: "Studio Quality", d: "Recording, editing and mastering to professional standards." },
        { icon: SlidersHorizontal, t: "Flexible Production", d: "Options for single-narrator and multi-voice projects." },
        { icon: Gem, t: "Platform-Ready Files", d: "Deliverables prepared for major audiobook distribution channels." },
      ]),
    },
    maximize: {
      heading: "Share Spiritual Messages With Our Christian Audiobook Publishing",
      paragraphs: [
        "Christian authors, pastors, and leaders can rely on us to transform their writings into motivating, high quality audiobooks that align with their message.",
        "We provide distribution service across global Christian networks, retail, and libraries. Your Christian audiobook publishing will link with Kindle and Whispersync to help it reach your audience.",
      ],
      image: audiobookImg,
      imageAlt: "Audiobook production",
      consultationNote:
        "Spaces are filling fast. Book a complimentary consultation and an audiobook specialist will reach out within 24 hours.",
    },
    faqs: [
      {
        q: "Can you produce an audiobook from my existing book?",
        a: "Yes — we can adapt published or unpublished manuscripts into professionally narrated audiobooks.",
      },
      {
        q: "How long will it take you to produce an audiobook?",
        a: "We can produce audiobooks in between 4 to 8 weeks. If your book is 10,000 words then 1 hour audiobook will take 2 weeks. A complex novel will take weeks.",
      },
      {
        q: "Is my book a good fit for an audiobook format?",
        a: "Almost all genres support audio, especially fiction, memoirs, self help, business, and Christian/inspirational books. We even guide on which page readers can find the charts or complex tables for non fiction.",
      },
      {
        q: "Can I sell my audiobook directly on my own website?",
        a: "Yes, if you choose non-exclusive distribution, you can sell MP3s directly to your audience using platforms like Shopify, Payhip, or BookFunnel.",
      },
      {
        q: "What is Amazon Whispersync, and how does it benefit me?",
        a: "Whispersync syncs your Kindle ebook and audiobook together. It allows readers to switch seamlessly between reading and listening, boosting your book's visibility on Amazon.",
      },
    ],
    faqAsideText:
      "If you are aiming to make your audiobook a close competitor with major publisher Audiobooks launched on Audible and Spotify without a doubt Ace Book Publishers service is what you should go for.",
  },
};

export function getServiceDetailContent(slug: ServiceSlug): ServiceDetailContent {
  return serviceDetailContent[slug];
}

export const serviceMetaDescriptions: Record<ServiceSlug, string> = {
  ghostwriting:
    "Have a book idea? Get the Best Ghostwriting Services and Hire a Ghostwriter to turn your ideas into a polished manuscript while preserving your voice.",
  "book-publishing":
    "Ready to publish your book? Get professional book publishing services and expert guidance to self publish a book from manuscript to publication.",
  "kdp-publishing":
    "Publish your book on Amazon with professional KDP Book Publishing services. Get expert guidance through Amazon Kindle Direct Publishing from start to launch.",
  "apple-book-publishing":
    "Apple Book publishing for self-published authors including editing, formatting, cover design, multi-platform distribution, and royalties support.",
  "barnes-and-noble-publishing":
    "Barnes and Noble ebook publishing services including editing, formatting, proofreading, cover design, multi-platform distribution, and royalties support.",
  "kobo-book-publishing":
    "Kobo book publishing services including formatting, cover design, Kobo account setup, digital and print formats, and marketing support.",
  "book-marketing":
    "Ready to reach more readers? Get professional Book Marketing Services from a book marketing agency with strategies designed to promote your book effectively.",
  "book-editing":
    "Polish your manuscript with professional book editors. Get Best Book Editing Services for clear, engaging, publication-ready writing that reflects your voice.",
  "book-cover-design":
    "Make your book stand out with professional book cover design services. Get a Custom Book Cover created to match your story, genre, audience, and vision.",
  "childrens-book":
    "Have a children's book idea? Get professional children's book services and expert publishing support from the Best Children's Book Publishers.",
  "christian-book":
    "Looking for Top Christian Book Publishers? Choose a Christian Book Publishing Company for professional support with editing, design, publishing, and marketing.",
  "audiobook":
    "Expand your book into audio with professional audiobook publishing services. An experienced Audiobook Publisher can guide you through production and publication.",
};
