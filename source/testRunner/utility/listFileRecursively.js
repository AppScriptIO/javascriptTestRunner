import filesystem from 'fs'
import path from 'path'

// returns all files in nested directory.
function listFileRecursively({directory}) {
    let results = []
    let list = filesystem.readdirSync(directory)
    list.forEach(filename => {
        let filepath = path.join(directory, filename)
        let stat = filesystem.statSync(filepath)
        if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({directory: filepath}))
        else results.push({ name: filename, path: filepath }) // create object

    })
    return results
}

// interface for listFieRecusively function that returns an array of file paths, and filters files with the specified extension.
function listFileWithExtension({ directory, extension }) {
    return listFileRecursively({directory})
        .filter(file => {
            // Only keep the .test.js files
            return file.name.substr(-extension.length) === extension;
        })
        .reduce((accumulator, currentValue) => {
            accumulator.push(currentValue.path)
            return accumulator
        }, [])
}

export { listFileRecursively, listFileWithExtension }