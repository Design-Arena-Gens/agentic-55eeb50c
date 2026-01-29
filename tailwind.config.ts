import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const withOpacity = (variable: string): any => {
  return ({ opacityValue }: { opacityValue?: number }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variable}) ${opacityValue * 100}%, transparent)`;
    }
    return `var(${variable})`;
  };
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      fontSize: {
        base: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        h1: ["24px", { lineHeight: "32px", fontWeight: "650" }],
        h2: ["18px", { lineHeight: "26px", fontWeight: "650" }],
        h3: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        mono: ["12px", { lineHeight: "18px", fontWeight: "500" }]
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem"
      },
      borderRadius: {
        xs: "8px",
        sm: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px"
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.35)",
        sm: "0 2px 4px rgba(0,0,0,0.3)",
        md: "0 8px 16px rgba(0,0,0,0.35)",
        lg: "0 18px 32px rgba(0,0,0,0.4)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: withOpacity("--color-border"),
        overlay: "var(--color-overlay)",
        brand: Object.fromEntries(
          Array.from({ length: 12 }, (_, idx) => [idx + 1, withOpacity(`--color-brand-${idx + 1}`)])
        ),
        neutral: Object.fromEntries(
          Array.from({ length: 12 }, (_, idx) => [idx + 1, withOpacity(`--color-neutral-${idx + 1}`)])
        ),
        success: Object.fromEntries(
          Array.from({ length: 12 }, (_, idx) => [idx + 1, withOpacity(`--color-success-${idx + 1}`)])
        ),
        warning: Object.fromEntries(
          Array.from({ length: 12 }, (_, idx) => [idx + 1, withOpacity(`--color-warning-${idx + 1}`)])
        ),
        danger: Object.fromEntries(
          Array.from({ length: 12 }, (_, idx) => [idx + 1, withOpacity(`--color-danger-${idx + 1}`)])
        ),
        info: Object.fromEntries(
          Array.from({ length: 12 }, (_, idx) => [idx + 1, withOpacity(`--color-info-${idx + 1}`)])
        )
      },
      backgroundImage: {
        "button-primary": "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.25) 100%)"
      },
      transitionTimingFunction: {
        "smooth-bounce": "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--shadow-top": "rgba(255, 255, 255, 0.1)",
          "--shadow-bottom": "rgba(0, 0, 0, 0.35)"
        }
      });
    })
  ]
};

export default config;
