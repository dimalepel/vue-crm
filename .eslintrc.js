module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  overrides: [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true,
      },
    ],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        required: {
          every: ['nesting', 'id'],
        },
      },
    ],
  },
};
