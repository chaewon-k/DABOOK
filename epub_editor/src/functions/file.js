const fs = require("fs")

export function readDirectory (dirPath, arrayOfFiles, toc, maxV) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  toc = toc || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      let temp = []
      temp = readDirectory(dirPath + "/" + file, temp, toc, maxV)
      let temp_array = temp['arrayOfFiles']
      if (maxV < temp['maxV']) {
        maxV = temp['maxV']
      }
      arrayOfFiles.push({name: file, children: temp_array})
    } else {
      if (file.split('.')[0] === "toc") {
        toc.push(dirPath + "/" + file)
      } else if (file.slice(0, 7) === "chapter") {
        let a = Number(file.split('.')[0].slice(7))
        if (maxV < a) {
          maxV = a
        }
      }
      arrayOfFiles.push({name: file, dirPath: dirPath + "/" + file})
    }
  })
  return { arrayOfFiles, toc, maxV }
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

export function addContentOpf (path, maxV) {
  let temp = fs.readFileSync(path + '/EPUB/content.opf').toString()
  let start = temp.indexOf("<!-- 새 챕터 추가 위치1 -->")
  temp = temp.slice(0, start-1).concat(` <item id="chapter${maxV}.xhtml" href="text/chapter${maxV}.xhtml" media-type="application/xhtml+xml"/>\n    `, temp.slice(start, temp.length))
  start = temp.indexOf("<!-- 새 챕터 추가 위치2 -->")
  temp = temp.slice(0, start-1).concat(` <itemref idref="chapter${maxV}.xhtml"/>\n    `, temp.slice(start, temp.length))
  fs.writeFile(path + '/EPUB/content.opf', temp, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

export function addTocNcx (path, name, maxV) {
  let temp = fs.readFileSync(path + '/EPUB/toc.ncx').toString()
  let start = temp.indexOf("<!-- 새 챕터 추가 위치 -->")
  temp = temp.slice(0, start-1).concat(` <navPoint id="navPoint-${maxV}">\n      <navLabel>\n        <text>${name}</text>\n      </navLabel>\n      <content src="text/chapter${maxV}.xhtml" />\n    </navPoint>\n    `, temp.slice(start, temp.length))
  fs.writeFile(path + '/EPUB/toc.ncx', temp, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

export function changeHtag (path, num, str, title) {
  // let start = temp.indexOf("{{ 사용자 입력 제목 }}")
  str = str.replace('{{ 사용자 입력 제목 }}', title)
  fs.writeFile(path + 'chapter' + num + '.xhtml', str, (err) => {
    if (err) {
      console.log(err)
    }
  })
}