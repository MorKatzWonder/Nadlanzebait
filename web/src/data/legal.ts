import { AGENT_BROKER_LICENSE, AGENT_BUSINESS_ID, AGENT_PHONE_DISPLAY, L } from "./content";
import type { LocalizedText } from "./types";

/**
 * Accessibility statement, privacy policy and terms of use — hand-written in
 * all six languages like the rest of the site copy. Hebrew is the governing
 * text. Should get a quick review by an Israeli lawyer before launch (see
 * ROADMAP.md); bump LEGAL_LAST_UPDATED whenever the wording changes.
 */

export type LegalDocKey = "accessibility" | "privacy" | "terms";

export interface LegalSection {
  h: LocalizedText;
  /** Paragraphs. A paragraph starting with "• " renders as a list item. */
  body: LocalizedText[];
}

export interface LegalDoc {
  kick: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  sections: LegalSection[];
}

export const LEGAL_LAST_UPDATED = "2026-09-28";

const PHONE = AGENT_PHONE_DISPLAY;
const LIC = AGENT_BROKER_LICENSE;
const BIZ = AGENT_BUSINESS_ID;

const accessibility: LegalDoc = {
  kick: L({ he: "נגישות", enUS: "Accessibility", fr: "Accessibilité", ru: "Доступность", es: "Accesibilidad" }),
  title: L({
    he: "הצהרת נגישות",
    enUS: "Accessibility statement",
    fr: "Déclaration d'accessibilité",
    ru: "Заявление о доступности",
    es: "Declaración de accesibilidad",
  }),
  intro: L({
    he: "אנחנו מאמינים שכל אחד ואחת צריכים להיות מסוגלים למצוא בית, להעריך נכס וליצור איתנו קשר בקלות — כולל אנשים עם מוגבלות. האתר נבנה מתוך מחויבות לנגישות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ״ח-1998, ולתקנות שהותקנו מכוחו.",
    enUS: "We believe everyone should be able to find a home, get a property valued and reach us easily — including people with disabilities. This site was built with a commitment to accessibility, in line with Israel's Equal Rights for Persons with Disabilities Law, 5758-1998, and the regulations made under it.",
    fr: "Nous pensons que chacun doit pouvoir trouver un logement, faire estimer un bien et nous contacter facilement — y compris les personnes en situation de handicap. Ce site a été conçu avec un engagement en matière d'accessibilité, conformément à la loi israélienne sur l'égalité des droits des personnes handicapées (5758-1998) et à ses règlements d'application.",
    ru: "Мы считаем, что каждый должен иметь возможность легко найти жильё, оценить объект и связаться с нами — в том числе люди с инвалидностью. Сайт создан с учётом требований доступности в соответствии с израильским Законом о равных правах людей с инвалидностью (5758-1998) и принятыми на его основе постановлениями.",
    es: "Creemos que todas las personas deben poder encontrar un hogar, tasar una propiedad y contactarnos con facilidad, incluidas las personas con discapacidad. Este sitio se construyó con un compromiso con la accesibilidad, de acuerdo con la Ley israelí de Igualdad de Derechos para Personas con Discapacidad (5758-1998) y sus reglamentos.",
  }),
  sections: [
    {
      h: L({ he: "רמת הנגישות", enUS: "Accessibility level", fr: "Niveau d'accessibilité", ru: "Уровень доступности", es: "Nivel de accesibilidad" }),
      body: [
        L({
          he: "האתר מותאם, ככל הניתן, לדרישות התקן הישראלי ת״י 5568 ברמה AA, המבוסס על הנחיות WCAG 2.0 של ארגון W3C.",
          enUS: "As far as possible, the site conforms to Israeli Standard IS 5568 at level AA, which is based on the W3C's WCAG 2.0 guidelines.",
          fr: "Dans la mesure du possible, le site est conforme à la norme israélienne SI 5568 au niveau AA, fondée sur les lignes directrices WCAG 2.0 du W3C.",
          ru: "Насколько это возможно, сайт соответствует израильскому стандарту SI 5568 на уровне AA, основанному на рекомендациях WCAG 2.0 консорциума W3C.",
          es: "En la medida de lo posible, el sitio cumple con la norma israelí SI 5568 en el nivel AA, basada en las pautas WCAG 2.0 del W3C.",
        }),
      ],
    },
    {
      h: L({ he: "מה עשינו", enUS: "What we've done", fr: "Ce que nous avons fait", ru: "Что мы сделали", es: "Lo que hemos hecho" }),
      body: [
        L({
          he: "• מבנה עמודים סמנטי עם כותרות, ניווט ואזורים מוגדרים, שקורא מסך יכול לזהות.",
          enUS: "• Semantic page structure — headings, navigation and landmarks that screen readers can identify.",
          fr: "• Structure sémantique des pages — titres, navigation et zones identifiables par les lecteurs d'écran.",
          ru: "• Семантическая структура страниц — заголовки, навигация и области, распознаваемые экранными дикторами.",
          es: "• Estructura semántica de las páginas: encabezados, navegación y zonas que los lectores de pantalla pueden identificar.",
        }),
        L({
          he: "• ניווט מלא באמצעות המקלדת, עם סימון פוקוס בולט.",
          enUS: "• Full keyboard navigation with a clearly visible focus indicator.",
          fr: "• Navigation complète au clavier avec un indicateur de focus bien visible.",
          ru: "• Полная навигация с клавиатуры с хорошо заметным индикатором фокуса.",
          es: "• Navegación completa con teclado y un indicador de foco bien visible.",
        }),
        L({
          he: "• טקסט חלופי לתמונות הנכסים, ותוויות לכל שדות הטופס ולכפתורים.",
          enUS: "• Alternative text for property photos, and labels for every form field and button.",
          fr: "• Texte alternatif pour les photos des biens, et libellés pour chaque champ de formulaire et chaque bouton.",
          ru: "• Альтернативный текст для фотографий объектов и подписи ко всем полям формы и кнопкам.",
          es: "• Texto alternativo para las fotos de las propiedades y etiquetas en todos los campos del formulario y botones.",
        }),
        L({
          he: "• ניגודיות צבעים גבוהה, טקסט שניתן להגדיל עד 200% ללא אובדן תוכן, ותצוגה מותאמת לנייד.",
          enUS: "• High color contrast, text that can be enlarged to 200% without losing content, and a mobile-friendly layout.",
          enGB: "• High colour contrast, text that can be enlarged to 200% without losing content, and a mobile-friendly layout.",
          fr: "• Contraste élevé, texte agrandissable jusqu'à 200 % sans perte de contenu, et affichage adapté au mobile.",
          ru: "• Высокая контрастность, возможность увеличить текст до 200% без потери содержимого и адаптация для мобильных устройств.",
          es: "• Alto contraste de color, texto ampliable hasta el 200 % sin pérdida de contenido y diseño adaptado a móviles.",
        }),
        L({
          he: "• תמיכה מלאה בעברית מימין לשמאל ובחמש שפות נוספות.",
          enUS: "• Full right-to-left Hebrew support, plus five more languages.",
          fr: "• Prise en charge complète de l'hébreu (de droite à gauche) et de cinq autres langues.",
          ru: "• Полная поддержка иврита (справа налево) и ещё пяти языков.",
          es: "• Compatibilidad total con el hebreo (de derecha a izquierda) y cinco idiomas más.",
        }),
        L({
          he: "לא הותקן באתר תוסף נגישות חיצוני — ההתאמות נבנו בקוד האתר עצמו, ונבדקות בכל עדכון.",
          enUS: "No third-party accessibility overlay is installed — the adjustments are built into the site's own code and checked with every update.",
          fr: "Aucun module d'accessibilité externe n'est installé : les adaptations sont intégrées au code du site et vérifiées à chaque mise à jour.",
          ru: "Сторонние плагины доступности не используются — все адаптации встроены в код сайта и проверяются при каждом обновлении.",
          es: "No se ha instalado ningún complemento de accesibilidad externo: los ajustes están integrados en el código del sitio y se revisan en cada actualización.",
        }),
      ],
    },
    {
      h: L({ he: "מגבלות ידועות", enUS: "Known limitations", fr: "Limites connues", ru: "Известные ограничения", es: "Limitaciones conocidas" }),
      body: [
        L({
          he: "למרות מאמצינו, ייתכן שחלקים מסוימים באתר עדיין אינם נגישים במלואם — למשל תמונות נכסים שהועלו לאחרונה, או תוכן של שירותים חיצוניים כמו וואטסאפ. אם נתקלתם בבעיה, נשמח לדעת ולתקן.",
          enUS: "Despite our efforts, some parts of the site may not yet be fully accessible — for example newly uploaded property photos, or content from external services such as WhatsApp. If you run into a problem, we'd like to hear about it and fix it.",
          fr: "Malgré nos efforts, certaines parties du site peuvent ne pas encore être entièrement accessibles — par exemple des photos de biens récemment ajoutées, ou le contenu de services externes comme WhatsApp. Si vous rencontrez un problème, dites-le-nous et nous le corrigerons.",
          ru: "Несмотря на наши усилия, некоторые части сайта могут быть ещё не полностью доступны — например, недавно загруженные фотографии объектов или содержимое внешних сервисов, таких как WhatsApp. Если вы столкнулись с проблемой, сообщите нам, и мы её исправим.",
          es: "A pesar de nuestros esfuerzos, algunas partes del sitio pueden no ser todavía totalmente accesibles, por ejemplo fotos de propiedades subidas recientemente o contenido de servicios externos como WhatsApp. Si encuentra un problema, nos gustaría saberlo para corregirlo.",
        }),
      ],
    },
    {
      h: L({
        he: "רכז הנגישות ופניות בנושא נגישות",
        enUS: "Accessibility contact",
        fr: "Contact accessibilité",
        ru: "Контакт по вопросам доступности",
        es: "Contacto de accesibilidad",
      }),
      body: [
        L({
          he: `רכז הנגישות: אריק נעים · טלפון ווואטסאפ: ${PHONE}. נשמח לקבל פניות, הערות והצעות לשיפור, ונשתדל להשיב תוך 5 ימי עבודה. כדי שנוכל לטפל בפנייה, אנא ציינו את הבעיה, את העמוד שבו נתקלתם בה, ואת הדפדפן וטכנולוגיית העזר שבהם השתמשתם.`,
          enUS: `Accessibility coordinator: Arik Naim · phone and WhatsApp: ${PHONE}. We welcome questions, comments and suggestions and aim to reply within 5 business days. To help us, please describe the problem, the page where you found it, and the browser and assistive technology you were using.`,
          fr: `Référent accessibilité : Arik Naim · téléphone et WhatsApp : ${PHONE}. Nous accueillons volontiers vos questions, remarques et suggestions et nous efforçons de répondre sous 5 jours ouvrés. Pour nous aider, merci de décrire le problème, la page concernée, ainsi que le navigateur et la technologie d'assistance utilisés.`,
          ru: `Координатор по доступности: Арик Наим · телефон и WhatsApp: ${PHONE}. Мы будем рады вопросам, замечаниям и предложениям и постараемся ответить в течение 5 рабочих дней. Пожалуйста, опишите проблему, страницу, на которой она возникла, а также браузер и вспомогательную технологию, которые вы использовали.`,
          es: `Coordinador de accesibilidad: Arik Naim · teléfono y WhatsApp: ${PHONE}. Agradecemos sus preguntas, comentarios y sugerencias y procuramos responder en un plazo de 5 días hábiles. Para ayudarnos, describa el problema, la página donde lo encontró y el navegador y la tecnología de apoyo que utilizaba.`,
        }),
      ],
    },
  ],
};

