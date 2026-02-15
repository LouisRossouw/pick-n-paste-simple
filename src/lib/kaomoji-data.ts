export type KaomojiItem = {
  emoji: string;
  name: string;
  slug: string;
  keywords: string;
};

export type KaomojiCategory = {
  name: string;
  slug: string;
  emoji: string;
  items: KaomojiItem[];
};

export const kaomojiDataRaw: KaomojiCategory[] = [
  {
    name: "Classic",
    slug: "kaomoji_classic",
    emoji: "¯\\_(ツ)_/¯",
    items: [
      {
        emoji: "( ͡° ͜ʖ ͡°)",
        name: "Lenny Face",
        slug: "lenny_face",
        keywords: "lenny face smirk",
      },
      {
        emoji: "¯\\_(ツ)_/¯",
        name: "Shrug",
        slug: "shrug",
        keywords: "shrug whatever",
      },
      {
        emoji: "ಠ_ಠ",
        name: "Look of Disapproval",
        slug: "disapproval",
        keywords: "disapproval stare",
      },
      {
        emoji: "(╯°□°）╯︵ ┻━┻",
        name: "Table Flip",
        slug: "table_flip",
        keywords: "table flip angry",
      },
      {
        emoji: "┬─┬ノ( º _ ºノ)",
        name: "Unflip",
        slug: "unflip",
        keywords: "unflip calm put back",
      },
      {
        emoji: "(ง'̀-'́)ง",
        name: "Fight",
        slug: "fight_kaomoji",
        keywords: "fight box aggressive",
      },
      {
        emoji: "༼ つ ◕_◕ ༽つ",
        name: "Give",
        slug: "give_kaomoji",
        keywords: "give Kirby",
      },
      {
        emoji: "t(-_-t)",
        name: "Middle finger",
        slug: "middle_finger_t",
        keywords: "angry rude",
      },
      {
        emoji: "┌∩┐(◣_◢)┌∩┐",
        name: "Double middle",
        slug: "double_middle",
        keywords: "angry rude",
      },
    ],
  },
  {
    name: "Happy",
    slug: "kaomoji_happy",
    emoji: "٩(◕‿◕)۶",
    items: [
      {
        emoji: "٩(◕‿◕)۶",
        name: "Happy dance",
        slug: "happy_dance",
        keywords: "happy dance joy",
      },
      {
        emoji: "(•‿•)",
        name: "Happy small",
        slug: "happy_small",
        keywords: "happy smile",
      },
      {
        emoji: "｡^‿^｡",
        name: "Happy eye",
        slug: "happy_eye",
        keywords: "happy smile",
      },
      {
        emoji: "(o^▽^o)",
        name: "Happy open",
        slug: "happy_open",
        keywords: "happy smile",
      },
      {
        emoji: "(´｡• ᵕ •｡`)",
        name: "Blush",
        slug: "blush_kaomoji",
        keywords: "blush happy",
      },
      {
        emoji: "o(>ω<)o",
        name: "Excited",
        slug: "excited_kaomoji",
        keywords: "excited happy",
      },
      {
        emoji: "(≧◡≦)",
        name: "Big smile",
        slug: "big_smile_kaomoji",
        keywords: "big smile happy",
      },
      {
        emoji: "\\(★ω★)/",
        name: "Stars",
        slug: "stars_kaomoji",
        keywords: "happy stars",
      },
      {
        emoji: "(〃＾▽＾〃)",
        name: "Laughing",
        slug: "laughing_kaomoji",
        keywords: "happy laugh",
      },
    ],
  },
  {
    name: "Love & Cute",
    slug: "kaomoji_love",
    emoji: "( ^◡^ )",
    items: [
      {
        emoji: "(づ｡◕‿‿◕｡)づ",
        name: "Hug",
        slug: "hug_kaomoji",
        keywords: "hug cute",
      },
      {
        emoji: "(｡♥‿♥｡)",
        name: "Love eyes",
        slug: "love_eyes",
        keywords: "love heart",
      },
      {
        emoji: "(✿ ♡‿♡)",
        name: "Flower love",
        slug: "flower_love",
        keywords: "love heart",
      },
      {
        emoji: "(´｡• ω •｡`) ♡",
        name: "Heart blush",
        slug: "heart_blush",
        keywords: "love heart",
      },
      {
        emoji: "♡(>ᴗ•)",
        name: "Wink heart",
        slug: "wink_heart",
        keywords: "love heart wink",
      },
      {
        emoji: "(* ^ ω ^) -> ♡",
        name: "Sending love",
        slug: "sending_love",
        keywords: "love heart",
      },
      {
        emoji: "(つ≧▽≦)つ",
        name: "Great hug",
        slug: "great_hug",
        keywords: "hug love",
      },
    ],
  },
  {
    name: "Sad & Crying",
    slug: "kaomoji_sad",
    emoji: "(;皿;)",
    items: [
      {
        emoji: "(;﹏;)",
        name: "Sad eyes",
        slug: "sad_eyes",
        keywords: "sad cry",
      },
      {
        emoji: "(╥﹏╥)",
        name: "Crying",
        slug: "crying_kaomoji",
        keywords: "sad cry",
      },
      {
        emoji: "(╯﹏╰）",
        name: "Hurt",
        slug: "hurt_kaomoji",
        keywords: "sad hurt",
      },
      {
        emoji: "(;皿;)",
        name: "Pain",
        slug: "pain_kaomoji",
        keywords: "sad pain cry",
      },
      {
        emoji: "(ノ_<。)",
        name: "Hiding face",
        slug: "hiding_face",
        keywords: "sad cry",
      },
      {
        emoji: "（ｉДｉ）",
        name: "Ugly cry",
        slug: "ugly_cry",
        keywords: "sad cry",
      },
      {
        emoji: ".·´¯`(>▂<)´¯`·.",
        name: "Wailing",
        slug: "wailing_kaomoji",
        keywords: "sad cry loud",
      },
    ],
  },
  {
    name: "Surprised",
    slug: "kaomoji_surprised",
    emoji: "(O_O;)",
    items: [
      {
        emoji: "(⊙_⊙)",
        name: "Staring",
        slug: "staring_kaomoji",
        keywords: "surprise shock",
      },
      {
        emoji: "(o_O)",
        name: "Confused shock",
        slug: "confused_shock",
        keywords: "surprise shock",
      },
      {
        emoji: "(O.O)",
        name: "Big eyes",
        slug: "big_eyes_kaomoji",
        keywords: "surprise shock",
      },
      {
        emoji: "(ﾟдﾟ)",
        name: "Open mouth",
        slug: "open_mouth_kaomoji",
        keywords: "surprise shock",
      },
      {
        emoji: "Σ(°△°|||)︴",
        name: "Scared shock",
        slug: "scared_shock",
        keywords: "surprise shock",
      },
      {
        emoji: "(＃＞＜)",
        name: "Wait what",
        slug: "wait_what",
        keywords: "surprise shock",
      },
    ],
  },
  {
    name: "Animals",
    slug: "kaomoji_animals",
    emoji: "(=^·ェ·^=)",
    items: [
      {
        emoji: "(=^·ェ·^=)",
        name: "Cat",
        slug: "cat_kaomoji",
        keywords: "cat kitten animal",
      },
      {
        emoji: "(=①ω①=)",
        name: "Fat cat",
        slug: "fat_cat",
        keywords: "cat animal",
      },
      {
        emoji: "ʕ•ᴥ•ʔ",
        name: "Bear",
        slug: "bear_kaomoji",
        keywords: "bear animal cute",
      },
      {
        emoji: "ʕ ᵔᴥᵔ ʔ",
        name: "Happy bear",
        slug: "happy_bear",
        keywords: "bear animal",
      },
      {
        emoji: "V●ᴥ●V",
        name: "Dog",
        slug: "dog_kaomoji",
        keywords: "dog animal puppy",
      },
      {
        emoji: "(=^･ω･^=)y-",
        name: "Smoking cat",
        slug: "smoking_cat",
        keywords: "cat animal",
      },
      {
        emoji: "Ƹ̵̡Ӝ̵̨̄Ʒ",
        name: "Butterfly",
        slug: "butterfly_kaomoji",
        keywords: "butterfly animal insect",
      },
      {
        emoji: "/╲/\\╭[ ˵ ͡° ͜ʖ ͡° ˵ ]╮/\\╱\\",
        name: "Spider lenny",
        slug: "spider_lenny",
        keywords: "spider animal",
      },
    ],
  },
];
