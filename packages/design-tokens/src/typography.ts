export const typography = {
  fontFamily: {
    sans: "'Be Vietnam Pro', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export type Typography = typeof typography;
