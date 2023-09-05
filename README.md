# A Simple Web Crawler

A production-ready web crawler is a complex system designed to efficiently and reliably fetch data from websites at scale. Below is a high-level diagram proposed for a production-ready web crawler system:

       +------------------------------------------------------+
       |                Web Crawler System                    |
       +-----------------------------+------------------------+
                                     |
                      +--------------v--------------+
                      |        Task Scheduler        |
                      |  (e.g., Apache Kafka, Redis) |
                      +--------------|--------------+
                                     |
          +--------------------------v-------------------------+
          |               Distributed Crawling Queue              |
          | (e.g., RabbitMQ, AWS SQS, Apache Kafka, or Redis)     |
          +--------------------------|-------------------------+
                                     |
     +-----------------------------v-------------------------+
     |                      Crawler Workers                    |
     |        +-----------+           +-----------+           |
     |        | Crawler   |           | Crawler   |           |
     |        | Worker 1  |           | Worker 2  |           |
     |        +-----------+           +-----------+           |
     |                                                       |
     |     +----------------+     +----------------+          |
     |     | HTML Parser    |     | Data Extractor |          |
     |     | and DOM Parser |     | (e.g., XPath)  |          |
     |     +----------------+     +----------------+          |
     |                                                       |
     |     +---------------------------------------------+     |
     |     |             Data Storage and Indexing         |     |
     |     |  (e.g., Database, Elasticsearch, NoSQL, etc.) |     |
     |     +---------------------------------------------+     |
     |                                                       |
     +-------------------------------------------------------+

Explanation of the components:

**Task Scheduler:** This component manages the scheduling of crawling tasks. It can use technologies like Apache Kafka or Redis to store and distribute URLs or tasks to be crawled. When a new URL is discovered or submitted for crawling, it's added to the task scheduler.

**Distributed Crawling Queue:** The crawling queue stores the list of URLs or tasks to be crawled. It ensures that multiple crawler workers can pull tasks in a distributed and coordinated manner. Common technologies for this purpose include RabbitMQ, AWS SQS, Apache Kafka, or Redis.

**Crawler Workers:** These are a pool of worker processes or instances responsible for fetching web pages and extracting data. Crawler workers pull tasks from the queue, fetch the corresponding web page, and send it for parsing and data extraction. Having multiple crawler workers enables parallel processing of tasks, which is crucial for efficient crawling.

**HTML Parser and DOM Parser:** The HTML parser and DOM parser are responsible for parsing the raw HTML content received from web pages. They create a structured representation of the HTML document (DOM) that can be easily navigated. These parsers help in locating and extracting specific data from web pages.

**Data Extractor:** Data extraction components like XPath or other custom techniques are used to extract structured data from the parsed HTML content. These components are highly customizable based on the data extraction requirements.

**Data Storage and Indexing:** Extracted data is stored in a suitable data storage system, which could be a relational database, NoSQL database, or an indexing engine like Elasticsearch. This data storage enables efficient retrieval and analysis of crawled data.

**Monitoring and Logging:** Monitoring and logging components are essential for tracking the health and performance of the web crawler system. They help in identifying and diagnosing issues, as well as provide insights into the crawling process.

**Configuration and Control:** This component manages the configuration settings for the crawler, including crawl frequency, concurrency, and other parameters. It also provides control mechanisms to start, stop, and pause the crawling process.

**Authentication and Authorization:** If the crawler needs to access websites that require authentication or have access restrictions, authentication and authorization mechanisms need to be implemented to handle login credentials and permissions.

**Robots.txt and Politeness:** The crawler should respect the rules defined in a site's robots.txt file and follow polite crawling practices to avoid overloading websites and being blocked.

We should also take into account handling edge cases and exceptions such as handling JavaScript-rendered content dealing with anti-crawling mechanisms implemented by websites.  
Monitoring and maintaining the crawler over time are also crucial aspects of this system.

---


Given our constrained time frame and the specific focus of this take-home interview assignment, I have opted to create a streamlined iteration of the CrawlerWorker component.   
This version also incorporates fundamental implementations of the Parser, Fetcher, and Extractor components. 

The primary objectives are as follows: 
* first, to establish this codebase as a foundational starting point for future enhancements, 
* second, to showcase my capabilities in architecting a scalable system, executing the implementation process, structuring the code in a modular fashion, and crafting comprehensive unit tests to ensure reliability and maintainability. 

This deliberate approach allows us to build upon a solid foundation while underscoring my proficiency in both the architectural and coding aspects of the task.

Example command to run this program:

```
npx ts-node dist/index.js --url=https://monzo.com --depth="1"
```