import type { Metadata } from 'next';

import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import '~/styles/globals.scss';
import Layout from '~/components/commons/Layout';
import StyledComponentsRegistry from '~/app/usecase/contexts/AntdRegistry';

const locales = ['en', 'pt'];

export const metadata: Metadata = {
	title: 'Dashboard'
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
	if (!locales.includes(locale as any)) notFound();
	let messages;
	try {
		messages = (await import(`~/public/messages/${locale}.json`)).default;
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<StyledComponentsRegistry>
					<Layout>{children}</Layout>
				</StyledComponentsRegistry>
			</NextIntlClientProvider>
		</html>
	);
}
