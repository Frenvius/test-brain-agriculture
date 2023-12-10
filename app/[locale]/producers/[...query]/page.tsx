import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Props } from '../types';
import ProducerForm from '~/pages/Producer/Form';
import { farmService } from '~/app/usecase/service/farm/service';
import { producerService } from '~/app/usecase/service/producer/service';
import { producerConverter } from '~/app/usecase/converter/producer.converter';

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	const { query } = params;
	const action = query[0];
	const t = await getTranslations('producers');
	const pageTitle = action === 'add' ? t('add') : t('edit');

	return { title: pageTitle };
};

const ProducerAction = async ({ params }: Props) => {
	const { query } = params;
	const id = query[1];
	const action = query[0];
	const t = await getTranslations('producers');
	const pageTitle = action === 'add' ? t('add') : t('edit');

	const data = id ? producerConverter.toFormState(await producerService.get(id)) : null;
	const cropList = await farmService.getCropList();

	return <ProducerForm data={data} title={pageTitle} cropList={cropList} />;
};

export default ProducerAction;
