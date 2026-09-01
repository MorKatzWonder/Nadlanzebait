import type { SupportedLanguage } from "../i18n";
import type {
  Characteristic,
  Condition,
  LocalizedText,
  Neighborhood,
  PointOfInterest,
  PropertyType,
} from "./types";

function both(he: string, en: string): LocalizedText {
  return { he, "en-US": en, "en-GB": en };
}

export const CITY: LocalizedText = both("תל אביב", "Tel Aviv");

export const AGENT_NAME: LocalizedText = both("אריק נעים", "Arik Naim");
export const AGENT_PHONE_DISPLAY = "050-746-4403";
export const AGENT_PHONE_DIAL = "+972507464403";
export const AGENT_WHATSAPP_DIGITS = "972507464403";
export const AGENT_OFFICE_ADDRESS: LocalizedText = both(
  "מרכז בעלי מלאכה 5, תל אביב",
  "Merkaz Baalei Melacha 5, Tel Aviv",
);
export const AGENT_HOURS: LocalizedText = both(
  "א׳–ה׳ 09:00–20:00 · ו׳ 09:00–13:00",
  "Sun–Thu 09:00–20:00 · Fri 09:00–13:00",
);

export const TYPE_LABELS: Record<PropertyType, LocalizedText> = {
  apt: both("דירה", "Apartment"),
  garden: both("דירת גן", "Garden apartment"),
  pent: both("פנטהאוז", "Penthouse"),
  duplex: both("דופלקס", "Duplex"),
  villa: both("בית פרטי", "Private house"),
  cottage: both("קוטג׳", "Cottage"),
  studio: both("סטודיו", "Studio"),
  roof: both("דירת גג", "Roof apartment"),
};

export const NEIGHBORHOOD_LABELS: Record<Neighborhood, LocalizedText> = {
  center: both("לב העיר", "City Center"),
  florentin: both("פלורנטין", "Florentin"),
  nevetzedek: both("נווה צדק", "Neve Tzedek"),
  oldnorth: both("הצפון הישן", "Old North"),
  ramataviv: both("רמת אביב", "Ramat Aviv"),
  kerem: both("כרם התימנים", "Kerem HaTeimanim"),
};

export const CONDITION_LABELS: Record<Condition, LocalizedText> = {
  new: both("חדשה מקבלן", "New from contractor"),
  likenew: both("כמו חדשה", "Like new"),
  renov: both("משופצת", "Renovated"),
  kept: both("שמורה", "Well maintained"),
  good: both("במצב טוב", "Good condition"),
  needs: both("דורשת שיפוץ", "Needs renovation"),
  demo: both("להריסה ובנייה", "For demolition"),
};

export const CHARACTERISTIC_LABELS: Record<Characteristic, LocalizedText> = {
  renov: both("משופצת", "Renovated"),
  mamad: both("ממ״ד", "Safe room"),
  balc: both("מרפסת שמש", "Sun balcony"),
  ac: both("מיזוג", "Air conditioning"),
  quiet: both("רחוב שקט", "Quiet street"),
  tama: both("תמ״א 38", "Tama 38"),
  bright: both("מוארת", "Bright"),
  high: both("תקרות גבוהות", "High ceilings"),
  entr: both("כניסה פרטית", "Private entrance"),
  sea: both("נוף לים", "Sea view"),
  now: both("כניסה מיידית", "Immediate entry"),
  shabbat: both("מעלית שבת", "Shabbat elevator"),
};

export const POI_LABELS: Record<PointOfInterest, LocalizedText> = {
  school: both("בתי ספר", "Schools"),
  kinder: both("גנים", "Kindergartens"),
  park: both("פארק", "Park"),
  beach: both("הים", "Beach"),
  rail: both("הרכבת הקלה", "Light rail"),
  bus: both("קווי אוטובוס", "Bus lines"),
  super: both("סופרמרקט", "Supermarket"),
  cafe: both("בתי קפה", "Cafés"),
  syn: both("בית כנסת", "Synagogue"),
};

export interface PriceBand {
  key: string;
  label: LocalizedText;
  min?: number;
  max?: number;
}

export const PRICE_BANDS: PriceBand[] = [
  { key: "a", label: both("עד 3 מ׳", "Up to ₪3M"), max: 3_000_000 },
  { key: "b", label: both("3–5 מ׳", "₪3–5M"), min: 3_000_000, max: 5_000_000 },
  { key: "c", label: both("5–8 מ׳", "₪5–8M"), min: 5_000_000, max: 8_000_000 },
  { key: "d", label: both("8 מ׳ ומעלה", "₪8M+"), min: 8_000_000 },
];

