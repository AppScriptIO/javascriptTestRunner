import filesystem from 'fs'
import path from 'path'

let listFileRecursively = ({directory}) => {
    let results = []
    let list = filesystem.readdirSync(directory)
    list.forEach(filename => {
        let filepath = path.join(directory, filename)
        let stat = filesystem.statSync(filepath)
        if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({directory: filepath}))
        else results.push({ name: filename, path: filepath })
    })
    return results
}

export { listFileRecursively }