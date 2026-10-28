#!/usr/bin/env python3
"""Screenshot one page of the site — the art-review loop that does not need a chapter or a beat.

    PYTHONPATH=skill/scripts python3 tools/probe.py lions-whisker/lion-test.html --out books/lions-whisker/review/probe/lion.png

Unlike shot.py (which walks a chapter's beats), this opens any URL under the preview server at a
fixed moment and saves a full-page PNG. Use it for rig tests: a puppet drawn at four poses on one
page, judged in one image, in about forty seconds.
"""
import argparse
import asyncio
import sys

from playwright.async_api import async_playwright

sys.path.insert(0, 'skill/scripts')
from browsers import answers, exe  # noqa: E402


async def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('path', help='path under the server root, e.g. lions-whisker/lion-test.html')
    ap.add_argument('--out', required=True)
    ap.add_argument('--port', default=8765, type=int)
    ap.add_argument('--wait', default=1500, type=int, help='ms to let fonts, bakes and rAF settle')
    ap.add_argument('--width', default=1600, type=int)
    ap.add_argument('--height', default=1000, type=int)
    a = ap.parse_args()

    url = f'http://localhost:{a.port}/{a.path}'
    answers(url)

    errors: list[str] = []
    async with async_playwright() as p:
        b = await p.chromium.launch(**exe())
        pg = await b.new_page(viewport={'width': a.width, 'height': a.height})
        pg.on('pageerror', lambda e: errors.append(str(e)))
        pg.on('console', lambda m: errors.append(f'console.{m.type}: {m.text}') if m.type == 'error' else None)
        await pg.goto(url, wait_until='networkidle')
        await pg.wait_for_timeout(a.wait)
        await pg.screenshot(path=a.out, full_page=True)
        await b.close()

    print(f'saved {a.out}')
    for e in errors:
        print('PAGE ERROR:', e)
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(asyncio.run(main()))
