export interface Example {
  id: string;
  name: string;
  html: string;
}

export const examples: Example[] = [
  {
    id: 'simple',
    name: 'Simple',
    html: `<h1>Hello World</h1>
<p>This is a <strong>simple</strong> example with a <a href="https://example.com">link</a>.</p>
<p>It has multiple paragraphs.</p>`,
  },
  {
    id: 'nested-lists',
    name: 'Nested Lists',
    html: `<ul>
  <li>Item 1
    <ul>
      <li>Nested A</li>
      <li>Nested B
        <ol>
          <li>Ordered 1</li>
          <li>Ordered 2</li>
        </ol>
      </li>
    </ul>
  </li>
  <li>Item 2</li>
</ul>`,
  },
  {
    id: 'code-blocks',
    name: 'Code Blocks',
    html: `<p>Inline <code>code</code> and blocks:</p>
<pre><code class="language-javascript">function hello() {
  console.log("Hello!");
}
</code></pre>
<p>Code with backticks:</p>
<pre><code>Use \`template\` literals</code></pre>`,
  },
  {
    id: 'tables',
    name: 'Tables',
    html: `<table>
  <thead>
    <tr>
      <th align="left">Name</th>
      <th align="center">Role</th>
      <th align="right">Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Engineer</td>
      <td>$100k</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Designer</td>
      <td>$90k</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 'article',
    name: 'Full Article',
    html: `<article>
  <h1>Getting Started with Markdown</h1>
  <p>Markdown is a <em>lightweight</em> markup language.</p>

  <h2>Why Use Markdown?</h2>
  <ul>
    <li><strong>Simple</strong> - Easy to learn</li>
    <li><strong>Portable</strong> - Works everywhere</li>
    <li><strong>Flexible</strong> - Converts to HTML</li>
  </ul>

  <blockquote>
    <p>Markdown is intended to be as easy-to-read as possible.</p>
  </blockquote>

  <h2>Example</h2>
  <pre><code class="language-markdown"># Heading
This is a paragraph.
</code></pre>
</article>`,
  },
  {
    id: 'edge-cases',
    name: 'Edge Cases',
    html: `<p>Special chars: 5 * 3 = 15</p>
<p>Escaped: See [section A] for details.</p>
<p>Empty <em></em> emphasis.</p>
<p>Whitespace <strong>  bold  </strong> trimmed.</p>
<ol start="5">
  <li>Starts at five</li>
  <li>Then six</li>
</ol>`,
  },
];
