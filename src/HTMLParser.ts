'use strict';

import { JSDOM } from 'jsdom';

export interface IHTMLParser {
	getLinks(html: string): string[];
}

export class SimpleHTMLParser implements IHTMLParser {

	public getLinks(html: string): string[] {
		const dom = new JSDOM(html);

		const links = [...dom.window.document.links].map(l => l.href);
		
		return links;
	}
}