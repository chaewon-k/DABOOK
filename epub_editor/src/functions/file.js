const { dialog } = require('electron').remote;
const fs = require("fs");

export function readPath () {
  const options = {
    properties: ['openDirectory']
  };
  const r = dialog.showOpenDialogSync(options);
  if (!r) {
    /*const result = window.confirm('경로를 선택해주세요');
    if (result === true) {
      return readPath();
    } else {
      return false;
    }     */
    return; 
  }
  return r[0];
}

export function readDirectory (dirPath, arrayOfFiles, toc, maxV) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  toc = toc || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      let temp = [];
      temp = readDirectory(dirPath + "/" + file, temp, toc, maxV);
      let temp_array = temp['arrayOfFiles'];
      if (maxV < temp['maxV']) {
        maxV = temp['maxV'];
      }
      arrayOfFiles.push({name: file, children: temp_array});
    } else {
      const extension = file.split('.')[1]
      if (file.split('.')[0] === "toc") {
        toc.push(dirPath + "/" + file);
      } else if (file.slice(0, 7) === "chapter") {
        let a = Number(file.split('.')[0].slice(7));
        if (maxV < a) {
          maxV = a;
        }
      }
      arrayOfFiles.push({name: file, dirPath: dirPath + "/" + file, file: extension});
    }
  });
  return { arrayOfFiles, toc, maxV };
}

export function tocToList (toc, arrayOfContents) {
  const init = toc.indexOf("<navPoint");
  if (init !== -1) {
    let start = toc.indexOf("<text>", init);
    let end = toc.indexOf("</text>", start);
    let temp = '';
    while (start !== -1) {
      temp = toc.slice(start + 6, end);
      arrayOfContents.push({ text: temp });
      start = toc.indexOf("<text>", end);
      end = toc.indexOf("</text>", start);
    }
  }
  return arrayOfContents;
}


export function readCustomStyle (path) {
  let temp = fs.readFileSync(path + '/EPUB/styles/stylesheet.css').toString();
    let prePos = 0;
    let postPos = 0;
    let start = temp.indexOf("user_");
    //let end = temp.indexOf("\n{");
    let styleList = [];
    while (start !== -1) {
      let foundPos = temp.indexOf("user_", prePos);
      let endPos = temp.indexOf("\n{", postPos);
      if (foundPos == -1) break;
      styleList.push(temp.slice(foundPos+5, endPos));
      prePos = foundPos + 1;
      postPos = endPos + 1;
    }
    // console.log(styleList);
    return styleList;
}

export function makeEpubFile (path, title) {
  var zipFolder = require('zip-folder');
  const savePath = readPath();
  if (savePath == undefined) return false;
  const electron = require('electron');
  const { shell } = electron;
  path = path.replace('\\\\', '/');
  console.log(path)
  console.log(savePath)
  console.log(title)
  zipFolder(path, savePath + '/' + title + '.epub', function(err) {
      if(err) {
          console.log('makeEpubFile 실패');
          return false;
      } else {
          shell.openPath(savePath);
          return true;
      }
  });

}

export function addContentOpf (path, maxV) {
  let temp = fs.readFileSync(path + '/EPUB/content.opf').toString();
  let start = temp.indexOf("<!-- 새 챕터 추가 위치1 -->");
  temp = temp.slice(0, start-1).concat(` <item id="chapter${maxV}.xhtml" href="text/chapter${maxV}.xhtml" media-type="application/xhtml+xml"/>\n    `, temp.slice(start, temp.length));
  start = temp.indexOf("<!-- 새 챕터 추가 위치2 -->")
  temp = temp.slice(0, start-1).concat(` <itemref idref="chapter${maxV}.xhtml"/>\n    `, temp.slice(start, temp.length));
  fs.writeFile(path + '/EPUB/content.opf', temp, (err) => {
    if (err) {
      console.log('fs.writeFile 실패');
    }
  });
}

export function addTocNcx (path, name, maxV) {
  let temp = fs.readFileSync(path + '/EPUB/toc.ncx').toString();
  let start = temp.indexOf("<!-- 새 챕터 추가 위치 -->");
  temp = temp.slice(0, start-1).concat(` <navPoint id="navPoint-${maxV}">\n      <navLabel>\n        <text>${name}</text>\n      </navLabel>\n      <content src="text/chapter${maxV}.xhtml" />\n    </navPoint>\n    `, temp.slice(start, temp.length));
  fs.writeFile(path + '/EPUB/toc.ncx', temp, (err) => {
    if (err) {
      console.log('chapter 추가 실패');
    }
  });
}

export function changeTitleAuthor (path, title, author) {
  let temp = fs.readFileSync(path + '/EPUB/toc.ncx').toString();
  let start = temp.indexOf("<docTitle>");
  let end = temp.indexOf("</text>");
  console.log(title, author)
  temp = temp.slice(0, start + 22) + title + temp.slice(end, temp.length);
  fs.writeFile(path + '/EPUB/toc.ncx', temp, (err) => {
    if (err) {
      console.log('목차 변경 실패');
    }
  });
  let temp2 = fs.readFileSync(path + '/EPUB/content.opf').toString();
  let titleStart = temp2.indexOf(`<dc:title id="epub-title-1">`)
  let titleEnd = temp2.indexOf(`</dc:title>`)
  let authorStart = temp2.indexOf(`<dc:creator opf:role="aut">`)
  let authorEnd = temp2.indexOf(`</dc:creator>`)
  let dateStart = temp2.indexOf(`<dc:date id="epub-date">`)
  let dateEnd = temp2.indexOf(`</dc:date>`)
  let now = getTimeStamp();
  temp2 = temp2.slice(0, titleStart + 28) + title + temp2.slice(titleEnd, authorStart + 27) + author + temp2.slice(authorEnd, dateStart + 24) + now + temp2.slice(dateEnd, temp2.length);
  fs.writeFile(path + '/EPUB/content.opf', temp2, (err) => {
    if (err) {
      console.log('content.opf 변경 실패');
    }
  });
}

export function changeHtag (path, num, str, title) {
  str = str.replace('{{ 사용자 입력 제목 }}', title);
  fs.writeFile(path + 'chapter' + num + '.xhtml', str, (err) => {
    if (err) {
      console.log('change Htag 실패');
    }
  });
}

function getTimeStamp() {

  var d = new Date();
  var s =
      leadingZeros(d.getFullYear(), 4) + '-' +
      leadingZeros(d.getMonth() + 1, 2) + '-' +
      leadingZeros(d.getDate(), 2);

  return s;
}

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}
