import PhoneShowcase from "../components/PhoneShowcase";

export default function page() {
  // הגדרות של כל סקשן
  const sections = [
    { xPosition: 0, rotation: 0, screenIndex: 0 },
    { xPosition: -25, rotation: Math.PI * 0.15, screenIndex: 1 },
    { xPosition: 0, rotation: Math.PI * 0, screenIndex: 2 },
  ];

  return (
    <main>
      {/* סקשן 1: תהליך ה-AI (4 שלבים) */}
      {/* <AIProcessSection data={catProjectSteps} /> */}

      {/* סקשן 2: הצגת המוצר (הטלפון המסתובב) */}
      <PhoneShowcase sections={sections}>
        <section className="section-1">
          <div className="min-h-screen flex items-center justify-center text-white">
            <h2>Section 1 - תוכן כאן</h2>
          </div>
        </section>

        <section className="section-2">
          <div className="min-h-screen flex items-center justify-center text-white">
            <h2>Section 2 - תוכן כאן</h2>
          </div>
        </section>

        <section className="section-3">
          <div className="min-h-screen flex items-center justify-center text-white">
            <h2>Section 3 - תוכן כאן</h2>
          </div>
        </section>
      </PhoneShowcase>
    </main>
  );
}
