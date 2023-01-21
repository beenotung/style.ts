import { Context } from '../core'

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

console.log('className:', className)

console.log('html:')
console.log(context.toHTML())
