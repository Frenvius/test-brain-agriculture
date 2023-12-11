import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';

import '~/__mock__/matchMedia.mock';
import Translation from '~/__mock__/Translation';
import Dashboard from '~/components/pages/Dashboard/index';

describe('Dashboard', () => {
	const mock = {
		totalFarms: 50,
		totalAcres: 27762,
		pieChartByState: [],
		pieChartByCrop: [],
		pieChartByLandUse: []
	};

	it('renders', () => {
		render(
			<Translation>
				<Dashboard data={mock} />
			</Translation>
		);

		expect(screen.getByText('Total Farms')).toBeInTheDocument();
		expect(screen.getByText('Crop Variety Across Farms')).toBeInTheDocument();
		cleanup();
	});
});
