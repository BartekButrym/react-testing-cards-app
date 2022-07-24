import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

const cardProps = {
	name: 'Sydney',
	phone: '111-111-1111',
	email: 'test@gmail.com',
	image: {
		url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
		alt: 'cute cat',
		favoured: false,
	},
};

describe('Card', () => {
	test('should show name of the cat', () => {
		render(<Card {...cardProps} />);

		expect(screen.getByRole('heading', { name: /sydney/i })).toBeInTheDocument();
	});

	test('should show phone number', () => {
		render(<Card {...cardProps} />);

		expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
	});

	test('should show email', () => {
		render(<Card {...cardProps} />);

		expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
	});

	test('should show image with correct source', () => {
		render(<Card {...cardProps} />);

		expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
	});

	test('should show outlined heart', () => {
		render(<Card {...cardProps} />);

		expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
		expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
	});

	test('should show filled heart', () => {
		render(<Card {...cardProps} favoured={true} />);

		expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
		expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
	});

	test('should toggle heart status', () => {
		render(<Card {...cardProps} />);

		userEvent.click(screen.getByRole('button'));

		expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
		expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

		userEvent.click(screen.getByRole('button'));

		expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
		expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
	});
});
