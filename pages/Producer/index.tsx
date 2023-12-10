'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Table, Button, Typography } from 'antd';

import { columns } from './constants';
import { ProducerProps } from './types';
import styles from './styles.module.scss';
import Breadcrumb from '~/components/commons/Breadcrumb';

const { Title } = Typography;

const Producer = ({ data }: ProducerProps) => {
	const router = useRouter();
	const t = useTranslations('producers');

	const handleNewProducer = () => {
		router.push('/producers/add');
	};

	return (
		<div className={styles.container}>
			<Breadcrumb label={t('breadcrumb')} link={'/dashboard'} />
			<div className={styles.header}>
				<Title level={2} className={styles.title}>
					{t('title')}
				</Title>
				<Button type="primary" onClick={() => handleNewProducer()}>
					{t('add')}
				</Button>
			</div>
			<Table rowKey={(record) => record.id} columns={columns(t)} dataSource={data} />
		</div>
	);
};

export default Producer;
