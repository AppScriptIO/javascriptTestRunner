import filesystem from 'fs'
import path from 'path'

// returns all files in nested directory.
let listFileRecursively = ({directory}) => {
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

export { listFileRecursively }