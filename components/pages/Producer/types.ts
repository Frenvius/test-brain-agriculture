import { ProducerResponse } from '~/app/domain/response/ProducerResponse';
import { PaginatedResponse } from '~/app/domain/response/PaginatedResponse';

export interface ProducerProps {
	data: PaginatedResponse<ProducerResponse>;
}
