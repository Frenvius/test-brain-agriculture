import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import ProducerForm from './index';
import '~/__mock__/matchMedia.mock';
import Translation from '~/__mock__/Translation';
import { fetchMock } from '~/__mock__/fetchMock';
import { initialValues } from '~/components/pages/Producer/Form/constants';

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
				<ProducerForm data={undefined} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		const cropSelect = screen.getByRole('combobox', { name: 'Planted Crops' });
		fireEvent.mouseDown(cropSelect);

		await waitFor(() => {
			return expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument();
		});

		fireEvent.click(document.querySelector(`[id="producer_plantedCrops_list_0"]`) as Element);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: 'John Doe' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 96760983025 } });
		fireEvent.change(screen.getByPlaceholderText('Farm Name'), { target: { value: 'Farm Name' } });
		fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'City Name' } });
		fireEvent.change(screen.getByPlaceholderText('State'), { target: { value: 'State Name' } });
		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '100' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '50' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '50' } });

		fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

		await waitFor(() => expect(window.fetch).toHaveBeenCalled());
	});

	it('Validade total area and arable area', async () => {
		window.fetch = fetchMock({});

		render(
			<Translation>
				<ProducerForm data={undefined} title={formTitle} cropList={cropListMock} />
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

	it('submits the form successfully when all fields are valid with CNPJ', async () => {
		window.fetch = fetchMock({});
		const dataMock = {
			...initialValues,
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
		fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'City Name' } });
		fireEvent.change(screen.getByPlaceholderText('State'), { target: { value: 'State Name' } });
		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '100' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '50' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '50' } });

		fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

		await waitFor(() => expect(window.fetch).toHaveBeenCalled());
	});

	it('does not submit the form when fields are invalid', async () => {
		window.fetch = fetchMock({});
		render(
			<Translation>
				<ProducerForm data={[]} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 1234567890 } });
		fireEvent.change(screen.getByPlaceholderText('Farm Name'), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText('State'), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText('Total Farm Area in Hectares'), { target: { value: '5' } });
		fireEvent.change(screen.getByPlaceholderText('Arable Area in Hectares'), { target: { value: '10' } });
		fireEvent.change(screen.getByPlaceholderText('Vegetation Area in Hectares'), { target: { value: '10' } });

		fireEvent.click(screen.getByText('Save'));

		await waitFor(() => expect(window.fetch).not.toHaveBeenCalled());
	});

	it('does not submit the form when CPF are invalid', async () => {
		window.fetch = fetchMock({});
		render(
			<Translation>
				<ProducerForm data={[]} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 1234567890 } });

		fireEvent.click(screen.getByText('Save'));

		await waitFor(() => expect(window.fetch).not.toHaveBeenCalled());
		await waitFor(() => expect(screen.getByText('Invalid CPF')).toBeInTheDocument());
	});

	it('does not submit the form when CNPJ are invalid', async () => {
		window.fetch = fetchMock({});
		render(
			<Translation>
				<ProducerForm data={[]} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

		fireEvent.change(screen.getByPlaceholderText("Producer's Name"), { target: { value: '' } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 3054852700011 } });
		fireEvent.change(screen.getByPlaceholderText("Producer's CPF or CNPJ"), { target: { value: 3054852700011 } });

		fireEvent.click(screen.getByText('Save'));

		await waitFor(() => expect(window.fetch).not.toHaveBeenCalled());
	});
});
