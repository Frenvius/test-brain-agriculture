'use client';

import React from 'react';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import { MenuItemProps } from './types';
import styles from './styles.module.scss';

const MenuItem = ({ href, icon, label }: MenuItemProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations('menu');

	const isActive = () => {
		return pathname?.includes(href);
	};

	const handlePageChange = (link: string) => {
		router.push(link);
	};

	return (
		<div className={styles.container}>
			<Button type="text" onClick={() => handlePageChange(href)} className={`${styles.menuItem} ${isActive() && styles.active}`}>
				{icon && <i>{icon}</i>} {t(`items.${label}`)}
			</Button>
		</div>
	);
};

export default MenuItem;
