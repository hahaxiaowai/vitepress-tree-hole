import { config } from 'md-editor-v3'

export function useMD() {
  config({
    codeMirrorExtensions(_theme, _extensions) {
      const extensions = [..._extensions]
      extensions.pop()
      return [...extensions]
    },
    markdownItConfig(mdit) {
      mdit.inline.ruler.after('emphasis', 'custom_tag', (state, silent) => {
        const start = state.pos
        const marker = state.src.charCodeAt(start)

        if (marker !== 0x23 /* # */)
          return false

        const match = state.src.slice(start).match(/^#([\w\u4E00-\u9FA5/]+)/)
        if (!match)
          return false

        if (!silent) {
          const token = state.push('custom_tag', 'span', 0)
          token.attrs = [['class', 'custom-tag']]
          token.content = match[1]
        }

        state.pos += match[0].length
        return true
      })

      mdit.renderer.rules.custom_tag = (tokens, idx) => {
        const content = tokens[idx].content
        return `<span class="custom-tag">${content}</span>`
      }
    },
  })
  // const completions = ref<Array<CompletionSource>>([
  //   (context) => {
  //     console.log(context)
  //     const word = context.matchBefore(/@\w*/)

  //     console.log(word)
  //     if (word === null || (word.from === word.to && context.explicit)) {
  //       return null
  //     }

  //     return {
  //       from: word.from,
  //       options: [
  //         {
  //           label: '@imzbf',
  //           type: 'text',
  //         },
  //       ],
  //     }
  //   },
  // ])
  return {
  // completions,
  }
}

