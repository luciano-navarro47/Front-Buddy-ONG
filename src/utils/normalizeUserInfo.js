export function normalizeUserInfo(user) {
  if (!user) return null;

  const id = user.id || null;
  const email = user.email || null;

  const fullName =
    user.fullName ||
    [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
    user.first_name ||
    "";

  // billing_address is optional, include if exists
  const normalized = {
    id,
    email,
    fullName,
  };

  if (user.billing_address) {
    normalized.billing_address = user.billing_address;
  }

  return normalized;
}
