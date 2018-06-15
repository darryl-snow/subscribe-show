module.exports = {
  "extends": ["airbnb", "plugin:jest/recommended"],
  "parser": "babel-eslint",
  "plugins": ["react", "import", "jest"],
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
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
  "settings": {
    "import/resolver": "webpack"
  }
};
