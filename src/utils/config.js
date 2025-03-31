export const locations = {
  denmark: {
    name: "Copenhagen, Denmark",
    nameChinese: "丹麦",
    timezone: "Europe/Copenhagen",
    language: "Danish",
    emoji: "🇩🇰",
  },
  china: {
    name: "Ningde, Fujian",
    nameChinese: "福建宁德",
    timezone: "Asia/Shanghai",
    language: "Chinese",
    emoji: "🇨🇳",
  }
};

// Use API key from environment variables
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "YOUR_OPENWEATHERMAP_API_KEY";

// Cache duration in milliseconds (1 hour)
export const WEATHER_CACHE_DURATION = 60 * 60 * 1000;

// API URL for the Cloudflare Worker
export const API_URL = 'https://journal-api.mickiharning.workers.dev';

export const LOCAL_STORAGE_KEYS = {
  USER_LOCATION: "skyjournal-user-location",
  JOURNAL_ENTRIES: "skyjournal-journal-entries",
  LANGUAGE_CARDS: "skyjournal-language-cards",
  WEATHER_CACHE: "skyjournal-weather-cache",
  LANGUAGE_PREFERENCE: "skyjournal-language-preference",
};

export const DEFAULT_USER = "denmark"; // Set the default user location

// UI translations for Chinese
export const translations = {
  // Header
  appTitle: {
    en: "Journal",
    zh: "日记"
  },
  
  // Common UI elements
  addJournalEntry: {
    en: "Write something from",
    zh: "写点什么来自"
  },
  howsTheSky: {
    en: "What's up?",
    zh: "最近怎么样？"
  },
  shareThoughts: {
    en: "Share what's on your mind or anything interesting...",
    zh: "分享你的想法或任何有趣的事情..."
  },
  shareJournalEntry: {
    en: "Post",
    zh: "发布"
  },
  journalEntries: {
    en: "Your Entries",
    zh: "你的日记"
  },
  
  // Language cards
  addLanguageWord: {
    en: "Add word",
    zh: "添加单词"
  },
  word: {
    en: "Word or phrase",
    zh: "单词或短语"
  },
  removeLanguageEntry: {
    en: "Remove word",
    zh: "删除单词"
  },
  pronunciation: {
    en: "Pronunciation",
    zh: "发音"
  },
  translation: {
    en: "Translation",
    zh: "翻译"
  },
  exampleSentence: {
    en: "Example",
    zh: "例句"
  },
  
  // Weather and time
  localTime: {
    en: "Local time:",
    zh: "当地时间："
  },
  feelsLike: {
    en: "Feels like:",
    zh: "体感温度："
  },
  
  // Countdown
  nextJournalFrom: {
    en: "Next entry from",
    zh: "下一条来自"
  },
  availableAt: {
    en: "Available at",
    zh: "可用于"
  },
  time: {
    en: "time",
    zh: "时间"
  },
  in: {
    en: "in",
    zh: "在"
  },
  
  // Language collection
  languageCards: {
    en: "Language Cards",
    zh: "语言卡片"
  },
  noCardsYet: {
    en: "No language cards yet. Add some when writing entries!",
    zh: "还没有语言卡片。写日记时添加一些吧！"
  },
  tapToSeeTranslation: {
    en: "Tap to see translation",
    zh: "点击查看翻译"
  },
  tapToSeeWord: {
    en: "Tap to see word",
    zh: "点击查看单词"
  },
  previous: {
    en: "Prev",
    zh: "上一个"
  },
  next: {
    en: "Next",
    zh: "下一个"
  },
  
  // Filters
  all: {
    en: "All",
    zh: "全部"
  },
  
  // Toggle language
  showChinese: {
    en: "中文",
    zh: "中文"
  }
}; 