import type { Testimonial } from "./types";

/** Placeholder testimonials, shaped like future Google Sheet rows. */
export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    authorName: "Dana L.",
    quote: {
      he: "אריק ליווה אותנו לאורך כל התהליך באדיבות ובמקצועיות רבה.",
      "en-US": "Arik guided us through the entire process with great professionalism and kindness.",
      "en-GB": "Arik guided us through the entire process with great professionalism and kindness.",
      fr: "Arik nous a accompagnés tout au long du processus avec beaucoup de professionnalisme et de gentillesse.",
      ru: "Арик сопровождал нас на протяжении всего процесса с большим профессионализмом и добротой.",
    },
  },
  {
    id: "sample-2",
    authorName: "Yossi M.",
    quote: {
      he: "מכר לנו את הדירה תוך זמן קצר ובמחיר מצוין.",
      "en-US": "He sold our apartment quickly and for an excellent price.",
      "en-GB": "He sold our flat quickly and for an excellent price.",
      fr: "Il a vendu notre appartement rapidement et à un excellent prix.",
      ru: "Он быстро продал нашу квартиру по отличной цене.",
    },
  },
];
