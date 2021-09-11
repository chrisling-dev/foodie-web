module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FFB341",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        "slide-up": "slide-up 0.6s",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
