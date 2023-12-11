const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
	moduleNameMapper: {
		'^~/(.*)': '<rootDir>/$1'
	},
	coveragePathIgnorePatterns: ['__mock__'],
	testPathIgnorePatterns: ['<rootDir>/__mock__', '<rootDir>/app/usecase/util/constants.ts'],
	testEnvironment: 'jest-environment-jsdom'
});
