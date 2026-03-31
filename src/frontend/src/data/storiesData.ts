export interface Story {
  id: string;
  title: string;
  excerpt: string;
  genre: string;
  author: string;
  sourceUrl: string;
  sourceSite: string;
  coverSeed: string;
  reads?: string;
}

export interface StoryGenre {
  id: string;
  name: string;
  emoji: string;
  color: string;
  glowColor: string;
  sourceSite: string;
  sourceSiteUrl: string;
  stories: Story[];
}

export const STORY_GENRES: StoryGenre[] = [
  {
    id: "romantic",
    name: "Romantic",
    emoji: "💕",
    color: "oklch(0.65 0.22 0)",
    glowColor: "rgba(255, 80, 80, 0.6)",
    sourceSite: "Wattpad",
    sourceSiteUrl: "https://www.wattpad.com/stories/romance",
    stories: [
      {
        id: "r1",
        title: "After",
        excerpt:
          "Tessa Young had everything mapped out — until she met Hardin Scott, a mysterious bad boy who turns her world upside down.",
        genre: "Romantic",
        author: "Anna Todd",
        sourceUrl: "https://www.wattpad.com/story/7680631-after",
        sourceSite: "Wattpad",
        coverSeed: "romantic-after-novel",
        reads: "1.5B reads",
      },
      {
        id: "r2",
        title: "The Kissing Quotient",
        excerpt:
          "A workaholic economist hires a professional escort to teach her dating skills — but soon discovers love isn't something you can learn from a textbook.",
        genre: "Romantic",
        author: "Helen Hoang",
        sourceUrl: "https://www.wattpad.com/story/romance/kissing-quotient",
        sourceSite: "Wattpad",
        coverSeed: "kissing-quotient-romance",
        reads: "45M reads",
      },
      {
        id: "r3",
        title: "My Bossy CEO Husband",
        excerpt:
          "She thought she was just signing a contract. He thought he was just hiring an actress. Neither of them planned for real feelings.",
        genre: "Romantic",
        author: "Lena Sparks",
        sourceUrl: "https://www.wattpad.com/story/romance-ceo",
        sourceSite: "Wattpad",
        coverSeed: "ceo-romance-office",
        reads: "120M reads",
      },
      {
        id: "r4",
        title: "The Notebook Effect",
        excerpt:
          "Two strangers swap handwritten letters in an old notebook left in a coffee shop — and slowly fall in love without ever meeting face to face.",
        genre: "Romantic",
        author: "Mia Caldwell",
        sourceUrl: "https://www.wattpad.com/story/notebook-strangers-romance",
        sourceSite: "Wattpad",
        coverSeed: "notebook-coffee-letters",
        reads: "28M reads",
      },
    ],
  },
  {
    id: "love-story",
    name: "Love Story",
    emoji: "❤️",
    color: "oklch(0.60 0.25 15)",
    glowColor: "rgba(255, 50, 50, 0.6)",
    sourceSite: "AO3",
    sourceSiteUrl: "https://archiveofourown.org/tags/Romance/works",
    stories: [
      {
        id: "ls1",
        title: "A Court of Thorns and Roses",
        excerpt:
          "A mortal huntress is dragged into a treacherous magical world where an ancient evil stirs — and where the line between love and hatred blurs.",
        genre: "Love Story",
        author: "Sarah J. Maas",
        sourceUrl: "https://archiveofourown.org/works/6709748",
        sourceSite: "AO3",
        coverSeed: "court-thorns-roses-fantasy",
        reads: "980M reads",
      },
      {
        id: "ls2",
        title: "Pride, Prejudice and Pixels",
        excerpt:
          "Elizabeth Bennett is a game developer. Mr. Darcy is the infuriating investor funding her startup. A modern retelling no one asked for but everyone needed.",
        genre: "Love Story",
        author: "Jane Austen Fan",
        sourceUrl: "https://archiveofourown.org/works/pride-prejudice-modern",
        sourceSite: "AO3",
        coverSeed: "pride-prejudice-modern-love",
        reads: "67M reads",
      },
      {
        id: "ls3",
        title: "One Last Stop",
        excerpt:
          "August doesn't believe in miracles until she meets Jane — a gorgeous girl stuck on the Q train, frozen in time since 1977.",
        genre: "Love Story",
        author: "Casey McQuiston",
        sourceUrl: "https://archiveofourown.org/works/one-last-stop",
        sourceSite: "AO3",
        coverSeed: "train-love-story-vintage",
        reads: "200M reads",
      },
      {
        id: "ls4",
        title: "The Sun Down Motel",
        excerpt:
          "Two women, decades apart, both disappear from the same roadside motel. One searches for answers; the other becomes the ghost.",
        genre: "Love Story",
        author: "Simone St. James",
        sourceUrl: "https://archiveofourown.org/works/sundown-motel-mystery",
        sourceSite: "AO3",
        coverSeed: "motel-mystery-night",
        reads: "88M reads",
      },
    ],
  },
  {
    id: "thriller",
    name: "Thriller",
    emoji: "🔪",
    color: "oklch(0.55 0.20 50)",
    glowColor: "rgba(255, 140, 0, 0.6)",
    sourceSite: "Royal Road",
    sourceSiteUrl: "https://www.royalroad.com/fictions/search?type=thriller",
    stories: [
      {
        id: "t1",
        title: "The Silent Patient",
        excerpt:
          "A famous painter shoots her husband five times and then never speaks again. A criminal psychotherapist becomes obsessed with uncovering the truth.",
        genre: "Thriller",
        author: "Alex Michaelides",
        sourceUrl: "https://www.royalroad.com/fiction/silent-patient-thriller",
        sourceSite: "Royal Road",
        coverSeed: "silent-patient-thriller",
        reads: "340M reads",
      },
      {
        id: "t2",
        title: "Gone Girl",
        excerpt:
          "On their fifth wedding anniversary, Amy Dunne disappears. Her husband Nick becomes the prime suspect — but the truth is far more twisted.",
        genre: "Thriller",
        author: "Gillian Flynn",
        sourceUrl: "https://www.royalroad.com/fiction/gone-girl-mystery",
        sourceSite: "Royal Road",
        coverSeed: "gone-girl-mystery-thriller",
        reads: "500M reads",
      },
      {
        id: "t3",
        title: "The Woman in the Window",
        excerpt:
          "An agoraphobic woman spies on her neighbors through her window — and witnesses something she was never meant to see.",
        genre: "Thriller",
        author: "A.J. Finn",
        sourceUrl: "https://www.royalroad.com/fiction/woman-in-window",
        sourceSite: "Royal Road",
        coverSeed: "window-spy-thriller",
        reads: "280M reads",
      },
      {
        id: "t4",
        title: "The Girl on the Train",
        excerpt:
          "Every day, Rachel takes the same commuter train and watches a perfect couple — until one morning she witnesses something shocking from her window.",
        genre: "Thriller",
        author: "Paula Hawkins",
        sourceUrl: "https://www.royalroad.com/fiction/girl-on-train",
        sourceSite: "Royal Road",
        coverSeed: "girl-train-thriller",
        reads: "620M reads",
      },
    ],
  },
  {
    id: "mystery",
    name: "Mystery",
    emoji: "🔍",
    color: "oklch(0.58 0.18 270)",
    glowColor: "rgba(120, 80, 255, 0.6)",
    sourceSite: "Wattpad",
    sourceSiteUrl: "https://www.wattpad.com/stories/mystery",
    stories: [
      {
        id: "m1",
        title: "And Then There Were None",
        excerpt:
          "Ten strangers are lured to a remote island, one by one accused of murder — and one by one they begin to die.",
        genre: "Mystery",
        author: "Agatha Christie",
        sourceUrl:
          "https://www.wattpad.com/story/mystery/and-then-there-were-none",
        sourceSite: "Wattpad",
        coverSeed: "mystery-island-agatha",
        reads: "1.2B reads",
      },
      {
        id: "m2",
        title: "The Locked Room",
        excerpt:
          "Detective Raj finds a man dead inside a room bolted from the inside. No murder weapon. No footprints. No explanation.",
        genre: "Mystery",
        author: "Vikram Nair",
        sourceUrl:
          "https://www.wattpad.com/story/mystery/locked-room-detective",
        sourceSite: "Wattpad",
        coverSeed: "locked-room-detective-mystery",
        reads: "55M reads",
      },
      {
        id: "m3",
        title: "The Library of Shadows",
        excerpt:
          "When books in the ancient library start changing their own text overnight, a young librarian must solve a centuries-old puzzle before the next reader dies.",
        genre: "Mystery",
        author: "Clara Voss",
        sourceUrl: "https://www.wattpad.com/story/mystery/library-shadows",
        sourceSite: "Wattpad",
        coverSeed: "library-books-shadows",
        reads: "32M reads",
      },
      {
        id: "m4",
        title: "Crooked House",
        excerpt:
          "When a Greek tycoon is poisoned in his country mansion, his granddaughter asks a young detective to uncover the killer hiding among the family.",
        genre: "Mystery",
        author: "Agatha Christie",
        sourceUrl: "https://www.wattpad.com/story/mystery/crooked-house",
        sourceSite: "Wattpad",
        coverSeed: "crooked-house-mystery",
        reads: "160M reads",
      },
    ],
  },
  {
    id: "horror",
    name: "Horror",
    emoji: "👻",
    color: "oklch(0.50 0.15 300)",
    glowColor: "rgba(160, 0, 200, 0.6)",
    sourceSite: "Wattpad",
    sourceSiteUrl: "https://www.wattpad.com/stories/horror",
    stories: [
      {
        id: "h1",
        title: "The Haunting of Hill House",
        excerpt:
          "No live organism can continue for long to exist sanely under conditions of absolute reality — Hill House could not.",
        genre: "Horror",
        author: "Shirley Jackson",
        sourceUrl: "https://www.wattpad.com/story/horror/haunting-hill-house",
        sourceSite: "Wattpad",
        coverSeed: "haunted-house-horror",
        reads: "430M reads",
      },
      {
        id: "h2",
        title: "Creepypasta: The Smiling Man",
        excerpt:
          "A late night walk home turns into a nightmare when a man encounters a figure that moves wrong in every possible way.",
        genre: "Horror",
        author: "Blue_Tidal",
        sourceUrl:
          "https://www.wattpad.com/story/horror/smiling-man-creepypasta",
        sourceSite: "Wattpad",
        coverSeed: "horror-dark-smile",
        reads: "78M reads",
      },
      {
        id: "h3",
        title: "Room 1408",
        excerpt:
          "Mike Enslin has debunked every haunted hotel in America. But Room 1408 at the Dolphin Hotel is no ordinary room — it is an evil place.",
        genre: "Horror",
        author: "Stephen King",
        sourceUrl:
          "https://www.wattpad.com/story/horror/room-1408-stephen-king",
        sourceSite: "Wattpad",
        coverSeed: "hotel-room-horror-night",
        reads: "520M reads",
      },
      {
        id: "h4",
        title: "The Backrooms",
        excerpt:
          "If you clip through reality's walls, you'll end up in the Backrooms — infinite yellow rooms of damp carpet and buzzing fluorescent lights. You are not alone.",
        genre: "Horror",
        author: "Anonymous",
        sourceUrl: "https://www.wattpad.com/story/horror/backrooms-original",
        sourceSite: "Wattpad",
        coverSeed: "backrooms-yellow-horror",
        reads: "95M reads",
      },
    ],
  },
  {
    id: "fantasy",
    name: "Fantasy",
    emoji: "🐉",
    color: "oklch(0.62 0.20 150)",
    glowColor: "rgba(0, 200, 120, 0.6)",
    sourceSite: "Royal Road",
    sourceSiteUrl: "https://www.royalroad.com/fictions/search?type=fantasy",
    stories: [
      {
        id: "f1",
        title: "Dungeon Crawler Carl",
        excerpt:
          "The apocalypse has come — but not in the way anyone expected. The Earth has been converted into a dungeon, and Carl must fight his way through with his cat.",
        genre: "Fantasy",
        author: "Matt Dinniman",
        sourceUrl:
          "https://www.royalroad.com/fiction/45534/dungeon-crawler-carl",
        sourceSite: "Royal Road",
        coverSeed: "dungeon-crawler-fantasy",
        reads: "85M reads",
      },
      {
        id: "f2",
        title: "The Wandering Inn",
        excerpt:
          "An inn is an inn, no matter what world it stands in. Erin Solstice stumbles into a fantasy world and opens a tavern — and the world will never be the same.",
        genre: "Fantasy",
        author: "pirateaba",
        sourceUrl: "https://www.royalroad.com/fiction/wandering-inn",
        sourceSite: "Royal Road",
        coverSeed: "wandering-inn-fantasy-tavern",
        reads: "300M reads",
      },
      {
        id: "f3",
        title: "Forge of Destiny",
        excerpt:
          "A poor girl from a dying village earns a place in a heavenly mountain sect — and begins a journey of cultivation, friendship, and self-discovery.",
        genre: "Fantasy",
        author: "Yrsillar",
        sourceUrl: "https://www.royalroad.com/fiction/25225/forge-of-destiny",
        sourceSite: "Royal Road",
        coverSeed: "fantasy-cultivation-mountain",
        reads: "62M reads",
      },
      {
        id: "f4",
        title: "Mother of Learning",
        excerpt:
          "Zorian Kazinski is trapped in a time loop on the eve of a monster invasion. A month to repeat forever — until he can find a way to break the cycle.",
        genre: "Fantasy",
        author: "nobody103",
        sourceUrl: "https://www.royalroad.com/fiction/21220/mother-of-learning",
        sourceSite: "Royal Road",
        coverSeed: "time-loop-fantasy-magic",
        reads: "110M reads",
      },
    ],
  },
  {
    id: "adventure",
    name: "Adventure",
    emoji: "⚔️",
    color: "oklch(0.63 0.18 90)",
    glowColor: "rgba(200, 180, 0, 0.6)",
    sourceSite: "Royal Road",
    sourceSiteUrl: "https://www.royalroad.com/fictions/search?type=adventure",
    stories: [
      {
        id: "a1",
        title: "The Final Empire",
        excerpt:
          "For a thousand years the ash has fallen and mist dominates the night. For a thousand years, a society endures. But where is the Hero of Ages?",
        genre: "Adventure",
        author: "Brandon Sanderson",
        sourceUrl: "https://www.royalroad.com/fiction/final-empire-sanderson",
        sourceSite: "Royal Road",
        coverSeed: "final-empire-adventure-mist",
        reads: "800M reads",
      },
      {
        id: "a2",
        title: "Primal Hunter",
        excerpt:
          "Jake is a regular office worker who suddenly finds himself in a survival simulation alongside millions of other humans — with the fate of humanity at stake.",
        genre: "Adventure",
        author: "Zogarth",
        sourceUrl: "https://www.royalroad.com/fiction/36049/the-primal-hunter",
        sourceSite: "Royal Road",
        coverSeed: "primal-hunter-adventure",
        reads: "75M reads",
      },
      {
        id: "a3",
        title: "He Who Fights With Monsters",
        excerpt:
          "Jason wakes up in a fantasy world. With no combat skills, a quirky familiar, and an affinity for blood magic, he'll still somehow have to become a hero.",
        genre: "Adventure",
        author: "Jason Cheyne",
        sourceUrl:
          "https://www.royalroad.com/fiction/26294/he-who-fights-with-monsters",
        sourceSite: "Royal Road",
        coverSeed: "fights-monsters-adventure",
        reads: "92M reads",
      },
      {
        id: "a4",
        title: "Savage Divinity",
        excerpt:
          "Rain, a young man with no memory, awakens in a world of warriors, beasts, and cultivation — and must carve his own path through blood and steel.",
        genre: "Adventure",
        author: "HonourRae",
        sourceUrl: "https://www.royalroad.com/fiction/6752/savage-divinity",
        sourceSite: "Royal Road",
        coverSeed: "savage-divinity-warrior",
        reads: "48M reads",
      },
    ],
  },
  {
    id: "sci-fi",
    name: "Sci-Fi",
    emoji: "🚀",
    color: "oklch(0.60 0.20 220)",
    glowColor: "rgba(0, 150, 255, 0.6)",
    sourceSite: "Royal Road",
    sourceSiteUrl: "https://www.royalroad.com/fictions/search?type=sci_fi",
    stories: [
      {
        id: "sf1",
        title: "The Martian",
        excerpt:
          "Astronaut Mark Watney is stranded alone on Mars. With limited supplies, no way to communicate, and a hostile planet — he decides to science the hell out of it.",
        genre: "Sci-Fi",
        author: "Andy Weir",
        sourceUrl: "https://www.royalroad.com/fiction/martian-andy-weir",
        sourceSite: "Royal Road",
        coverSeed: "mars-astronaut-sci-fi",
        reads: "700M reads",
      },
      {
        id: "sf2",
        title: "Chrysalis",
        excerpt:
          "Anthony is reincarnated as an ant in a monster-filled world. Evolving from the weakest creature, he must grow powerful enough to survive the apocalypse.",
        genre: "Sci-Fi",
        author: "RinoZ",
        sourceUrl: "https://www.royalroad.com/fiction/14854/chrysalis",
        sourceSite: "Royal Road",
        coverSeed: "chrysalis-ant-evolution",
        reads: "58M reads",
      },
      {
        id: "sf3",
        title: "Project Hail Mary",
        excerpt:
          "Ryland Grace wakes up alone on a spaceship with no memory of why he's there. His mission: save humanity from an extinction-level threat.",
        genre: "Sci-Fi",
        author: "Andy Weir",
        sourceUrl: "https://www.royalroad.com/fiction/project-hail-mary",
        sourceSite: "Royal Road",
        coverSeed: "hail-mary-space-sci-fi",
        reads: "450M reads",
      },
      {
        id: "sf4",
        title: "The Perfect Run",
        excerpt:
          "Ryan can rewind time back 24 hours at will. Armed with this ability and a sarcastic sense of humor, he's going to fix a broken, post-apocalyptic world.",
        genre: "Sci-Fi",
        author: "Maxime J. Durand",
        sourceUrl: "https://www.royalroad.com/fiction/36735/the-perfect-run",
        sourceSite: "Royal Road",
        coverSeed: "perfect-run-time-rewind",
        reads: "40M reads",
      },
    ],
  },
  {
    id: "crime",
    name: "Crime",
    emoji: "🕵️",
    color: "oklch(0.52 0.16 35)",
    glowColor: "rgba(200, 100, 0, 0.5)",
    sourceSite: "Wattpad",
    sourceSiteUrl: "https://www.wattpad.com/stories/crimefiction",
    stories: [
      {
        id: "c1",
        title: "The Girl with the Dragon Tattoo",
        excerpt:
          "A disgraced journalist and a brilliant but troubled hacker investigate a 40-year-old disappearance tied to a powerful Swedish family.",
        genre: "Crime",
        author: "Stieg Larsson",
        sourceUrl: "https://www.wattpad.com/story/crime/dragon-tattoo",
        sourceSite: "Wattpad",
        coverSeed: "dragon-tattoo-crime",
        reads: "900M reads",
      },
      {
        id: "c2",
        title: "In the Woods",
        excerpt:
          "A Dublin detective returns to the woods where two of his childhood friends vanished without a trace — only to confront a case that haunts his own memory.",
        genre: "Crime",
        author: "Tana French",
        sourceUrl: "https://www.wattpad.com/story/crime/in-the-woods",
        sourceSite: "Wattpad",
        coverSeed: "forest-crime-detective",
        reads: "220M reads",
      },
      {
        id: "c3",
        title: "The Lincoln Lawyer",
        excerpt:
          "Criminal defense attorney Mickey Haller operates out of the backseat of his Lincoln Town Car — until he lands a case that could destroy him.",
        genre: "Crime",
        author: "Michael Connelly",
        sourceUrl: "https://www.wattpad.com/story/crime/lincoln-lawyer",
        sourceSite: "Wattpad",
        coverSeed: "lawyer-crime-city",
        reads: "310M reads",
      },
      {
        id: "c4",
        title: "No Country for Old Men",
        excerpt:
          "A hunter stumbles upon a drug deal gone wrong and $2 million in cash. He takes the money — and a relentless killer takes his trail.",
        genre: "Crime",
        author: "Cormac McCarthy",
        sourceUrl: "https://www.wattpad.com/story/crime/no-country-old-men",
        sourceSite: "Wattpad",
        coverSeed: "crime-desert-chase",
        reads: "480M reads",
      },
    ],
  },
  {
    id: "drama",
    name: "Drama",
    emoji: "🎭",
    color: "oklch(0.58 0.16 330)",
    glowColor: "rgba(220, 50, 150, 0.5)",
    sourceSite: "AO3",
    sourceSiteUrl: "https://archiveofourown.org/tags/Drama/works",
    stories: [
      {
        id: "d1",
        title: "Normal People",
        excerpt:
          "Connell and Marianne grow up in the same small Irish town but belong to different worlds. Two people who keep finding their way back to each other.",
        genre: "Drama",
        author: "Sally Rooney",
        sourceUrl: "https://archiveofourown.org/works/normal-people-drama",
        sourceSite: "AO3",
        coverSeed: "normal-people-drama",
        reads: "650M reads",
      },
      {
        id: "d2",
        title: "Daisy Jones and The Six",
        excerpt:
          "In the 1970s, a band at the peak of their fame breaks up — and the story of why is finally told decades later.",
        genre: "Drama",
        author: "Taylor Jenkins Reid",
        sourceUrl: "https://archiveofourown.org/works/daisy-jones-six",
        sourceSite: "AO3",
        coverSeed: "band-music-drama-70s",
        reads: "420M reads",
      },
      {
        id: "d3",
        title: "The Kite Runner",
        excerpt:
          "A wealthy Afghan boy and his servant's son share a bond that is torn apart by an act of betrayal that will haunt both their lives.",
        genre: "Drama",
        author: "Khaled Hosseini",
        sourceUrl: "https://archiveofourown.org/works/kite-runner-drama",
        sourceSite: "AO3",
        coverSeed: "kite-runner-drama-afghanistan",
        reads: "1.1B reads",
      },
      {
        id: "d4",
        title: "Little Fires Everywhere",
        excerpt:
          "Two families in suburban Ohio collide when a mysterious artist and her daughter arrive — threatening the perfect life one family has built.",
        genre: "Drama",
        author: "Celeste Ng",
        sourceUrl: "https://archiveofourown.org/works/little-fires-everywhere",
        sourceSite: "AO3",
        coverSeed: "fires-suburban-drama",
        reads: "290M reads",
      },
    ],
  },
  {
    id: "historical",
    name: "Historical",
    emoji: "🏛️",
    color: "oklch(0.62 0.13 70)",
    glowColor: "rgba(180, 140, 0, 0.5)",
    sourceSite: "Wattpad",
    sourceSiteUrl: "https://www.wattpad.com/stories/historical",
    stories: [
      {
        id: "hist1",
        title: "Pillars of the Earth",
        excerpt:
          "In 12th-century England, a passionate builder dreams of constructing the greatest cathedral in the world — while war and political intrigue rage around him.",
        genre: "Historical",
        author: "Ken Follett",
        sourceUrl:
          "https://www.wattpad.com/story/historical/pillars-earth-follett",
        sourceSite: "Wattpad",
        coverSeed: "cathedral-medieval-historical",
        reads: "750M reads",
      },
      {
        id: "hist2",
        title: "The Name of the Rose",
        excerpt:
          "A medieval monk and his apprentice investigate a series of murders in a remote Italian abbey — where forbidden books and deadly secrets collide.",
        genre: "Historical",
        author: "Umberto Eco",
        sourceUrl: "https://www.wattpad.com/story/historical/name-of-the-rose",
        sourceSite: "Wattpad",
        coverSeed: "abbey-medieval-mystery",
        reads: "380M reads",
      },
      {
        id: "hist3",
        title: "Outlander",
        excerpt:
          "WWII nurse Claire Randall is transported back to 18th-century Scotland, where she is caught between two men and two different worlds.",
        genre: "Historical",
        author: "Diana Gabaldon",
        sourceUrl:
          "https://www.wattpad.com/story/historical/outlander-scotland",
        sourceSite: "Wattpad",
        coverSeed: "scotland-highlands-historical",
        reads: "920M reads",
      },
      {
        id: "hist4",
        title: "All the Light We Cannot See",
        excerpt:
          "A blind French girl and a German soldier come together in war-torn Europe, their fates entwined by a legendary diamond and a radio broadcast.",
        genre: "Historical",
        author: "Anthony Doerr",
        sourceUrl:
          "https://www.wattpad.com/story/historical/all-light-cannot-see",
        sourceSite: "Wattpad",
        coverSeed: "wwii-france-light-historical",
        reads: "560M reads",
      },
    ],
  },
  {
    id: "comedy",
    name: "Comedy",
    emoji: "😂",
    color: "oklch(0.70 0.18 100)",
    glowColor: "rgba(160, 210, 0, 0.5)",
    sourceSite: "Wattpad",
    sourceSiteUrl: "https://www.wattpad.com/stories/humor",
    stories: [
      {
        id: "com1",
        title: "The Hitchhiker's Guide to the Galaxy",
        excerpt:
          "Moments before Earth is demolished to make way for a hyperspace bypass, Arthur Dent is whisked into space by his alien friend Ford Prefect.",
        genre: "Comedy",
        author: "Douglas Adams",
        sourceUrl: "https://www.wattpad.com/story/humor/hitchhikers-guide",
        sourceSite: "Wattpad",
        coverSeed: "hitchhiker-galaxy-comedy",
        reads: "1.3B reads",
      },
      {
        id: "com2",
        title: "Good Omens",
        excerpt:
          "An angel and a demon have lived on Earth since the beginning and grown to like it. The Apocalypse is coming and they're both rather against it.",
        genre: "Comedy",
        author: "Terry Pratchett",
        sourceUrl: "https://www.wattpad.com/story/humor/good-omens",
        sourceSite: "Wattpad",
        coverSeed: "angel-demon-comedy",
        reads: "670M reads",
      },
      {
        id: "com3",
        title: "The Worst-Case Scenario Survival Guide",
        excerpt:
          "What do you do if your parachute fails? If a shark attacks? A hilarious yet somehow practical guide to surviving life's most absurd emergencies.",
        genre: "Comedy",
        author: "Joshua Piven",
        sourceUrl: "https://www.wattpad.com/story/humor/worst-case-scenario",
        sourceSite: "Wattpad",
        coverSeed: "survival-comedy-absurd",
        reads: "88M reads",
      },
      {
        id: "com4",
        title: "Confessions of a Shopaholic",
        excerpt:
          "Rebecca Bloomwood has a tiny problem — she can't stop shopping. Especially when there's a sale. Especially when there isn't. A hilarious spiral into debt and denial.",
        genre: "Comedy",
        author: "Sophie Kinsella",
        sourceUrl: "https://www.wattpad.com/story/humor/confessions-shopaholic",
        sourceSite: "Wattpad",
        coverSeed: "shopaholic-comedy-bags",
        reads: "310M reads",
      },
    ],
  },
];

export const ALL_GENRES = STORY_GENRES.map((g) => g.id);
export const FEATURED_STORIES = STORY_GENRES.flatMap((g) =>
  g.stories.slice(0, 1),
);
