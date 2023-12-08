'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { MenuItemProps } from './types';
import styles from './styles.module.scss';

const MenuItem = ({ href, icon, label }: MenuItemProps) => {
	const t = useTranslations('menu');
	const pathname = usePathname();

	const isActive = () => {
		return pathname?.includes(href);
	};

	return (
		<Link href={href} className={`${styles.menuItem} ${isActive() && styles.active}`}>
			{icon && <i>{icon}</i>} {t(`items.${label}`)}
		</Link>
	);
};

export default MenuItem;
