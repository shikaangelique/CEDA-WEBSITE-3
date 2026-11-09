// publications.type is a database enum (supabase/schema/005_publication_type_enum.sql)
// with exactly these values. It decides where a document appears:
//   'Report'                        → Resource Centre → Publications
//   'CEDA Policy', 'Annual Report'  → Resource Centre → Annual Reports (PDF tiles)
// Adding a new type means updating the enum in Supabase and this file.
export const PUBLICATION_TYPES = ['Report', 'CEDA Policy', 'Annual Report']
export const ANNUAL_REPORT_TYPES = ['CEDA Policy', 'Annual Report']

const inList = `(${ANNUAL_REPORT_TYPES.map((type) => `"${type}"`).join(',')})`

// Supabase filter: only Annual Reports-tab documents.
export function onlyAnnualReportTypes(query) {
  return query.filter('type', 'in', inList)
}

// Supabase filter: everything else (rows with no type count as publications).
export function excludeAnnualReportTypes(query) {
  return query.or(`type.is.null,type.not.in.${inList}`)
}
