const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
	moduleNameMapper: {
		'^~/(.*)': '<rootDir>/$1'
	},
	testEnvironment: 'jest-environment-jsdom'
});
