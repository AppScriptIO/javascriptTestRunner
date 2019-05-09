// Append indentation for all logs in this subprocess.
export function consoleLogOverwrite() {
  console.log = new Proxy(console.log, {
    apply(target, thisArg, argumentsList) {
      const blueColor = `\u001b[44m`,
        resetColor = `\u001b[0m` // https://misc.flogisoft.com/bash/tip_colors_and_formatting
      const prefix = `${blueColor}  ${resetColor}`
      process.stdout.write(prefix)
      return Reflect.apply(target, thisArg, argumentsList)
    },
  })
}
