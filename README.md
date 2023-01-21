# style.ts

Simple css-in-js library that works in both browser and node.js.

[![npm Package Version](https://img.shields.io/npm/v/style.ts)](https://www.npmjs.com/package/style.ts)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/style.ts)](https://bundlephobia.com/package/style.ts)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/style.ts)](https://bundlephobia.com/package/style.ts)

It can be used for client-side rendering, server-side-rendering and static-site-generation.

## Installation

```bash
npm install style.ts
```

## Typescript Signature

```typescript
type StyleFn = (selector: string) => string

// isolated for each request
class Context {
  constructor(option: { prefix: string })
  toClassName(fn: StyleFn): string
  toHTML(): string
}

// using global instance
function toClassName(fn: StyleFn, options?: { prefix?: string }): string
```

## Usage Examples

For complete examples see:

- [node.ts](./src/test/node.ts)
- [server.ts](./src/test/server.ts)
- [browser.ts](./src/test/browser.ts)

### Using in the browser

When using in the browser, the stylesheet is auto created and appended to document body.

Sample code:

```typescript
import { toClassName } from 'style.ts'

let div = document.createElement('div')
div.classList.add(
  toClassName(
    s => /* css */ `
${s} {
  margin: 1rem;
  width: fit-content;
  display: inline-block;
	padding: 1rem;
	border: 1px solid red;
	color: red;
	border-radius: 0.5rem;
}
${s}:hover {
	background-color: red;
	color: ${isDim ? 'white' : 'black'};
}
`,
  ),
)
div.appendChild(document.createTextNode('sample message'))
document.body.append(div)
```

### Using in the server

When using in the node.js, the styles can be managed in isolated context. This enable the server to generate minimal styles for each request.

Sample code:

```typescript
import { Context } from 'style.ts'

let context = new Context({ prefix: 's-' })

let className = context.toClassName(
  s => /* css */ `
${s} {
	padding: 32px;
	border: 1px solid red;
	color: red;
	border-radius: 16px;
}
${s}:hover {
	background-color: red;
	color: white;
}
`,
)

let styles = context.toHTML()
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
