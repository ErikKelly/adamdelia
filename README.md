# Adam Delia — Personal Training & Yoga

Marketing site built with Vite + React + TypeScript. No UI libraries; styles are in `src/index.css`.

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
```

## Editing content

- **Text, services, credentials, areas, contact info:** `src/content.ts`
- **Section copy:** `src/components/*.tsx`
- **Colors & fonts:** CSS variables at the top of `src/index.css`
- **Photos:** replace the placeholder `div`s in `Hero.tsx` / `About.tsx` with `<img>` (put files in `public/`)

## Live data (optional)

Copy `.env.example` to `.env.local` and fill in what you want. Anything left blank uses the sample content.

### Schedule ← public Google Calendar
1. In Google Calendar: Settings → the calendar → *Make available to public*. Copy the **Calendar ID**.
2. In Google Cloud Console: enable the **Google Calendar API**, create an **API key**, and restrict it to your domain.
3. Set `VITE_GOOGLE_CALENDAR_ID` and `VITE_GOOGLE_API_KEY`.

Events are tagged "Upper East Side" or "Queens" by keywords in their location/title (see `Schedule.tsx`).

### Services & testimonials ← public Google Sheet
Share the sheet as *Anyone with the link can view* and set `VITE_GOOGLE_SHEET_ID`. Add tabs:

| Tab            | Columns (row 1)                          |
| -------------- | ---------------------------------------- |
| `Services`     | `title, description, format, price` (price optional) |
| `Testimonials` | `quote, name, detail`                    |

The testimonials section stays hidden until the sheet has at least one row.

Changes in the sheet show up on the next page load with no redeploy.

## Contact form
For now it opens the visitor's email client (`mailto:`). To receive submissions directly, point it at a form service like Formspree or Netlify Forms in `Contact.tsx`.
