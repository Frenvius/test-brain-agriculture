import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from '~/styles/page.module.scss';

export default function Home() {
	const t = useTranslations('Index');

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>
					{t('getStarted')} <code className={styles.code}>app/page.tsx</code>
				</p>
				<div>
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						{t('branding')}{' '}
						<Image src="/vercel.svg" alt={t('vercelLogoAlt')} className={styles.vercelLogo} width={100} height={24} priority />
					</a>
				</div>
			</div>

			<div className={styles.center}>
				<Image className={styles.logo} src="/next.svg" alt={t('nextjsLogoAlt')} width={180} height={37} priority />
			</div>

			<div className={styles.grid}>
				<a
					href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>{t('docsTitle')}</h2>
					<p>{t('docsDescription')}</p>
				</a>

				<a
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>{t('learnTitle')}</h2>
					<p>{t('learnDescription')}</p>
				</a>

				<a
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>{t('templatesTitle')}</h2>
					<p>{t('templatesDescription')}</p>
				</a>

				<a
					href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>{t('deployTitle')}</h2>
					<p>{t('deployDescription')}</p>
				</a>
			</div>
		</main>
	);
}
