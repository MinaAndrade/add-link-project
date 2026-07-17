# Style Guide and Component Guide

## Theme Tokens

Use the Tailwind theme tokens in `tailwind.config.js` before adding raw hex
values to components.

- `brand` and `brand-hover`: primary actions and public short links.
- `danger` and `danger-hover`: validation errors and destructive actions.
- `surface-canvas`, `surface-card`, `surface-hover`, `surface-danger`: page,
  card, hover, and error backgrounds.
- `content-strong`, `content-body`, `content-muted`: text hierarchy.
- `border-subtle`, `border-input`: dividers and form controls.
- `font-sans`, `font-brand`: body copy and the brev.ly wordmark.
- `spacing.card`, `spacing.control`, `spacing.list-max`, `spacing.desktop-x`:
  shared card padding, form/button height, list height, and desktop gutters.

## Layout

Components should be mobile-first: base classes define the narrow layout, and
breakpoints such as `sm:` or `lg:` only add wider-screen behavior.

Mobile cards use `24px` padding and expand to the larger card spacing on
`sm:` screens. Desktop-only values, such as the two-column home grid, must stay
behind `lg:` classes.

## Components

- `Card`: use for the primary framed surfaces only. Do not nest cards.
- Form fields: use `border-input`, `focus:border-brand`, and a visible danger
  state with `border-danger`, `surface-danger`, and an inline error icon.
- Primary button: use `bg-brand`, `hover:bg-brand-hover`, and disabled opacity.
- Icon buttons: use `surface-canvas` with `surface-hover`; icons should come
  from `lucide-react`.
- Empty state: use the link icon, uppercase helper text, and the shared divider
  token.
- Error state: include a short explanation and a retry action when recovery is
  possible.
- Access counter: keep the text compact and use a brief `brand` highlight only
  when the value increases after a refresh.

## Link Identifiers

`id` is the internal database identifier and should be used for mutations such
as delete/update. `shortCode` is the public route segment and should be used for
navigation, copy-to-clipboard, and display as `brev.ly/{shortCode}`.
