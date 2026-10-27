# adwa-papermorph

Build pipeline for **Papermorph** books — PDFs and stories turned into narrated, interactive
static web pages (and MP4s).

Same shape as `adwa-remotion`: **authoring happens on the phone**, the part that needs a
real browser and a real `ffmpeg` happens here on GitHub Actions.

```
phone  ──►  skill/scripts/*  ──►  commit site/ + content/  ──►  Actions  ──►  artifacts
        (write, narrate)        (static files only)          (check, shot, export)
```

## Why the split

Playwright's Chromium cannot run in Termux (bionic, no glibc), and Chromium on the
Oracle VPS has already taken `adwaaudit.com` down once. So:

| Step | Runs on | Why |
|---|---|---|
| intake, outlines, beats, SVG/JS authoring | phone | no browser needed |
| narration (`tts.py` → edge-tts, per-beat MP3 + word times) | phone | pure network + ffmpeg |
| static lint (`lint.py`) | both | no browser |
| page errors, beat lengths (`check.py`, Chromium **and** Firefox) | **Actions** | needs a browser |
| review screenshots, contact sheets (`shot.py`) | **Actions** | needs a browser |
| MP4 + SRT (`export.py`) | **Actions** | frames are seeked, not recorded |

## Layout

```
skill/        the Papermorph skill, vendored (SKILL.md, references/, scripts/, assets/)
engine/       the drawing engine (engine-v2.7); new_book.py copies it into each book
site/<book>/  the built static book — this is the deliverable
content/<book>/chNN/narration.<lang>.json   narration + [[mark]] timing marks
books/<book>/ private working folder (storyboards, art, review output)
```

`site/<book>/` is self-contained: it runs on any static host, no server, no database.

## Dispatch a run

From the phone (this is the normal path):

```bash
./run.sh check smoke ch01 en
./run.sh shot smoke ch01
./run.sh export smoke ch01 en 1080
./run.sh smoke  newbook ch01
```

Or from GitHub: Actions → **papermorph** → Run workflow.

| task | what it does |
|---|---|
| `smoke` | scaffold if missing → narrate if missing → `lint` → `check` (the full toolchain proof) |
| `lint` | static checks only: duplicate globals, missing audio, stale narration, style.json |
| `check` | every beat opened at its middle and last frame in Chromium **and** Firefox; page errors, console errors, beat-length overruns |
| `shot` | review PNGs + 2×2 contact sheets, plus per-beat stills |
| `export` | 1080p MP4 + `.srt`, sound mixed the way the page plays it, question beats left out |

Artifacts land as `papermorph-<book>-<task>-<run>` (14-day retention).

## Amharic

Edge TTS ships Amharic voices — `am-ET-MekdesNeural` (female), `am-ET-AmehaNeural` (male).
Put them in `content/<book>/chNN/narration.am.json`:

```json
{ "voice": "am-ET-MekdesNeural", "rate": "-4%", "beats": { "intro": "..." } }
```

Then run with `lang=am`. The engine's page font is a Latin subset; a book that draws its own
Ethiopic text needs a full font in `site/<book>/lib/` (see Norcha: `fonts/noto-ethiopic-full.woff2`).

## Known constraints

- **Cost**: the author prices an illustrated chapter at **$10–18 of model usage**. That is the
  real limit on scale, not the pipeline. Free-Swarm substitutions cost quality, not runtime.
- **Playwright browsers are pinned to the runner**, not the repo — `engine-v2.7` expects Chromium
  behaviour as of writing; a Chromium major bump can change the GPU-stall warnings `check.py`
  filters.
- **`ffmpeg` on this phone** is Termux 9.0.2 and works, but the Termux packaging needed
  `libx265` 4.3 + `libplacebo` + `libbluray` to line up. Don't `pkg upgrade` blindly — it pulls
  a 164-package full-upgrade and swallows the lock.
- Every book keeps a **full copy of the engine** in its own `lib/`, so a book never breaks when
  the engine moves. Fix the engine at the source and re-run `engine.py`, never the copies.

## Attribution

Papermorph — <https://github.com/DozenTwelve/Papermorph> — MIT, vendored here verbatim in
`skill/` and `engine/` under the upstream `LICENSE`. Not affiliated with upstream; this repo is
the build/verify pipeline around it.
