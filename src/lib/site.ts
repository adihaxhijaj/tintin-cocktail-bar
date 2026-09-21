// Single source of truth for site content. All facts sourced — see research/content.md.
// Menu, gallery and copy are drawn from the venue's own Instagram (@tintin.cocktailbar);
// descriptions are edited from the venue's real post captions. See research/images.md.

export const site = {
  name: "Tintin",
  fullName: "Tintin Cocktail Bar",
  tagline: "The stories that we live and tell.",
  city: "Prishtina",
  country: "Kosovo",
  founded: 2021,
  address: "Sejdi Kryeziu 6, Prishtina 10000, Kosovo",
  landmark: "Near the Mother Teresa Cathedral in central Prishtina.",
  phone: "+383 48 701 999",
  phoneHref: "tel:+38348701999",
  email: "tintinshpk@gmail.com",
  instagram: "https://www.instagram.com/tintin.cocktailbar/",
  instagramHandle: "@tintin.cocktailbar",
  facebook: "https://www.facebook.com/tintincocktails/",
  wolt: "https://wolt.com",
  mapsQuery: "Tintin Cocktail Bar, Sejdi Kryeziu 6, Prishtina, Kosovo",
  priceBand: "€5–€15 per person",
  rating: "4.6",
  ratingSource: "Google",
} as const;

export const hours: { day: string; time: string }[] = [
  { day: "Monday–Friday", time: "07:00–23:30" },
  { day: "Saturday", time: "16:00–23:30" },
  { day: "Sunday", time: "10:00–18:00" },
];

export type Drink = {
  slug: string;
  name: string;
  desc: string;
  base?: string;
  img?: string; // /img/<file>.webp
  alt?: string;
};

// Three featured "stories" — the cocktails we captured at full resolution.
export const signatures: Drink[] = [
  {
    slug: "blood-on-the-leaves",
    name: "Blood on the Leaves",
    base: "Aged rum",
    desc: "Built on aged rum, with strawberry, basil and a touch of black pepper.",
    img: "/img/blood-on-the-leaves-hero.webp",
    alt: "Blood on the Leaves cocktail: a deep red rum drink.",
  },
  {
    slug: "house-negroni",
    name: "The House Negroni",
    base: "Gin · bitters",
    desc: "A Negroni with softer edges and a longer finish.",
    img: "/img/negroni-hi.webp",
    alt: "Tintin's house Negroni: a burnt-orange stirred cocktail over a single clear block of ice.",
  },
  {
    slug: "oasis",
    name: "Oasis",
    base: "House spirit",
    desc: "The spirit comes from an oasis. The execution is our own.",
    img: "/img/oasis-spirit-hi.webp",
    alt: "Oasis cocktail: a pale, clear drink on a dark bar top.",
  },
];

