module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['off', 'never'],
    'no-useless-escape': 'off',
    eqeqeq: 'off',
    'no-unused-expressions': ['off', { allowTaggedTemplates: true }],
    'no-unneeded-ternary': 'off'
  }
}
