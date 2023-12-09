import { PAGE_SIZE } from '~/app/usecase/util/constants';
import { HttpClient } from '~/app/adapter/http/http.client';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';
import { PaginatedResponse } from '~/app/domain/response/PaginatedResponse';

class Service {
	private readonly basePath = '/producers';
	private _serverClient = new HttpClient(process.env.SERVER_URL!);

	public async get(id: number): Promise<PaginatedResponse<ProducerResponse>> {
		const query = { pageSize: -1 };
		return await this._serverClient.post(`${this.basePath}/${id}`, query);
	}

	public async search(query?: {}, page?: string): Promise<PaginatedResponse<ProducerResponse>> {
		const pageNumber = page ? Number(page) : 1;
		const body = {
			pageSize: PAGE_SIZE,
			pageNumber: pageNumber - 1,
			...query
		};
		return await this._serverClient.post(`${this.basePath}/search`, body, 'no-store');
	}

	public async delete(id: number, type: string, token: string): Promise<any> {
		return this._serverClient.delete(`/${type}/${id}`);
	}
}

export const producerService = new Service();
