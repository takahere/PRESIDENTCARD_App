import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Colors (推奨 - 用途別)
        upsider: {
          primary: "#394D45",
          bg: "#001215",
          accent: "#E7A344",
          "primary-text": "#1BA86F",
          error: "#FF3B30",
          info: "#3A82F7",
          card: "#242424",
          "card-border": "#2F2F2F",
          "white-border": "#D3D3D3",
          placeholder: "#B9B7B6",
          "text-gray": "#717171",
          // 追加カラー（Figma Design Tokens）
          "form-bg": "#FFFFFF",
          "progress-completed": "rgba(255,255,255,0.8)",
          "progress-ongoing": "rgba(255,255,255,0.1)",
          "card-cell-border": "rgba(255,255,255,0.3)",
          // 既存の互換性維持
          surface: "#0a1f24",
          "surface-light": "#132a30",
        },
        // Primitive Colors (Figma Design Tokens)
        darkgreen: {
          "00": "#e3e6e5",
          "10": "#dfe3e1",
          "20": "#c8cdcb",
          "30": "#b0b8b5",
          "40": "#98a29e",
          "50": "#808d88",
          "60": "#697872",
          "70": "#51625b",
          "80": "#394d45",
          "90": "#25322d",
        },
        luxbrown: {
          "00": "#f2f3f3",
          "10": "#d9dbdc",
          "20": "#bfc4c5",
          "30": "#a6acad",
          "40": "#8c9496",
          "50": "#737d7e",
          "60": "#596567",
          "70": "#334144",
          "80": "#1a2a2d",
          "90": "#001215",
        },
        orange: {
          "00": "#fdf6ec",
          "10": "#faedda",
          "20": "#f8e3c7",
          "30": "#f4d6ab",
          "40": "#f2cc98",
          "50": "#eebe7c",
          "60": "#ecb569",
          "70": "#e7a344",
          "80": "#d69438",
          "90": "#c78221",
        },
        lightgreen: {
          "00": "#dff3eb",
          "10": "#dbf1e8",
          "20": "#bfe7d7",
          "30": "#a4dcc5",
          "40": "#88d2b4",
          "50": "#6dc7a3",
          "60": "#52bd92",
          "70": "#36b280",
          "80": "#1ba86f",
          "90": "#149662",
        },
        gray: {
          "00": "#e9e9e9",
          "10": "#d3d3d3",
          "20": "#b2b2b2",
          "30": "#9c9c9c",
          "40": "#868686",
          "50": "#717171",
          "60": "#454545",
          "70": "#2f2f2f",
          "80": "#242424",
          "90": "#1a1a1a",
        },
        red: {
          "00": "#ffebeaff",
          "10": "#ffd8d6ff",
          "20": "#ffc4c1ff",
          "30": "#ffb1acff",
          "40": "#ff938dff",
          "50": "#ff766eff",
          "60": "#ff6259ff",
          "70": "#ff4f45ff",
          "80": "#ff3b30ff",
          "90": "#f1190cff",
        },
        blue: {
          "00": "#ebf2feff",
          "10": "#d8e6fdff",
          "20": "#c4d9fdff",
          "30": "#b0cdfcff",
          "40": "#93bafbff",
          "50": "#75a7f9ff",
          "60": "#619bf9ff",
          "70": "#4e8ff8ff",
          "80": "#3a82f7ff",
          "90": "#1c6bebff",
        },
      },
      fontFamily: {
        "sf-display": ['"SF Pro Display"', "system-ui", "sans-serif"],
        "sf-pro": ['"SF Pro"', "system-ui", "sans-serif"],
        sans: [
          '"Hiragino Sans"',
          '"Hiragino Kaku Gothic ProN"',
          '"Noto Sans JP"',
          "sans-serif",
        ],
        mono: ['"SF Mono"', '"Roboto Mono"', "monospace"],
      },
      fontSize: {
        // Header (SF Pro Display, weight 600)
        "header-huge": ["40px", { lineHeight: "48px", fontWeight: "600" }],
        "header-large": ["32px", { lineHeight: "38.4px", fontWeight: "600" }],
        "header-medium": ["24px", { lineHeight: "36px", letterSpacing: "-0.24px", fontWeight: "600" }],
        "header-small": ["20px", { lineHeight: "24px", letterSpacing: "0.2px", fontWeight: "600" }],
        // Paragraph (SF Pro)
        "paragraph-medium": ["17px", { lineHeight: "25.5px" }],
        "paragraph-small": ["16px", { lineHeight: "22.4px", letterSpacing: "0.16px" }],
        // Body (SF Pro)
        "body-medium": ["14px", { lineHeight: "22.4px", letterSpacing: "0.28px" }],
        "body-small": ["13px", { lineHeight: "22.1px", letterSpacing: "0.13px" }],
        // Caption (SF Pro)
        "caption-medium": ["12px", { lineHeight: "20.4px", letterSpacing: "0.12px" }],
        "caption-small": ["11px", { lineHeight: "13.2px", letterSpacing: "0.11px" }],
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
