let defaultPrefix = 's-'

export class Context {
  public readonly prefix: string

  constructor(option: { prefix: string }) {
    this.prefix = option.prefix
  }

  private count = 0
  private nextClassName(): string {
    this.count++
    return this.prefix + this.count.toString(36)
  }

  // contentTemplate -> className
  private cache: Map<string, string> = new Map()

  private innerHTML: string = ''

  private compose(className: string, fn: StyleFn): string {
    let selector = '.' + className
    let content = fn(selector).trim()
    if (!content) return ''
    if (!content.includes('{')) {
      content = `{
${content}`
    }
    if (content[0] == '{') {
      content = `${selector} ${content}`
    }
    if (content[content.length - 1] != '}') {
      content = `${content}
}`
    }
    return content
  }

  toClassName(fn: StyleFn): string {
    let contentTemplate = this.compose('', fn)
    let className = this.cache.get(contentTemplate)
    if (className) {
      return className
    }

    className = this.nextClassName()
    this.cache.set(contentTemplate, className)

    let content = this.compose(className, fn)

    if (typeof document == 'undefined') {
      this.innerHTML += content
    } else {
      let style = document.createElement('style')
      style.innerHTML = content
      document.body.append(style)
    }

    return className
  }

  toHTML() {
    return `<style>
${this.innerHTML}
</style>`
  }
}

type StyleFn = (selector: string) => string

export type Options = {
  prefix?: string
}

// prefix -> Context instance
let contexts: Map<string, Context> = new Map()

export function toClassName(
  fn: (selector: string) => string,
  options?: Options,
): string {
  let prefix = options?.prefix || defaultPrefix
  let context = contexts.get(prefix)
  if (!context) {
    context = new Context({ prefix })
    contexts.set(prefix, context)
  }
  return context.toClassName(fn)
}
