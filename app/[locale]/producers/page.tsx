import Producer from '~/pages/Producer';
import { producerService } from '~/app/usecase/service/producer/service';

const ProducerPage = async () => {
	const producerList = await producerService.search();
	return <Producer data={producerList.items} />;
};

export default ProducerPage;
