import { PAGE_SIZE } from '~/app/usecase/util/constants';
import { HttpClient } from '~/app/adapter/http/http.client';
import { ProducerResponse } from '~/app/domain/response/ProducerResponse';
import { PaginatedResponse } from '~/app/domain/response/PaginatedResponse';

class Service {
	private readonly basePath = '/producers';
	private _serverClient = new HttpClient(process.env.SERVER_URL!);

	public async get(id: string): Promise<ProducerResponse> {
		return await this._serverClient.get(`${this.basePath}/${id}`, 'no-store');
	}

	public async create(request: any): Promise<PaginatedResponse<ProducerResponse>> {
		return await this._serverClient.post(`${this.basePath}`, request);
	}

	public async update(id: number, request: any): Promise<PaginatedResponse<ProducerResponse>> {
		const body = { id, ...request };
		return await this._serverClient.put(`${this.basePath}`, body);
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
