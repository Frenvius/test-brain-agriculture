import type { ColumnsType } from 'antd/es/table';

import React from 'react';
import { Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CropTag from '~/pages/Producer/CropTag';
import { CropResponse } from '~/app/domain/response/CropResponse';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';

export const columns = (t: any): ColumnsType<ProducerResponse> => [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Farm Name',
		dataIndex: ['farm', 'name'],
		key: 'farmName'
	},
	{
		title: 'City',
		dataIndex: ['farm', 'city'],
		key: 'city'
	},
	{
		title: 'State',
		dataIndex: ['farm', 'state'],
		key: 'state'
	},
	{
		title: 'Total Area (ha)',
		dataIndex: ['farm', 'area'],
		key: 'totalArea'
	},
	{
		title: 'Arable Area (ha)',
		dataIndex: ['farm', 'usefulArea'],
		key: 'arableArea'
	},
	{
		title: 'Vegetation Area (ha)',
		dataIndex: ['farm', 'vegetationArea'],
		key: 'vegetationArea'
	},
	{
		title: 'Planted Crops',
		dataIndex: ['farm', 'plantedCrops'],
		key: 'plantedCrops',
		render: (crops) => crops?.map((crop: CropResponse, index: number) => <CropTag key={index} crop={crop} />)
	},
	{
		title: 'Action',
		key: 'action',
		render: () => (
			<Space size="middle">
				<Button type="text" icon={<EditOutlined />} size={'large'} title={t('list.actions.edit')} />
				<Button type="text" icon={<DeleteOutlined />} size={'large'} title={t('list.actions.delete')} />
			</Space>
		)
	}
];