// Full cocktail list (signatures + the rest), edited from the venue's posts.
export const cocktails: Drink[] = [
  ...signatures,
  // ── The Negroni family ───────────────────────────────
  {
    slug: "rhubarb-coconut-negroni",
    name: "Rhubarb & Coconut Negroni",
    base: "Negroni",
    desc: "The classic Negroni reworked with rhubarb and coconut.",
    img: "/img/rhubarb-coconut-negroni.webp",
    alt: "Rhubarb & Coconut Negroni: a rose-tinted Negroni over clear ice.",
  },
  {
    slug: "truffle-negroni",
    name: "Truffle Negroni",
    base: "Negroni",
    desc: "Earthy, rich and balanced.",
    img: "/img/truffle-negroni.webp",
    alt: "Truffle Negroni: a deep amber Negroni in soft light.",
  },
  {
    slug: "cafe-negroni",
    name: "Café Negroni",
    base: "Mezcal · coffee",
    desc: "Same structure, a different story: mezcal leads, coffee slips into the Campari, vermouth holds it together. A late-night attitude.",
    img: "/img/cafe-negroni.webp",
    alt: "Café Negroni: a dark, coffee-tinged Negroni.",
  },
  {
    slug: "chocolate-negroni",
    name: "Chocolate Negroni",
    base: "Negroni",
    desc: "Bitter meets cacao.",
    img: "/img/chocolate-negroni.webp",
    alt: "Chocolate Negroni: a dark, glossy stirred cocktail.",
  },
  {
    slug: "enzoni",
    name: "Enzoni",
    base: "Gin · Campari",
    desc: "A cross between a Negroni and a gin sour, the sweet vermouth swapped for muddled green grapes. An easy way into Campari.",
    img: "/img/enzoni.webp",
    alt: "Enzoni cocktail: a bright crimson sour served up.",
  },
  // ── Agave & smoke ────────────────────────────────────
  {
    slug: "naked-and-famous",
    name: "Naked & Famous",
    base: "Mezcal",
    desc: "A little mezcal. A little drama.",
    img: "/img/naked-and-famous.webp",
    alt: "Naked & Famous: a coupe of pale-green mezcal sour.",
  },
  {
    slug: "spicy-margarita",
    name: "Spicy Margarita",
    base: "Tequila",
    desc: "House jalapeño syrup, fresh citrus and a proper Tajín rim. Balanced first, spicy second.",
    img: "/img/spicy-margarita.webp",
    alt: "Spicy Margarita with a Tajín rim and fresh citrus.",
  },
  {
    slug: "al-pastor",
    name: "Al Pastor",
    base: "Tequila · mezcal",
    desc: "A taco in a glass: tequila, mezcal, citrus and our taco-spice syrup. Smoky and bold.",
    img: "/img/al-pastor.webp",
    alt: "Al Pastor cocktail: a smoky tequila-and-mezcal serve.",
  },
  {
    slug: "it-burns",
    name: "It Burns",
    base: "Tequila",
    desc: "Tequila, orange, a kick of chilli and a Tajín rim. Dare to take a sip and let the heat take over.",
    img: "/img/it-burns.webp",
    alt: "It Burns: a fiery orange tequila cocktail with a chilli rim.",
  },
  {
    slug: "now-you-see-me",
    name: "Now You See Me",
    base: "Tequila · mezcal",
    desc: "Tequila, smoky mezcal, triple sec and lime under a whimsical salt foam.",
    img: "/img/now-you-see-me.webp",
    alt: "Now You See Me: a cocktail crowned with a cloud of salt foam.",
  },
  // ── Gin & the martini end ────────────────────────────
  {
    slug: "fifty-fifty-martini",
    name: "50/50 Martini",
    base: "Gin",
    desc: "Gin infused in-house with Albanian extra-virgin olive oil, a touch of brine, finished with tonic. Clean, savoury, intentionally filthy.",
    img: "/img/fifty-fifty-martini.webp",
    alt: "A 50/50 martini, pale gold and savoury, served up.",
  },
  {
    slug: "dirty-martini",
    name: "Dirty Martini",
    base: "Gin / vodka",
    desc: "A martini with olives and brine.",
    img: "/img/dirty-martini.webp",
    alt: "A Dirty Martini with olives in low light.",
  },
  {
    slug: "fuji-75",
    name: "Fuji 75",
    base: "Gin · sake",
    desc: "A French 75 made with gin, yuzu sake and elderflower.",
    img: "/img/fuji-75.webp",
    alt: "Fuji 75: a sparkling gin and yuzu-sake flute.",
  },
  {
    slug: "the-car",
    name: "The Car",
    base: "Brandy · Prosecco",
    desc: "A contemporary Sidecar: brandy, triple sec, lemon, peach liqueur and a touch of basil, topped with Prosecco.",
    img: "/img/the-car.webp",
    alt: "The Car: a Prosecco-topped Sidecar with a citrus twist.",
  },
  // ── Whisk(e)y & the dark side ────────────────────────
  {
    slug: "the-forager",
    name: "The Forager",
    base: "Whisky · truffle",
    desc: "A savoury whisky sour shaped by porcini and truffle, finished with salt and pepper. Quietly complex.",
    img: "/img/the-forager.webp",
    alt: "The Forager: a savoury, foam-topped whisky sour.",
  },
  {
    slug: "black-manhattan",
    name: "Black Manhattan",
    base: "Whiskey",
    desc: "No vermouth, finished with a squeeze of orange peel.",
    img: "/img/black-manhattan.webp",
    alt: "A Black Manhattan, deep and stirred, with an orange peel.",
  },
  {
    slug: "penicillin",
    name: "Penicillin",
    base: "Peated Scotch",
    desc: "Peated Scotch, ginger, honey and lemon. Still curing bad moods.",
    img: "/img/penicillin.webp",
    alt: "The Penicillin: a smoky Scotch sour with candied ginger.",
  },
  // ── Sours, spritz & the lighter side ─────────────────
  {
    slug: "pisco-sour",
    name: "Pisco Sour",
    base: "Pisco",
    desc: "Pisco, fresh lemon, sugar and a touch of egg white. Fruity, savoury, a taste of tradition.",
    img: "/img/pisco-sour.webp",
    alt: "A Pisco Sour with its signature foam cap and bitters.",
  },
  {
    slug: "forbidden-apple",
    name: "Forbidden Apple",
    base: "Calvados",
    desc: "Calvados, apricot brandy and fresh citrus.",
    img: "/img/forbidden-apple.webp",
    alt: "Forbidden Apple: an amber Calvados cocktail.",
  },
  {
    slug: "apricot-meringue",
    name: "Apricot Meringue",
    base: "Rum",
    desc: "Rum, vanilla syrup, muddled apricot and apricot liqueur. Fresh, sweet and fragrant.",
    img: "/img/apricot-meringue.webp",
    alt: "Apricot Meringue: a soft, fruit-forward rum cocktail.",
  },
  {
    slug: "rrush-e-kumbulla",
    name: "Rrush e Kumbulla",
    base: "Japanese gin · sake",
    desc: "Japanese gin, plum sake and pisco. Citrusy, a little umami, carbonated.",
    img: "/img/rrush-e-kumbulla.webp",
    alt: "Rrush e Kumbulla: a carbonated gin and plum-sake cocktail.",
  },
  {
    slug: "hugo-spritz",
    name: "Hugo Spritz",
    base: "Spritz",
    desc: "Feels like summer showing up without announcing itself.",
    img: "/img/hugo-spritz.webp",
    alt: "A Hugo Spritz with mint and elderflower over ice.",
  },
  {
    slug: "take-me-to-tokyo",
    name: "Take Me to Tokyo",
    desc: "A one-way ticket to Tokyo. Bright and clean.",
    img: "/img/take-me-to-tokyo.webp",
    alt: "Take Me to Tokyo: a pale, elegant cocktail.",
  },
  {
    slug: "two-faced",
    name: "2Faced",
    desc: "Light and green. Two sides, one drink.",
    img: "/img/two-faced.webp",
    alt: "2Faced: a pale-green layered cocktail.",
  },
  // ── Tea, coffee & after dark ─────────────────────────
  {
    slug: "spill-the-tea",
    name: "Spill the Tea",
    base: "Bourbon",
    desc: "Aromatic, floral and peachy from first sip to last.",
    img: "/img/spill-the-tea.webp",
    alt: "Spill the Tea: a tea-infused bourbon cocktail.",
  },
  {
    slug: "tea-time-reworked",
    name: "Tea Time, Reworked",
    base: "Alkkemist Gin",
    desc: "Peach oolong layered over Alkkemist Gin. Floral notes, gentle spice, long and aromatic.",
    img: "/img/tea-time-gin.webp",
    alt: "Tea Time Reworked: a tea-infused gin cocktail, amber and aromatic.",
  },
  {
    slug: "threeam-anxiety",
    name: "3AM Anxiety",
    base: "Espresso · mezcal",
    desc: "Our take on the Carajillo: espresso, Licor 43 and a touch of mezcal.",
    img: "/img/threeam-anxiety.webp",
    alt: "3AM Anxiety: a dark espresso-and-mezcal cocktail.",
  },
  {
    slug: "espresso-martini",
    name: "Espresso Martini",
    base: "Vodka · coffee",
    desc: "Espresso and vodka.",
  },
  // ── The familiars ────────────────────────────────────
  {
    slug: "guilty-pleasure",
    name: "Guilty Pleasure",
    desc: "Sweet enough to tempt you, strong enough to keep things interesting.",
    img: "/img/guilty-pleasure.webp",
    alt: "Guilty Pleasure: a pale cocktail topped with pink foam.",
  },
  {
    slug: "familiar-classic",
    name: "A Familiar Classic",
    desc: "A familiar classic with a subtle detour. Ask the bartender which one.",
    img: "/img/familiar-classic.webp",
    alt: "A Familiar Classic: an amber cocktail with an orange peel.",
  },
];

