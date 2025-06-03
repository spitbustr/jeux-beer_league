module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names' : 'off',
    'no-unused-vars' : 'off',
    'vue/require-v-for-key': 'off',
    'vue/no-template-key': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
  }
}
