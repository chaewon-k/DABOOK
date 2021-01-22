const fs = require("fs")

export function readDirectory (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      let temp = []
      temp = readDirectory(dirPath + "/" + file, temp, file)
      arrayOfFiles.push({name: file, children: temp})
    } else {
      arrayOfFiles.push({name: file})
    }
  })
  return arrayOfFiles  
}
export function test3 () {
  console.log('44')
}