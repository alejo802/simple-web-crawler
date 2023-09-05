'use strict';

import { Logger } from 'sitka';

export interface ICrawlerStorage {
	save(content: string): void;
}

export class ConsoleLoggerCrawlerStorage implements ICrawlerStorage {

	private _logger: Logger;
	
	constructor() {
		this._logger = Logger.getLogger({ name: this.constructor.name });
	}

	public save(content: string): void {
		this._logger.info(content);	
	}
}