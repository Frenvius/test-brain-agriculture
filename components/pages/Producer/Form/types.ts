import { CropResponse } from '~/app/domain/response/CropResponse';

export interface StateData {
	stateData: {
		acronym: string;
		label: string;
		cities: string[];
	}[];
}

export interface ProducerFormProps {
	title: string;
	cropList: CropResponse[];
	data: ProducerFormState | null;
}

export interface ProducerFormState {
	id?: number;
	farmId?: number;
	name: string;
	taxDocument: string;
	farmName: string;
	city?: string;
	state?: string;
	area: number;
	usefulArea: number;
	vegetationArea: number;
	plantedCrops: string[];
}
