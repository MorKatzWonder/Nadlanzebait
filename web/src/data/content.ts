import type { SupportedLanguage } from "../i18n";
import type {
  Characteristic,
  Condition,
  LocalizedText,
  Neighborhood,
  PointOfInterest,
  PropertyType,
} from "./types";

/** Builds a fully-translated LocalizedText. enGB defaults to enUS when the wording doesn't differ. */
function L(parts: { he: string; enUS: string; enGB?: string; fr: string; ru: string; es: string }): LocalizedText {
  return {
    he: parts.he,
    "en-US": parts.enUS,
    "en-GB": parts.enGB ?? parts.enUS,
    fr: parts.fr,
    ru: parts.ru,
    es: parts.es,
  };
}

export const CITY: LocalizedText = L({
  he: "תל אביב",
  enUS: "Tel Aviv",
  fr: "Tel Aviv",
  ru: "Тель-Авив",
  es: "Tel Aviv",
});

export const AGENT_NAME: LocalizedText = L({
  he: "אריק נעים",
  enUS: "Arik Naim",
  fr: "Arik Naim",
  ru: "Арик Наим",
  es: "Arik Naim",
});
export const AGENT_PHONE_DISPLAY = "050-746-4403";
export const AGENT_PHONE_DIAL = "+972507464403";
export const AGENT_WHATSAPP_DIGITS = "972507464403";

/** Placeholder until Arik creates these accounts — swap in the real profile URLs. */
export const SOCIAL_LINKS = {
  instagram: "#",
  facebook: "#",
  tiktok: "#",
};
export const AGENT_OFFICE_ADDRESS: LocalizedText = L({
  he: "מרכז בעלי מלאכה 5, תל אביב",
  enUS: "Merkaz Baalei Melacha 5, Tel Aviv",
  fr: "Merkaz Baalei Melacha 5, Tel Aviv",
  ru: "Меркaз Баалей Мелаха 5, Тель-Авив",
  es: "Merkaz Baalei Melacha 5, Tel Aviv",
});
export const AGENT_HOURS: LocalizedText = L({
  he: "א׳–ה׳ 09:00–20:00 · ו׳ 09:00–13:00",
  enUS: "Sun–Thu 09:00–20:00 · Fri 09:00–13:00",
  fr: "Dim–jeu 09h00–20h00 · Ven 09h00–13h00",
  ru: "Вс–чт 09:00–20:00 · Пт 09:00–13:00",
  es: "Dom–jue 09:00–20:00 · Vie 09:00–13:00",
});

export const TYPE_LABELS: Record<PropertyType, LocalizedText> = {
  apt: L({ he: "דירה", enUS: "Apartment", enGB: "Flat", fr: "Appartement", ru: "Квартира", es: "Apartamento" }),
  garden: L({
    he: "דירת גן",
    enUS: "Garden apartment",
    enGB: "Garden flat",
    fr: "Appartement avec jardin",
    ru: "Квартира с садом",
    es: "Apartamento con jardín",
  }),
  pent: L({ he: "פנטהאוז", enUS: "Penthouse", fr: "Penthouse", ru: "Пентхаус", es: "Penthouse" }),
  duplex: L({ he: "דופלקס", enUS: "Duplex", fr: "Duplex", ru: "Дуплекс", es: "Dúplex" }),
  villa: L({
    he: "בית פרטי",
    enUS: "Private house",
    fr: "Maison individuelle",
    ru: "Частный дом",
    es: "Casa privada",
  }),
  cottage: L({ he: "קוטג׳", enUS: "Cottage", fr: "Cottage", ru: "Коттедж", es: "Casa de campo" }),
  studio: L({ he: "סטודיו", enUS: "Studio", fr: "Studio", ru: "Студия", es: "Estudio" }),
  roof: L({
    he: "דירת גג",
    enUS: "Roof apartment",
    enGB: "Roof flat",
    fr: "Appartement en toiture",
    ru: "Квартира на крыше",
    es: "Ático",
  }),
};

