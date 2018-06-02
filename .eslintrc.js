module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["react", "import"],
  "rules": {
    "semi": ["error", "never"],
    "import/no-unresolved": 0,
    "import/extensions": ["error", "ignorePackages", {
      "js": "never",
      "mjs": "never",
      "jsx": "never"
    }],
    "react/jsx-uses-react": 2,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
  },
  "settings": {
    "import/resolver": "webpack"
  }
};
