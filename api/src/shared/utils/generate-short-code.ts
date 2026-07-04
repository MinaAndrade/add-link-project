const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateShortCode(length = 6): string {
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * ALPHABET.length);

    return ALPHABET[index];
  }).join("");
}