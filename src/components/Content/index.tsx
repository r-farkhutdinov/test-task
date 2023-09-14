/**
 * Content component
 */
export const Content = () => (
    <section>
        <h2>General approach</h2>
        <p>In the current implementation, the main components are <code>{'<Sidebar />'}</code> and <code>{'<PagesProvider />'}</code></p>
        <p>
            The <code>{'<Sidebar />'}</code> component internally utilizes <code>{'<Tree />'}</code> and <code>{'<Node />'}</code> components.
            When a node has child elements that need to be expanded, the Tree component is recursively rendered.
            Additionally, the Sidebar displays a loading skeleton while data is being fetched.
        </p>
        <p>
            Although it's not evident in this project's structure, these components could easily be packaged as an npm module in a real-world scenario.
            This package would expose both the components as well as their corresponding types, interfaces and utility functions.
            All the logic is self-contained within the provider and the component itself.
            To properly position the component within the grid, the host application needs to designate the area as <code>aside</code>.
        </p>
        <p>
            The provider is exported separately so that it can be placed higher in the component hierarchy.
            This enables the state of the tree component to be utilized as demonstrated in this example with breadcrumbs.
            Components could be used in the following way:
        </p>
        <code>
            {'import { Sidebar, PagesProvider } from \'toc-library-name\';\n\n'}
            ...
            {'\n<PagesProvider>\n\t<Sidebar />\n</PagesProvider>\n'}
            ...
        </code>
        <p>
            The <code>GET /toc</code> API endpoint (Express) returns the Table of Contents (TOC) data. If a query URL parameter is provided, the returned TOC data is filtered to only include elements (branches) that contain the specified query string in their title.
            Here's a breakdown of what the code does: if no query parameter is provided, the entire TOC data is returned as is.
            If a query parameter is present, the following steps are taken to filter the TOC data:
            the topLevelIds are filtered to only include elements whose title contains the query string (case-insensitive);
            the individual pages are also filtered based on whether their title contains the query string (case-insensitive).
            After filtering the pages, any parent nodes of the filtered pages are also added to the results to maintain the hierarchical structure of the TOC.
            The response is then sent back to the client after a delay specified by <code>responseTimeoutMs</code> (=1000 by default).
            The function uses utility functions like <code>getItemById</code> to fetch a particular page by its ID and <code>addPagesToRoot</code> to recursively add parent pages to the result set.
        </p>
        <p>All the components and utility functions are covered with unit and snapshot tests</p>
    </section>
);
