import http from 'http'
import { Context } from '../core'
let { floor, random } = Math

let colors = ['red', 'orange', 'green', 'blue', 'purple']

let server = http.createServer((req, res) => {
  let context = new Context({ prefix: 's-' })

  let color = colors[floor(random() * colors.length)]

  let content = /* html */ `
	<div class="${context.toClassName(
    s => /* css */ `
${s} {
	color: ${color}
}
`,
  )}">
sample message
</div>
`

  let styles = context.toHTML()

  res.write(styles)
  res.write(content)

  res.end()
})

server.listen(8100, () => {
  console.log('listening on http://localhost:8100')
})
