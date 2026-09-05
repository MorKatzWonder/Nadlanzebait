import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: {
      he: "מכרנו את הדירה בפלורנטין בתוך שלושה שבועות, במחיר שלא האמנו שנקבל. אריק לא הבטיח מה שלא יכול לעשות.",
      "en-US":
        "We sold our Florentin apartment in three weeks, at a price we didn’t believe we’d get. Arik never promised what he couldn’t deliver.",
      "en-GB":
        "We sold our Florentin flat in three weeks, at a price we didn’t believe we’d get. Arik never promised what he couldn’t deliver.",
      fr: "Nous avons vendu notre appartement à Florentin en trois semaines, à un prix que nous n'aurions jamais imaginé obtenir. Arik n'a jamais promis ce qu'il ne pouvait pas tenir.",
      ru: "Мы продали нашу квартиру во Флорентине за три недели, по цене, в которую сами не верили. Арик никогда не обещал того, чего не мог выполнить.",
      es: "Vendimos nuestro apartamento en Florentin en tres semanas, a un precio que no creíamos posible. Arik nunca prometió lo que no podía cumplir.",
    },
    attribution: {
      he: "ד״ר, מוכרת, פלורנטין",
      "en-US": "Seller, Florentin",
      "en-GB": "Seller, Florentin",
      fr: "Vendeur, Florentin",
      ru: "Продавец, Флорентин",
      es: "Vendedora, Florentin",
    },
    audience: "seller",
  },
  {
    id: "t2",
    quote: {
      he: "קנינו דירה ראשונה והרגשנו שמישהו שומר עלינו בכל שלב, כולל מול עורך הדין של המוכר.",
      "en-US":
        "We bought our first apartment and felt looked after at every stage, including with the seller’s lawyer.",
      "en-GB":
        "We bought our first flat and felt looked after at every stage, including with the seller’s lawyer.",
      fr: "Nous avons acheté notre premier appartement et nous nous sommes sentis accompagnés à chaque étape, y compris face à l'avocat du vendeur.",
      ru: "Мы купили свою первую квартиру и на каждом этапе чувствовали, что о нас заботятся, включая общение с юристом продавца.",
      es: "Compramos nuestro primer apartamento y nos sentimos acompañados en cada etapa, incluso frente al abogado del vendedor.",
    },
    attribution: {
      he: "י׳ ונ׳, קונים, לב העיר",
      "en-US": "Buyers, City Center",
      "en-GB": "Buyers, City Centre",
      fr: "Acheteurs, Centre-ville",
      ru: "Покупатели, Центр города",
      es: "Compradores, Centro de la ciudad",
    },
    audience: "buyer",
  },
  {
    id: "t3",
    quote: {
      he: "השוויתי שלוש סוכנויות. רק כאן קיבלתי הסבר מסודר איך נקבע המחיר, עם עסקאות אמיתיות מול העיניים.",
      "en-US":
        "I compared three agencies. Only here did I get a proper explanation of how the price was set, with real deals in front of me.",
      "en-GB":
        "I compared three agencies. Only here did I get a proper explanation of how the price was set, with real deals in front of me.",
      fr: "J'ai comparé trois agences. Ce n'est qu'ici que j'ai obtenu une explication claire sur la façon dont le prix avait été fixé, avec de vraies transactions sous les yeux.",
      ru: "Я сравнил три агентства. Только здесь мне дали внятное объяснение того, как определяется цена, с реальными сделками перед глазами.",
      es: "Comparé tres agencias. Solo aquí obtuve una explicación clara de cómo se fijó el precio, con transacciones reales frente a mis ojos.",
    },
    attribution: {
      he: "א׳, מוכר, הצפון הישן",
      "en-US": "Seller, Old North",
      "en-GB": "Seller, Old North",
      fr: "Vendeur, Vieux Nord",
      ru: "Продавец, Старый Север",
      es: "Vendedor, Viejo Norte",
    },
    audience: "seller",
  },
  {
    id: "t4",
    quote: {
      he: "חיפשנו דירה ברמת אביב במשך חצי שנה בלי הצלחה. אריק הראה לנו נכס שלא היה מפורסם בשום מקום, וסגרנו תוך שבוע.",
      "en-US":
        "We'd been searching for an apartment in Ramat Aviv for six months with no luck. Arik showed us a property that wasn't listed anywhere, and we closed within a week.",
      "en-GB":
        "We'd been searching for a flat in Ramat Aviv for six months with no luck. Arik showed us a property that wasn't listed anywhere, and we closed within a week.",
      fr: "Nous cherchions un appartement à Ramat Aviv depuis six mois sans succès. Arik nous a montré un bien qui n'était annoncé nulle part, et nous avons conclu en une semaine.",
      ru: "Мы полгода безуспешно искали квартиру в Рамат-Авиве. Арик показал нам объект, который нигде не был опубликован, и мы закрыли сделку за неделю.",
      es: "Llevábamos seis meses buscando un apartamento en Ramat Aviv sin éxito. Arik nos mostró una propiedad que no estaba publicada en ningún sitio, y cerramos en una semana.",
    },
    attribution: {
      he: "קונים, רמת אביב",
      "en-US": "Buyers, Ramat Aviv",
      "en-GB": "Buyers, Ramat Aviv",
      fr: "Acheteurs, Ramat Aviv",
      ru: "Покупатели, Рамат-Авив",
      es: "Compradores, Ramat Aviv",
    },
    audience: "buyer",
  },
];
