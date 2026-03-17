// רשימת הפונטים המרכזית
export const FONTS = {
  HEBREW_MONO: "/fonts/Masada-Bold.otf",
  HEBREW_TITLE: "/fonts/Masada-Bold.otf",
  SYSTEM: "/fonts/NarkissYairMono-Regular.otf",
  INPUT: "/fonts/Masada-Book.otf",
  ENGLISH_TITLE: "/fonts/Masada-Bold.otf",
  ENGLISH_INPUT: "/fonts/Masada-book.otf",
  // fallbacks
  FALLBACK_MONO: "monospace",
  FALLBACK_SANS: "Arial, sans-serif",
};

// זיהוי שפה אוטומטי לפי תווים
const detectLanguage = (text) => {
  if (!text) return "hebrew";
  const hebrewChars = (text.match(/[\u0590-\u05FF]/g) || []).length;
  const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
  return englishChars > hebrewChars ? "english" : "hebrew";
};

// פונקציית עזר לבחירת פונט
export const getFont = (type, useHebrewFonts = true, text = "") => {
  if (!useHebrewFonts) {
    return type === "mono" ? FONTS.FALLBACK_MONO : FONTS.FALLBACK_SANS;
  }

  const language = detectLanguage(text);
  const isEnglish = language === "english";

  switch (type) {
    case "server-medium":
      return FONTS.HEBREW_MONO;
    case "system":
      return FONTS.SYSTEM;
    case "hebrew-title":
      return isEnglish ? FONTS.ENGLISH_TITLE : FONTS.HEBREW_TITLE;
    case "typing":
      return isEnglish ? FONTS.ENGLISH_INPUT : FONTS.INPUT;
    default:
      return FONTS.FALLBACK_MONO;
  }
};
