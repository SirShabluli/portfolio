export const vegasSections = [
  {
    id: 1,
    screenSrc: "/images/vegas/screens/discover.png",
    quote:
      "explore scientifically proven sins, selected by top doctors in Vegas refined through years of irresponsible research.",
    challenge: {
      label: "the challenge",
      title: "First Impression",
      body: "How do I immediately signal that this is a Vegas app wrapped in medical language - without explaining it explicitly? If it looks too medical, users won't get the joke. If it's too obvious, there's no tension.",
    },
    solution: {
      label: "My Solution",
      title: "obvious connection",
      body: `A man using an inhaler - a medical device, a health moment, routine treatment. But his thought bubble explodes with Vegas: neon dice, slot machines, martini glasses, cannabis. The contrast is instant and absurd.

The image says: medical treatment.
The thought bubble says: Vegas addiction.
The copy reveals: satire.`,
    },
  },
  {
    id: 2,
    screenSrc: "/images/vegas/screens/favorites.png",
    quote:
      "organize favorite destinations, tips, and itineraries into customizable collections, making it easy to plan future trips",
    challenge: {
      label: "the challenge",
      title: "Making Organization Feel Clinical",
      body: "In this app's universe, everything is medical. If users organize their Vegas trips into collections, what's the medical equivalent? Where do you store your \"prescriptions\"?",
    },
    solution: {
      label: "My Solution",
      title: "Medicine Cabinet as Collection System",
      body: `A hand placing a new bottle on a medicine shelf. Clean, organized, like a pharmacy cabinet. The bottles look clinical - clean labels, medical colors, orderly arrangement. But inside each bottle: dark backgrounds with neon Vegas sins glowing. Dice, cards, cocktails trapped in prescription containers.

The duality: medical organization on the surface, Vegas chaos contained within.`,
    },
  },
  {
    id: 3,
    screenSrc: "/images/vegas/screens/mark.png",
    quote:
      "Share what worked, what stung a little, and where the side effects were totally worth it.",
    challenge: {
      label: "the challenge",
      title: "Ratings, But Make It Vegas",
      body: `In the Vegas-as-medicine metaphor, what are "ratings"? What do users leave behind after trying their "prescription"?`,
    },
    solution: {
      label: "My Solution",
      title: "floating through side effects",
      body: `A man leaping forward in the clean medical interface. Behind him: a glowing trail of neon stars - Vegas memories, past experiences, side effects documented.

Reviews become your Vegas constellation - a trail others can follow.`,
    },
  },
  {
    id: 4,
    screenSrc: "/images/vegas/screens/empty.png",
    quote:
      "An empty cabinet might not seem urgent, until it is. Small actions today can prevent bigger issues tomorrow.",
    challenge: {
      label: "The Challenge",
      title: "empty state",
      body: `In a medical app about Vegas sins, emptiness isn't cute—it's unsettling. How do I make the absence of "treatments" feel like something's missing from your life?`,
    },
    solution: {
      label: "My Solution",
      title: "Stripping Away the Life",
      body: "I removed the vibrant color palette that fills the rest of the app. What's left: muted tones, sterile shelves, absence. Three simple lines form a sad face on the empty shelf - minimal, but enough to give the scene life and convey the feeling.",
    },
  },
  {
    id: 5,
    screenSrc: "/images/vegas/screens/awards.png",
    quote: "The upgrade that makes everything fall into place",
    challenge: {
      label: "the challenge",
      title: "Gamification in the Medical Metaphor",
      body: "Travel apps use badges to encourage exploration—miles traveled, countries visited, generic achievements. In a Vegas-as-medicine app, what does \"progression\" mean? How do I turn gamification into something that fits the metaphor?",
    },
    solution: {
      label: "My Solution",
      title: "From Patient to Expert Junkie",
      body: `The more destinations you explore, the more "experienced" you become— not with travel, but with substances.`,
    },
  },
];

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
      description:
        "Bold and raw, used for headlines — feels like bathroom wall graffiti",
    },
    {
      id: 2,
      name: "Reenie Beanie",
      weight: "400",
      weightName: "Regular",
      fontFamily: "var(--font-reenie-beanie)",
      description:
        "Handwritten and casual, used for subheadings and playful notes",
    },
  ],
};

export const toiletColors = [
  {
    id: 1,
    name: "White",
    hex: "#FFFFFF",
    description: "Background",
    textColor: "black",
    border: true,
  },
  {
    id: 2,
    name: "Black",
    hex: "#000000",
    description: "Primary text",
    textColor: "white",
  },
  {
    id: 3,
    name: "Flush Red",
    hex: "#d40005",
    description: "Bathroom tile accent",
    textColor: "white",
  },
  {
    id: 4,
    name: "Vibrant Pink",
    hex: "#ff0049",
    description: "Playful detail",
    textColor: "white",
  },
  {
    id: 5,
    name: "Sunny Yellow",
    hex: "#ffff39",
    description: "Attention grabber",
    textColor: "black",
  },
  {
    id: 6,
    name: "Soft Yellow",
    hex: "#ffe98a",
    description: "Warm highlight",
    textColor: "black",
  },
  {
    id: 7,
    name: "Cool Blue",
    hex: "#3c50a2",
    description: "Warm highlight",
    textColor: "white",
  },
  {
    id: 8,
    name: "fucshia Pink",
    hex: "#ff0080",
    description: "Warm highlight",
    textColor: "black",
  },
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
