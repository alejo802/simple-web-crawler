'use strict';

import { expect } from 'chai';
import { CrawlerWorker } from '../dist/CrawlerWorker';
import { IHTMLParser } from '../dist/HTMLParser';
import { IHTMLDataExtractor } from '../dist/HTMLDataExtractor';
import { IHTMLFetcher } from '../dist/HTMLFetcher';
import { ICrawlerStorage } from '../dist/CrawlerStorage';

describe('CrawlerWorker', () => {
	// Mock implementations for dependencies (use real ones if available)
	const htmlParser: IHTMLParser = {
		getLinks: () : string[] => ['http://example.com/page1', 'http://example.com/page2'],
	};

	const htmlDataExtractor: IHTMLDataExtractor = {
		getLinkURL: (link: string) => link,
	};

	const htmlFetcher: IHTMLFetcher = {
		getContentFromURL: (): Promise<string> => Promise.resolve('<a href="http://example.com/page1"></a>'),
	};

	const crawlerStorage: ICrawlerStorage = {
		save: () => {},
	};

	it('should initialize with provided dependencies', () => {
		const crawler = new CrawlerWorker(htmlParser, htmlDataExtractor, htmlFetcher, crawlerStorage);

		expect(crawler).to.be.an.instanceOf(CrawlerWorker);
	});

	it('should fail if passed an invalid URL', async () => {
		const crawler = new CrawlerWorker(htmlParser, htmlDataExtractor, htmlFetcher, crawlerStorage);
		const invalidUrl = 'invalid-url';

		try {
			await crawler.crawl(invalidUrl, 2);
		} catch (error) {
			expect(error.message).to.be.equal(`Invalid URL input: ${invalidUrl}`);
			expect(error).to.be.an('Error');
		}		
	});

	it('should crawl pages up to the specified max depth', async () => {
		const crawler = new CrawlerWorker(htmlParser, htmlDataExtractor, htmlFetcher, crawlerStorage);

		const startUrl = 'http://example.com/start';
		const maxDepth = 2;

		await crawler.crawl(startUrl, maxDepth);

		// You can add assertions to check if the crawling logic is working as expected.
		// For example, you can check if specific URLs are visited or stored in the storage.
	});
});