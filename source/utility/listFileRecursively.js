import filesystem from 'fs'
import path from 'path'

// returns all files in nested directory.
function listFileRecursively({ directory, ignoreRegex = [new RegExp(/node_modules/), new RegExp(/.git/)] }) {
  let results = []
  let list = filesystem.readdirSync(directory)
  list.forEach(filename => {
    let filepath = path.join(directory, filename)
    // check if the path should be ignored
    let shouldIgnore = ignoreRegex.some(regex => {
      return filepath.match(regex)
    })
    if (shouldIgnore) return
    let stat
    try {
      stat = filesystem.statSync(filepath)
    } catch (error) {
      return // skip iteration on failed seaches.
    }
    if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({ directory: filepath }))
    else results.push({ name: filename, path: filepath }) // create object
  })
  return results
}

// interface for listFieRecusively function that returns an array of file paths, and filters files with the specified extension.
function listFileWithExtension({ directory, extension = [], ignoreRegex = [] }) {
  if (!Array.isArray(extension)) extension = [extension] // support array or string
  return listFileRecursively({ directory })
    .filter(file => {
      let c1 = extension.some(suffix => file.name.substr(-suffix.length) === suffix) // Only keep the files with the extension
      let c2 = ignoreRegex.some(regex => file.path.match(regex)) // filter files matching ignore regex
      return c1 && !c2
    })
    .reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.path)
      return accumulator
    }, [])
}

export { listFileRecursively, listFileWithExtension }