export const NEIGHBORHOOD_LABELS: Record<Neighborhood, LocalizedText> = {
  center: L({
    he: "לב העיר",
    enUS: "City Center",
    enGB: "City Centre",
    fr: "Centre-ville",
    ru: "Центр города",
    es: "Centro de la ciudad",
  }),
  florentin: L({
    he: "פלורנטין",
    enUS: "Florentin",
    fr: "Florentin",
    ru: "Флорентин",
    es: "Florentin",
  }),
  nevetzedek: L({
    he: "נווה צדק",
    enUS: "Neve Tzedek",
    fr: "Neve Tzedek",
    ru: "Неве-Цедек",
    es: "Neve Tzedek",
  }),
  oldnorth: L({
    he: "הצפון הישן",
    enUS: "Old North",
    fr: "Vieux Nord",
    ru: "Старый Север",
    es: "Viejo Norte",
  }),
  ramataviv: L({
    he: "רמת אביב",
    enUS: "Ramat Aviv",
    fr: "Ramat Aviv",
    ru: "Рамат-Авив",
    es: "Ramat Aviv",
  }),
  kerem: L({
    he: "כרם התימנים",
    enUS: "Kerem HaTeimanim",
    fr: "Kerem HaTeimanim",
    ru: "Керем ха-Тейманим",
    es: "Kerem HaTeimanim",
  }),
};

export const CONDITION_LABELS: Record<Condition, LocalizedText> = {
  new: L({
    he: "חדשה מקבלן",
    enUS: "New from contractor",
    fr: "Neuf, livré par le promoteur",
    ru: "Новостройка от застройщика",
    es: "Nueva, entregada por la constructora",
  }),
  likenew: L({ he: "כמו חדשה", enUS: "Like new", fr: "Comme neuf", ru: "Как новая", es: "Como nueva" }),
  renov: L({ he: "משופצת", enUS: "Renovated", fr: "Rénové", ru: "Отремонтированная", es: "Renovada" }),
  kept: L({
    he: "שמורה",
    enUS: "Well maintained",
    fr: "Bien entretenu",
    ru: "Хорошее состояние",
    es: "Bien conservada",
  }),
  good: L({
    he: "במצב טוב",
    enUS: "Good condition",
    fr: "Bon état",
    ru: "В хорошем состоянии",
    es: "Buen estado",
  }),
  needs: L({
    he: "דורשת שיפוץ",
    enUS: "Needs renovation",
    fr: "À rénover",
    ru: "Требует ремонта",
    es: "Necesita renovación",
  }),
  demo: L({
    he: "להריסה ובנייה",
    enUS: "For demolition",
    fr: "À démolir et reconstruire",
    ru: "Под снос",
    es: "Para demolición y reconstrucción",
  }),
};

export const CHARACTERISTIC_LABELS: Record<Characteristic, LocalizedText> = {
  renov: L({ he: "משופצת", enUS: "Renovated", fr: "Rénové", ru: "Отремонтированная", es: "Renovada" }),
  mamad: L({
    he: "ממ״ד",
    enUS: "Safe room",
    fr: "Pièce sécurisée (mamad)",
    ru: "Защищённая комната (мамад)",
    es: "Habitación blindada (mamad)",
  }),
  balc: L({
    he: "מרפסת שמש",
    enUS: "Sun balcony",
    fr: "Balcon ensoleillé",
    ru: "Солнечный балкон",
    es: "Balcón soleado",
  }),
  ac: L({ he: "מיזוג", enUS: "Air conditioning", fr: "Climatisation", ru: "Кондиционер", es: "Aire acondicionado" }),
  quiet: L({ he: "רחוב שקט", enUS: "Quiet street", fr: "Rue calme", ru: "Тихая улица", es: "Calle tranquila" }),
  tama: L({ he: "תמ״א 38", enUS: "Tama 38", fr: "Tama 38", ru: "Тама 38", es: "Tama 38" }),
  bright: L({ he: "מוארת", enUS: "Bright", fr: "Lumineux", ru: "Светлая", es: "Luminosa" }),
  high: L({
    he: "תקרות גבוהות",
    enUS: "High ceilings",
    fr: "Plafonds hauts",
    ru: "Высокие потолки",
    es: "Techos altos",
  }),
  entr: L({
    he: "כניסה פרטית",
    enUS: "Private entrance",
    fr: "Entrée privée",
    ru: "Отдельный вход",
    es: "Entrada privada",
  }),
  sea: L({ he: "נוף לים", enUS: "Sea view", fr: "Vue sur mer", ru: "Вид на море", es: "Vista al mar" }),
  now: L({
    he: "כניסה מיידית",
    enUS: "Immediate entry",
    fr: "Entrée immédiate",
    ru: "Свободна немедленно",
    es: "Entrega inmediata",
  }),
  shabbat: L({
    he: "מעלית שבת",
    enUS: "Shabbat elevator",
    enGB: "Shabbat lift",
    fr: "Ascenseur du Shabbat",
    ru: "Субботний лифт",
    es: "Ascensor de Shabat",
  }),
};

