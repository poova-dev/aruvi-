// Aruvi Fabrics - E-Commerce Master Dataset & Configuration

const ARUVI_CONFIG = {
  storeName: "Aruvi Fabrics",
  location: "Pattukkottai, Tamil Nadu, India",
  phone: "+91 96775 96136",
  whatsappNumber: "919677596136",
  instagramHandle: "@aruvi_fabric",
  instagramUrl: "https://www.instagram.com/aruvi_fabric/",
  currency: "₹",
  defaultUnit: "meter"
};

const ARUVI_PRODUCTS = [
  {
    id: "ARV-001",
    name: "Midnight Charcoal Cotton",
    category: "Cotton",
    categoryLabel: "Pure Cotton",
    price: 3450,
    unit: "meter",
    shortDescription: "A masterclass in understated elegance. Premium cotton weave with distinguished soft drape.",
    fullDescription: "Woven using heritage techniques passed down through generations in Pattukkottai. Its versatile ground provides an authentic foundation for bespoke tailoring, ceremonial shirts, and structured modern silhouettes.",
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewsCount: 28,
    specs: {
      width: "58 Inches",
      gsm: "140 GSM",
      feel: "Soft, Structured",
      care: "Dry Clean / Gentle Wash",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Charcoal",
        hex: "#2f3130",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_4587880c30_31aaf5a4e06abc5f.png"
      },
      {
        name: "Terracotta",
        hex: "#c85a32",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU7cIkRRHrv0-Pk5mzw4bPXS8AWClEVcj0uaXBEHODxXl5Cn9AY4AGYbPfirIP8s-egkTBMfawYwaHxhZWcjC5dZcm_cCqY0xOZexo-oB-VrCsOPmUBuy7UZFP5SA2ohxn89_KtR9sLLMJFYltH1AgtmV4LmY1_IGv9u-pHe9koSwHdUl_VPs8quEV-J_eJ9UhyfyHKfZhCaorcTss5czqEe4wEYM97RZLakUXJMCrKrvp6i8SlnII"
      },
      {
        name: "Deep Indigo",
        hex: "#1c2436",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALdrXNY5QUFR5NN4hnQWMOceT07_4XkXdmEnpFfLOfoIJGPsDnlt09cR4KQcq2m6mNoZZt8bAMTHBnSFs_l8apsyZqyXAjCHnmGJ0ZBMzQOUnTmxFZpVbsqKPqqxsv3LHyoytUAc6SKoYn21LsCMBrXP8jvd_dN721RVx9-X_n8j-Ys-V_kg6GaVMKFNWjQl4z1n8couJbkCWkz1z7TTBpyWJhlzCe1SQJBX0gebsqHg2JY1uIHALo"
      }
    ],
    gallery: [
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_4587880c30_31aaf5a4e06abc5f.png",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDX2Lwgd4Jg-qER32P9oKEtxw0yBL9OZCbNyh-BaMFRP33H9DWeTv7FrQnlSt7OtYY6acKCegyzOjsxR9EMES2BEiyB6w_xmoKCKyM0P3Y4aQxiv0DUdsdIx3Y-DVIF_cxtnnkPuOijX3pRSQeXlZEHERnFXlCJbpTlt8Wa0JgXMF8-vAMFUqRJ6eoB0INrFExRK0lTpGDnnghQeSI61nxFasfYC6QjqVGxp_H0s5gYRUfVJ5zbxNh3",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFw-gJFXx_3hLAr6NC9HvKifPMKt2P3L2uhZL-mr89Z0PbuT9UepiKDYEgub0IS5ILYpEjpiD4O7RXlhxyiy27en9ospWQqVoTlUDgdDQMzMvTzoUqV2Z56ObJuzEdoPHVAZYNHsv9dZaeJ3P8szwY3TVHw0XBOI6Ip7xClLPcVraYgtUwMXbyKlJiKM23P5nPKhoQnZTVcyy32-7d98S9v8sw1Eduodty1Bwb8vXzDcaGAdhnpvcm"
    ]
  },
  {
    id: "ARV-002",
    name: "Pure Kanjivaram Silk",
    category: "Silk",
    categoryLabel: "Pure Silk",
    price: 8500,
    unit: "meter",
    shortDescription: "Signature handwoven pure silk featuring exquisite body lustre and heavy fluid drape for grand occasions.",
    fullDescription: "Handwoven with double-twisted mulberry silk threads and authentic zari border detailing. The fluid drape catches architectural lighting creating a luminous jewel-tone sheen.",
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 5.0,
    reviewsCount: 42,
    specs: {
      width: "48 Inches",
      gsm: "180 GSM",
      feel: "Luminous, Rich, Supple",
      care: "Dry Clean Only",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Emerald Gold",
        hex: "#1b4d3e",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQDSuplePixSI0xHCNuPi_LwXs6YMBw9IRxphwQOdMyh5l3TIB4WXCONXwYu7LOvwGi_NwTM09QOZiFk6L7JIeSYdk_hyMK1B0j6xCHg8K4RvlgIuwPDRguViZwllRoBesDvCMCyjrMU6H2_CaW-HLsJFwxr6wgKxgAyYxJC8ykKvngZKTOxvt2RqvnLgshOafvqGZ6cuqUdU3171IqltpjEuCNevPeJkPQdwC1r1x_Yy95v_6Pqo5"
      },
      {
        name: "Antiqued Zari",
        hex: "#d4af37",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuqcgNM--W8dnjAd_XoThW1IsTC-wbskJxBcrympO9i-rxvThAxrn5XegbupEe5h512NBScIBTnxUxvR9cqmRCeVy6DfAGt6JMKH5dMr3VJPRMgFnH5_WdaqE8_PZt3aQxpb-aTHSFIuB7brBapb0Hjy7b76iCE8mJ4BbVBCkSrX53g9QJa3d3wqNQPUZBOJ9eTKXqGxfDq2rw4QSW_QgJcxgTMA1sOKOl-iIC01zf95EfISfDbri"
      },
      {
        name: "Royal Ivory",
        hex: "#f5f2ee",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByzN0W5qz8FYDuU6-zFSMatqmh4o0N5Mjop6QxSXwbKmg9hdV28sZ4OzThIKVUHyf37axQr8j-FlUtso8hP8KFbCBV0czJ7ZSiccfWC0vpJtZdB2ktHCEUsxuZs0jztEQymTfoghj2mnIkNwisLVGVvOZ9N9X_0VAlI4kRGURwFpLUxoZXWnmfvcTcydPFPezFv_wHfbSAw-8Qh1UogsDwlgGgO2uT-DdmvVhFkERkpnO0PPo_bmLi"
      }
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQDSuplePixSI0xHCNuPi_LwXs6YMBw9IRxphwQOdMyh5l3TIB4WXCONXwYu7LOvwGi_NwTM09QOZiFk6L7JIeSYdk_hyMK1B0j6xCHg8K4RvlgIuwPDRguViZwllRoBesDvCMCyjrMU6H2_CaW-HLsJFwxr6wgKxgAyYxJC8ykKvngZKTOxvt2RqvnLgshOafvqGZ6cuqUdU3171IqltpjEuCNevPeJkPQdwC1r1x_Yy95v_6Pqo5",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuqcgNM--W8dnjAd_XoThW1IsTC-wbskJxBcrympO9i-rxvThAxrn5XegbupEe5h512NBScIBTnxUxvR9cqmRCeVy6DfAGt6JMKH5dMr3VJPRMgFnH5_WdaqE8_PZt3aQxpb-aTHSFIuB7brBapb0Hjy7b76iCE8mJ4BbVBCkSrX53g9QJa3d3wqNQPUZBOJ9eTKXqGxfDq2rw4QSW_QgJcxgTMA1sOKOl-iIC01zf95EfISfDbri"
    ]
  },
  {
    id: "ARV-003",
    name: "The Ivory Weave",
    category: "Cotton",
    categoryLabel: "Pure Cotton",
    price: 3200,
    unit: "meter",
    shortDescription: "Pristine white finely woven pure cotton fabric with subtle matte finish and organic softness.",
    fullDescription: "A crisp yet touchably soft white cotton that glows gently in natural light. Perfect for modern minimalist silhouettes, airy summer wear, and ceremonial kurta sets.",
    featured: false,
    bestseller: false,
    newArrival: false,
    rating: 4.8,
    reviewsCount: 19,
    specs: {
      width: "56 Inches",
      gsm: "135 GSM",
      feel: "Crisp, Breathable, Smooth",
      care: "Hand Wash / Dry Clean",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Pure Ivory",
        hex: "#fcfbf9",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASGTtzfEjN-pU3CHH_mxERoW8WBFS1rN4ez24Kh5bEcnIXlyCzntvA7hkHXqyUJjwLIxNRgFXuU8y2BZKx8uDR5bfz-WcZ58AMsLcBmoS4x9wh-cgjSAwuXTp17VqxAoR58zGVAphaOMj030Z9Ft1ZCh6wIxKcXGQiLOyGzNd8BGybmB1f3aZU6Rw4ERYULKOpeVDdndL3xkjMBok1Qfd8aJQmobYXrNcAsU9aoMeGgj85XTjJbXa2"
      },
      {
        name: "Soft Cream",
        hex: "#f4efe6",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyrnXhU8zbWp-mnUEzRlRIr94USuo72g-VdknxeA3a3L1vzKGxMouxSLxNVenggnha6FE9ORfg_q-aM4jyuMS52oiMRJ2_8Ab-iHlsYRjj140RqwLCOoNSfQ6O_wXLdxcAkWjiW03pdqe-9ezf3UuGdDH0VzeLQosm_cj1wRBdp_5IeF0_XKclFh-GFCtuqSTCxtt9CwuajuWKReNoBUFAsrt_gawdGQFPmyISLR1ed38vtuinhseI"
      }
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASGTtzfEjN-pU3CHH_mxERoW8WBFS1rN4ez24Kh5bEcnIXlyCzntvA7hkHXqyUJjwLIxNRgFXuU8y2BZKx8uDR5bfz-WcZ58AMsLcBmoS4x9wh-cgjSAwuXTp17VqxAoR58zGVAphaOMj030Z9Ft1ZCh6wIxKcXGQiLOyGzNd8BGybmB1f3aZU6Rw4ERYULKOpeVDdndL3xkjMBok1Qfd8aJQmobYXrNcAsU9aoMeGgj85XTjJbXa2"
    ]
  },
  {
    id: "ARV-004",
    name: "Midnight Indigo Motif",
    category: "Prints",
    categoryLabel: "Premium Prints",
    price: 4850,
    unit: "meter",
    shortDescription: "Deep indigo silk with intricate hand-block printed geometric motifs in warm terracotta accents.",
    fullDescription: "Artfully hand-printed by master craftsmen using organic indigo dyes. The deep midnight ground balances geometric motifs that catch light effortlessly.",
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewsCount: 34,
    specs: {
      width: "52 Inches",
      gsm: "150 GSM",
      feel: "Soft, Fluid, Tactile",
      care: "Dry Clean Only",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Indigo Terracotta",
        hex: "#1d2a44",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALdrXNY5QUFR5NN4hnQWMOceT07_4XkXdmEnpFfLOfoIJGPsDnlt09cR4KQcq2m6mNoZZt8bAMTHBnSFs_l8apsyZqyXAjCHnmGJ0ZBMzQOUnTmxFZpVbsqKPqqxsv3LHyoytUAc6SKoYn21LsCMBrXP8jvd_dN721RVx9-X_n8j-Ys-V_kg6GaVMKFNWjQl4z1n8couJbkCWkz1z7TTBpyWJhlzCe1SQJBX0gebsqHg2JY1uIHALo"
      },
      {
        name: "Charcoal Slate",
        hex: "#333842",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_4587880c30_31aaf5a4e06abc5f.png"
      }
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALdrXNY5QUFR5NN4hnQWMOceT07_4XkXdmEnpFfLOfoIJGPsDnlt09cR4KQcq2m6mNoZZt8bAMTHBnSFs_l8apsyZqyXAjCHnmGJ0ZBMzQOUnTmxFZpVbsqKPqqxsv3LHyoytUAc6SKoYn21LsCMBrXP8jvd_dN721RVx9-X_n8j-Ys-V_kg6GaVMKFNWjQl4z1n8couJbkCWkz1z7TTBpyWJhlzCe1SQJBX0gebsqHg2JY1uIHALo"
    ]
  },
  {
    id: "ARV-005",
    name: "Blush Organza",
    category: "Organza",
    categoryLabel: "New Arrivals",
    price: 4100,
    unit: "meter",
    shortDescription: "Delicate semi-sheer organza fabric in pale blush pink with translucent luster.",
    fullDescription: "Ethereal and featherweight, Blush Organza drapes into soft translucent layers. Ideal for overlays, dupattas, formal gowns, and modern couture accenting.",
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.7,
    reviewsCount: 15,
    specs: {
      width: "44 Inches",
      gsm: "75 GSM",
      feel: "Crisp, Sheer, Ethereal",
      care: "Dry Clean Only",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Blush Pink",
        hex: "#e8c5c8",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx4keHzbfen5PufGc5dc2Te8x6W9r26X94F9NKPrzH7U7XTTAqGFRTew6GmTbZ5YnRlNdcNMFp9Auxi_NDqZMOWU523O0dI-iwuB9-oCZ0RRS-hlQoRcyBekFQgV3Xz5V8NOOZexquyNtzWSsfw1uiZMGH_EugSRkp-lypWDh29rUJthDMw5zh26jGZ5RpAKodYvxsFe_tnNvvv74RuBdX_jeuYxciHkROLVmwKxFDvPg0VAEtVdjH"
      },
      {
        name: "Ash Grey",
        hex: "#b2b8bd",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3zGzsGKwB5kVgxejmGlyZqtOqlkq1F1_-ZNt04Lz-RqBWpwHhiVqDXmXxJncOulkGPHoGhD5P0Z2mIQdN9kXnJosrAMBpSaHVissfGzOHxtarPXV4k1refVDl2I5R3tmbzqFOKbNXOCayk23Ua8wyXiGdMhCMtJDh2LemlD9ax0qGXY_Bs6fuv_K450gWExpypv7KlRZCTeM3iPpb-EJFO9nze0L82cDNwkrK2HP4dVDi-yYSFAgz"
      }
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDx4keHzbfen5PufGc5dc2Te8x6W9r26X94F9NKPrzH7U7XTTAqGFRTew6GmTbZ5YnRlNdcNMFp9Auxi_NDqZMOWU523O0dI-iwuB9-oCZ0RRS-hlQoRcyBekFQgV3Xz5V8NOOZexquyNtzWSsfw1uiZMGH_EugSRkp-lypWDh29rUJthDMw5zh26jGZ5RpAKodYvxsFe_tnNvvv74RuBdX_jeuYxciHkROLVmwKxFDvPg0VAEtVdjH"
    ]
  },
  {
    id: "ARV-006",
    name: "Raw Earth Linen Weave",
    category: "Linen",
    categoryLabel: "Heritage Linen",
    price: 2950,
    unit: "meter",
    shortDescription: "Unbleached organic linen with a tactile rustic structure in natural sandy beige tones.",
    fullDescription: "A testament to slow craftsmanship. Raw linen fibers left in their purest state offer high breathability, thermal regulation, and timeless earthy texture.",
    featured: false,
    bestseller: false,
    newArrival: false,
    rating: 4.8,
    reviewsCount: 22,
    specs: {
      width: "58 Inches",
      gsm: "165 GSM",
      feel: "Rustic, Substantial, Airy",
      care: "Gentle Wash / Line Dry",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Natural Beige",
        hex: "#d9d0c1",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX9RqvYgs7oOEYORQ0-1qXvHaRd7-4-a8MKD77G6KVFZTCIiSRn9NCfzVW4K4J2xBSYqcjnu5EE3Zxn-n2ZacJFoL0SJiwxKL5BbK8DjAB04KEokAc-pZVg9RKC0XOkZYWTG__7q2pG2V9k7Q5cIJbxlNZGTmLqzXWltDQfAK6GX4Aex-je9eeQro6DioFCZzGEvi7Qx8jcskZ5zpvHe1n-F10zmSPcLAi8Gvay4N4uvabr_RrETZi"
      },
      {
        name: "Terracotta Earth",
        hex: "#b85c43",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU7cIkRRHrv0-Pk5mzw4bPXS8AWClEVcj0uaXBEHODxXl5Cn9AY4AGYbPfirIP8s-egkTBMfawYwaHxhZWcjC5dZcm_cCqY0xOZexo-oB-VrCsOPmUBuy7UZFP5SA2ohxn89_KtR9sLLMJFYltH1AgtmV4LmY1_IGv9u-pHe9koSwHdUl_VPs8quEV-J_eJ9UhyfyHKfZhCaorcTss5czqEe4wEYM97RZLakUXJMCrKrvp6i8SlnII"
      }
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX9RqvYgs7oOEYORQ0-1qXvHaRd7-4-a8MKD77G6KVFZTCIiSRn9NCfzVW4K4J2xBSYqcjnu5EE3Zxn-n2ZacJFoL0SJiwxKL5BbK8DjAB04KEokAc-pZVg9RKC0XOkZYWTG__7q2pG2V9k7Q5cIJbxlNZGTmLqzXWltDQfAK6GX4Aex-je9eeQro6DioFCZzGEvi7Qx8jcskZ5zpvHe1n-F10zmSPcLAi8Gvay4N4uvabr_RrETZi"
    ]
  },
  {
    id: "ARV-007",
    name: "Emerald Tapestry Jacquard",
    category: "Heritage",
    categoryLabel: "Premium Jacquard",
    price: 5400,
    unit: "meter",
    shortDescription: "Heavy jacquard woven fabric featuring complex botanical patterns in emerald green and gold zari.",
    fullDescription: "Opulent jacquard weave created on specialized looms. Rich botanical vines in deep jewel-tone green intertwine with antiqued metallic gold threads.",
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 5.0,
    reviewsCount: 11,
    specs: {
      width: "54 Inches",
      gsm: "220 GSM",
      feel: "Heavy, Sculptural, Opulent",
      care: "Dry Clean Only",
      origin: "Pattukkottai, India"
    },
    colors: [
      {
        name: "Emerald Gold",
        hex: "#0f4229",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdbL7oVowlEVYGfWyBxCAIpiZ29Y32gdoA9nThMOVsshP_Fr6k2-asKp4lgsoZbG4wM_x3iLkGnY-IR9jfa11eYc9OSDy52gi6k2JvyWQvkBesgQ41Qvy9ais5ZPic-emQoxfzVxanJYI88PnlCHWvwSlFoOds-38kDySX63mwGJysErYXZAuQoROT0AdU5Zkr2AJD_rZM-KAhFaYt6oGSPRyduausvCrHMYuPoX3KyTk_wcR_phOg"
      }
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdbL7oVowlEVYGfWyBxCAIpiZ29Y32gdoA9nThMOVsshP_Fr6k2-asKp4lgsoZbG4wM_x3iLkGnY-IR9jfa11eYc9OSDy52gi6k2JvyWQvkBesgQ41Qvy9ais5ZPic-emQoxfzVxanJYI88PnlCHWvwSlFoOds-38kDySX63mwGJysErYXZAuQoROT0AdU5Zkr2AJD_rZM-KAhFaYt6oGSPRyduausvCrHMYuPoX3KyTk_wcR_phOg"
    ]
  }
];

const ARUVI_REVIEWS = [
  {
    id: 1,
    quote: "The cotton quality from Pattukkottai is completely unmatched. I've been ordering from Aruvi Fabrics for years and every delivery is flawless.",
    author: "Priya S.",
    location: "Chennai, TN",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_417e24b606_ff081359df93920f.png"
  },
  {
    id: 2,
    quote: "Fast delivery to Mumbai and the silk drape was exactly as shown. Truly a premium experience from start to finish.",
    author: "Rahul M.",
    location: "Mumbai, MH",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_417e24b606_2925b47f324ce3e2.png"
  },
  {
    id: 3,
    quote: "I love their attention to detail and traditional heritage values. The indigo prints have such rich, long-lasting color vibrancy.",
    author: "Ananya K.",
    location: "Bengaluru, KA",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_417e24b606_87677bd22cb8a1db.png"
  }
];
