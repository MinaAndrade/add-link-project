# Style Guide

## Theme Tokens

Use the Tailwind theme tokens in `tailwind.config.js` before adding raw hex
values to components.

- `brand` and `brand-hover`: primary actions and public short links.
- `danger` and `danger-hover`: validation errors and destructive actions.
- `surface-canvas`, `surface-card`, `surface-hover`, `surface-danger`: page,
  card, hover, and error backgrounds.
- `content-strong`, `content-body`, `content-muted`: text hierarchy.
- `border-subtle`, `border-input`: dividers and form controls.

## Layout

Components should be mobile-first: base classes define the narrow layout, and
breakpoints such as `sm:` or `lg:` only add wider-screen behavior.

## Link Identifiers

`id` is the internal database identifier and should be used for mutations such
as delete/update. `shortCode` is the public route segment and should be used for
navigation, copy-to-clipboard, and display as `brev.ly/{shortCode}`.
