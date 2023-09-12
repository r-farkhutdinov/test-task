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
            This package would expose both the components as well as their corresponding types and interfaces.
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
        <h2>Tech stack</h2>
        <ul>
            <li>React 18 (CRA)</li>
            <li>Typescript</li>
            <li>CSS modules</li>
            <li>React testing library</li>
            <li>Simple Express server for data</li>
        </ul>
    </section>
);
