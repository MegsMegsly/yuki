const { promises: { readdir, stat } } = require('fs')
const { resolve } = require('path')

module.exports = class FileUtils {
  static async requireDirectory (directory, success, error, recursive = true) {
    const files = await readdir(directory)
    const filesObject = {}

    return Promise.all(files.map(async (file) => {
      const path = resolve(directory, file)

      if (file.endsWith('.js')) {
        try {
          const required = require(path)
          const filename = file.match(/^\w+/)[0]

          if (success) {
            await success(required, filename)
          }

          filesObject[filename] = {
            required,
            filename
          }

          return required
        } catch (_error) {
          error(_error)
        }
      } else if (recursive) {
        const isDirectory = await stat(path).then((file) => file.isDirectory())

        if (isDirectory) {
          return FileUtils.requireDirectory(path, success, error)
        }
      }
    }))
      .then(() => filesObject)
      .catch(console.error)
  }
}
