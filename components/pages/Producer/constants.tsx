import React from 'react';
import { Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import CropTags from '~/components/pages/Producer/CropTag';
import TableActions from '~/components/pages/Producer/TableActions';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';

const { Text } = Typography;

export const columns = (t: any): ColumnsType<ProducerResponse> => [
	{
		title: t('list.name'),
		dataIndex: 'name',
		key: 'name',
		render: (name) => (
			<Text style={{ maxWidth: '100%' }} ellipsis={true}>
				{name}
			</Text>
		)
	},
	{
		title: t('list.farmName'),
		dataIndex: ['farm', 'name'],
		key: 'farmName',
		render: (farmName) => (
			<Text style={{ maxWidth: '100%' }} ellipsis={true}>
				{farmName}
			</Text>
		)
	},
	{
		title: t('list.city'),
		dataIndex: ['farm', 'city'],
		width: 180,
		key: 'city'
	},
	{
		title: t('list.state'),
		dataIndex: ['farm', 'state'],
		width: 180,
		key: 'state'
	},
	{
		title: t('list.area'),
		className: 'areaHeader',
		children: [
			{
				title: t('list.totalArea'),
				dataIndex: ['farm', 'area'],
				width: 80,
				align: 'center',
				key: 'totalArea'
			},
			{
				title: t('list.usefulArea'),
				dataIndex: ['farm', 'usefulArea'],
				width: 80,
				align: 'center',
				key: 'arableArea'
			},
			{
				title: t('list.vegetationArea'),
				dataIndex: ['farm', 'vegetationArea'],
				width: 80,
				align: 'center',
				key: 'vegetationArea'
			}
		]
	},
	{
		title: t('list.plantedCrops'),
		dataIndex: ['farm', 'plantedCrops'],
		key: 'plantedCrops',
		render: (crops) => <CropTags crops={crops} />
	},
	{
		title: t('list.action'),
		key: 'action',
		width: 120,
		render: (data) => <TableActions data={data} />
	}
];
