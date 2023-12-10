import { HttpClient } from '~/app/adapter/http/http.client';
import { DashboardResponse } from '~/app/domain/response/DashboardResponse';

class Service {
	private readonly basePath = '/dashboard';
	private _serverClient = new HttpClient(process.env.SERVER_URL!);

	public async get(): Promise<DashboardResponse> {
		return await this._serverClient.get(this.basePath);
	}
}

export const dashboardService = new Service();
