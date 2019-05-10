// Append indentation for all logs in this subprocess.
export function consoleLogOverwrite() {
  const color = [`\u001b[44m`, '\u001B[42m', '\u001B[35m', '\u001B[36m', '\u001B[37m', '\u001B[41m'],
    resetColor = `\u001b[0m` // https://stackoverflow.com/questions/5762491/how-to-print-color-in-console-using-system-out-println/27788295
  let randomColorIndex = Math.floor(Math.random() * color.length) // choose random colour
  console.log = new Proxy(console.log, {
    apply(target, thisArg, argumentsList) {
      const prefix = `${color[randomColorIndex]}  ${resetColor}`
      process.stdout.write(prefix)
      return Reflect.apply(target, thisArg, argumentsList)
    },
  })
}
