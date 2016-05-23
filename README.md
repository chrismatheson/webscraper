#product page scraper

purpose - to consume a webpage, process some data and present it on stdout

console application that scrapes the Sainsbury’s grocery site and returns a JSON array of all the products on the page.

**Warning**

the design is a all-or-nothing approach, so for the most part does not attempt to handle environment problems, or input data probelms, this is
outside of the scope of this application.

##Useage

```
npm install
npm run start
```

##tests

tests are currently a mix of functional and unit tests.

`npm run test`

##Know issues / improvements

- performace could be massively improved with a streaming implimentation
- most of the selectors are hard-ish coded, this could be cleaned up with a DSL?
- http link to crawl is hard coded
- https links will break the fetcher
- redirects will not be followed
- missing data on page will break formatters
- async errors from HTTP will almost certainly blow up the whole program
- size of linked page is from the body string, it may be more accurate to use the HTTP headers (transfered bytes vs body bytes, include headers?)