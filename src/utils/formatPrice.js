export const formatPrice = (value) => {
  if (value === undefined || value === null || value === "") return "";

  const s = typeof value === "string" ? value : String(value);

  let cleaned = s.trim().replace(/[^\d.,]/g, "");

  // If there are more than one comma, keep only the first
  const commaParts = cleaned.split(",");
  if (commaParts.length > 2) cleaned = commaParts[0] + "," + commaParts[1];

  // Separate integers and decimals
  let [integer, decimal = ""] = cleaned.split(/[,.]/);

  // Limit integers to 8 digits
  integer = integer.slice(0, 8);
  decimal = decimal.slice(0, 2);

  // Format with thousands separators
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combine
  return decimal ? `${integer},${decimal}` : integer;
};

// Convert the formatted string to a number
export const parsePriceToNumber = (formatted) => {
  // Keep legacy behavior: return 0 for empty / null / undefined
  if (formatted === undefined || formatted === null || formatted === "")
    return 0;

  // Ensure we work with a string
  let s = typeof formatted === "string" ? formatted : String(formatted);

  s = s.trim();
  s = s.replace(/\(|\)|\$|€/g, "");

  // Remove thousands separators (dots)
  s = s.replace(/\./g, "");

  // Now replace comma decimal with dot so Number() parses it correctly
  // e.g. "24100,40" -> "24100.40"
  // (previous bug removed the comma instead; now we convert it)
  s = s.replace(/,/g, ".");

  const n = Number(s);
  if (Number.isNaN(n)) return 0;
  return n;
};
