import React from 'react';
import { ColumnsType } from 'antd/lib/table';

import CropTags from '~/components/pages/Producer/CropTag';
import TableActions from '~/components/pages/Producer/TableActions';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';

export const columns = (t: any): ColumnsType<ProducerResponse> => [
	{
		title: t('list.name'),
		dataIndex: 'name',
		key: 'name',
		ellipsis: true
	},
	{
		title: t('list.farmName'),
		dataIndex: ['farm', 'name'],
		key: 'farmName',
		ellipsis: true,
		responsive: ['md']
	},
	{
		title: t('list.state'),
		dataIndex: ['farm', 'state'],
		ellipsis: true,
		key: 'state',
		responsive: ['md']
	},
	{
		title: t('list.city'),
		dataIndex: ['farm', 'city'],
		key: 'city',
		responsive: ['md']
	},
	{
		title: t('list.area'),
		className: 'areaHeader',
		responsive: ['md'],
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
		responsive: ['md'],
		width: 220,
		render: (crops) => <CropTags crops={crops} />
	},
	{
		title: t('list.action'),
		key: 'action',
		width: 120,
		render: (data) => <TableActions data={data} />
	}
];
