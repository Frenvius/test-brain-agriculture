import { CropResponse } from '~/app/domain/response/CropResponse';

export interface ProducerFormProps {
	data: any;
	title: string;
	cropList: CropResponse[];
}

export interface ProducerFormState {
	id?: number;
	farmId?: number;
	name: string;
	taxDocument: string;
	farmName: string;
	city: string;
	state: string;
	area: number;
	usefulArea: number;
	vegetationArea: number;
	plantedCrops: string[];
}
