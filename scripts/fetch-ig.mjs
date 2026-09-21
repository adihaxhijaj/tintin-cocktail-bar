// Download a curated set of real venue photos from the Instagram dataset into
// assets/sourced/. Then `npm run optimize:images` turns them into WebP + blur.
// Source of truth for which post → which slug lives here.
// Run: node scripts/fetch-ig.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import https from "node:https";

const DATASET = "C:/Users/AdiH/Desktop/tintin-dataset.json";
const OUT = "assets/sourced";

// Curated map: dataset index → output slug. Chosen for image quality + a clean,
// single-subject caption we can write editorial copy from. (See site.ts.)
const PICKS = {
  // ── Cocktails ───────────────────────────────────────────
  10: "threeam-anxiety",
  11: "spicy-margarita",
  17: "black-manhattan",
  24: "chocolate-negroni",
  29: "dirty-martini",
  30: "hugo-spritz",
  31: "two-faced",
  32: "rhubarb-coconut-negroni",
  33: "the-forager",
  46: "take-me-to-tokyo",
  50: "penicillin",
  53: "fifty-fifty-martini",
  57: "truffle-negroni",
  58: "cafe-negroni",
  62: "spill-the-tea",
  65: "naked-and-famous",
  73: "rrush-e-kumbulla",
  82: "al-pastor",
  90: "fuji-75",
  91: "pisco-sour",
  102: "forbidden-apple",
  108: "it-burns",
  111: "now-you-see-me",
  117: "the-car",
  185: "apricot-meringue",
  215: "enzoni",
  // ── Kitchen ─────────────────────────────────────────────
  18: "french-toast-tiramisu",
  34: "bagel",
  39: "gnocchi-truffle",
  40: "speck-burrata-peaches",
  54: "truffle-burger",
  59: "wine-cheese-burger",
  60: "caesar-fried-chicken",
  92: "truffle-honey-chicken-sandwich",
  104: "brie-sticks",
  122: "loaded-fries",
  147: "fried-rice",
  175: "linguine-alla-vodka",
  181: "green-salad",
  188: "french-toast-grilled-cheese",
  189: "chicken-alfredo",
  194: "chicken-caesar-salad",
  200: "ultimate-burger",
  203: "eggs-in-a-bun",
  237: "cheese-platter",
  // ── All-day / sweet ─────────────────────────────────────
  66: "maple-pancakes",
  // ── Atmosphere / the room (gallery + about/home) ────────
  22: "room-stories",
  23: "quiet-corner",
  42: "evenings-stretch",
  86: "candlelight",
  120: "bygone-era",
  164: "whimsical-charm",
  179: "warm-sunshine",
  218: "heart-of-city",
  236: "coziness",
};

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location &&
          redirects < 5
        ) {
          res.destroy();
          return resolve(get(res.headers.location, redirects + 1));
        }
        if (res.statusCode !== 200) {
          res.destroy();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

const data = JSON.parse(await readFile(DATASET, "utf8"));
await mkdir(OUT, { recursive: true });

let ok = 0,
  fail = 0;
for (const [idx, slug] of Object.entries(PICKS)) {
  const post = data[Number(idx)];
  if (!post?.displayUrl) {
    console.warn(`! [${idx}] ${slug} — no displayUrl`);
    fail++;
    continue;
  }
  try {
    const buf = await get(post.displayUrl);
    await writeFile(`${OUT}/${slug}.jpg`, buf);
    console.log(`✓ ${slug}.jpg  (${(buf.length / 1024).toFixed(0)}KB)`);
    ok++;
  } catch (e) {
    console.warn(`! [${idx}] ${slug} — ${e.message}`);
    fail++;
  }
}
console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
