import { producerConverter } from './producer.converter';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';
import { ProducerFormState } from '~/components/pages/Producer/Form/types';

describe('ProducerConverter', () => {
	let producerResponse: ProducerResponse;
	let producerFormState: ProducerFormState;

	beforeEach(() => {
		producerResponse = {
			id: 1,
			name: 'John Doe',
			taxDocument: '123456789',
			farm: {
				id: 1,
				name: 'Farm 1',
				city: 'City 1',
				state: 'State 1',
				area: 100,
				usefulArea: 80,
				vegetationArea: 20,
				plantedCrops: [{ id: 1, label: 'Soy', active: true }]
			}
		};

		producerFormState = {
			id: 1,
			name: 'John Doe',
			taxDocument: '123456789',
			farmName: 'Farm 1',
			farmId: 1,
			city: 'City 1',
			state: 'State 1',
			area: 100,
			usefulArea: 80,
			vegetationArea: 20,
			plantedCrops: ['Soy']
		};
	});

	it('should convert entity to form state', () => {
		const result = producerConverter.toFormState(producerResponse);
		expect(result).toEqual(producerFormState);
	});
});
