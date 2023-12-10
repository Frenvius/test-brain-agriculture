import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useMessage } from '~/app/usecase/contexts/MessageContext';
import { producerService } from '~/app/usecase/service/producer/service';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';

const TableActions = ({ data }: { data: ProducerResponse }) => {
	const router = useRouter();
	const { msg } = useMessage();
	const t = useTranslations('producers');
	const deleteConfirm = useTranslations('producers.list.actions.deleteConfirm');

	const handleEdit = () => {
		router.push(`/producers/edit/${data.id}`);
	};

	const handleDelete = async () => {
		producerService.delete(data.id).then(() => {
			msg.success(deleteConfirm('success'));
			router.push('/producers');
			router.refresh();
		});
	};

	const text = deleteConfirm('title');
	const description = deleteConfirm('description', { name: data.name });

	return (
		<Space size="middle">
			<Button type="text" icon={<EditOutlined />} size={'large'} title={t('list.actions.edit')} onClick={() => handleEdit()} />

			<Popconfirm
				placement="topRight"
				title={text}
				description={description}
				onConfirm={handleDelete}
				okText={deleteConfirm('confirm')}
				cancelText={deleteConfirm('cancel')}
			>
				<Button type="text" icon={<DeleteOutlined />} size={'large'} title={t('list.actions.delete')} />
			</Popconfirm>
		</Space>
	);
};

export default TableActions;