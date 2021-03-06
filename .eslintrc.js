module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'semi': "error",
    "no-console": "off",
    'nuxt/no-cjs-in-config': 'off',
    'linebreak-style': 'off',
    'array-bracket-newline': 'off',
    'array-element-newline': 'off',
    'brace-style': 'off',
    'multiline-ternary': 'off'
  }
}
