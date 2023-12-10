import { CropResponse } from '~/app/domain/response/CropResponse';

export interface FarmRequest {
	id?: number;
	name?: string;
	city?: string;
	state?: string;
	area?: number;
	usefulArea?: number;
	vegetationArea?: number;
	plantedCrops?: CropResponse[];
}
