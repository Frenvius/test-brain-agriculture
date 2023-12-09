import type { ColumnsType } from 'antd/es/table';

import React from 'react';
import { Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CropTag from '~/pages/Producer/CropTag';
import { CropResponse } from '~/app/domain/response/CropResponse';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';

export const columns = (t: any): ColumnsType<ProducerResponse> => [
	{
		title: t('list.name'),
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: t('list.farmName'),
		dataIndex: ['farm', 'name'],
		key: 'farmName'
	},
	{
		title: t('list.city'),
		dataIndex: ['farm', 'city'],
		key: 'city'
	},
	{
		title: t('list.state'),
		dataIndex: ['farm', 'state'],
		key: 'state'
	},
	{
		title: t('list.area'),
		dataIndex: ['farm', 'area'],
		key: 'totalArea'
	},
	{
		title: t('list.usefulArea'),
		dataIndex: ['farm', 'usefulArea'],
		key: 'arableArea'
	},
	{
		title: t('list.vegetationArea'),
		dataIndex: ['farm', 'vegetationArea'],
		key: 'vegetationArea'
	},
	{
		title: t('list.plantedCrops'),
		dataIndex: ['farm', 'plantedCrops'],
		key: 'plantedCrops',
		render: (crops) => crops?.map((crop: CropResponse, index: number) => <CropTag key={index} crop={crop} />)
	},
	{
		title: t('list.action'),
		key: 'action',
		render: () => (
			<Space size="middle">
				<Button type="text" icon={<EditOutlined />} size={'large'} title={t('list.actions.edit')} />
				<Button type="text" icon={<DeleteOutlined />} size={'large'} title={t('list.actions.delete')} />
			</Space>
		)
	}
];
