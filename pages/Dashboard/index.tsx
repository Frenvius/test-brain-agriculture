'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Pie, Column } from '@ant-design/charts';
import { Col, Row, Card, Typography } from 'antd';

import styles from './styles.module.scss';
import { DashboardResponse } from '~/app/domain/response/DashboardResponse';
import { dashboardConverter } from '~/app/usecase/converter/dashboard.converter';

const { Text, Title } = Typography;

const Dashboard = ({ data }: { data: DashboardResponse }) => {
	const t = useTranslations('dashboard');
	const cropTranslate = useTranslations('producers.crops');
	const defaultConfig = {
		appendPadding: 10,
		angleField: 'value',
		colorField: 'label',
		radius: 0.8,
		label: { type: 'outer' },
		interactions: [{ type: 'element-active' }]
	};

	const config = {
		data: data.pieChartByState,
		xField: 'label',
		yField: 'value',
		Label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6
			}
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false
			}
		}
	};

	const areaData = dashboardConverter.translatedAreaData(t, data.pieChartByLandUse);
	const cropsData = dashboardConverter.translatedCropData(cropTranslate, data.pieChartByCrop);

	return (
		<Row gutter={[16, 16]} className={styles.container}>
			<Col span={12}>
				<Card className={styles.totalCount}>
					<Text type="secondary">{t('totalFarms')}</Text>
					<Title level={4} className={styles.count}>
						{data.totalFarms}
					</Title>
				</Card>
			</Col>
			<Col span={12}>
				<Card className={styles.totalCount}>
					<Text type="secondary">{t('totalAcres')}</Text>
					<Title level={4} className={styles.count}>
						{data.totalAcres}
					</Title>
				</Card>
			</Col>
			<Col span={24}>
				<Card title={t('stateChartTitle')}>
					<Column {...config} />
				</Card>
			</Col>
			<Col span={12}>
				<Card title={t('cropChartTitle')}>
					<Pie data={cropsData} {...defaultConfig} />
				</Card>
			</Col>
			<Col span={12}>
				<Card title={t('areaUsageChartTitle')}>
					<Pie data={areaData} {...defaultConfig} />
				</Card>
			</Col>
		</Row>
	);
};

export default Dashboard;