// Burgers, sandwiches and mains.
export const kitchen: Drink[] = [
  {
    slug: "ricotta-burger",
    name: "The Ricotta Burger",
    desc: "A juicy beef patty with creamy ricotta and mushrooms sautéed in truffle oil, fresh basil, all in a soft brioche bun.",
    img: "/img/ricotta-burger.webp",
    alt: "The Ricotta Burger: beef patty with ricotta, truffled mushrooms and basil in a brioche bun.",
  },
  {
    slug: "truffle-burger",
    name: "Truffle on Truffle",
    desc: "100% beef patty, Gruyère, truffle aioli, truffle salt and arugula. Built different.",
    img: "/img/truffle-burger.webp",
    alt: "Truffle on Truffle burger with Gruyère and arugula.",
  },
  {
    slug: "wine-cheese-burger",
    name: "Wine & Cheese Burger",
    desc: "One of our most-ordered burgers.",
    img: "/img/wine-cheese-burger.webp",
    alt: "The Wine & Cheese Burger.",
  },
  {
    slug: "ultimate-burger",
    name: "The Ultimate Burger",
    desc: "Brie, sun-dried tomatoes, caramelised onion and fig, and arugula.",
    img: "/img/ultimate-burger.webp",
    alt: "The Ultimate Burger with brie, fig and caramelised onion.",
  },
  { slug: "beef-burger", name: "Beef Burger", desc: "A plain beef burger." },
  {
    slug: "chicken-sandwich",
    name: "The Chicken Sandwich",
    desc: "Not reinventing the chicken sandwich. Just leaving a taste that stays.",
    img: "/img/chicken-sandwich.webp",
    alt: "The Chicken Sandwich: fried chicken, crisp and golden, in a soft bun.",
  },
  {
    slug: "truffle-honey-chicken-sandwich",
    name: "Truffle & Honey Fried Chicken Sandwich",
    desc: "Crispy, juicy chicken in truffle and honey with our homemade tomato jam. The closer you get, the better it gets.",
    img: "/img/truffle-honey-chicken-sandwich.webp",
    alt: "Truffle & Honey Fried Chicken Sandwich with tomato jam.",
  },
  {
    slug: "caesar-fried-chicken",
    name: "Caesar Fried Chicken Sandwich",
    desc: "Crispy fried chicken, fresh tomato, shredded iceberg, parmesan and our own Caesar dressing. Built to crush.",
    img: "/img/caesar-fried-chicken.webp",
    alt: "Caesar Fried Chicken Sandwich with parmesan and iceberg.",
  },
  {
    slug: "eggs-in-a-bun",
    name: "Eggs in a Bun",
    desc: "Soft scrambled eggs, chives, caramelised onions, cheese and sriracha mayo in warm shokupan.",
    img: "/img/eggs-in-a-bun.webp",
    alt: "Eggs in a Bun: scrambled eggs in soft shokupan bread.",
  },
  { slug: "steak-sandwich", name: "Steak Sandwich", desc: "Sliced steak in a sandwich." },
  { slug: "pulled-pork", name: "Pulled Pork Sandwich", desc: "Pulled pork in a sandwich." },
  {
    slug: "linguine-alla-vodka",
    name: "Linguine alla Vodka",
    desc: "Beef bresaola in a creamy vodka–tomato sauce, topped with aged parmesan.",
    img: "/img/linguine-alla-vodka.webp",
    alt: "Linguine alla Vodka topped with aged parmesan.",
  },
  {
    slug: "chicken-alfredo",
    name: "Chicken Fettuccine Alfredo",
    desc: "Chicken, spinach and mushrooms in a white-wine cream sauce, finished with parmesan.",
    img: "/img/chicken-alfredo.webp",
    alt: "Chicken Fettuccine Alfredo with parmesan.",
  },
  {
    slug: "fried-rice",
    name: "Fried Rice",
    desc: "With chicken, or add sirloin steak.",
    img: "/img/fried-rice.webp",
    alt: "Fried rice with chicken.",
  },
];

