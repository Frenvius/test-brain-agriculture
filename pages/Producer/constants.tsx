import type { ColumnsType } from 'antd/es/table';

import React from 'react';
import { Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { DataType } from './types';
import CropTag from '~/pages/Producer/CropTag';

export const data: DataType[] = [
	{
		id: '1',
		name: 'John Brown',
		farm: {
			name: 'Sunshine Farms',
			city: 'New York',
			state: 'NY',
			area: 500,
			usefulArea: 300,
			vegetationArea: 50,
			plantedCrops: ['Corn', 'Soy']
		}
	},
	{
		id: '2',
		name: 'Jim Green',
		farm: {
			name: 'Green Pastures',
			city: 'London',
			state: 'LD',
			area: 600,
			usefulArea: 400,
			vegetationArea: 100,
			plantedCrops: ['Sugarcane', 'Cotton']
		}
	},
	{
		id: '3',
		name: 'Joe Black',
		farm: {
			name: 'Black Meadows',
			city: 'Sydney',
			state: 'SY',
			area: 450,
			usefulArea: 350,
			vegetationArea: 70,
			plantedCrops: ['Coffee', 'Soy']
		}
	}
];

export const columns = (t: any): ColumnsType<DataType> => [
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
		render: (crops) => crops.map((crop: string, index: number) => <CropTag key={index} crop={crop} />)
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
