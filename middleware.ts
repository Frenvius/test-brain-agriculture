import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	defaultLocale: 'pt',
	locales: ['en', 'pt'],
	localePrefix: 'as-needed'
});

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)']
};
