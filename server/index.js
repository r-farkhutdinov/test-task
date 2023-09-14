/* eslint-disable @typescript-eslint/no-var-requires */
const data = require('./data.json');

const express = require('express');
const app = express();
const port = 3001;
const responseTimeoutMs = 1000;

const getPagesById = (id) => {
  const { entities: { pages } } = data;
  return pages[id];
};

/**
 * Adds all the pages in hierarchy to the response, so that if a nested child matches the query, the whole branch will be in the result
 */
const addPagesToRoot = ({ result, topLevelIds, item }) => {
  result.entities.pages[item.id] = item;
  if (item.level === 0 && !topLevelIds.includes(item.id)) {
    // update topLevelIds to keep the correct structure
    topLevelIds.push(item.id);
  } else if (item.level !== 0) {
    addPagesToRoot({ result, topLevelIds, item: getPagesById(item.parentId) });
  }
};

/**
 * Returns the TOC data; if 'query' URL parameter is applied, filters the data as follows: 
 * all elements (branches) which contain the query
 */
app.get('/toc', (req, res) => {
  const { query } = req.query;
  let result = {};

  const { entities: { pages } } = data;

  if (query) {
    const queryLower = query.toLowerCase();

    // Filter all pages
    const filteredPages = Object.values(pages).filter(page => page.title.toLowerCase().includes(queryLower));

    result.entities = { pages: {} };
    result.topLevelIds = [];

    filteredPages.forEach(page => {
      // Filter all child pages to exclude anchors having non-matching childs
      const filteredChildren = page.pages?.filter(p => getPagesById(p, pages).title.toLowerCase().includes(queryLower));
      // Add all the nodes in the path of match, from the "lowest" to its root
      addPagesToRoot({ result, topLevelIds: result.topLevelIds, item: { ...page, pages: filteredChildren } });
    });
  } else {
    result = data;
  }

  setTimeout(() => res.send(result), responseTimeoutMs);
});

/**
 * Get the page by ID
 */
app.get('/toc/:id', (req, res) => {
  const itemId = req.params.id;
  const item = getPagesById(itemId, data.entities.pages);

  setTimeout(() => res.send(item), responseTimeoutMs);
});

app.listen(port, () => {
  console.log(`TOC app listening on port ${port}`);
});