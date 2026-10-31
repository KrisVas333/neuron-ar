# 🔍 Disleksijos lęšis · Dyslexia Lens

**Nukreipk telefoną į knygą ir pajausk, kaip skaito žmogus su disleksija.**
**Point your phone at a book and feel how someone with dyslexia reads.**

👉 **LT:** https://krisvas333.github.io/neuron-ar/disleksija/
👉 **EN:** https://krisvas333.github.io/neuron-ar/disleksija/en/

Be prisijungimo. Nemokamai. Veikia bet kuriame telefone. · No login. Free. Works on any phone.

---

## 🇱🇹 Apie projektą

Disleksijos lęšis yra trumpas eksperimentas tėvams, mokytojams ir visiems smalsiems.

Nukreipi telefono kamerą į knygą, lapą ar ekraną. Spaudi **✨ Skenuoti**. Renkiesi lygį nuo 1 iki 6.
Ir tekstas pasikeičia taip, kaip skaitymas gali jaustis žmogui su disleksija.

→ 6 lygiai, kiekvienas su mokslo šaltiniu ir įvertinimu A, B arba C
→ kamera, nuotrauka arba įklijuotas tekstas
→ viskas vyksta tavo telefone, niekas niekur nesiunčiama
→ lietuviškai ir angliškai

**Svarbu:** disleksija nėra „blogos akys". Tai smegenų skirtumas: sunkiau greitai susieti raides su garsais. Čia tai parodyta vaizdu, kad galėtum pajausti pastangas. Kiekvienas žmogus skirtingas. Tai ne diagnozė.

### 6 lygiai

Kiekvienas lygis prideda vieną sluoksnį. Tikrovėje kiekvienas žmogus turi savo derinį.

| Lygis | Ką matai | Mokslas |
|---|---|---|
| 0 | Įprastai, palyginimui | |
| 1 | **Susigrūdimas:** raidės sulimpa su kaimynėmis | B · Zorzi ir kt., 2012, PNAS |
| 2 | **Lėtas skaitymas:** aiškus tik vienas žodis vienu metu | A · tarptautinis sutarimas; Martelli ir kt., 2009 |
| 3 | **Veidrodinės raidės:** b virsta d, p virsta q | B · Scientific Reports, 2025 |
| 4 | **Raidžių vieta:** „kalba" tampa „klaba" | B · Friedmann ir Rahamim, 2007 |
| 5 | **Garsai:** b ir p, d ir t, s ir z susimaišo | A · Frontiers in Education, 2020 (apžvalga) |
| 6 | **Mirgėjimas:** žodžiai banguoja, atsiranda „šešėlinės" eilutės | C · tik asmeniniai pasakojimai |

A = stiprūs, pakartoti įrodymai · B = vienas tvirtas tyrimas ar potipis · C = ginčytina arba tik pasakojimai.

„Šokinėjančios raidės" yra tik 6 lygyje. Tarptautinė disleksijos asociacija (IDA) tokias simuliacijas vadina „įtikinamomis, galingomis ir klaidingomis". Todėl pradedam nuo to, ką rodo mokslas: lėtumas, pastangos, garsai.

### Apie mane

Mokykloje viename diktante padariau 30 klaidų.

Turiu disleksiją. Šiandien knygas „skaitau" ausimis: per metus daugiau nei 40 audioknygų. O savo knygą diktuoju.

Daugiau nei dešimtmetį kuriu būrelius, kuriuose vaikai technologijas STATO. Įkūriau **Robotikos Akademiją** (12 000+ vaikų per metus), esu **ExoClass** bendraįkūrėjas ir **BrAIn Club** kūrėjas.

Šį įrankį pastačiau per vieną rytą su savo „antrosiomis smegenimis" ir Claude. Norėjau, kad tėtis ar mama bent minutę pajaustų tai, ką jų vaikas jaučia kasdien.

