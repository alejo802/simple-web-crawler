'use strict';

import fetch from 'node-fetch';

export interface IHTMLFetcher {
	getContentFromURL(url: string): Promise<string>;
}

export class SimpleHTMLFetcher implements IHTMLFetcher {

	public async getContentFromURL(url: string): Promise<string> {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch: ${url}`);
		}
		return await response.text();
	}
}