export const POI_LABELS: Record<PointOfInterest, LocalizedText> = {
  school: L({ he: "בתי ספר", enUS: "Schools", fr: "Écoles", ru: "Школы", es: "Escuelas" }),
  kinder: L({
    he: "גנים",
    enUS: "Kindergartens",
    fr: "Jardins d'enfants",
    ru: "Детские сады",
    es: "Jardines de infancia",
  }),
  park: L({ he: "פארק", enUS: "Park", fr: "Parc", ru: "Парк", es: "Parque" }),
  beach: L({ he: "הים", enUS: "Beach", fr: "Plage", ru: "Пляж", es: "Playa" }),
  rail: L({ he: "הרכבת הקלה", enUS: "Light rail", fr: "Tramway", ru: "Лёгкое метро", es: "Tren ligero" }),
  bus: L({
    he: "קווי אוטובוס",
    enUS: "Bus lines",
    fr: "Lignes de bus",
    ru: "Автобусные маршруты",
    es: "Líneas de autobús",
  }),
  super: L({ he: "סופרמרקט", enUS: "Supermarket", fr: "Supermarché", ru: "Супермаркет", es: "Supermercado" }),
  cafe: L({ he: "בתי קפה", enUS: "Cafés", fr: "Cafés", ru: "Кафе", es: "Cafés" }),
  syn: L({ he: "בית כנסת", enUS: "Synagogue", fr: "Synagogue", ru: "Синагога", es: "Sinagoga" }),
};

export interface PriceBand {
  key: string;
  label: LocalizedText;
  min?: number;
  max?: number;
}

export const PRICE_BANDS: PriceBand[] = [
  {
    key: "a",
    label: L({
      he: "עד 3 מיליון ש״ח",
      enUS: "Up to ₪3 million",
      fr: "Jusqu'à 3 millions ₪",
      ru: "До 3 миллионов ₪",
      es: "Hasta 3 millones ₪",
    }),
    max: 3_000_000,
  },
  {
    key: "b",
    label: L({
      he: "3–5 מיליון ש״ח",
      enUS: "₪3–5 million",
      fr: "3–5 millions ₪",
      ru: "3–5 миллионов ₪",
      es: "₪3–5 millones",
    }),
    min: 3_000_000,
    max: 5_000_000,
  },
  {
    key: "c",
    label: L({
      he: "5–8 מיליון ש״ח",
      enUS: "₪5–8 million",
      fr: "5–8 millions ₪",
      ru: "5–8 миллионов ₪",
      es: "₪5–8 millones",
    }),
    min: 5_000_000,
    max: 8_000_000,
  },
  {
    key: "d",
    label: L({
      he: "מעל 8 מיליון ש״ח",
      enUS: "₪8 million and up",
      fr: "Plus de 8 millions ₪",
      ru: "От 8 миллионов ₪",
      es: "Más de 8 millones ₪",
    }),
    min: 8_000_000,
  },
];

