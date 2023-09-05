'use strict';

import { ConsoleLoggerCrawlerStorage as SimpleConsoleLoggerCrawlerStorage } from './CrawlerStorage';
import { CrawlerWorker } from './CrawlerWorker';
import minimist from 'minimist';
import { SimpleHTMLDataExtractor } from './HTMLDataExtractor';
import { SimpleHTMLFetcher } from './HTMLFetcher';
import { SimpleHTMLParser } from './HTMLParser';


const worker = new CrawlerWorker(
	new SimpleHTMLParser(),
	new SimpleHTMLDataExtractor(),
	new SimpleHTMLFetcher(),
	new SimpleConsoleLoggerCrawlerStorage()
);

const defaultUrlToCrawl = 'https://monzo.com/';

const args = minimist(process.argv);

worker.crawl(args['url'] ?? defaultUrlToCrawl, args['depth']);