# Recipe Search App

A simple recipe search web app built with HTML, CSS, and JavaScript.
Search for recipes by name or main ingredient, and view full ingredients
and instructions in a popup. Data comes from the free [TheMealDB](https://www.themealdb.com/) API — no API key or signup needed.

## Files
- `index.html` — page structure
- `style.css` — styling (white background, black text, green accents)
- `script.js` — search logic, API calls, rendering

## How to run

You just need to open `index.html` in a browser. Two easy ways:

### Option 1: Open directly
Double-click `index.html`, or open it via your browser's File > Open menu.

### Option 2: Run a local server (recommended, avoids some browser restrictions)

**Using Python** (comes pre-installed on most systems):
```bash
cd recipe-search-app
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

**Using Node.js:**
```bash
cd recipe-search-app
npx http-server -p 8000
```
Then open http://localhost:8000 in your browser.

**Using VS Code:**
Install the "Live Server" extension, right-click `index.html`, and choose "Open with Live Server".

## Deploying
To deploy for free, drag the folder into [Netlify Drop](https://app.netlify.com/drop),
or push it to a GitHub repo and enable GitHub Pages in the repo settings.

## Notes
- No build step, no dependencies, no API key required.
- Try searching by dish name (e.g. "pasta") or ingredient (e.g. "chicken").