export const HOME_HERO = {
  kick: L({
    he: "מוכרים דירה בתל אביב",
    enUS: "Selling an apartment in Tel Aviv",
    enGB: "Selling a flat in Tel Aviv",
    fr: "Vente d'appartement à Tel Aviv",
    ru: "Продажа квартиры в Тель-Авиве",
    es: "Vender un apartamento en Tel Aviv",
  }),
  line1: L({
    he: "אנחנו לא מוכרים נכסים.",
    enUS: "We don’t sell properties.",
    fr: "Nous ne vendons pas des biens.",
    ru: "Мы не продаём недвижимость.",
    es: "No vendemos propiedades.",
  }),
  line2: L({
    he: "אנחנו מוכרים בתים.",
    enUS: "We sell homes.",
    fr: "Nous vendons des foyers.",
    ru: "Мы продаём дома.",
    es: "Vendemos hogares.",
  }),
  body: L({
    he: "הערכת שווי אמיתית, שיווק שמראה את הדירה כמו שהיא באמת, וניהול משא ומתן עד החתימה. 12 שנה באותן שכונות.",
    enUS:
      "A real valuation, marketing that shows the apartment as it actually is, and negotiation handled through to signature. Twelve years in the same neighborhoods.",
    enGB:
      "A real valuation, marketing that shows the flat as it actually is, and negotiation handled through to signature. Twelve years in the same neighbourhoods.",
    fr: "Une estimation réelle, un marketing qui montre l'appartement tel qu'il est vraiment, et une négociation menée jusqu'à la signature. Douze ans dans les mêmes quartiers.",
    ru: "Реальная оценка, маркетинг, который показывает квартиру такой, какая она есть на самом деле, и переговоры вплоть до подписания. Двенадцать лет в одних и тех же районах.",
    es: "Una tasación real, un marketing que muestra el apartamento tal como es, y una negociación llevada hasta la firma. Doce años en los mismos barrios.",
  }),
};

export const HOME_STATS: { n: string; l: LocalizedText }[] = [
  {
    n: "12",
    l: L({
      he: "שנים בשוק התל אביבי",
      enUS: "Years in the Tel Aviv market",
      fr: "Ans sur le marché de Tel Aviv",
      ru: "Лет на рынке Тель-Авива",
      es: "Años en el mercado de Tel Aviv",
    }),
  },
  {
    n: "400+",
    l: L({
      he: "דירות שנמכרו",
      enUS: "Apartments sold",
      enGB: "Flats sold",
      fr: "Appartements vendus",
      ru: "Проданных квартир",
      es: "Apartamentos vendidos",
    }),
  },
  {
    n: "28",
    l: L({
      he: "ימים בממוצע למכירה",
      enUS: "Average days to sale",
      fr: "Jours en moyenne avant la vente",
      ru: "Дней в среднем до продажи",
      es: "Días promedio hasta la venta",
    }),
  },
  {
    n: "98%",
    l: L({
      he: "מהמחיר המבוקש",
      enUS: "Of asking price",
      fr: "Du prix demandé",
      ru: "От запрашиваемой цены",
      es: "Del precio solicitado",
    }),
  },
];

export const HOME_STEPS_HEAD = {
  kick: L({
    he: "איך מוכרים איתנו",
    enUS: "Selling with us",
    fr: "Vendre avec nous",
    ru: "Продажа с нами",
    es: "Vender con nosotros",
  }),
  h: L({
    he: "שלושה שלבים, בלי הפתעות",
    enUS: "Three steps, no surprises",
    fr: "Trois étapes, sans surprise",
    ru: "Три шага, никаких сюрпризов",
    es: "Tres pasos, sin sorpresas",
  }),
};

