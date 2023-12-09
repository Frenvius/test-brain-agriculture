'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Table, Button, Typography } from 'antd';

import styles from './styles.module.scss';
import { data, columns } from './constants';
import Breadcrumb from '~/components/commons/Breadcrumb';

const { Title } = Typography;

const Producer: React.FC = () => {
	const t = useTranslations('producers');

	return (
		<div className={styles.container}>
			<Breadcrumb label={t('breadcrumb')} />
			<div className={styles.header}>
				<Title level={2} className={styles.title}>
					{t('title')}
				</Title>
				<Button type="primary">{t('add')}</Button>
			</div>
			<Table rowKey={(record) => record.id} columns={columns(t)} dataSource={data} />
		</div>
	);
};

export default Producer;
