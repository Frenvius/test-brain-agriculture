'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Table, Button, Typography } from 'antd';

import { columns } from './constants';
import { ProducerProps } from './types';
import styles from './styles.module.scss';
import Breadcrumb from '~/components/commons/Breadcrumb';
import { PAGE_SIZE } from '~/app/usecase/util/constants';

const { Title } = Typography;

const Producer = ({ data }: ProducerProps) => {
	const router = useRouter();
	const t = useTranslations('producers');

	const handlePagination = (page: number) => {
		router.push(`/producers?page=${page}`);
		router.refresh();
	};

	const handleNewProducer = () => {
		router.push('/producers/add');
		router.refresh();
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
			<Table
				rowKey={(record) => record.id}
				columns={columns(t)}
				dataSource={data.items}
				pagination={{
					current: data.currentPage + 1,
					total: data.totalItems,
					defaultPageSize: PAGE_SIZE,
					showSizeChanger: false,
					onChange: (page) => {
						handlePagination(page);
					}
				}}
			/>
		</div>
	);
};

export default Producer;
