import { ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { FeatureCard } from "./feature-card";
import { CollegeArt, HeroScene, SchoolArt, SportsArt } from "./illustrations";

const FEATURES = [
  { art: <SchoolArt className="size-8" />, title: "School Management", description: "Students, Teachers, Attendance, Fees" },
  { art: <CollegeArt className="size-8" />, title: "College Management", description: "Courses, Exams, Results, LMS" },
  { art: <SportsArt className="size-8" />, title: "Sports Management", description: "Players, Coaches, Teams, Tournaments" },
];

export function BrandPanel() {
  return (
    <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#0b1640] via-[#1e2a78] to-[#4338ca] lg:flex lg:flex-col">
      {/* decorative layers */}
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -left-24 -top-24 size-80 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col px-10 py-9 xl:px-14">
        <Logo tone="light" />

        <div className="mt-10 max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100">
            <Sparkles className="size-3.5 text-amber-300" /> Trusted by 1,200+ institutions across India
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white xl:text-[2.75rem]">
            Manage Learning.
            <br />
            <span className="bg-gradient-to-r from-indigo-200 via-sky-200 to-amber-200 bg-clip-text text-transparent">
              Empower Growth.
            </span>
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-indigo-100/80">
            One powerful platform to manage schools, colleges and sports academies.
          </p>
        </div>

        <div className="my-8">
          <HeroScene />
        </div>

        <div className="grid max-w-lg gap-2.5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-8 text-xs text-indigo-200/70">
          <ShieldCheck className="size-4" />
          ISO 27001 aligned · Data hosted in India · © 2026 EduSphere
        </div>
      </div>
    </section>
  );
}
