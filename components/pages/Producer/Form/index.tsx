'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { RuleObject } from 'rc-field-form/lib/interface';
import { Form, Input, Button, Select, Typography, InputNumber } from 'antd';

import styles from './styles.module.scss';
import { stateData, initialValues } from './constants';
import Breadcrumb from '~/components/commons/Breadcrumb';
import { sanitizeString } from '~/app/usecase/util/stringUtils';
import { useMessage } from '~/app/usecase/contexts/MessageContext';
import { ProducerRequest } from '~/app/domain/request/ProducerRequest';
import { producerService } from '~/app/usecase/service/producer/service';
import TaxDocumentInput from '~/components/commons/form/TaxDocumentInput';
import { ProducerFormProps } from '~/components/pages/Producer/Form/types';
import { producerConverter } from '~/app/usecase/converter/producer.converter';
import { normalizeString, validateAreaInput, validateCPFString } from '~/components/pages/Producer/Form/validations';

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

	const validateCPF = () => validateCPFString(data, form, t);
	const validateAreas: RuleObject['validator'] = () => validateAreaInput(form, t);
	const areaSize: RuleObject = { type: 'number', min: 5, max: 10000, message: t('messages.areaSize', { min: 5, max: 10000 }) };

	return (
		<div className={styles.container}>
			<Breadcrumb label={t('breadcrumb')} link={'/producers'} />
			<Title level={2}>{title}</Title>
			<Form
				form={form}
				name="producer"
				className={styles.form}
				labelCol={{ md: { span: 8 }, xs: { span: 24 } }}
				wrapperCol={{ md: { span: 14 }, xs: { span: 24 } }}
				initialValues={data || initialValues}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<ProducerRequest>
					label={t('fields.name')}
					name="name"
					normalize={normalizeString}
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
					normalize={normalizeString}
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
							return sanitizeString(option?.label!).includes(sanitizeString(input));
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
							return sanitizeString(option?.label!).includes(sanitizeString(input));
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

				<Form.Item wrapperCol={{ md: { offset: 8 }, xs: { offset: 0 } }}>
					<Button type="primary" data-testid="submit" htmlType="submit">
						{t('fields.submit')}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProducerForm;
