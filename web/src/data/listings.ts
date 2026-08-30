import type { Listing } from "./types";

/**
 * Placeholder listings, shaped exactly like the rows that will come from the
 * Google Sheet + translation function once that integration is wired up.
 * See src/data/README.md for the planned column mapping.
 */
export const listings: Listing[] = [
  {
    id: "sample-1",
    status: "current",
    city: "Tel Aviv",
    price: 3200000,
    currency: "ILS",
    rooms: 4,
    sizeSqm: 95,
    photoUrl: "https://placehold.co/640x480?text=Listing+Photo",
    yad2Url: "https://www.yad2.co.il/",
    title: {
      he: "דירת 4 חדרים משופצת בתל אביב",
      "en-US": "Renovated 4-Room Apartment in Tel Aviv",
      "en-GB": "Renovated 4-Room Flat in Tel Aviv",
      fr: "Appartement de 4 pièces rénové à Tel Aviv",
      ru: "Отремонтированная квартира 4 комнаты в Тель-Авиве",
    },
    description: {
      he: "דירה מרווחת ומשופצת, קרובה לתחבורה ציבורית ולבתי ספר.",
      "en-US": "Spacious, renovated apartment close to public transit and schools.",
      "en-GB": "Spacious, renovated flat close to public transport and schools.",
      fr: "Appartement spacieux et rénové, proche des transports en commun et des écoles.",
      ru: "Просторная отремонтированная квартира рядом с общественным транспортом и школами.",
    },
  },
  {
    id: "sample-2",
    status: "current",
    city: "Ramat Gan",
    price: 4800,
    currency: "ILS",
    rooms: 3,
    sizeSqm: 75,
    photoUrl: "https://placehold.co/640x480?text=Listing+Photo",
    yad2Url: "https://www.yad2.co.il/",
    title: {
      he: "להשכרה: דירת 3 חדרים ברמת גן",
      "en-US": "For Rent: 3-Room Apartment in Ramat Gan",
      "en-GB": "To Let: 3-Room Flat in Ramat Gan",
      fr: "À louer : appartement de 3 pièces à Ramat Gan",
      ru: "Сдаётся: квартира 3 комнаты в Рамат-Гане",
    },
    description: {
      he: "דירה מוארת עם מרפסת, קרובה למרכז העיר.",
      "en-US": "Bright apartment with a balcony, close to the city center.",
      "en-GB": "Bright flat with a balcony, close to the city centre.",
      fr: "Appartement lumineux avec balcon, proche du centre-ville.",
      ru: "Светлая квартира с балконом, рядом с центром города.",
    },
  },
  {
    id: "sample-3",
    status: "previous",
    city: "Givatayim",
    price: 2650000,
    currency: "ILS",
    rooms: 3,
    sizeSqm: 68,
    photoUrl: "https://placehold.co/640x480?text=Listing+Photo",
    yad2Url: "https://www.yad2.co.il/",
    title: {
      he: "נמכר: דירת 3 חדרים בגבעתיים",
      "en-US": "Sold: 3-Room Apartment in Givatayim",
      "en-GB": "Sold: 3-Room Flat in Givatayim",
      fr: "Vendu : appartement de 3 pièces à Guivataïm",
      ru: "Продано: квартира 3 комнаты в Гиватаиме",
    },
    description: {
      he: "דירה במיקום מעולה שנמכרה במהירות.",
      "en-US": "A well-located apartment that sold quickly.",
      "en-GB": "A well-located flat that sold quickly.",
      fr: "Un appartement bien situé, vendu rapidement.",
      ru: "Квартира с отличным расположением, быстро продана.",
    },
  },
];
