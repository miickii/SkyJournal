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
    en: "Share a message from",
    zh: "分享消息来自"
  },
  howsTheSky: {
    en: "What's up?",
    zh: "最近怎么样？"
  },
  shareThoughts: {
    en: "Share a message, quote or anything interesting...",
    zh: "分享一条消息、一句话或任何有趣的事情..."
  },
  shareJournalEntry: {
    en: "Send",
    zh: "发送"
  },
  journalEntries: {
    en: "Messages",
    zh: "消息"
  },
  
  // Language cards
  addLanguageWord: {
    en: "Add language note",
    zh: "添加语言笔记"
  },
  word: {
    en: "Word or phrase",
    zh: "单词或短语"
  },
  removeLanguageEntry: {
    en: "Remove language note",
    zh: "删除语言笔记"
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
  languageMessages: {
    en: "Language Chat",
    zh: "语言聊天"
  },
  noCardsYet: {
    en: "No language cards yet. Add some when writing entries!",
    zh: "还没有语言卡片。写日记时添加一些吧！"
  },
  noMessagesYet: {
    en: "No messages yet. Share something to start chatting!",
    zh: "还没有消息。分享一些内容开始聊天吧！"
  },
  loading: {
    en: "Loading messages...",
    zh: "加载消息中..."
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
  },
  
  // Messaging
  today: {
    en: "Today",
    zh: "今天"
  },
  yesterday: {
    en: "Yesterday",
    zh: "昨天"
  },
  justNow: {
    en: "Just now",
    zh: "刚刚"
  },
  minutesAgo: {
    en: "min ago",
    zh: "分钟前"
  },
  shareQuote: {
    en: "Share a quote or phrase",
    zh: "分享一句话或短语"
  },
  clearMessages: {
    en: "Reset all messages",
    zh: "重置所有消息"
  },
  clearing: {
    en: "Clearing...",
    zh: "清除中..."
  },
  confirmClearMessages: {
    en: "Are you sure you want to delete all messages? This cannot be undone.",
    zh: "确定要删除所有消息吗？此操作无法撤销。"
  },
  // GitHub auth
  loginWithGitHub: {
    en: "Sign in with GitHub",
    zh: "使用 GitHub 登录"
  },
  logout: {
    en: "Sign out",
    zh: "退出登录"
  },
  loginRequired: {
    en: "Sign in to share messages globally",
    zh: "登录以全球共享消息"
  },
  connecting: {
    en: "Connecting...",
    zh: "连接中..."
  },
  connectionError: {
    en: "Connection error",
    zh: "连接错误"
  },
  // Simple login
  login: {
    en: "Sign in",
    zh: "登录"
  },
  enterPassword: {
    en: "Enter shared password",
    zh: "输入共享密码"
  },
  localModeActive: {
    en: "Local Mode Active",
    zh: "本地模式已激活"
  },
  signInToShare: {
    en: "Sign in with the shared password to see and share messages with your friend",
    zh: "使用共享密码登录以查看并与朋友分享消息"
  },
  // Admin panel translations
  adminPanelDescription: {
    en: "This panel is for administrators only. Connect your GitHub account to enable cloud storage for all users.",
    zh: "此面板仅供管理员使用。连接您的GitHub帐户以为所有用户启用云存储。"
  },
  adminSettings: {
    en: "Admin Settings",
    zh: "管理员设置"
  },
  hideAdminPanel: {
    en: "Hide Admin Panel",
    zh: "隐藏管理员面板"
  },
  githubConnected: {
    en: "✓ GitHub connected. Messages will be saved to Gist.",
    zh: "✓ GitHub已连接。消息将保存到Gist。"
  },
  githubNotConnected: {
    en: "! GitHub not connected. Messages are only stored locally.",
    zh: "! GitHub未连接。消息仅存储在本地。"
  },
  disconnectGitHub: {
    en: "Disconnect GitHub",
    zh: "断开GitHub连接"
  },
  connectGitHub: {
    en: "Connect GitHub",
    zh: "连接GitHub"
  }
}; 