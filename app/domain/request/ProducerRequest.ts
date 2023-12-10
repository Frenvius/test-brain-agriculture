import { FarmRequest } from '~/app/domain/request/FarmRequest';

export interface ProducerRequest {
	name: string;
	taxDocument: string;
	farmData?: FarmRequest;
}