// Small plates, boards and salads — to share over a drink.
export const plates: Drink[] = [
  {
    slug: "cheese-platter",
    name: "Cheese Platter",
    desc: "Artisanal, homemade cheeses.",
    img: "/img/cheese-platter.webp",
    alt: "A cheese platter of local artisanal cheeses.",
  },
  {
    slug: "brie-sticks",
    name: "Brie Cheese Sticks",
    desc: "Brie in a golden crust, for dipping and sharing.",
    img: "/img/brie-sticks.webp",
    alt: "Brie cheese sticks in a golden crust.",
  },
  {
    slug: "loaded-fries",
    name: "Loaded Fries",
    desc: "Crunchy outside, fluffy inside, loaded with your choice of bacon or beef bresaola.",
    img: "/img/loaded-fries.webp",
    alt: "Loaded fries piled with toppings.",
  },
  { slug: "onion-rings", name: "Onion Rings", desc: "Fried onion rings." },
  { slug: "chicken-strips", name: "Chicken Strips", desc: "Fried chicken strips." },
  {
    slug: "speck-burrata-peaches",
    name: "Speck, Burrata & Grilled Peaches",
    desc: "Speck, burrata and grilled peaches. A Sunday plate.",
    img: "/img/speck-burrata-peaches.webp",
    alt: "Speck, burrata and grilled peaches on a plate.",
  },
  {
    slug: "gnocchi-truffle",
    name: "Gnocchi & Truffle",
    desc: "Gnocchi over zucchini purée, finished with truffle oil and fresh truffle.",
    img: "/img/gnocchi-truffle.webp",
    alt: "Gnocchi over zucchini purée with fresh truffle.",
  },
  {
    slug: "green-salad",
    name: "Green Salad & Goat Cheese",
    desc: "Fresh leaves, nuts and cherry tomatoes with goat's cheese.",
    img: "/img/green-salad.webp",
    alt: "Green salad with goat cheese, nuts and cherry tomatoes.",
  },
  {
    slug: "chicken-caesar-salad",
    name: "Chicken Caesar Salad",
    desc: "Caesar dressing made with anchovies, topped with aged parmesan.",
    img: "/img/chicken-caesar-salad.webp",
    alt: "Chicken Caesar salad topped with aged parmesan.",
  },
];

