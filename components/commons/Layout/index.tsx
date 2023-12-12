import React from 'react';
import Image from 'next/image';
import { Card, Flex, Divider } from 'antd';
import { useTranslations } from 'next-intl';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import MenuItem from './MenuItem';
import { menuItems } from './constants';
import styles from './styles.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const t = useTranslations('menu');
	return (
		<body>
			<Flex className={styles.container}>
				<div className={styles.sidebar} style={{ minWidth: '220px' }}>
					<div className={styles.menuBlock}>
						<div className={styles.logo}>
							<Image src="/assets/img/logo.svg" alt="Brain Agriculture Logo" width={40} height={40} />
							Brain Agriculture
						</div>
						<Divider className={styles.divider} />
						<div className={styles.menu}>
							{menuItems.map((item, index) => (
								<MenuItem key={index} href={item.href} icon={item.icon} label={item.label} />
							))}
						</div>
					</div>
					<div className={styles.freeArea}>
						<div className={styles.mockUser}>
							<div className={styles.avatar}>
								<Image src="/assets/img/logo.svg" alt="Brain Agriculture Logo" width={28} height={28} />
							</div>
							<div>
								<div className={styles.name}>Brain Agriculture</div>
								<div className={styles.role}>{t('userData.roles.admin')}</div>
							</div>
							<div className={styles.arrows}>
								<UpOutlined />
								<DownOutlined />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.content}>
					<Card bordered={false}>{children}</Card>
				</div>
			</Flex>
		</body>
	);
};

export default Layout;
