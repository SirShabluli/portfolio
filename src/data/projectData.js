export const catProjectSteps = [
  {
    id: 1,
    title: "Starting Simple",
    description: "Throwing a prompt at AI to see what sticks.",
    image: "/images/catFrame1.png",
    subCaption:
      "Sleepy tabby cat on a couch, paws hanging down, warm evening light, cozy illustrated style",
    quotes: [],
    animation: { in: "none", out: "fadeout" },
  },
  {
    id: 2,
    title: "Adding the Twist",
    description:
      "Using the AI output as a base, adding a new layer. Giving it a fun twist.",
    image: "/images/catFrame2.png",
    subCaption: "cat with halloween mask of a fish",
    quotes: [],
  },
  {
    id: 3,
    title: "Hand Takes Over",
    description: "Using the AI result as a base for hand-drawn outlines.",
    image: "/images/catFrame3.png",
    subCaption: "", // כאן בדרך כלל אין כיתוב כי התמונה מדברת בעד עצמה
    quotes: [],
  },
  {
    id: 4,
    title: "Making It Mine",
    description: "Removing the AI layer, illustrating freely in my own style.",
    image: "/images/catFrame4.svg",
    imageClassName: "p-10 border-none shadow-none",
    subCaption: "",
    quotes: [
      {
        text: "One shalt make me a sticker",
        author: "Everyone (16th Century)",
      },
      { text: "It should appear in more places of the app", author: "Teacher" },
      { text: "I have to work on my final project", author: "Me" },
    ],
  },
];

// Typography data for Netflix project
export const netflixTypography = {
  fonts: [
    {
      id: 1,
      name: "Netflix Sans",
      weight: "300",
      weightName: "Light",
      fontFamily: "var(--font-netflix)",
      description: "Official Netflix font, light weight for subtle elegance",
    },
    {
      id: 2,
      name: "Netflix Sans",
      weight: "500",
      weightName: "Medium",
      fontFamily: "var(--font-netflix)",
      description:
        "Official Netflix font, medium weight for balanced readability",
    },
  ],
};

export const netflixColors = [
  {
    id: 1,
    name: "Dark Grey",
    hex: "#333333",
    description: "Primary background",
    textColor: "white",
  },
  {
    id: 2,
    name: "White",
    hex: "#FFFFFF",
    description: "Basic contrast",
    textColor: "black",
  },
  {
    id: 3,
    name: "Netflix Red",
    hex: "#E41E26",
    description: "Brand primary",
    textColor: "white",
  },
  {
    id: 4,
    name: "Netflix Dark red",
    hex: "#710F11",
    description: "Brand primary",
    textColor: "white",
  },
  {
    id: 5,
    name: "Beige",
    hex: "#E4C384",
    description: "Complementary accent with warmth undertones",
    textColor: "white",
  },
  {
    id: 6,
    name: "Golden Beige",
    hex: "#FFD628",
    description: "Unique feeling of luxury and warmth",
    textColor: "black",
  },
];
