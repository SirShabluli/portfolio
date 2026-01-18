import PhoneShowcase from "../components/PhoneShowcase";

export default function page() {
  return (
    <main>
      {/* סקשן 1: תהליך ה-AI (4 שלבים) */}
      <AIProcessSection data={catProjectSteps} />

      {/* סקשן 2: הצגת המוצר (הטלפון המסתובב) */}
      <PhoneShowcase />
    </main>
  );
}
