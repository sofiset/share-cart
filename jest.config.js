module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['js', 'json', 'node']
}
