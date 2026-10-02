import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import ChatWithUsButton from "@/components/ChatWithUsButton";

export default function CtaBanner() {
  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-1/2 h-1/2 bg-cream-deep" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-brand p-8 md:p-10">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <h3 className="section-title text-white">Ready to Begin?</h3>
            <div>
              <p className="text-sm text-white/90">Start Your Journey to Becoming a Best-Selling Author Today!</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/contact-us" className="btn-white">Contact Us <ArrowUpRight className="h-4 w-4" /></Link>
                <ChatWithUsButton className="btn-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
