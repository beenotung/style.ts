import { toClassName } from '../core'

let dim = ['red', 'orange', 'blue', 'purple']
let bright = ['yellow', 'green', 'cyan']
let colors = [...dim, ...bright]
let nDiv = 20
for (let i = 0; i < nDiv; i++) {
  let color = colors[Math.floor(Math.random() * colors.length)]
  let isDim = dim.includes(color)
  let div = document.createElement('div')
  div.classList.add(
    toClassName(
      s => /* css */ `
${s} {
  margin: 1rem;
  width: fit-content;
  display: inline-block;
	padding: 1rem;
	border: 1px solid ${color};
	color: ${isDim ? color : 'black'};
	border-radius: 0.5rem;
}
${s}:hover {
	background-color: ${color};
	color: ${isDim ? 'white' : 'black'};
}
`,
    ),
  )
  div.appendChild(document.createTextNode('sample message'))
  document.body.append(div)
}
function addText(text: string) {
  let p = document.createElement('p')
  p.appendChild(document.createTextNode(text))
  document.body.appendChild(p)
}

let nStyle = document.querySelectorAll('style').length

addText(`N: ${nDiv}`)
addText(`styles: ${nStyle}`)
addText(`Reusing style: ${nDiv != nStyle ? 'yes' : 'no'}`)