const privacy: LegalDoc = {
  kick: L({ he: "פרטיות", enUS: "Privacy", fr: "Confidentialité", ru: "Конфиденциальность", es: "Privacidad" }),
  title: L({
    he: "מדיניות פרטיות",
    enUS: "Privacy policy",
    fr: "Politique de confidentialité",
    ru: "Политика конфиденциальности",
    es: "Política de privacidad",
  }),
  intro: L({
    he: "הפרטיות שלכם חשובה לנו. מדיניות זו מסבירה איזה מידע אנחנו אוספים באתר, למה, איפה הוא נשמר ואילו זכויות יש לכם, בהתאם לחוק הגנת הפרטיות, התשמ״א-1981, ולתקנות שהותקנו מכוחו.",
    enUS: "Your privacy matters to us. This policy explains what information we collect on this site, why, where it's stored and what rights you have, in line with Israel's Protection of Privacy Law, 5741-1981, and the regulations made under it.",
    fr: "Votre vie privée compte pour nous. Cette politique explique quelles informations nous collectons sur ce site, pourquoi, où elles sont conservées et quels sont vos droits, conformément à la loi israélienne sur la protection de la vie privée (5741-1981) et à ses règlements.",
    ru: "Ваша конфиденциальность важна для нас. Эта политика объясняет, какую информацию мы собираем на сайте, зачем, где она хранится и какие у вас есть права — в соответствии с израильским Законом о защите частной жизни (5741-1981) и принятыми на его основе постановлениями.",
    es: "Su privacidad es importante para nosotros. Esta política explica qué información recopilamos en este sitio, por qué, dónde se guarda y qué derechos tiene, de acuerdo con la Ley israelí de Protección de la Privacidad (5741-1981) y sus reglamentos.",
  }),
  sections: [
    {
      h: L({ he: "מי אנחנו", enUS: "Who we are", fr: "Qui sommes-nous", ru: "Кто мы", es: "Quiénes somos" }),
      body: [
        L({
          he: `האתר מופעל על ידי אריק נעים, מתווך מקרקעין מורשה (רישיון מס׳ ${LIC}), עוסק מורשה ${BIZ}, מרכז בעלי מלאכה 5, תל אביב. טלפון: ${PHONE}.`,
          enUS: `This site is operated by Arik Naim, licensed real-estate broker (license no. ${LIC}), business reg. no. ${BIZ}, Merkaz Baalei Melacha 5, Tel Aviv. Phone: ${PHONE}.`,
          fr: `Ce site est exploité par Arik Naim, agent immobilier agréé (licence n° ${LIC}), n° d'entreprise ${BIZ}, Merkaz Baalei Melacha 5, Tel Aviv. Téléphone : ${PHONE}.`,
          ru: `Сайт принадлежит Арику Наиму, лицензированному риелтору (лицензия № ${LIC}), рег. номер предприятия ${BIZ}, Мерказ Баалей Мелаха 5, Тель-Авив. Телефон: ${PHONE}.`,
          es: `Este sitio es operado por Arik Naim, agente inmobiliario con licencia (licencia n.º ${LIC}), n.º de registro comercial ${BIZ}, Merkaz Baalei Melacha 5, Tel Aviv. Teléfono: ${PHONE}.`,
        }),
      ],
    },
    {
      h: L({ he: "איזה מידע אנחנו אוספים", enUS: "What we collect", fr: "Ce que nous collectons", ru: "Какие данные мы собираем", es: "Qué datos recopilamos" }),
      body: [
        L({
          he: "רק את מה שאתם בוחרים למסור לנו בטופס יצירת הקשר: שם, טלפון, כתובת הנכס או האזור שמעניין אתכם, סוג הנכס, הערה חופשית, ושפת האתר שבה השתמשתם. אינכם חייבים למסור מידע זה, אך בלעדיו לא נוכל לחזור אליכם.",
          enUS: "Only what you choose to give us in the contact form: your name, phone number, the property address or area you're interested in, property type, an optional note, and the site language you used. You're not required to provide it, but without it we can't get back to you.",
          fr: "Uniquement ce que vous choisissez de nous transmettre via le formulaire de contact : nom, téléphone, adresse du bien ou quartier recherché, type de bien, une remarque facultative et la langue du site utilisée. Vous n'êtes pas obligé(e) de les fournir, mais sans elles nous ne pourrons pas vous recontacter.",
          ru: "Только то, что вы сами указываете в контактной форме: имя, телефон, адрес объекта или интересующий район, тип объекта, необязательный комментарий и язык сайта. Вы не обязаны предоставлять эти данные, но без них мы не сможем с вами связаться.",
          es: "Solo lo que usted decide darnos en el formulario de contacto: nombre, teléfono, dirección de la propiedad o zona de interés, tipo de propiedad, una nota opcional y el idioma del sitio que utilizó. No está obligado a facilitarlos, pero sin ellos no podremos responderle.",
        }),
        L({
          he: "האתר אינו משתמש בעוגיות (Cookies), בכלי אנליטיקה או בפיקסלים של פרסום. הדפדפן שלכם שומר מקומית רק את השפה שבחרתם, כדי להציג אותה בביקור הבא — המידע הזה לא נשלח אלינו.",
          enUS: "The site doesn't use cookies, analytics tools or advertising pixels. Your browser stores only your chosen language locally, so it's shown on your next visit — that information is never sent to us.",
          enGB: "The site doesn't use cookies, analytics tools or advertising pixels. Your browser stores only your chosen language locally, so it's shown on your next visit — that information is never sent to us.",
          fr: "Le site n'utilise ni cookies, ni outils d'analyse, ni pixels publicitaires. Votre navigateur conserve uniquement la langue choisie, localement, pour l'afficher lors de votre prochaine visite — cette information ne nous est jamais transmise.",
          ru: "Сайт не использует файлы cookie, инструменты аналитики или рекламные пиксели. Ваш браузер локально сохраняет только выбранный язык, чтобы показать его при следующем визите, — эти данные нам не передаются.",
          es: "El sitio no utiliza cookies, herramientas de analítica ni píxeles publicitarios. Su navegador guarda localmente solo el idioma elegido para mostrarlo en su próxima visita; esa información nunca se nos envía.",
        }),
      ],
    },
    {
      h: L({ he: "למה אנחנו משתמשים במידע", enUS: "How we use it", fr: "Utilisation des données", ru: "Как мы используем данные", es: "Para qué los usamos" }),
      body: [
        L({
          he: "כדי לחזור אליכם, לתאם הערכת שווי או סיור בנכס, ולתת לכם שירות תיווך. לא נשלח לכם דיוור פרסומי ללא הסכמה נפרדת, ולא נמכור או נשכיר את המידע שלכם לאף אחד.",
          enUS: "To get back to you, arrange a valuation or a viewing, and provide brokerage services. We won't send you marketing messages without separate consent, and we never sell or rent your information to anyone.",
          fr: "Pour vous recontacter, organiser une estimation ou une visite et vous fournir nos services d'agence. Nous ne vous enverrons pas de messages publicitaires sans consentement distinct, et nous ne vendons ni ne louons jamais vos données.",
          ru: "Чтобы связаться с вами, организовать оценку или просмотр объекта и оказать риелторские услуги. Мы не отправляем рекламные сообщения без отдельного согласия и никому не продаём и не передаём в аренду ваши данные.",
          es: "Para responderle, organizar una tasación o una visita y prestarle servicios de intermediación. No le enviaremos mensajes publicitarios sin un consentimiento aparte y nunca venderemos ni alquilaremos sus datos a nadie.",
        }),
      ],
    },
    {
      h: L({ he: "איפה המידע נשמר ומי נותן לנו שירות", enUS: "Where it's stored and who helps us", fr: "Stockage et prestataires", ru: "Где хранятся данные и кто нам помогает", es: "Dónde se guardan y quién nos ayuda" }),
      body: [
        L({
          he: "• וואטסאפ (Meta) — שליחת הטופס פותחת שיחת וואטסאפ עם הפרטים שמילאתם. השיחה כפופה למדיניות הפרטיות של וואטסאפ.",
          enUS: "• WhatsApp (Meta) — submitting the form opens a WhatsApp chat with the details you entered. That chat is subject to WhatsApp's privacy policy.",
          fr: "• WhatsApp (Meta) — l'envoi du formulaire ouvre une conversation WhatsApp avec les informations saisies, soumise à la politique de confidentialité de WhatsApp.",
          ru: "• WhatsApp (Meta) — отправка формы открывает чат WhatsApp с введёнными данными. На этот чат распространяется политика конфиденциальности WhatsApp.",
          es: "• WhatsApp (Meta): al enviar el formulario se abre un chat de WhatsApp con los datos introducidos, sujeto a la política de privacidad de WhatsApp.",
        }),
        L({
          he: "• Google — עותק של הפנייה נשמר בגיליון Google Sheets פרטי שרק אנחנו ניגשים אליו, כגיבוי למקרה שהודעת הוואטסאפ לא נשלחה. גופני האתר נטענים משירות Google Fonts, שמקבל את כתובת ה-IP של הדפדפן.",
          enUS: "• Google — a copy of your enquiry is saved to a private Google Sheet only we can access, as a backup in case the WhatsApp message wasn't sent. The site's fonts load from Google Fonts, which receives your browser's IP address.",
          enGB: "• Google — a copy of your enquiry is saved to a private Google Sheet only we can access, as a backup in case the WhatsApp message wasn't sent. The site's fonts load from Google Fonts, which receives your browser's IP address.",
          fr: "• Google — une copie de votre demande est enregistrée dans une feuille Google Sheets privée à laquelle nous seuls avons accès, au cas où le message WhatsApp n'aurait pas été envoyé. Les polices du site sont chargées depuis Google Fonts, qui reçoit l'adresse IP de votre navigateur.",
          ru: "• Google — копия вашего обращения сохраняется в закрытой таблице Google Sheets, доступной только нам, на случай если сообщение в WhatsApp не было отправлено. Шрифты сайта загружаются из Google Fonts, который получает IP-адрес вашего браузера.",
          es: "• Google: una copia de su consulta se guarda en una hoja de Google Sheets privada a la que solo nosotros accedemos, como respaldo por si el mensaje de WhatsApp no se envió. Las fuentes del sitio se cargan desde Google Fonts, que recibe la dirección IP de su navegador.",
        }),
        L({
          he: "• GitHub Pages — שירות האחסון של האתר, שעשוי לרשום נתוני גלישה טכניים בסיסיים (כמו כתובת IP) לצורכי אבטחה.",
          enUS: "• GitHub Pages — the site's hosting service, which may log basic technical data (such as IP address) for security purposes.",
          fr: "• GitHub Pages — l'hébergeur du site, qui peut enregistrer des données techniques de base (comme l'adresse IP) à des fins de sécurité.",
          ru: "• GitHub Pages — хостинг сайта, который может записывать базовые технические данные (например, IP-адрес) в целях безопасности.",
          es: "• GitHub Pages: el servicio de alojamiento del sitio, que puede registrar datos técnicos básicos (como la dirección IP) por motivos de seguridad.",
        }),
        L({
          he: "חלק מהשירותים האלה שומרים מידע בשרתים מחוץ לישראל.",
          enUS: "Some of these services store data on servers outside Israel.",
          fr: "Certains de ces services stockent des données sur des serveurs situés hors d'Israël.",
          ru: "Некоторые из этих сервисов хранят данные на серверах за пределами Израиля.",
          es: "Algunos de estos servicios almacenan datos en servidores fuera de Israel.",
        }),
      ],
    },
    {
      h: L({ he: "כמה זמן ואבטחה", enUS: "Retention and security", fr: "Conservation et sécurité", ru: "Срок хранения и безопасность", es: "Conservación y seguridad" }),
      body: [
        L({
          he: "נשמור את פרטי הפנייה כל עוד הם נחוצים לטיפול בה ולמתן השירות, או כנדרש בחוק, ולאחר מכן נמחק אותם. אנחנו נוקטים אמצעים סבירים להגנה על המידע, אך אין אבטחה מושלמת ברשת.",
          enUS: "We keep enquiry details for as long as they're needed to handle it and provide our service, or as required by law, and then delete them. We take reasonable measures to protect your information, but no online security is perfect.",
          fr: "Nous conservons les informations de votre demande aussi longtemps que nécessaire pour la traiter et vous servir, ou selon les exigences légales, puis nous les supprimons. Nous prenons des mesures raisonnables pour les protéger, mais aucune sécurité en ligne n'est parfaite.",
          ru: "Мы храним данные обращения столько, сколько нужно для его обработки и оказания услуги или сколько требует закон, после чего удаляем их. Мы принимаем разумные меры для защиты данных, но абсолютной безопасности в интернете не существует.",
          es: "Conservamos los datos de la consulta mientras sean necesarios para atenderla y prestar el servicio, o según exija la ley, y después los eliminamos. Tomamos medidas razonables para protegerlos, pero ninguna seguridad en línea es perfecta.",
        }),
      ],
    },
    {
      h: L({ he: "הזכויות שלכם", enUS: "Your rights", fr: "Vos droits", ru: "Ваши права", es: "Sus derechos" }),
      body: [
        L({
          he: `אתם רשאים לעיין במידע שנשמר עליכם, לבקש לתקן אותו או לבקש שנמחק אותו. אפשר לפנות אלינו בטלפון או בוואטסאפ: ${PHONE}.`,
          enUS: `You may ask to see the information we hold about you, have it corrected, or have it deleted. Contact us by phone or WhatsApp: ${PHONE}.`,
          fr: `Vous pouvez demander à consulter les informations vous concernant, à les faire corriger ou à les faire supprimer. Contactez-nous par téléphone ou WhatsApp : ${PHONE}.`,
          ru: `Вы можете запросить доступ к хранящимся о вас данным, их исправление или удаление. Свяжитесь с нами по телефону или в WhatsApp: ${PHONE}.`,
          es: `Puede solicitar ver la información que tenemos sobre usted, corregirla o eliminarla. Contáctenos por teléfono o WhatsApp: ${PHONE}.`,
        }),
        L({
          he: "אנו עשויים לעדכן מדיניות זו מעת לעת; תאריך העדכון האחרון מופיע בראש העמוד.",
          enUS: "We may update this policy from time to time; the last-updated date appears at the top of the page.",
          fr: "Nous pouvons mettre à jour cette politique de temps à autre ; la date de dernière mise à jour figure en haut de la page.",
          ru: "Мы можем время от времени обновлять эту политику; дата последнего обновления указана вверху страницы.",
          es: "Podemos actualizar esta política periódicamente; la fecha de la última actualización aparece al principio de la página.",
        }),
      ],
    },
  ],
};

