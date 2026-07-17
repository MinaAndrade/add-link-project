/** Internal database identifier. Use it for mutations such as delete/update. */
export type LinkId = string;

/** Public route segment. Use it for navigation, display, and copy actions. */
export type ShortCode = string;

export interface Link {
  id: LinkId;
  originalUrl: string;
  shortCode: ShortCode;
  accessCount: number;
  createdAt: string;
}
