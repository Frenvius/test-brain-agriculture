'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { RuleObject } from 'rc-field-form/lib/interface';
import { Form, Input, Button, Select, Typography, InputNumber } from 'antd';

import styles from './styles.module.scss';
import { stateData, initialValues } from './constants';
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
	const [cities, setCities] = React.useState<string[]>([]);
	const [taxDocument, setTaxDocument] = React.useState('');
	const cropTranslation = useTranslations('producers.crops');
	const [selectedState, setSelectedState] = React.useState(data ? data.state : '');

	React.useEffect(() => {
		if (data) {
			handleStateChange(data.state!);
			form.setFieldsValue({ city: data.city });
		}
	}, []);

	const onFinish = async (values: any) => {
		if (!data) {
			const request = producerConverter.toEntity(values, cropList);
			await producerService.create(request).then(() => {
				finish(t('messages.success'));
			});
		} else {
			const body = { ...data, ...values };
			const request = producerConverter.toEntity(body, cropList);
			await producerService.update(data.id!, request).then(() => {
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

	const handleStateChange = (value: string) => {
		setSelectedState(value);
		const state = stateData.find((state) => state.label === value);
		setCities(state!.cities);
		form.setFieldsValue({ city: undefined });
	};

	const validateCPF: RuleObject['validator'] = async () => {
		const cleanedInput = form.getFieldValue('taxDocument')?.replace(/\D/g, '');
		const isCNPJ = cleanedInput?.length > 11;
		const complete = cleanedInput?.length === 11 || cleanedInput?.length === 14;
		if (complete) {
			const response = await producerService.search({ query: { taxDocument: cleanedInput } });
			return response.items?.length > 0 ? Promise.reject(new Error(t('messages.taxDocument.alreadyExists'))) : Promise.resolve();
		}
		if (!cleanedInput || validateTaxDocument(cleanedInput)) return Promise.resolve();
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

	const areaSize: RuleObject = { type: 'number', min: 5, max: 10000, message: t('messages.areaSize', { min: 5, max: 10000 }) };

	const strForSearch = (str: string) => {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	};

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
					rules={[
						{ required: true, message: t('messages.required') },
						{ max: 100, message: t('messages.max', { max: 100 }) }
					]}
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

				<Form.Item
					label={t('fields.farmName')}
					name="farmName"
					rules={[
						{ required: true, message: t('messages.required') },
						{ max: 100, message: t('messages.max', { max: 100 }) }
					]}
				>
					<Input placeholder={t('placeholders.farmName')} />
				</Form.Item>

				<Form.Item label={t('fields.state')} name="state" rules={[{ required: true, message: t('messages.required') }]}>
					<Select
						showSearch
						virtual={false}
						options={stateData}
						fieldNames={{ label: 'label', value: 'label' }}
						onChange={handleStateChange}
						placeholder={t('placeholders.state')}
						filterOption={(input, option) => {
							return strForSearch(option?.label!).includes(strForSearch(input));
						}}
					/>
				</Form.Item>

				<Form.Item label={t('fields.city')} name="city" rules={[{ required: true, message: t('messages.required') }]}>
					<Select
						showSearch
						virtual={false}
						optionFilterProp="label"
						placeholder={t('placeholders.city')}
						disabled={!selectedState}
						fieldNames={{ label: 'label', value: 'label' }}
						options={cities.map((city) => ({ label: city }))}
						filterOption={(input, option) => {
							return strForSearch(option?.label!).includes(strForSearch(input));
						}}
					/>
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
					<Select virtual={false} mode="multiple" style={{ width: '100%' }} placeholder={t('placeholders.plantedCrops')}>
						{cropList.map((item) => (
							<Option key={item.id} value={item.label}>
								{cropTranslation(item.label.toLowerCase())}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 7 }}>
					<Button type="primary" data-testid="submit" htmlType="submit">
						{t('fields.submit')}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProducerForm;
