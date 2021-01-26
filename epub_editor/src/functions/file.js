const fs = require("fs")

export function readDirectory (dirPath, arrayOfFiles, toc) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  toc = toc || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      let temp = []
      temp = readDirectory(dirPath + "/" + file, temp, toc)['arrayOfFiles']
      arrayOfFiles.push({name: file, children: temp})
    } else {
      if (file.split('.')[0] === "toc") {
        toc.push(dirPath + "/" + file)
      }
      arrayOfFiles.push({name: file, dirPath: dirPath + "/" + file})
    }
  })
  return { arrayOfFiles, toc }
}

export function tocToList (toc, arrayOfContents) {
  const init = toc.indexOf("<navPoint")
  let start = toc.indexOf("<text>", init)
  let end = toc.indexOf("</text>", start)
  let temp = ''
  while (start !== -1) {
    temp = toc.slice(start + 6, end)
    arrayOfContents.push({ text: temp })
    start = toc.indexOf("<text>", end)
    end = toc.indexOf("</text>", start)
  }
  arrayOfContents.push(toc)
  return arrayOfContents
}

export function makeEpubFile (path, title) {
  var zipFolder = require('zip-folder');
  const { dialog } = require('electron').remote;
  const electron = require('electron');
  const { shell } = electron;
  const options = {
        properties: ['openDirectory']
      }

  const r = dialog.showOpenDialogSync(options)
  if (!r) return
  path = path.replace('\\\\', '/');

  zipFolder(path, r[0] + '/' + title + '.epub', function(err) {
      if(err) {
          console.log('oh no!', err);
      } else {
          console.log(r[0] + '/' + title + '.epub');
          console.log('EXCELLENT');
          alert('파일이 저장되었습니다!');
          shell.openPath(r[0]);
      }
  });

}