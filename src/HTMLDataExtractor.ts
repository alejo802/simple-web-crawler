'use strict';

export interface IHTMLDataExtractor {
	getLinkURL(link: string): string;
}

export class SimpleHTMLDataExtractor implements IHTMLDataExtractor {

	public getLinkURL(href: string): string {
		if (href && href.startsWith('http')) {
			return href.replace(/\/\s*$/, ''); 		//Returns URL with last bar removed
		}
		return '';
	}
}