import stateList from '~/app/domain/data/state-city-list.json';
import { StateData, ProducerFormState } from '~/components/pages/Producer/Form/types';

export const { stateData }: StateData = stateList;

export const initialValues: ProducerFormState = {
	name: '',
	taxDocument: '',
	farmName: '',
	city: undefined,
	state: undefined,
	area: 0,
	usefulArea: 0,
	vegetationArea: 0,
	plantedCrops: []
};
