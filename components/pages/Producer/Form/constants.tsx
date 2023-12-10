import { ProducerFormState } from '~/components/pages/Producer/Form/types';

export const initialValues: ProducerFormState = {
	name: '',
	taxDocument: '',
	farmName: '',
	city: '',
	state: '',
	area: 0,
	usefulArea: 0,
	vegetationArea: 0,
	plantedCrops: []
};
