module.exports = {
  extends: 'google',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    'switch-colon-spacing': 0,
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'always']
  }
};
