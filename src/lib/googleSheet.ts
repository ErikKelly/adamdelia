// Reads one tab of a public Google Sheet as CSV and returns rows keyed by
// the (lower-cased) header row. The sheet must be shared as
// "Anyone with the link can view".
export async function fetchSheetRows(
  sheetId: string,
  tab: string,
): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Google Sheet request failed (${res.status})`)
  const [header, ...rows] = parseCsv(await res.text())
  if (!header) return []

  const keys = header.map((h) => h.trim().toLowerCase())
  return rows
    .filter((r) => r.some((cell) => cell.trim() !== ''))
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])))
}

// Minimal RFC 4180 CSV parser: handles quoted fields, escaped quotes and
// newlines inside quotes.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') {
        inQuotes = false
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += c
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}