// We open at seven — coffee, breakfast and sweet things, all day.
export const coffee: Drink[] = [
  {
    slug: "espresso",
    name: "Espresso",
    desc: "First things first.",
    img: "/img/first-things-first.webp",
    alt: "A single espresso with a fine crema in a small cup.",
  },
];

export const sweet: Drink[] = [
  {
    slug: "fluffy-pancakes",
    name: "Fluffy Pancakes",
    desc: "Fresh berries, honey and a little powdered sugar.",
    img: "/img/pancakes-berries.webp",
    alt: "Fluffy pancakes stacked with fresh berries, honey and powdered sugar.",
  },
  {
    slug: "maple-pancakes",
    name: "Pancakes & Maple",
    desc: "Pancakes, butter and maple syrup.",
    img: "/img/maple-pancakes.webp",
    alt: "A stack of pancakes with butter and maple syrup.",
  },
  {
    slug: "blueberry-pancakes",
    name: "Blueberry Pancakes",
    desc: "Not much to say. Fluffy pancakes, blueberries, powdered sugar.",
    img: "/img/blueberry-pancakes.webp",
    alt: "Blueberry pancakes dusted with powdered sugar.",
  },
  {
    slug: "french-toast-grilled-cheese",
    name: "French Toast Grilled Cheese",
    desc: "Gouda between Japanese milk bread, dipped in French-toast batter, topped with cinnamon, honey and butter.",
    img: "/img/french-toast-grilled-cheese.webp",
    alt: "French toast grilled cheese, sweet and savoury.",
  },
  {
    slug: "french-toast-tiramisu",
    name: "French Toast, Our Way",
    desc: "Coffee-soaked and finished like a tiramisu. Sundays only.",
    img: "/img/french-toast-tiramisu.webp",
    alt: "French toast finished like a tiramisu, dusted with cocoa.",
  },
  {
    slug: "bagel",
    name: "Bagel, Egg, Cheese & Bacon",
    desc: "Egg, cheese and bacon on a bagel. Sundays.",
    img: "/img/bagel.webp",
    alt: "A bagel with egg, cheese and bacon.",
  },
  {
    slug: "crepe-suzette",
    name: "Crêpe Suzette",
    desc: "Thin crêpes in an orange and butter sauce.",
    img: "/img/crepe-suzette.webp",
    alt: "Crêpe Suzette folded in a glossy orange sauce.",
  },
  { slug: "chocolate-mousse", name: "Chocolate Mousse", desc: "Chocolate mousse." },
];

