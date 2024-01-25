import jsdom from 'jsdom';
import fetch from 'node-fetch';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-jasmine/';

const getData = async () => {
	return fetch(url)
		.then((res) => {
			return res.text();
		})
		.then((body) => {
			const { document } = new JSDOM(body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of each card list image width and height attribute values', () => {
		const cardImgEls = document.querySelectorAll('.card__image img');

		for (let i = 0; i < cardImgEls.length; i++) {
			const cardImgEl = cardImgEls[i];
			const cardImgWidth = parseInt(cardImgEl.getAttribute('width'));
			const cardImgHeight = parseInt(cardImgEl.getAttribute('height'));

			expect(cardImgWidth).toBeInstanceOf(Number);
			expect(cardImgHeight).toBeInstanceOf(Number);
		}
	});

	it("should have a title element that contains 'Reliable, efficient delivery' word", () => {
		const cardsSummaryTitleEl = document.querySelector('.cards-summary__title');
		const cardsSummaryTitle = cardsSummaryTitleEl.textContent.trim();

		expect(cardsSummaryTitle).toContain('Reliable, efficient delivery');
	});

	it('should have two children inside of the section element', () => {
		const sectionEl = document.querySelector('section');
		const sectionChildrenEls = sectionEl.children;

		expect(sectionChildrenEls).toHaveSize(2);
	});

	it('should have an empty alt attribute value of each card list item image element', () => {
		const cardListItemImgEls =
			document.querySelectorAll('.card__image img');

		for (let i = 0; i < cardListItemImgEls.length; i++) {
			const cardListItemImgAlt = cardListItemImgEls[i].alt;

			expect(cardListItemImgAlt).toBe('');
		}
	});
});