export const HOME_STEPS: { n: string; title: LocalizedText; body: LocalizedText }[] = [
  {
    n: "01",
    title: L({ he: "הערכת שווי", enUS: "Valuation", fr: "Estimation", ru: "Оценка", es: "Tasación" }),
    body: L({
      he: "פגישה בנכס, השוואת עסקאות שנסגרו באותו רחוב ובאותה קומה, וטווח מחיר שאנחנו מוכנים לעמוד מאחוריו.",
      enUS:
        "A meeting at the property, comparable closed deals on the same street and floor, and a price range we stand behind.",
      fr: "Une visite du bien, des transactions comparables conclues dans la même rue et au même étage, et une fourchette de prix que nous assumons.",
      ru: "Встреча на объекте, сравнение закрытых сделок на той же улице и этаже, и ценовой диапазон, за который мы ручаемся.",
      es: "Una reunión en la propiedad, operaciones comparables cerradas en la misma calle y piso, y un rango de precio que respaldamos.",
    }),
  },
  {
    n: "02",
    title: L({
      he: "שיווק וצילום",
      enUS: "Marketing & photography",
      fr: "Marketing et photographie",
      ru: "Маркетинг и фотосъёмка",
      es: "Marketing y fotografía",
    }),
    body: L({
      he: "צילום מקצועי באור יום, תיאור מדויק, ופרסום בכל הפלטפורמות. סינון פניות לפני שאתם פוגשים מישהו.",
      enUS:
        "Professional daylight photography, an accurate description, listings on every platform, and enquiries screened before you meet anyone.",
      fr: "Photographie professionnelle en lumière du jour, description précise, diffusion sur toutes les plateformes, et présélection des demandes avant toute rencontre.",
      ru: "Профессиональная съёмка при дневном свете, точное описание, размещение на всех платформах и отбор обращений до личных встреч.",
      es: "Fotografía profesional con luz natural, una descripción precisa, publicación en todas las plataformas, y filtrado de consultas antes de conocer a nadie.",
    }),
  },
  {
    n: "03",
    title: L({
      he: "משא ומתן וסגירה",
      enUS: "Negotiation & closing",
      fr: "Négociation et clôture",
      ru: "Переговоры и закрытие сделки",
      es: "Negociación y cierre",
    }),
    body: L({
      he: "מנהלים את המשא ומתן מולכם בשקיפות מלאה, מלווים את הבדיקות המשפטיות ועד למסירת המפתח.",
      enUS:
        "We run the negotiation with full transparency, support the legal checks, and stay through to handover.",
      fr: "Nous menons la négociation en toute transparence, accompagnons les vérifications juridiques, et restons présents jusqu'à la remise des clés.",
      ru: "Мы ведём переговоры в полной прозрачности, сопровождаем юридическую проверку и остаёмся до передачи ключей.",
      es: "Llevamos la negociación con total transparencia, acompañamos las verificaciones legales, y permanecemos hasta la entrega.",
    }),
  },
];

export const FEATURED_HEAD = {
  kick: L({
    he: "נכסים נבחרים",
    enUS: "Selected properties",
    fr: "Biens sélectionnés",
    ru: "Избранные объекты",
    es: "Propiedades seleccionadas",
  }),
  h: L({
    he: "מה שיש עכשיו בשכונות שלנו",
    enUS: "What’s available in our neighborhoods",
    enGB: "What’s available in our neighbourhoods",
    fr: "Ce qui est disponible dans nos quartiers",
    ru: "Что сейчас доступно в наших районах",
    es: "Lo que hay disponible en nuestros barrios",
  }),
  all: L({
    he: "לכל הנכסים",
    enUS: "All properties",
    fr: "Tous les biens",
    ru: "Все объекты",
    es: "Todas las propiedades",
  }),
};

export const TESTIMONIALS_HEAD = {
  kick: L({ he: "לקוחות", enUS: "Clients", fr: "Clients", ru: "Клиенты", es: "Clientes" }),
  h: L({
    he: "מה אומרים אחרי החתימה",
    enUS: "What people say after signing",
    fr: "Ce que disent nos clients après la signature",
    ru: "Что говорят после подписания",
    es: "Lo que dicen después de firmar",
  }),
};

