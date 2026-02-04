import Image from "next/image";
import Button from "../components/Button";

export default function page() {
  return (
    <>
      {/* Project Intro Section */}
      <section className="bg-white py-20 px-8 min-h-screen text-black">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto items-center">
          {/* Left side images */}
          <div className="col-span-3 flex flex-col gap-4">
            <div className="col-span-3 flex flex-col gap-4">
              {" "}
              {/* המעטפת הכללית של כל הבלוק */}
              {/* דוגמה לזוג אחד - תחזור על זה עבור כל נתון */}
              <div className="flex flex-col gap-1">
                <p className="label">role</p>
                <p className="title-sm text-black">UI Design & Illustration</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="label">Course</p>
                <p className="title-sm text-black">"Your Cart is Empty" - Digital Product Illustration</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="label">Year</p>
                <p className="title-sm text-black">2025 (4th year, parallel to graduation project)</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="label">Duration</p>
              <p className="title-sm text-black">1 month</p>
            </div>
            {/* אפשר להוסיף תמונות כאן */}
          </div>

          {/* Center - Title, Image, Description */}
          <div className="col-span-6 flex flex-col items-center text-center gap-1">
            <span
              className="text-[3rem] text-left"
              style={{ fontFamily: "var(--font-reenie-beanie)" }}
            >
              A Guide to Proper Etiquette in the
            </span>

            <span
              className="text-black  text-[8.75rem] tracking-[-0.1em]"
              style={{ fontFamily: "var(--font-dokdo)" }}
            >
              Men's Toilet
            </span>
            <Button>Enter Site</Button>
            <p className="body text-black text-left">
              A fictional dating app where matching happens over shared watch
              lists, not gym selfies. Illustrated UI concept exploring what
              happens when comfort replaces performance.
            </p>
          </div>

          {/* Right side images */}
          <div className="col-span-3 flex flex-col gap-0">
            <Image
              src="/images/pajama1.svg"
              alt="Project preview"
              width={600}
              height={600}
              className=""
            />
            <Image
              src="/images/pajama2.svg"
              alt="Project preview"
              width={400}
              height={600}
              className=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
