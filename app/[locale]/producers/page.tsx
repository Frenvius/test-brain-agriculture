import { Props } from './types';
import Producer from '../../../components/pages/Producer';
import { producerService } from '~/app/usecase/service/producer/service';

const ProducerPage = async ({ searchParams }: Props) => {
	const { page } = searchParams || {};
	const producerList = await producerService.search({}, page);
	return <Producer data={producerList} />;
};

export default ProducerPage;