export const ABOUT = {
  kick: L({ he: "המשרד", enUS: "The office", fr: "Le bureau", ru: "Офис", es: "La oficina" }),
  h: L({
    he: "מרכז בעלי מלאכה 5, תל אביב",
    enUS: "Merkaz Baalei Melacha 5, Tel Aviv",
    fr: "Merkaz Baalei Melacha 5, Tel Aviv",
    ru: "Меркaз Баалей Мелаха 5, Тель-Авив",
    es: "Merkaz Baalei Melacha 5, Tel Aviv",
  }),
  paragraphs: [
    L({
      he: "המשרד פתוח לפגישות בתיאום מראש. יושבים, מסתכלים על מספרים אמיתיים, ומחליטים אם יש כאן עסקה.",
      enUS:
        "Open for meetings by appointment. We sit down, look at real numbers, and decide whether there’s a deal here.",
      fr: "Ouvert pour des rendez-vous sur demande. Nous nous asseyons, examinons de vrais chiffres, et décidons s'il y a une affaire à faire.",
      ru: "Приём по предварительной записи. Мы садимся, смотрим на реальные цифры и решаем, есть ли здесь сделка.",
      es: "Abierto para reuniones con cita previa. Nos sentamos, miramos números reales, y decidimos si hay un negocio aquí.",
    }),
    L({
      he: "אריק נעים מלווה מוכרים וקונים בתל אביב מ־2014. אותו איש קשר מהפגישה הראשונה ועד המסירה.",
      enUS:
        "Arik Naim has worked with sellers and buyers in Tel Aviv since 2014. The same point of contact from first meeting to handover.",
      fr: "Arik Naim accompagne vendeurs et acheteurs à Tel Aviv depuis 2014. Le même interlocuteur, de la première rencontre jusqu'à la remise des clés.",
      ru: "Арик Наим работает с продавцами и покупателями в Тель-Авиве с 2014 года. Один и тот же контакт от первой встречи до передачи ключей.",
      es: "Arik Naim trabaja con vendedores y compradores en Tel Aviv desde 2014. El mismo contacto desde la primera reunión hasta la entrega.",
    }),
  ],
  slot: L({
    he: "תמונת המשרד",
    enUS: "Office photograph",
    fr: "Photo du bureau",
    ru: "Фото офиса",
    es: "Foto de la oficina",
  }),
};

export const VALUATION_FORM_HEAD = {
  kick: L({ he: "הערכת שווי", enUS: "Valuation", fr: "Estimation", ru: "Оценка", es: "Tasación" }),
  h: L({
    he: "נשמח לחזור אליכם היום",
    enUS: "We’ll get back to you today",
    fr: "Nous vous répondrons aujourd'hui",
    ru: "Мы свяжемся с вами сегодня",
    es: "Le responderemos hoy",
  }),
};

export const BUYER_INQUIRY_HEAD = {
  kick: L({ he: "מתעניינים בנכס", enUS: "Buying", fr: "Achat", ru: "Покупка", es: "Compra" }),
  h: L({
    he: "נשמח לחזור אליכם היום",
    enUS: "We’ll get back to you today",
    fr: "Nous vous répondrons aujourd'hui",
    ru: "Мы свяжемся с вами сегодня",
    es: "Le responderemos hoy",
  }),
};

export function waHref(digits: string, message: string): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

const LISTING_WA_MESSAGE: Record<SupportedLanguage, (address: string) => string> = {
  he: (a) => `שלום, מתעניין בנכס ב${a} שראיתי באתר.`,
  "en-US": (a) => `Hello, I'm interested in the property at ${a} I saw on your site.`,
  "en-GB": (a) => `Hello, I'm interested in the property at ${a} I saw on your site.`,
  fr: (a) => `Bonjour, je suis intéressé(e) par le bien situé ${a} que j'ai vu sur votre site.`,
  ru: (a) => `Здравствуйте, меня интересует объект по адресу ${a}, который я увидел(а) на вашем сайте.`,
  es: (a) => `Hola, estoy interesado/a en la propiedad en ${a} que vi en su sitio web.`,
};

export function listingWaMessage(language: SupportedLanguage, address: string): string {
  return LISTING_WA_MESSAGE[language](address);
}
