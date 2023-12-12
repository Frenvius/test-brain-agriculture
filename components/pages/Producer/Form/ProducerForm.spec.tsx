import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import ProducerForm from './index';
import '~/__mock__/matchMedia.mock';
import { initialValues } from './constants';
import Translation from '~/__mock__/Translation';
import { fetchMock } from '~/__mock__/fetchMock';

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		refresh: jest.fn()
	})
}));

jest.mock('~/app/usecase/contexts/MessageContext', () => ({
	useMessage: () => ({
		msg: {
			error: jest.fn(),
			success: jest.fn()
		}
	})
}));

describe('ProducerForm', () => {
	const formTitle = 'Form Title';
	const cropListMock = [
		{
			id: 1,
			label: 'Soy',
			active: true
		},
		{
			id: 2,
			label: 'Corn',
			active: true
		}
	];

	it('submits the form successfully when all fields are valid with CPF', async () => {
		window.fetch = fetchMock({});

		render(
			<Translation>
				<ProducerForm data={null} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		const cropSelect = screen.getByRole('combobox', { name: 'Planted Crops' });
		fireEvent.mouseDown(cropSelect);
		await waitFor(() => {
			return expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument();
		});
		fireEvent.click(document.querySelector(`[id="producer_plantedCrops_list_0"]`) as Element);

		const stateSelect = screen.getByRole('combobox', { name: 'State' });
		fireEvent.mouseDown(stateSelect);
		await waitFor(() => {
			return expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument();
		});
		fireEvent.change(document.querySelector('#producer_state') as Element, { target: { value: 'Acre' } });
		fireEvent.click(document.querySelector(`[id="producer_state_list_0"]`) as Element);

		const citySelect = screen.getByRole('combobox', { name: 'City' });
		fireEvent.mouseDown(citySelect);
		await waitFor(() => {
			return expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument();
		});
		fireEvent.change(document.querySelector('#producer_city') as Element, { target: { value: 'Acrelândia' } });
		fireEvent.click(document.querySelector(`[id="producer_city_list_0"]`) as Element);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: 'John Doe' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 96760983025 } });
		fireEvent.change(screen.getByPlaceholderText('Farm Name'), { target: { value: 'Farm Name' } });
		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '100' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '50' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '50' } });

		fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

		await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('http://localhost:4050/producers', expect.anything()));
	});

	it('Validade total area and arable area', async () => {
		window.fetch = fetchMock({});

		render(
			<Translation>
				<ProducerForm data={null} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '100' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '700' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '50' } });

		fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

		await waitFor(() =>
			expect(screen.getAllByText('Arable and vegetation areas must not exceed total farm area.').length).toBeGreaterThan(1)
		);
	});

	it('Validade if CPF already exists', async () => {
		window.fetch = fetchMock({ items: [{ id: 1, taxDocument: '96760983025' }] });

		render(
			<Translation>
				<ProducerForm data={null} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 96760983025 } });

		fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

		await waitFor(() => expect(screen.getAllByText('Document already registered').length).toBe(1));
	});

	it('submits the form successfully when all fields are valid with CNPJ', async () => {
		window.fetch = fetchMock({});
		const dataMock = {
			...initialValues,
			state: 'Acre',
			city: 'Acrelândia',
			plantedCrops: ['Soy', 'Corn']
		};

		render(
			<Translation>
				<ProducerForm data={dataMock} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: 'John Doe' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 30548527000116 } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 30548527000116 } });
		fireEvent.change(screen.getByPlaceholderText('Farm Name'), { target: { value: 'Farm Name' } });
		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '100' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '50' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '50' } });

		fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

		await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('http://localhost:4050/producers', expect.anything()));
	});

	it('does not submit the form when fields are invalid', async () => {
		window.fetch = fetchMock({});
		render(
			<Translation>
				<ProducerForm data={null} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 1234567890 } });
		fireEvent.change(screen.getByPlaceholderText('Farm Name'), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '5' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '10' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '10' } });

		fireEvent.click(screen.getByText('Save'));

		await waitFor(() => expect(window.fetch).not.toHaveBeenCalledWith('http://localhost:4050/producers', expect.anything()));
	});

	it('does not submit the form when CPF are invalid', async () => {
		window.fetch = fetchMock({});
		render(
			<Translation>
				<ProducerForm data={null} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 1234567890 } });

		fireEvent.click(screen.getByText('Save'));

		await waitFor(() => expect(window.fetch).not.toHaveBeenCalledWith('http://localhost:4050/producers', expect.anything()));
		await waitFor(() => expect(screen.getByText('Invalid CPF')).toBeInTheDocument());
	});

	it('does not submit the form when CNPJ are invalid', async () => {
		window.fetch = fetchMock({});
		render(
			<Translation>
				<ProducerForm data={null} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 3054852700011 } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 3054852700011 } });

		fireEvent.click(screen.getByText('Save'));

		await waitFor(() => expect(window.fetch).not.toHaveBeenCalledWith('http://localhost:4050/producers', expect.anything()));
		await waitFor(() => expect(screen.getByText('Invalid CNPJ')).toBeInTheDocument());
	});
});
