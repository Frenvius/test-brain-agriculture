import '@testing-library/jest-dom';
import * as nextRouter from 'next/navigation';
import { render, screen, fireEvent } from '@testing-library/react';

import Breadcrumb from './index';
import '~/__mock__/matchMedia.mock';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn()
}));

describe('Breadcrumb', () => {
	const push = jest.fn();
	const back = jest.fn();

	beforeEach(() => {
		(nextRouter.useRouter as jest.Mock).mockReturnValue({ push, back });
		push.mockClear();
		back.mockClear();
	});

	it('should call back when no link is provided', () => {
		render(<Breadcrumb label="Back" />);
		fireEvent.click(screen.getByRole('button', { name: 'Back' }));

		expect(back).toHaveBeenCalled();
		expect(push).not.toHaveBeenCalled();
	});

	it('should call push when link is provided', () => {
		render(<Breadcrumb label="Back to Dashboard" link="/" />);
		fireEvent.click(screen.getByRole('button', { name: 'Back to Dashboard' }));

		expect(push).toHaveBeenCalled();
		expect(back).not.toHaveBeenCalled();
	});

	it('simulate click on arrow without link', () => {
		render(<Breadcrumb label="Back" />);
		fireEvent.click(screen.getByRole('img', { name: 'arrow-left' }));

		expect(back).toHaveBeenCalled();
		expect(push).not.toHaveBeenCalled();
	});

	it('simulate click on arrow with link', () => {
		render(<Breadcrumb label="Back to Dashboard" link="/" />);
		fireEvent.click(screen.getByRole('img', { name: 'arrow-left' }));

		expect(push).toHaveBeenCalled();
		expect(back).not.toHaveBeenCalled();
	});
});
