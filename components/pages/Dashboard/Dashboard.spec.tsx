import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import '~/__mock__/matchMedia.mock';
import Translation from '~/__mock__/Translation';
import Dashboard from '~/components/pages/Dashboard/index';

describe('Dashboard', () => {
	const mock = {
		totalFarms: 50,
		totalAcres: 27762,
		pieChartByState: [],
		pieChartByCrop: [
			{
				label: 'Soy',
				value: 5
			},
			{
				label: 'Corn',
				value: 10
			}
		],
		pieChartByLandUse: [
			{
				label: 'usefulArea',
				value: 5
			},
			{
				label: 'vegetationArea',
				value: 10
			}
		]
	};

	it('renders', () => {
		render(
			<Translation>
				<Dashboard data={mock} />
			</Translation>
		);

		// expect(screen.getByText('Total Farms')).toBeInTheDocument();
		// expect(screen.getByText('Crop Variety Across Farms')).toBeInTheDocument();
		cleanup();
	});
});
