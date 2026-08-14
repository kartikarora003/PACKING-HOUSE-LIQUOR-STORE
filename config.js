// ============================================================
//  PACKING HOUSE LIQUOR STORE — Site Configuration
//  Edit this file to update store info across all pages.
// ============================================================

const STORE = {
  name: "Packing House Liquor Store",
  brandMain: "Packing House",
  brandSub: "Liquor Store",
  tagline: "Kelowna's destination for fine wines, premium spirits & craft beer",
  phone: "(250) 765-0880",
  email: "packinghouseliquorstore@gmail.com",
  legalAge: 19,

  about: {
    eyebrow: "About Us",
    headline: "Local Roots. Community Values. A Place to Feel Welcome.",
    badge: {
      icon: "★",
      lines: ["Locally", "Owned", "Kelowna"],
    },
    paragraphs: [
      "Welcome to The Packing House — a locally owned business with deep roots in the Kelowna community.",
      "The Packing House was built by a group of local owners who share a genuine appreciation for this community and a passion for creating a welcoming place for our customers. We each bring our own experiences and perspectives to the business, but we are united by the values that matter most to us: family, hard work, connection, and community.",
      "For some of us, Kelowna has been home for generations of memories. We've grown up here, built our families here, and watched this community evolve into the vibrant place it is today. We're proud to be raising our children in Kelowna and to be part of the community we call home.",
      "Family and community are at the heart of what we believe in. We believe a local business should be more than simply a place to shop — it should be a place where people feel welcome, appreciated, and connected.",
      "At The Packing House, our goal is simple: to provide great service, a thoughtfully selected variety of products, and a friendly experience every time you visit.",
      "We're proud to be local, grateful to be part of Kelowna, and excited to serve the community that has supported us along the way.",
    ],
    closing:
      "Thank you for choosing local and for being part of The Packing House community.",
  },

  address: {
    street: "663 Finns Rd",
    city: "Kelowna",
    state: "BC",
    zip: "V1X 5B7",
  },

  hours: [
    { day: "Monday", time: "9:00 AM – 11:00 PM" },
    { day: "Tuesday", time: "9:00 AM – 11:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 11:00 PM" },
    { day: "Thursday", time: "9:00 AM – 11:00 PM" },
    { day: "Friday", time: "9:00 AM – 11:00 PM" },
    { day: "Saturday", time: "9:00 AM – 11:00 PM" },
    { day: "Sunday", time: "9:00 AM – 11:00 PM" },
  ],

  offers: [
    {
      icon: "⭐",
      title: "1% Cashback Points",
      description: "Every transaction earns you 1% cashback in points. Shop in store and watch your rewards add up!",
      price: "1%",
      priceDetail: "cashback",
      badge: "Rewards",
    },
    {
      icon: "🎖️",
      title: "Veterans Discount",
      description: "Extra discounts for veterans — thank you for your service! Show your ID in store.",
      badge: "Veterans",
    },
    {
      icon: "🍺",
      title: "Beer Special",
      description: "Great value on select packs — while supplies last.",
      price: "$19",
      priceDetail: "15 cans",
      badge: "Hot Deal",
    },
    {
      icon: "✨",
      title: "More Exciting Offers",
      description: "New deals every week! Visit us in store or check our monthly flyers.",
      badge: "In Store",
    },
  ],

  deliveryMessage: "We Deliver! DoorDash, Uber Eats & private delivery (4 PM – 11 PM) — call us to arrange.",

  paymentMethods: [
    { id: "amex", label: "Amex" },
    { id: "visa", label: "Visa" },
    { id: "mastercard", label: "Mastercard" },
    { id: "interac", label: "Interac" },
    { id: "debit", label: "Debit" },
    { id: "credit", label: "Credit" },
  ],

  paymentsNote: "We accept Amex, all credit & debit cards, Mastercard & Interac.",

  loyaltyProgram: {
    rate: "1%",
    title: "Points & Cashback Rewards",
    headline: "Earn 1% cashback on every transaction",
    description:
      "Every purchase you make in store earns you points — get 1% cashback on everything you buy. The more you shop, the more you save!",
    badge: "Rewards Program",
  },

  delivery: {
    doordash: {
      name: "DoorDash",
      url: "https://www.doordash.com/search/store/Packing%20House%20Liquor%20Store%20Kelowna",
      color: "#FF3008",
    },
    ubereats: {
      name: "Uber Eats",
      url: "https://www.ubereats.com/search?q=Packing%20House%20Liquor%20Store%20Kelowna",
      color: "#06C167",
    },
    private: {
      name: "Private Delivery",
      description: "Call our store directly and we'll arrange private delivery to your door in Kelowna.",
      hours: "4:00 PM – 11:00 PM",
      phone: "(250) 765-0880",
    },
  },

  mapEmbedUrl:
    "https://www.google.com/maps?q=Packing+House+Liquor+Store+663+Finns+Rd+Kelowna+BC&output=embed",

  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Packing+House+Liquor+Store+663+Finns+Rd+Kelowna+BC",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Packing+House+Liquor+Store+663+Finns+Rd+Kelowna+BC",

  reviewsSummary: {
    rating: 4.9,
    totalReviews: "150+",
    source: "Google",
  },

  reviews: [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Best liquor store in Kelowna! Great selection of wines and spirits, and the staff always helps me find exactly what I need.",
      date: "Google Review",
    },
    {
      name: "James R.",
      rating: 5,
      text: "Love this place on Finns Rd. Open late which is perfect for us. The beer deals are unbeatable!",
      date: "Google Review",
    },
    {
      name: "Linda K.",
      rating: 5,
      text: "Friendly staff, clean store, and always well stocked. Our go-to liquor store in Kelowna.",
      date: "Google Review",
    },
    {
      name: "Mike D.",
      rating: 5,
      text: "Great prices and a huge selection. Private delivery by phone is super convenient too.",
      date: "Google Review",
    },
    {
      name: "Priya S.",
      rating: 5,
      text: "Always find what I need here. Veterans discount is a nice touch — thank you!",
      date: "Google Review",
    },
    {
      name: "Chris W.",
      rating: 5,
      text: "Huge variety of craft beer and local BC products. Staff went out of their way to help me pick a wine.",
      date: "Google Review",
    },
  ],

  social: {
    instagram: "https://www.instagram.com/packinghouseliquorstore/",
    instagramHandle: "@packinghouseliquorstore",
    facebook: "https://www.facebook.com/packinghouseliquorstore",
    facebookHandle: "@packinghouseliquorstore",
  },

  flyerComingSoon: true,

  monthlyFlyers: [],

  // Store photos in images/store/
  storefront: "images/store/storefront.jpg",

  photoStrip: [
    "images/store/storefront.jpg",
    "images/store/interior-counter.jpg",
    "images/store/whiskey-scotch-shelves.jpg",
    "images/store/beer-coolers.jpg",
    "images/store/wine-spirits-aisle.jpg",
    "images/store/wine-beer-display.jpg",
  ],

  gallery: [
    { src: "images/store/storefront.jpg", alt: "Packing House Liquor Store — 663 Finns Rd, Kelowna" },
    { src: "images/store/interior-counter.jpg", alt: "Checkout counter and friendly service" },
    { src: "images/store/aisle-vapes-spirits.jpg", alt: "Vapes, vodka & whiskey aisle" },
    { src: "images/store/whiskey-scotch-shelves.jpg", alt: "Whiskey, scotch & rye selection" },
    { src: "images/store/beer-coolers.jpg", alt: "Domestic, craft & international beer coolers" },
    { src: "images/store/wine-spirits-aisle.jpg", alt: "Wine and spirits aisle" },
    { src: "images/store/wine-beer-display.jpg", alt: "Wine island and beer selection" },
    { src: "images/store/dock-day-display.jpg", alt: "Ready-to-drink coolers and wine display" },
    { src: "images/store/latitude-50-wine.jpg", alt: "Latitude 50 wine feature display" },
  ],

  heroImages: {
    main: "images/store/storefront.jpg",
    side1: "images/store/interior-counter.jpg",
    side2: "images/store/whiskey-scotch-shelves.jpg",
    side3: "images/store/beer-coolers.jpg",
  },

  showcase: [
    {
      title: "Wine",
      description: "Okanagan favourites, international labels & feature displays.",
      image: "images/store/latitude-50-wine.jpg",
    },
    {
      title: "Spirits",
      description: "Whisky, scotch, rye, vodka, rum, tequila & more.",
      image: "images/store/whiskey-scotch-shelves.jpg",
    },
    {
      title: "Craft Beer",
      description: "Domestic, craft, international & chilled beer coolers.",
      image: "images/store/beer-coolers.jpg",
    },
    {
      title: "Vapes",
      description: "Wide selection of vape products and accessories.",
      image: "images/store/aisle-vapes-spirits.jpg",
    },
    {
      title: "Ready-to-Drink",
      description: "Coolers, cocktails, seltzers & canned drinks.",
      image: "images/store/dock-day-display.jpg",
    },
    {
      title: "Local Picks",
      description: "BC wines, local products & Okanagan favourites.",
      image: "images/store/wine-beer-display.jpg",
    },
  ],

  credits: {
    name: "Kartik",
    instagram: "https://www.instagram.com/kartikarora003/",
    handle: "@kartikarora003",
  },
};
