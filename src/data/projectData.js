export const catProjectSteps = [
  {
    id: 1,
    title: "Starting Simple",
    description: "Throwing a prompt at AI to see what sticks.",
    image: "/images/netflix-dating/catFrame1.png",
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
    image: "/images/netflix-dating/catFrame2.png",
    subCaption: "cat with halloween mask of a fish",
    quotes: [],
  },
  {
    id: 3,
    title: "Hand Takes Over",
    description: "Using the AI result as a base for hand-drawn outlines.",
    image: "/images/netflix-dating/catFrame3.png",
    subCaption: "", // כאן בדרך כלל אין כיתוב כי התמונה מדברת בעד עצמה
    quotes: [],
  },
  {
    id: 4,
    title: "Making It Mine",
    description: "Removing the AI layer, illustrating freely in my own style.",
    image: "/images/netflix-dating/catFrame4.svg",
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

export const vegasTypography = {
  fonts: [
    {
      id: 1,
      name: "Montserrat",
      weight: "700",
      weightName: "Bold",
      fontFamily: "var(--font-montserrat)",
      description: "Strong and confident, used for headlines and key moments",
    },
    {
      id: 2,
      name: "Montserrat",
      weight: "500",
      weightName: "Medium",
      fontFamily: "var(--font-montserrat)",
      description: "Clean and readable, used for body text and UI elements",
    },
  ],
};

export const vegasLightColors = [
  {
    id: 1,
    name: "Black",
    hex: "#000000",
    description: "Primary text",
    textColor: "white",
  },
  {
    id: 2,
    name: "White",
    hex: "#FFFFFF",
    description: "Background",
    textColor: "black",
  },
  {
    id: 3,
    name: "Soft Lavender",
    hex: "#C8CEDF",
    description: "Secondary accent",
    textColor: "black",
  },
  {
    id: 4,
    name: "Royal Blue",
    hex: "#23577A",
    description: "Primary accent",
    textColor: "white",
    border: true,
  },
  {
    id: 5,
    name: "Peach",
    hex: "#FDDBCA",
    description: "Warm highlight",
    textColor: "black",
  },
];

export const vegasDarkColors = [
  {
    id: 1,
    name: "Black",
    hex: "#000000",
    description: "Background",
    textColor: "white",
    border: true,
  },
  {
    id: 2,
    name: "White",
    hex: "#FFFFFF",
    description: "Primary text",
    textColor: "black",
  },
  {
    id: 3,
    name: "Ice Blue",
    hex: "#CCDEE2",
    description: "Cool accent",
    textColor: "black",
  },
  {
    id: 4,
    name: "Deep Teal",
    hex: "#23577A",
    description: "Secondary accent",
    textColor: "white",
  },
  {
    id: 5,
    name: "Blush Pink",
    hex: "#F1BFD9",
    description: "Soft highlight",
    textColor: "black",
  },
  {
    id: 6,
    name: "Hot Red",
    hex: "#ED174B",
    description: "Bold accent",
    textColor: "white",
  },
  {
    id: 7,
    name: "Warm Peach",
    hex: "#FEDCBB",
    description: "Warm tone",
    textColor: "black",
  },
  {
    id: 8,
    name: "Bright Red",
    hex: "#ED2024",
    description: "Alert accent",
    textColor: "white",
  },
  {
    id: 9,
    name: "Sage Green",
    hex: "#DAE0CE",
    description: "Natural balance",
    textColor: "black",
  },
  {
    id: 10,
    name: "Vivid Green",
    hex: "#38B14A",
    description: "Life accent",
    textColor: "white",
  },
];

export const toiletTypography = {
  fonts: [
    {
      id: 1,
      name: "Dokdo",
      weight: "400",
      weightName: "Regular",
      fontFamily: "var(--font-dokdo)",
      description: "Bold and raw, used for headlines — feels like bathroom wall graffiti",
    },
    {
      id: 2,
      name: "Reenie Beanie",
      weight: "400",
      weightName: "Regular",
      fontFamily: "var(--font-reenie-beanie)",
      description: "Handwritten and casual, used for subheadings and playful notes",
    },
  ],
};

export const toiletColors = [
  { id: 1, name: "White", hex: "#FFFFFF", description: "Background", textColor: "black" },
  { id: 2, name: "Black", hex: "#000000", description: "Primary text", textColor: "white" },
  { id: 3, name: "Tile Blue", hex: "#5B9BD5", description: "Bathroom tile accent", textColor: "white" },
  { id: 4, name: "Flush Green", hex: "#70AD47", description: "Playful highlight", textColor: "white" },
  { id: 5, name: "Warning Yellow", hex: "#FFC000", description: "Attention grabber", textColor: "black" },
  { id: 6, name: "Stall Grey", hex: "#A5A5A5", description: "Neutral support", textColor: "black" },
];

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
