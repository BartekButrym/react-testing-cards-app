import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Pets } from './Pets';
import catsMock from '../../mocks/cats.json';

const server = setupServer(
	rest.get('http://localhost:4000/cats', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(catsMock));
	})
);

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<Pets />));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pets', () => {
	test('should render five card components', async () => {
		const cards = await screen.findAllByRole('article');
		expect(cards.length).toBe(5);
	});

	test('should filter for male cats', async () => {
		const cards = await screen.findAllByRole('article');
		userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male');

		const maleCards = screen.getAllByRole('article');

		expect(maleCards).toStrictEqual([cards[1], cards[3]]);
	});

	test('should filter for female cats', async () => {
		const cards = await screen.findAllByRole('article');
		userEvent.selectOptions(screen.getByLabelText(/gender/i), 'female');

		const maleCards = screen.getAllByRole('article');

		expect(maleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
	});

	test('should filter for favourite cats', async () => {
		const cards = await screen.findAllByRole('article');
		const btnForFirstCard = within(cards[0]).getByRole('button');
		const btnForFourthCard = within(cards[3]).getByRole('button');

		userEvent.click(btnForFirstCard);
		userEvent.click(btnForFourthCard);

		userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'favourite');

		expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[3]]);
	});

	test('should filter for not favourite cats', async () => {
		const cards = await screen.findAllByRole('article');
		const btnForFirstCard = within(cards[0]).getByRole('button');
		const btnForFourthCard = within(cards[3]).getByRole('button');

		userEvent.click(btnForFirstCard);
		userEvent.click(btnForFourthCard);

		userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'not favourite');

		expect(screen.getAllByRole('article')).toStrictEqual([cards[1], cards[2], cards[4]]);
	});

	test('should filter for favoured male cats', async () => {
		const cards = await screen.findAllByRole('article');
		const btnForFirstCard = within(cards[0]).getByRole('button');
		const btnForFourthCard = within(cards[3]).getByRole('button');

		userEvent.click(btnForFirstCard);
		userEvent.click(btnForFourthCard);

		userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'favourite');

		userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male');

		expect(screen.getAllByRole('article')).toStrictEqual([cards[3]]);
	});
});
