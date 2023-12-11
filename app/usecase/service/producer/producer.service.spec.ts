import { producerService } from './service';
import { fetchMock } from '~/__mock__/fetchMock';

describe('Producer Service', () => {
	let service: any;

	beforeEach(() => {
		service = producerService;
	});

	it('calls get with correct parameters', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const id = '123';
		await service.get(id, 'no-store');
		expect(window.fetch).toHaveBeenCalledWith('http://localhost:4050/producers/123', {
			body: undefined,
			cache: 'no-store',
			headers: new Headers(),
			method: 'GET'
		});
	});

	it('calls create with correct parameters', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const request = { name: 'John Doe' };
		await service.create(request);
		expect(window.fetch).toHaveBeenCalled();
	});

	it('calls create with correct parameters', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const request = { name: 'John Doe' };
		await service.update(request);
		expect(window.fetch).toHaveBeenCalled();
	});

	it('calls search with correct parameters without page', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const request = { name: 'John Doe' };
		await service.search(request);
		expect(window.fetch).toHaveBeenCalled();
	});

	it('calls search with correct parameters with page', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const request = { name: 'John Doe' };
		await service.search(request, '2');
		expect(window.fetch).toHaveBeenCalled();
	});

	it('calls create with correct parameters', async () => {
		window.fetch = fetchMock({ data: '12345' });
		const request = { name: 'John Doe' };
		await service.delete(request);
		expect(window.fetch).toHaveBeenCalled();
	});
});
