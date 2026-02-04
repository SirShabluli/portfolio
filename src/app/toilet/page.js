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
                <p className="text-sm text-black">UI Design & Illustration</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="label">Course</p>
                <p className="text-sm text-black">
                  "Your Cart is Empty" - Digital Product Illustration
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="label">Year</p>
                <p className="text-sm text-black">
                  2025 (4th year, parallel to graduation project)
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="label">Duration</p>
              <p className="text-sm text-black">1 month</p>
            </div>
            {/* אפשר להוסיף תמונות כאן */}
          </div>

          {/* Center - Title, Image, Description */}
          <div className="col-span-6 flex flex-col items-center text-center gap-1">
            <span
              className="text-5xl"
              style={{ fontFamily: "var(--font-reenie-beanie)" }}
            >
              A Guide to Proper Etiquette in the
            </span>
            <h1
              className="text-black text-display tracking-[-0.1em] -mt-5"
              style={{ fontFamily: "var(--font-dokdo)" }}
            >
              Men's Toilet
            </h1>
            <Button size="medium">Visit Site</Button>
            <h3 className="text-2xl font-medium text-left">
              What if Netflix decided to create a dating app?
            </h3>
            <p className="body text-black text-left">
              A fictional dating app where matching happens over shared watch
              lists, not gym selfies. Illustrated UI concept exploring what
              happens when comfort replaces performance.
            </p>
          </div>

          {/* Right side images */}
          <div className="col-span-3 flex flex-col gap-0">
            <Image
              src="/images/netflix-dating/pajama1.svg"
              alt="Project preview"
              width={600}
              height={600}
              className=""
            />
            <Image
              src="/images/netflix-dating/pajama2.svg"
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