Ką tavo vaikui sunkiausia skaityti? Parašyk man 👇
**Kristijonas Vasiliauskas** · [krisvas.lt](https://krisvas.lt/?src=github)

---

## 🇬🇧 About the project

Dyslexia Lens is a short experiment for parents, teachers and anyone curious.

Point your phone camera at a book, a page or a screen. Tap **✨ Scan**. Pick a level from 1 to 6.
The text changes to show how reading can feel for someone with dyslexia.

→ 6 levels, each with a research source and an A, B or C grade
→ camera, photo upload or pasted text
→ everything runs on your phone, nothing is sent anywhere
→ Lithuanian and English

**Important:** dyslexia isn't "bad eyes". It's a brain difference: linking letters to sounds quickly is harder. The tool shows it as a picture so you can feel the effort. Everyone is different. This is not a diagnosis.

| Level | What you see | Evidence |
|---|---|---|
| 0 | Typical, for comparison | |
| 1 | **Crowding:** letters stick to their neighbours | B · Zorzi et al., 2012, PNAS |
| 2 | **Slow reading:** only one word is clear at a time | A · international consensus; Martelli et al., 2009 |
| 3 | **Mirror letters:** b turns into d, p into q | B · Scientific Reports, 2025 |
| 4 | **Letter position:** "form" becomes "from" | B · Friedmann & Rahamim, 2007 |
| 5 | **Sounds:** b and p, d and t, s and z get mixed up | A · Frontiers in Education, 2020 (review) |
| 6 | **Shimmer:** words wave and "ghost" lines appear | C · personal accounts only |

"Jumping letters" only show up at level 6. The International Dyslexia Association calls that kind of simulation "compelling, powerful, and wrong", so the tool starts with what research supports: slowness, effort, sounds.

### About me

I couldn't read a page properly until I was 11.

I'm dyslexic. At school I once made 30 mistakes in a single dictation. Today I read with my ears, 40+ audiobooks a year. And I'm dictating my own book.

For more than a decade I've built after-school clubs where kids BUILD technology. I founded **Robotikos Akademija** (12,000+ kids a year), co-founded **ExoClass** and created **BrAIn Club**.

I built this in one morning with my second brain and Claude. I wanted a mum or dad to feel, for one minute, what their kid feels every day.

What's the hardest thing for your kid to read? Tell me 👇
**Kristijonas Vasiliauskas** · [krisvas.lt](https://krisvas.lt/?src=github)

---

## ⚙️ How it works

1. The phone camera (`getUserMedia`) grabs a frame.
2. [Tesseract.js](https://github.com/naptha/tesseract.js) reads every word **on the device** (Lithuanian + English models, ~5 MB, cached after the first use) and returns each word's box and baseline.
3. Each word is painted over in the paper colour and redrawn on a `<canvas>` with the level's effect (letter spacing, fading reading window, b/d swaps, interior swaps, sound-alike swaps, shimmer).

Why not WebXR? iPhone Safari doesn't support WebXR, and most parents use iPhones. Camera + canvas works everywhere. The **Meta Quest 3** version (WebXR) is in progress.

**Run locally:** it's one static file.
```
python3 -m http.server 8000
# open http://localhost:8000  (the camera needs https or localhost)
```

## 🔒 Privacy

No login, no cookies without consent. The camera image and the text never leave the phone. The page counts anonymous events (which level, whether a scan worked, an anonymous "does this match your experience?" vote) so the tool can get better. Microsoft Clarity loads only after you tap „Leisti" (Allow).

## 📚 Sources

- Zorzi M. et al. (2012). Extra-large letter spacing improves reading in dyslexia. *PNAS* 109(28). https://pubmed.ncbi.nlm.nih.gov/22665803/
- Martelli M. et al. (2009). Crowding, reading, and developmental dyslexia. *Journal of Vision* 9(4). https://iris.uniroma1.it/handle/11573/364327
- *Scientific Reports* (2025): study of mirror-letter errors (b/d) in beginning readers. https://link.springer.com/article/10.1038/s41598-025-21092-5
- Friedmann N. & Rahamim E. (2007). Developmental letter position dyslexia. https://researchers.mq.edu.au/en/publications/letter-position-dyslexia/
- *Frontiers in Education* (2020): review article on the causes of dyslexia. https://www.frontiersin.org/articles/10.3389/feduc.2020.00118/full
- Griffiths P. et al. (2016), *Ophthalmic & Physiological Optics*: review of the evidence on coloured overlays and visual stress. https://pubmed.ncbi.nlm.nih.gov/27580753/
- International Dyslexia Association. Online dyslexia simulation is compelling, powerful, and wrong. https://dyslexiaida.org/online-dyslexia-simulation-is-compelling-powerful-and-wrong
- Peterson R. & Pennington B. (2012). Developmental dyslexia. *The Lancet*. Prevalence about 5–10 %, depending on criteria. https://www.eurekalert.org/news-releases/691417
- dyslexia.com: What do dyslexics see? https://www.dyslexia.com/question/what-dyslexics-see/

## ⚗️ Disclaimer

Experimental prototype, built with AI. It can be wrong, so check important things with a specialist. Free. Found a mistake? Open an issue or write to me at [krisvas.lt](https://krisvas.lt/?src=github).

Code: MIT licence. Built with [Claude Code](https://claude.com/claude-code).