// Combined — kept only for the home page's all-day photo band.
export const allDay: Drink[] = [...coffee, ...sweet];

export const drinkGroups = [
  { id: "cocktails", label: "Signature Cocktails", note: "The list changes with the seasons, so ask what's on when you visit.", items: cocktails },
  { id: "coffee", label: "Coffee", note: "The full coffee list is at the bar.", items: coffee },
] as const;

export const eatGroups = [
  { id: "kitchen", label: "From the Kitchen", note: "Burgers, sandwiches and pasta.", items: kitchen },
  { id: "plates", label: "To Share", note: "Boards, fries and salads.", items: plates },
  { id: "all-day", label: "All-Day & Sweet", note: "Pancakes, crêpes and breakfast. We open at 07:00 on weekdays.", items: sweet },
] as const;

// Ambient background card sets — 12 unique photos each, no repeats. Used by
// the floating-card backdrop on /drinks and /eats (see MenuBackdrop).
export const drinkBackdrop: string[] = [
  "/img/blood-on-the-leaves-hero.webp",
  "/img/negroni-hi.webp",
  "/img/oasis-spirit-hi.webp",
  "/img/truffle-negroni.webp",
  "/img/spicy-margarita.webp",
  "/img/penicillin.webp",
  "/img/hugo-spritz.webp",
  "/img/naked-and-famous.webp",
  "/img/pisco-sour.webp",
  "/img/take-me-to-tokyo.webp",
  "/img/fuji-75.webp",
  "/img/enzoni.webp",
];

export const eatBackdrop: string[] = [
  "/img/ricotta-burger.webp",
  "/img/truffle-burger.webp",
  "/img/ultimate-burger.webp",
  "/img/chicken-sandwich.webp",
  "/img/linguine-alla-vodka.webp",
  "/img/chicken-alfredo.webp",
  "/img/fried-rice.webp",
  "/img/cheese-platter.webp",
  "/img/loaded-fries.webp",
  "/img/gnocchi-truffle.webp",
  "/img/speck-burrata-peaches.webp",
  "/img/green-salad.webp",
];

// The room — atmosphere shots for the ambiance carousel.
export const ambianceBackdrop: string[] = [
  "/img/whimsical-charm.webp",
  "/img/candlelight.webp",
  "/img/room-stories.webp",
  "/img/quiet-corner.webp",
  "/img/warm-sunshine.webp",
  "/img/evenings-stretch.webp",
  "/img/coziness.webp",
  "/img/heart-of-city.webp",
  "/img/bygone-era.webp",
];

