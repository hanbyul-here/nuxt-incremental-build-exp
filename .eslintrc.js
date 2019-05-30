module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: [ 'vue' ],

  // custom eslint rules
  rules: {
    semi: [ 2, 'never' ],
    'no-console': [ 'off' ],
    'vue/v-bind-style': [ 'off' ],
    'vue/no-unused-vars': [ 'warn' ],
    'vue/no-unused-components': [ 'warn' ],
    'vue/max-attributes-per-line': [ 'off' ],
    'vue/html-quotes': [ 'warn' ],
    'vue/require-prop-types': [ 'warn' ],
    'vue/no-v-html': [ 'off' ],
    'vue/html-self-closing': ['warn', {
      'html': {
        'void': 'any',
        'normal': 'always',
        'component': 'always'
      }
    }],
    'vue/html-closing-bracket-newline': [ 'warn' ],
    'vue/multiline-html-element-content-newline': ['warn', {
      'ignores': ['pre', 'textarea', 'span', 'b', 'strong', 'a']
    }],

    // Prettier options
    'prettier/prettier': [ 'warn', {
        semi: false,
        singleQuote: true,
        printWidth: 120,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'ignore',
        jsxBracketSameLine: true,
        eslintIntegration: true
      }
    ]
  }
};
