'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { RuleObject } from 'rc-field-form/lib/interface';
import { Form, Input, Button, Select, Typography, InputNumber } from 'antd';

import styles from './styles.module.scss';
import { initialValues } from './constants';
import Breadcrumb from '~/components/commons/Breadcrumb';
import { useMessage } from '~/app/usecase/contexts/MessageContext';
import { ProducerRequest } from '~/app/domain/request/ProducerRequest';
import { producerService } from '~/app/usecase/service/producer/service';
import TaxDocumentInput from '~/components/commons/form/TaxDocumentInput';
import { ProducerFormProps } from '~/components/pages/Producer/Form/types';
import { producerConverter } from '~/app/usecase/converter/producer.converter';
import { validateTaxDocument } from '~/components/pages/Producer/Form/validations';

const { Title } = Typography;

const ProducerForm = ({ data, title, cropList }: ProducerFormProps) => {
	const { Option } = Select;
	const { msg } = useMessage();
	const router = useRouter();
	const [form] = Form.useForm();
	const t = useTranslations('producers.form');
	const cropTranslation = useTranslations('producers.crops');
	const [taxDocument, setTaxDocument] = React.useState('');

	const onFinish = async (values: any) => {
		if (!data) {
			const request = producerConverter.toEntity(values, cropList);
			await producerService.create(request).then(() => {
				finish(t('messages.success'));
			});
		} else {
			const body = { ...data, ...values };
			const request = producerConverter.toEntity(body, cropList);
			await producerService.update(data.id, request).then(() => {
				finish(t('messages.success'));
			});
		}
	};

	const onFinishFailed = async () => {
		msg.error(t('messages.error'));
	};

	const finish = async (message: string) => {
		msg.success(message);
		router.refresh();
		router.push('/producers');
	};

	const validateCPF: RuleObject['validator'] = () => {
		const cleanedInput = form.getFieldValue('taxDocument').replace(/\D/g, '');
		const isCNPJ = cleanedInput.length > 11;
		if (!cleanedInput || validateTaxDocument(cleanedInput)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(isCNPJ ? t('messages.taxDocument.invalidCNPJ') : t('messages.taxDocument.invalidCPF')));
	};

	const validateAreas: RuleObject['validator'] = () => {
		const totalArea = form.getFieldValue('area');
		const arableArea = form.getFieldValue('usefulArea');
		const vegetationArea = form.getFieldValue('vegetationArea');

		if (totalArea && arableArea && vegetationArea) {
			const total = Number(arableArea) + Number(vegetationArea);
			if (total > Number(totalArea)) {
				return Promise.reject(new Error(t('messages.area')));
			}
		}
		return Promise.resolve();
	};

	const areaSize: RuleObject = { type: 'number', min: 10, message: t('messages.areaSize') };

	return (
		<div className={styles.container}>
			<Breadcrumb label={t('breadcrumb')} link={'/producers'} />
			<Title level={2}>{title}</Title>
			<Form
				form={form}
				name="producer"
				labelCol={{ span: 7 }}
				wrapperCol={{ span: 14 }}
				style={{ maxWidth: '50%' }}
				initialValues={data || initialValues}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<ProducerRequest>
					label={t('fields.name')}
					name="name"
					rules={[{ required: true, message: t('messages.required') }]}
				>
					<Input placeholder={t('placeholders.name')} />
				</Form.Item>

				<Form.Item<ProducerRequest>
					label={t('fields.taxDocument')}
					name="taxDocument"
					rules={[{ required: true, message: t('messages.required') }, { validator: validateCPF }]}
				>
					<TaxDocumentInput value={taxDocument} onChange={(e) => setTaxDocument(e.target.value)}>
						<Input placeholder={t('placeholders.taxDocument')} />
					</TaxDocumentInput>
				</Form.Item>

				<Form.Item label={t('fields.farmName')} name="farmName" rules={[{ required: true, message: t('messages.required') }]}>
					<Input placeholder={t('placeholders.farmName')} />
				</Form.Item>

				<Form.Item label={t('fields.city')} name="city" rules={[{ required: true, message: t('messages.required') }]}>
					<Input placeholder={t('placeholders.city')} />
				</Form.Item>

				<Form.Item label={t('fields.state')} name="state" rules={[{ required: true, message: t('messages.required') }]}>
					<Input placeholder={t('placeholders.state')} />
				</Form.Item>

				<Form.Item label={t('fields.area')} name="area" rules={[{ required: true, ...areaSize }]}>
					<InputNumber placeholder={t('placeholders.area')} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					label={t('fields.usefulArea')}
					name="usefulArea"
					rules={[{ required: true, ...areaSize }, { validator: validateAreas }]}
				>
					<InputNumber placeholder={t('placeholders.usefulArea')} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					label={t('fields.vegetationArea')}
					name="vegetationArea"
					rules={[{ required: true, ...areaSize }, { validator: validateAreas }]}
				>
					<InputNumber placeholder={t('placeholders.vegetationArea')} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					label={t('fields.plantedCrops')}
					name="plantedCrops"
					rules={[{ required: true, message: t('messages.required') }]}
				>
					<Select mode="multiple" style={{ width: '100%' }} placeholder={t('placeholders.plantedCrops')}>
						{cropList.map((item) => (
							<Option key={item.id} value={item.label}>
								{cropTranslation(item.label.toLowerCase())}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 7 }}>
					<Button type="primary" htmlType="submit">
						{t('fields.submit')}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProducerForm;
