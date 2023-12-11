import { HttpClient } from './http.client';
import { fetchMock } from '~/__mock__/fetchMock';

describe('HttpClient', () => {
	let httpClient: HttpClient;

	beforeEach(() => {
		httpClient = new HttpClient('http://localhost:4000');
	});

	it('performs a successful GET request', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const response = await httpClient.get('/test');

		expect(window.fetch).toHaveBeenCalled();
		expect(response).toEqual({ data: '12345' });
	});

	it('handles GET request no content', async () => {
		window.fetch = fetchMock({ data: '12345' }, 204);
		const response = await httpClient.get('/test');

		expect(window.fetch).toHaveBeenCalled();
		expect(response).toEqual({ currentPage: 0, items: [], totalItems: 0, totalPages: 0 });
	});

	it('handles GET request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 400);
		await expect(httpClient.get('/test')).rejects.toEqual('Bad Request');
	});

	it('handles GET request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 403);
		await expect(httpClient.get('/test')).rejects.toEqual('Forbidden');
	});

	it('handles GET request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 500);
		await expect(httpClient.get('/test')).rejects.toEqual('Internal Server Error');
	});

	it('handles GET request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 502);
		await expect(httpClient.get('/test')).rejects.toEqual('Bad Gateway');
	});

	it('performs a successful POST request', async () => {
		window.fetch = fetchMock({ data: '12345' });

		const response = await httpClient.post('/test', { key: 'value' });

		expect(window.fetch).toHaveBeenCalled();
		expect(response).toEqual({ data: '12345' });
	});

	it('handles POST request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 500);

		await expect(httpClient.post('/test', { key: 'value' })).rejects.toEqual('Internal Server Error');
	});

	it('performs a successful PUT request', async () => {
		window.fetch = fetchMock({ data: '12345' });

		const response = await httpClient.put('/test', { key: 'value' });

		expect(window.fetch).toHaveBeenCalled();
		expect(response).toEqual({ data: '12345' });
	});

	it('handles PUT request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 500);

		await expect(httpClient.put('/test', { key: 'value' })).rejects.toEqual('Internal Server Error');
	});

	it('performs a successful PATCH request', async () => {
		window.fetch = fetchMock({ data: '12345' });

		const response = await httpClient.patch('/test', { key: 'value' });

		expect(window.fetch).toHaveBeenCalled();
		expect(response).toEqual({ data: '12345' });
	});

	it('handles PATCH request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 500);

		await expect(httpClient.patch('/test', { key: 'value' })).rejects.toEqual('Internal Server Error');
	});

	it('performs a successful DELETE request', async () => {
		window.fetch = fetchMock({ data: '12345' });

		const response = await httpClient.delete('/test');

		expect(window.fetch).toHaveBeenCalled();
		expect(response).toEqual({ data: '12345' });
	});

	it('handles DELETE request failure', async () => {
		window.fetch = fetchMock({ data: '12345' }, 500);

		await expect(httpClient.delete('/test')).rejects.toEqual('Internal Server Error');
	});
});
