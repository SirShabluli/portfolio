"use client";
import Image from "next/image";
import PageGrid from "../components/PageGrid";

export default function PagmarPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background photo — swap src when ready */}
        <div className="absolute inset-0 z-0">
          {/* <Image src="/images/pagmar/hero-bg.jpg" alt="" fill className="object-cover" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <PageGrid className="relative z-10 gap-8 w-full px-6 lg:px-12 pb-20 lg:pb-28">
          {/* Main title placeholder */}
          <div className="lg:col-start-4 col-span-4 lg:col-span-8">
            <h1 className="text-[4rem] lg:text-8xl font-bold leading-[1.2] tracking-tight">
              I'll Think About it Later
            </h1>
          </div>
          {/* Smaller title */}
          <div className="col-span-4 lg:col-start-4 lg:col-span-12 mt-32 lg:mt-0">
            <p className="text-xs lg:text-2xl font-medium tracking-widest uppercase opacity-50 mb-4">
              A new AI integrated journaling experience
            </p>
          </div>

          {/* Description + Metadata stacked */}
          <div className="col-span-4 lg:col-span-8 lg:col-start-4 mt-4 lg:mt-8 flex flex-col gap-6">
            <p className="text-sm lg:text-base  font-medium opacity-80 leading-relaxed max-w-lg">
              A system that transforms how you write — spatially, emotionally,
              guided by questions that help you go deeper. Your thoughts become
              an explorable 3D world, revealing patterns and connections you
              couldn't see before.
            </p>
            <div className="flex flex-wrap gap-6 lg:gap-10">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Role
                </p>
                <p className="text-sm font-medium">UX/UI Design, Development</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Course
                </p>
                <p className="text-sm font-medium">Final Project</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Year
                </p>
                <p className="text-sm font-medium">2025</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50">
                  Duration
                </p>
                <p className="text-sm font-medium">3 months</p>
              </div>
            </div>
          </div>
        </PageGrid>
      </section>
    </main>
  );
}