export const HOME_HERO = {
  kick: both("מוכרים דירה בתל אביב", "Selling an apartment in Tel Aviv"),
  line1: both("אנחנו לא מוכרים נכסים.", "We don’t sell properties."),
  line2: both("אנחנו מוכרים בתים.", "We sell homes."),
  body: both(
    "הערכת שווי אמיתית, שיווק שמראה את הדירה כמו שהיא באמת, וניהול משא ומתן עד החתימה. 12 שנה באותן שכונות.",
    "A real valuation, marketing that shows the apartment as it actually is, and negotiation handled through to signature. Twelve years in the same neighborhoods.",
  ),
  ctaValuation: both("להערכת שווי חינם", "Free valuation"),
  ctaProperties: both("לצפייה בנכסים", "Browse properties"),
};

export const HOME_STATS: { n: string; l: LocalizedText }[] = [
  { n: "12", l: both("שנים בשוק התל אביבי", "Years in the Tel Aviv market") },
  { n: "400+", l: both("דירות שנמכרו", "Apartments sold") },
  { n: "28", l: both("ימים בממוצע למכירה", "Average days to sale") },
  { n: "98%", l: both("מהמחיר המבוקש", "Of asking price") },
];

export const HOME_STEPS_HEAD = {
  kick: both("איך מוכרים איתנו", "Selling with us"),
  h: both("שלושה שלבים, בלי הפתעות", "Three steps, no surprises"),
};

export const HOME_STEPS: { n: string; title: LocalizedText; body: LocalizedText }[] = [
  {
    n: "01",
    title: both("הערכת שווי", "Valuation"),
    body: both(
      "פגישה בנכס, השוואת עסקאות שנסגרו באותו רחוב ובאותה קומה, וטווח מחיר שאנחנו מוכנים לעמוד מאחוריו.",
      "A meeting at the property, comparable closed deals on the same street and floor, and a price range we stand behind.",
    ),
  },
  {
    n: "02",
    title: both("שיווק וצילום", "Marketing & photography"),
    body: both(
      "צילום מקצועי באור יום, תיאור מדויק, ופרסום בכל הפלטפורמות. סינון פניות לפני שאתם פוגשים מישהו.",
      "Professional daylight photography, an accurate description, listings on every platform, and enquiries screened before you meet anyone.",
    ),
  },
  {
    n: "03",
    title: both("משא ומתן וסגירה", "Negotiation & closing"),
    body: both(
      "מנהלים את המשא ומתן מולכם בשקיפות מלאה, מלווים את הבדיקות המשפטיות ועד למסירת המפתח.",
      "We run the negotiation with full transparency, support the legal checks, and stay through to handover.",
    ),
  },
];

export const FEATURED_HEAD = {
  kick: both("נכסים נבחרים", "Selected properties"),
  h: both("מה שיש עכשיו בשכונות שלנו", "What’s available in our neighborhoods"),
  all: both("לכל הנכסים", "All properties"),
};

export const TESTIMONIALS_HEAD = {
  kick: both("לקוחות", "Clients"),
  h: both("מה אומרים אחרי החתימה", "What people say after signing"),
};

export const ABOUT = {
  kick: both("המשרד", "The office"),
  h: both("מרכז בעלי מלאכה 5, תל אביב", "Merkaz Baalei Melacha 5, Tel Aviv"),
  paragraphs: [
    both(
      "המשרד פתוח לפגישות בתיאום מראש. יושבים, מסתכלים על מספרים אמיתיים, ומחליטים אם יש כאן עסקה.",
      "Open for meetings by appointment. We sit down, look at real numbers, and decide whether there’s a deal here.",
    ),
    both(
      "אריק נעים מלווה מוכרים וקונים בתל אביב מ־2014. אותו איש קשר מהפגישה הראשונה ועד המסירה.",
      "Arik Naim has worked with sellers and buyers in Tel Aviv since 2014. The same point of contact from first meeting to handover.",
    ),
  ],
  slot: both("תמונת המשרד", "Office photograph"),
};

export const VALUATION_FORM_HEAD = {
  kick: both("הערכת שווי", "Valuation"),
  h: both("נשמח לחזור אליכם היום", "We’ll get back to you today"),
};

export function waHref(digits: string, message: string): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Languages without their own translation yet fall back to Hebrew, matching localize(). */
export function listingWaMessage(language: SupportedLanguage, address: string): string {
  return language === "en-US" || language === "en-GB"
    ? `Hello, I'm interested in the property at ${address} I saw on your site.`
    : `שלום, מתעניין בנכס ב${address} שראיתי באתר.`;
}
