/**
 * Build assets/bible.json (Louis Segond 1910, domaine public).
 * Source: https://github.com/thiagobodruk/bible (json/fr_lsg.json)
 */
import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const OUT = path.join(__dirname, "..", "assets", "bible.json");

const NT = new Set([
  "Matthieu","Marc","Luc","Jean","Actes","Romains","1 Corinthiens","2 Corinthiens",
  "Galates","Éphésiens","Philippiens","Colossiens","1 Thessaloniciens","2 Thessaloniciens",
  "1 Timothée","2 Timothée","Tite","Philémon","Hébreux","Jacques","1 Pierre","2 Pierre",
  "1 Jean","2 Jean","3 Jean","Jude","Apocalypse",
]);

const ABREV: Record<string, string> = {
  "Genèse":"Gn","Exode":"Ex","Lévitique":"Lv","Nombres":"Nb","Deutéronome":"Dt",
  "Josué":"Jos","Juges":"Jg","Ruth":"Rt","1 Samuel":"1S","2 Samuel":"2S",
  "1 Rois":"1R","2 Rois":"2R","1 Chroniques":"1Ch","2 Chroniques":"2Ch",
  "Esdras":"Esd","Néhémie":"Né","Esther":"Est","Job":"Jb","Psaumes":"Ps",
  "Proverbes":"Pr","Ecclésiaste":"Ec","Cantique des Cantiques":"Ct","Ésaïe":"És",
  "Jérémie":"Jr","Lamentations":"Lm","Ézéchiel":"Éz","Daniel":"Dn","Osée":"Os",
  "Joël":"Jl","Amos":"Am","Abdias":"Ab","Jonas":"Jon","Michée":"Mi","Nahum":"Na",
  "Habacuc":"Ha","Sophonie":"So","Aggée":"Ag","Zacharie":"Za","Malachie":"Ml",
  "Matthieu":"Mt","Marc":"Mc","Luc":"Lc","Jean":"Jn","Actes":"Ac","Romains":"Rm",
  "1 Corinthiens":"1Co","2 Corinthiens":"2Co","Galates":"Ga","Éphésiens":"Ep",
  "Philippiens":"Ph","Colossiens":"Col","1 Thessaloniciens":"1Th","2 Thessaloniciens":"2Th",
  "1 Timothée":"1Tm","2 Timothée":"2Tm","Tite":"Tt","Philémon":"Phm","Hébreux":"He",
  "Jacques":"Jc","1 Pierre":"1P","2 Pierre":"2P","1 Jean":"1Jn","2 Jean":"2Jn",
  "3 Jean":"3Jn","Jude":"Jude","Apocalypse":"Ap",
};

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "ma-bible-build" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(fetchText(res.headers.location!));
      }
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

(async () => {
  console.log("Téléchargement de la Louis Segond 1910…");
  const raw = await fetchText(
    "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/fr_lsg.json"
  );
  // Le fichier source peut commencer par un BOM ou être encodé ISO-8859-1.
  const cleaned = raw.replace(/^\uFEFF/, "");
  const src: Array<{ name: string; abbrev: string; chapters: string[][] }> = JSON.parse(cleaned);

  const livres = src.map((b) => ({
    nom: b.name,
    abrev: ABREV[b.name] ?? b.abbrev,
    testament: NT.has(b.name) ? "nouveau" : "ancien",
    chapitres: b.chapters.map((verses, i) => ({
      numero: i + 1,
      versets: verses.map((t, j) => ({ numero: j + 1, texte: t })),
    })),
  }));

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ livres }));
  const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
  console.log(`✓ ${OUT} — ${livres.length} livres — ${mb} Mo`);
})();
