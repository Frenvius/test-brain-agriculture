import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

import messages from '~/public/messages/en.json';

const Translation = ({ children }: { children: React.ReactNode }) => {
	return (
		<NextIntlClientProvider locale="en" messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
};

export default Translation;