const terms: LegalDoc = {
  kick: L({ he: "תקנון", enUS: "Terms", fr: "Conditions", ru: "Условия", es: "Términos" }),
  title: L({
    he: "תקנון ותנאי שימוש",
    enUS: "Terms of use",
    fr: "Conditions d'utilisation",
    ru: "Условия использования",
    es: "Términos de uso",
  }),
  intro: L({
    he: `ברוכים הבאים לאתר ״נדל״ן זה בית״, המופעל על ידי אריק נעים, מתווך מקרקעין מורשה (רישיון מס׳ ${LIC}, עוסק מורשה ${BIZ}). השימוש באתר מהווה הסכמה לתנאים שלהלן. התקנון מנוסח בלשון רבים ומיועד לכל המגדרים.`,
    enUS: `Welcome to Home Real Estate, operated by Arik Naim, licensed real-estate broker (license no. ${LIC}, business reg. no. ${BIZ}). By using this site you agree to the terms below.`,
    fr: `Bienvenue sur Home Real Estate, exploité par Arik Naim, agent immobilier agréé (licence n° ${LIC}, n° d'entreprise ${BIZ}). En utilisant ce site, vous acceptez les conditions ci-dessous.`,
    ru: `Добро пожаловать на сайт Home Real Estate, принадлежащий Арику Наиму, лицензированному риелтору (лицензия № ${LIC}, рег. номер предприятия ${BIZ}). Пользуясь сайтом, вы соглашаетесь с приведёнными ниже условиями.`,
    es: `Bienvenido a Home Real Estate, operado por Arik Naim, agente inmobiliario con licencia (licencia n.º ${LIC}, n.º de registro comercial ${BIZ}). Al usar este sitio, acepta los términos que se indican a continuación.`,
  }),
  sections: [
    {
      h: L({ he: "מידע על נכסים", enUS: "Property information", fr: "Informations sur les biens", ru: "Информация об объектах", es: "Información de las propiedades" }),
      body: [
        L({
          he: "פרטי הנכסים, המחירים, השטחים והתמונות באתר מוצגים לצורך מידע כללי בלבד, על סמך מידע שהתקבל מבעלי הנכסים. הם עשויים להשתנות או להתעדכן ללא הודעה מוקדמת, ואינם מהווים הצעה מחייבת. יש לבדוק ולאמת את כל הפרטים לפני כל התקשרות.",
          enUS: "Property details, prices, sizes and photos on this site are for general information only, based on information provided by the owners. They may change without notice and do not constitute a binding offer. Please check and verify all details before entering into any agreement.",
          fr: "Les détails, prix, surfaces et photos des biens sont fournis à titre d'information générale uniquement, sur la base des informations transmises par les propriétaires. Ils peuvent changer sans préavis et ne constituent pas une offre ferme. Vérifiez tous les détails avant tout engagement.",
          ru: "Сведения об объектах, цены, площади и фотографии на сайте носят исключительно информационный характер и основаны на данных, предоставленных владельцами. Они могут меняться без предупреждения и не являются обязывающим предложением. Перед заключением любой сделки проверьте все данные.",
          es: "Los datos, precios, superficies y fotos de las propiedades se ofrecen solo con fines informativos, según la información proporcionada por los propietarios. Pueden cambiar sin previo aviso y no constituyen una oferta vinculante. Verifique todos los datos antes de firmar cualquier acuerdo.",
        }),
      ],
    },
    {
      h: L({ he: "הערכת שווי", enUS: "Valuations", fr: "Estimations", ru: "Оценка стоимости", es: "Tasaciones" }),
      body: [
        L({
          he: "הערכת שווי שניתנת על ידינו היא הערכת שוק של מתווך, המבוססת על עסקאות דומות וניסיון מקצועי. היא אינה שומת מקרקעין של שמאי מוסמך, ואין לראות בה ייעוץ משפטי, מיסויי או פיננסי.",
          enUS: "A valuation we give is a broker's market estimate, based on comparable deals and professional experience. It is not a formal appraisal by a certified appraiser and is not legal, tax or financial advice.",
          fr: "L'estimation que nous fournissons est une évaluation de marché d'agent immobilier, fondée sur des transactions comparables et notre expérience. Il ne s'agit pas d'une expertise officielle par un expert agréé, ni d'un conseil juridique, fiscal ou financier.",
          ru: "Наша оценка — это рыночная оценка риелтора, основанная на сопоставимых сделках и профессиональном опыте. Она не является официальной оценкой сертифицированного оценщика и не является юридической, налоговой или финансовой консультацией.",
          es: "La tasación que ofrecemos es una estimación de mercado de un agente inmobiliario, basada en operaciones comparables y experiencia profesional. No es una tasación oficial de un tasador certificado ni constituye asesoramiento jurídico, fiscal o financiero.",
        }),
      ],
    },
    {
      h: L({ he: "דמי תיווך", enUS: "Brokerage fees", fr: "Honoraires d'agence", ru: "Комиссия риелтора", es: "Honorarios de intermediación" }),
      body: [
        L({
          he: "השימוש באתר אינו כרוך בתשלום. דמי תיווך ייגבו רק לאחר חתימה על הזמנת שירותי תיווך בכתב, כנדרש בחוק המתווכים במקרקעין, התשנ״ו-1996, ובהתאם לתנאים שנקבעו בה.",
          enUS: "Using the site is free. A brokerage fee is charged only after a written brokerage order has been signed, as required by Israel's Real Estate Brokers Law, 5756-1996, and according to the terms set out in it.",
          fr: "L'utilisation du site est gratuite. Des honoraires ne sont dus qu'après la signature d'un mandat de courtage écrit, comme l'exige la loi israélienne sur les agents immobiliers (5756-1996), et selon les conditions qui y sont fixées.",
          ru: "Пользование сайтом бесплатно. Комиссия взимается только после подписания письменного заказа на риелторские услуги, как того требует израильский Закон о риелторах (5756-1996), и на указанных в нём условиях.",
          es: "El uso del sitio es gratuito. Solo se cobran honorarios tras la firma de una orden de intermediación por escrito, como exige la Ley israelí de Agentes Inmobiliarios (5756-1996), y según las condiciones establecidas en ella.",
        }),
      ],
    },
    {
      h: L({ he: "קניין רוחני", enUS: "Intellectual property", fr: "Propriété intellectuelle", ru: "Интеллектуальная собственность", es: "Propiedad intelectual" }),
      body: [
        L({
          he: "כל התכנים באתר — טקסטים, עיצוב, לוגו ותמונות — שייכים לנו או לבעלי הזכויות בהם. אין להעתיק, להפיץ או לעשות בהם שימוש מסחרי ללא אישור מראש ובכתב.",
          enUS: "All content on this site — text, design, logo and photos — belongs to us or to its respective rights holders. It may not be copied, distributed or used commercially without prior written permission.",
          fr: "L'ensemble des contenus du site — textes, design, logo et photos — nous appartient ou appartient à leurs ayants droit. Toute copie, diffusion ou utilisation commerciale sans autorisation écrite préalable est interdite.",
          ru: "Все материалы сайта — тексты, дизайн, логотип и фотографии — принадлежат нам или соответствующим правообладателям. Их копирование, распространение или коммерческое использование без предварительного письменного разрешения запрещено.",
          es: "Todo el contenido del sitio (textos, diseño, logotipo y fotos) nos pertenece a nosotros o a sus respectivos titulares. No puede copiarse, distribuirse ni usarse comercialmente sin permiso previo por escrito.",
        }),
      ],
    },
    {
      h: L({ he: "אחריות ושירותים חיצוניים", enUS: "Liability and external services", fr: "Responsabilité et services externes", ru: "Ответственность и внешние сервисы", es: "Responsabilidad y servicios externos" }),
      body: [
        L({
          he: "אנו עושים מאמץ שהמידע באתר יהיה מדויק ועדכני, אך האתר ניתן כמות שהוא (AS IS), ולא נישא באחריות לנזק שייגרם כתוצאה מהסתמכות על המידע בו או מתקלה באתר. קישורים לשירותים חיצוניים (כמו וואטסאפ) כפופים לתנאים של אותם שירותים.",
          enUS: "We make every effort to keep the information on this site accurate and up to date, but the site is provided \"as is\", and we are not liable for damage resulting from reliance on its information or from a site malfunction. Links to external services (such as WhatsApp) are subject to those services' own terms.",
          fr: "Nous nous efforçons de maintenir les informations exactes et à jour, mais le site est fourni « en l'état » et nous déclinons toute responsabilité pour les dommages résultant de l'utilisation de ses informations ou d'un dysfonctionnement. Les liens vers des services externes (comme WhatsApp) sont soumis aux conditions de ces services.",
          ru: "Мы стараемся поддерживать информацию точной и актуальной, но сайт предоставляется «как есть», и мы не несём ответственности за ущерб, возникший из-за использования информации сайта или его сбоев. Ссылки на внешние сервисы (например, WhatsApp) регулируются условиями этих сервисов.",
          es: "Hacemos todo lo posible para que la información sea exacta y actual, pero el sitio se ofrece «tal cual» y no nos responsabilizamos de daños derivados de confiar en su información o de fallos del sitio. Los enlaces a servicios externos (como WhatsApp) se rigen por los términos de dichos servicios.",
        }),
      ],
    },
    {
      h: L({ he: "דין וסמכות שיפוט", enUS: "Governing law", fr: "Droit applicable", ru: "Применимое право", es: "Ley aplicable" }),
      body: [
        L({
          he: "על השימוש באתר יחולו דיני מדינת ישראל בלבד, וסמכות השיפוט הבלעדית תהיה לבתי המשפט המוסמכים בתל אביב-יפו. במקרה של סתירה בין הנוסח העברי לתרגום, הנוסח העברי יגבר.",
          enUS: "Use of this site is governed solely by the laws of the State of Israel, and the competent courts in Tel Aviv-Jaffa have exclusive jurisdiction. If a translation conflicts with the Hebrew text, the Hebrew text prevails.",
          fr: "L'utilisation du site est régie exclusivement par le droit israélien, et les tribunaux compétents de Tel Aviv-Jaffa ont compétence exclusive. En cas de divergence entre une traduction et le texte hébreu, le texte hébreu prévaut.",
          ru: "Использование сайта регулируется исключительно законодательством Государства Израиль, а исключительная юрисдикция принадлежит компетентным судам Тель-Авива-Яффо. В случае расхождения между переводом и текстом на иврите преимущественную силу имеет текст на иврите.",
          es: "El uso de este sitio se rige exclusivamente por las leyes del Estado de Israel, y los tribunales competentes de Tel Aviv-Jaffa tienen jurisdicción exclusiva. En caso de discrepancia entre una traducción y el texto hebreo, prevalecerá el texto hebreo.",
        }),
      ],
    },
  ],
};

export const LEGAL_DOCS: Record<LegalDocKey, LegalDoc> = { accessibility, privacy, terms };
