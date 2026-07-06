import { randomInt } from "node:crypto";

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateShortCode(length = 6): string {
  return Array.from({ length }, () => {
    return ALPHABET[randomInt(ALPHABET.length)];
  }).join("");
}