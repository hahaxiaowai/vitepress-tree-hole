import { copy } from 'fs-extra'
import fg from 'fast-glob'

function toDest(file) {
  return file.replace(/^theme\//, 'dist/theme/')
}

fg.sync('theme/**').forEach((file) => {
  if (/(\.ts|tsconfig\.json)$/.test(file)) return
  copy(file, toDest(file))
})
