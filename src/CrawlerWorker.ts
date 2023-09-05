'use strict';

import { Logger } from 'sitka';
import { getDomain, getSubdomain } from 'tldts';
import { IHTMLParser } from './HTMLParser';
import { IHTMLDataExtractor } from './HTMLDataExtractor';
import { IHTMLFetcher } from './HTMLFetcher';
import { ICrawlerStorage } from './CrawlerStorage';
import { isHttpUri, isHttpsUri } from 'valid-url';

export class CrawlerWorker {
	private _logger: Logger;
	private _HTMLParser: IHTMLParser;
	private _HTMLDataExtractor: IHTMLDataExtractor;
	private _HTMLFetcher: IHTMLFetcher;
	private _storage: ICrawlerStorage;
	private _visitedUrls = new Set<string>();

	private DEFAULT_MAX_DEPTH = 2;

	constructor(htmlParser: IHTMLParser, htmlDataExtractor: IHTMLDataExtractor, htmlFetcher: IHTMLFetcher, crawlerStorage: ICrawlerStorage) {
		this._logger = Logger.getLogger({ name: this.constructor.name });
		this._HTMLParser = htmlParser;
		this._HTMLDataExtractor = htmlDataExtractor;
		this._HTMLFetcher = htmlFetcher;
		this._storage = crawlerStorage;
	}

	public async crawl(url: string, maxDepth: number): Promise<void> {

		this._logger.debug(`Called crawl with url: ${url} and depth: ${maxDepth}`);

		maxDepth = this.validateMaxDepth(maxDepth);
		this.validateUrl(url);

		const stack: { url: string, depth: number }[] = [{ url, depth: 0 }];
		const domain = getDomain(url);
		const subDomain = getSubdomain(url);

		while (stack.length > 0) {
			const { url, depth } = stack.pop() as { url: string, depth: number };

			if (this.shouldCrawlWebsite(depth, maxDepth, url, domain, subDomain)) {
				continue;
			}
			this._storage.save(url);
			this._visitedUrls.add(url);

			try {
			
				const html = await this._HTMLFetcher.getContentFromURL(url);
				const links = this._HTMLParser.getLinks(html);

				for (const link of links) {
					const linkUrl = this._HTMLDataExtractor.getLinkURL(link);
					if(linkUrl)
						stack.push({ url: linkUrl, depth: depth + 1 });
				}
			} catch (error) {
				this._logger.error(`Error crawling ${url}: ${error}`);
			}
		}
	}

	private validateUrl(url: string) {
		if (!isHttpUri(url) && !isHttpsUri(url)) {
			const message: string = `Invalid URL input: ${url}`;
			this._logger.error(message);
			throw new Error(message);
		}
	}

	private validateMaxDepth(maxDepth: number): number {
		return !isNaN(Number(maxDepth)) ? maxDepth : this.DEFAULT_MAX_DEPTH;
	}

	private shouldCrawlWebsite(depth: number, maxDepth: number, url: string, domain: string | null, subDomain: string | null) {
		return depth > maxDepth || this._visitedUrls.has(url) || domain !== getDomain(url) || subDomain !== getSubdomain(url);
	}
}