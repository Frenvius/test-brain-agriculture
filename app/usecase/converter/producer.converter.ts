import { ProducerFormState } from '~/pages/Producer/Form/types';
import { CropResponse } from '~/app/domain/response/CropResponse';
import { ProducerRequest } from '~/app/domain/request/ProducerRequest';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';

class ProducerConverter {
	toEntity(request: ProducerFormState, cropList: CropResponse[]): ProducerRequest {
		const plantedCrops = cropList.filter((crop) => request.plantedCrops.includes(crop.label));

		return {
			name: request.name,
			taxDocument: request.taxDocument.replace(/\D/g, ''),
			farmData: {
				id: request.farmId || undefined,
				name: request.farmName,
				city: request.city,
				state: request.state,
				area: request.area,
				usefulArea: request.usefulArea,
				vegetationArea: request.vegetationArea,
				plantedCrops: plantedCrops
			}
		};
	}

	toFormState(data: ProducerResponse): ProducerFormState {
		const plantedCrops = data.farm!.plantedCrops.map((crop) => crop.label);

		return {
			id: data.id,
			name: data.name,
			taxDocument: data.taxDocument,
			farmName: data.farm!.name,
			farmId: data.farm!.id,
			city: data.farm!.city,
			state: data.farm!.state,
			area: data.farm!.area,
			usefulArea: data.farm!.usefulArea,
			vegetationArea: data.farm!.vegetationArea,
			plantedCrops: plantedCrops
		};
	}
}

export const producerConverter = new ProducerConverter();
