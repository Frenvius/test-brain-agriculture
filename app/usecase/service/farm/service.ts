import { HttpClient } from '~/app/adapter/http/http.client';
import { CropResponse } from '~/app/domain/response/CropResponse';

class Service {
	private readonly basePath = '/producers';
	private readonly cropPath = '/crops';
	private _serverClient = new HttpClient(process.env.SERVER_URL!);

	public async getCropList(): Promise<CropResponse[]> {
		return await this._serverClient.get(this.cropPath);
	}
}

export const farmService = new Service();
