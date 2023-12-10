export class HttpClient {
	apiURL: string;

	constructor(apiUrl: string) {
		this.apiURL = apiUrl;
	}

	private getUrl(path: string) {
		return `${this.apiURL}${path}`;
	}

	private getOptions(method: string, body?: any, cache?: RequestCache): RequestInit {
		const headers = new Headers();
		if (body) {
			headers.append('Content-Type', 'application/json');
		}

		return { method, headers, body: JSON.stringify(body), cache };
	}

	async get(path: string, cache?: RequestCache) {
		const requestOptions = this.getOptions('GET', undefined, cache);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async delete(path: string) {
		const requestOptions = this.getOptions('DELETE');
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async post<K>(path: string, body: K, cache?: any) {
		const requestOptions = this.getOptions('POST', body, cache);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async put<K>(path: string, body: K) {
		const requestOptions = this.getOptions('PUT', body);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	async patch<K>(path: string, body: K) {
		const requestOptions = this.getOptions('PATCH', body);
		return fetch(this.getUrl(path), requestOptions).then(this.handleResponse);
	}

	private handleResponse(response: Response) {
		if (response.status === 204) {
			return {
				items: [],
				totalPages: 0,
				totalItems: 0,
				currentPage: 0
			};
		} else if (response.status >= 400 && response.status < 500) {
			return response.json().then((data) => {
				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			});
		} else if (response.status >= 500 && response.status < 600) {
			return response.json().then((data) => {
				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			});
		} else {
			return response.text().then((text) => {
				return text && JSON.parse(text);
			});
		}
	}
}
