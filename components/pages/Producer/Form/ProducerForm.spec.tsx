import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import ProducerForm from './index';
import '~/__mock__/matchMedia.mock';
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

	it('submits the form successfully when all fields are valid', async () => {
		window.fetch = fetchMock({});
		const dataMock = {
			plantedCrops: ['Soy', 'Corn']
		};

		render(
			<Translation>
				<ProducerForm data={dataMock} title={formTitle} cropList={cropListMock} />
			</Translation>
		);

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

	it('does not submit the form when CPF/CNPJ are invalid', async () => {
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
});