// Curated gallery — the venue's own photography (file, alt). Atmosphere shots run tall.
export const gallery: { src: string; alt: string; tall?: boolean }[] = [
  { src: "/img/whimsical-charm.webp", alt: "Rattan chairs and marble tables under a round mirror.", tall: true },
  { src: "/img/blood-on-the-leaves-hero.webp", alt: "Blood on the Leaves cocktail in low candlelight." },
  { src: "/img/room-stories.webp", alt: "Tables by the windows at dusk, next to a patio heater." },
  { src: "/img/negroni-hi.webp", alt: "The house Negroni over a single block of ice.", tall: true },
  { src: "/img/truffle-burger.webp", alt: "Truffle on Truffle burger with Gruyère and arugula." },
  { src: "/img/spicy-margarita.webp", alt: "Spicy Margarita with a Tajín rim." },
  { src: "/img/quiet-corner.webp", alt: "The terrace with a patio heater and palms.", tall: true },
  { src: "/img/the-car.webp", alt: "The Car: a Prosecco-topped Sidecar." },
  { src: "/img/speck-burrata-peaches.webp", alt: "Speck, burrata and grilled peaches." },
  { src: "/img/cafe-negroni.webp", alt: "Café Negroni: coffee and mezcal, after dark." },
  { src: "/img/heart-of-city.webp", alt: "The Tintin Cocktail Bar sign behind greenery." },
  { src: "/img/it-burns.webp", alt: "It Burns: a fiery tequila cocktail with a chilli rim." },
  { src: "/img/ricotta-burger.webp", alt: "The Ricotta Burger with truffled mushrooms." },
  { src: "/img/candlelight.webp", alt: "Wall lamps over a mustard banquette in the evening.", tall: true },
  { src: "/img/penicillin.webp", alt: "The Penicillin: a smoky Scotch sour." },
  { src: "/img/loaded-fries.webp", alt: "Loaded fries to share." },
  { src: "/img/evenings-stretch.webp", alt: "Amber-lit tables and palms in the evening." },
  { src: "/img/naked-and-famous.webp", alt: "Naked & Famous: a pale-green mezcal sour." },
  { src: "/img/truffle-honey-chicken-sandwich.webp", alt: "Truffle & honey fried chicken sandwich." },
  { src: "/img/coziness.webp", alt: "Rattan chairs, pendant lamps and a stone wall inside Tintin.", tall: true },
  { src: "/img/pisco-sour.webp", alt: "A Pisco Sour with its foam cap." },
  { src: "/img/crepe-suzette.webp", alt: "Crêpe Suzette in glossy orange sauce." },
  { src: "/img/warm-sunshine.webp", alt: "The glass-roofed terrace in afternoon sun.", tall: true },
  { src: "/img/chocolate-negroni.webp", alt: "Chocolate Negroni." },
  { src: "/img/gnocchi-truffle.webp", alt: "Gnocchi over zucchini purée with fresh truffle." },
  { src: "/img/fuji-75.webp", alt: "Fuji 75: gin and yuzu sake, sparkling." },
  { src: "/img/bygone-era.webp", alt: "Palm leaves over a yellow bench." },
  { src: "/img/fried-rice.webp", alt: "Fried rice with chicken." },
  { src: "/img/oasis-spirit-hi.webp", alt: "Oasis: a pale cocktail on a dark marble bar.", tall: true },
  { src: "/img/black-manhattan.webp", alt: "A Black Manhattan, deep and stirred, with an orange peel." },
  { src: "/img/dirty-martini.webp", alt: "A Dirty Martini with olives in low light." },
  { src: "/img/enzoni.webp", alt: "Enzoni: a bright crimson gin and Campari sour." },
  { src: "/img/now-you-see-me.webp", alt: "Now You See Me: a cocktail crowned with a cloud of salt foam.", tall: true },
  { src: "/img/the-forager.webp", alt: "The Forager: a savoury, foam-topped whisky sour." },
  { src: "/img/threeam-anxiety.webp", alt: "3AM Anxiety: a dark espresso-and-mezcal cocktail." },
  { src: "/img/rhubarb-coconut-negroni.webp", alt: "Rhubarb & Coconut Negroni over clear ice." },
  { src: "/img/hugo-spritz.webp", alt: "A Hugo Spritz with mint and elderflower over ice." },
  { src: "/img/tea-time-gin.webp", alt: "Tea Time, Reworked: a tea-infused gin cocktail, amber and aromatic." },
  { src: "/img/ultimate-burger.webp", alt: "The Ultimate Burger with brie, fig and caramelised onion.", tall: true },
  { src: "/img/wine-cheese-burger.webp", alt: "The Wine & Cheese Burger." },
  { src: "/img/chicken-sandwich.webp", alt: "The Chicken Sandwich: fried chicken, crisp and golden, in a soft bun." },
  { src: "/img/cheese-platter.webp", alt: "A cheese platter of local artisanal cheeses." },
  { src: "/img/green-salad.webp", alt: "Green salad with goat cheese, nuts and cherry tomatoes." },
  { src: "/img/french-toast-tiramisu.webp", alt: "French toast finished like a tiramisu, dusted with cocoa.", tall: true },
  { src: "/img/bagel.webp", alt: "A bagel with egg, cheese and bacon." },
  { src: "/img/linguine-alla-vodka.webp", alt: "Linguine alla Vodka topped with aged parmesan." },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/drinks", label: "Drinks" },
  { href: "/eats", label: "Eats" },
  { href: "/about", label: "Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
];
