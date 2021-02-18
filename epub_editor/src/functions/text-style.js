import * as file from '@/functions/file.js'

const { dialog } = require('electron').remote;
const fse = require('fs-extra');
const fs = require("fs");

export function pTag () {
  var area = document.getElementById("area");
  let pos = 0, remember = area.selectionStart;
  let preTag = area.value.indexOf('<p>', remember);
  let postTag = area.value.indexOf('</p>', remember);
  // console.log(preTag, postTag);
  if (preTag < postTag && preTag != -1) {
    remember = area.selectionStart;
    area.value = area.value.slice(0,  area.selectionStart) + "\n\n    <p></p>" + area.value.slice(area.selectionEnd);
    // console.log(area.selectionStart, area.selectionEnd);
    area.selectionEnd = remember + 9;
    return area.value;
  }

  // p 태그가 있을 때, 가장 가까운 </p> 뒤에 커서 위치 후, 새 <p></p> 삽입
  while(area.value.indexOf('</p>', pos) != -1) {
    if (area.value.indexOf('</p>', pos) >= area.selectionStart) {
      area.selectionStart = area.value.indexOf('</p>', pos) + 4;
      remember = area.selectionStart;
      area.value = area.value.slice(0,  area.selectionStart) + "\n\n    <p></p>" + area.value.slice(area.selectionEnd);
      // console.log(area.selectionStart, area.selectionEnd);
      area.selectionEnd = remember + 9;
      return area.value;
    }
    pos = area.selectionStart;
  }

  // p 태그가 없을 때, 새로 생성
  if (area.value.indexOf('</p>', pos) == -1) {
    remember = area.selectionStart;
    area.value = area.value.slice(0,  area.selectionStart) + "\n\n    <p></p>" + area.value.slice(area.selectionEnd);
    // console.log(area.selectionStart, area.selectionEnd);
    area.selectionEnd = remember + 9;
  }

  return area.value;
}

export function enterTag () {
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + "<br />\n" + area.value.slice(area.selectionStart);
  return area.value;
}

export function lineTag () {
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + "<hr />\n" + area.value.slice(area.selectionStart);
  return area.value;
}

export function hTag (index) {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<h${index}>${selected}</h${index}>`);
  }
  return area.value;
}

export function italicTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<em>${selected}</em>`);
  }
  return area.value;
}

export function boldTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<strong>${selected}</strong>`);
  }
  return area.value;
}

export function underlineTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<u>${selected}</u>`);
  }
  return area.value;
}

export function mediumlineTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<del>${selected}</del>`);
  }
  return area.value;
}

export function subscriptTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<sub>${selected}</sub>`);
  }
  return area.value;
}

export function superscriptTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<sup>${selected}</sup>`);
  }
  return area.value;
}

export function blockquoteTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<blockquote>\n<p>${selected}</p>\n</blockquote>`);
  }
  return area.value;
}

export function citeTag () {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<cite>${selected}</cite>`);
  }
  return area.value;
}

export function imageTag (location, bookName, email) {
  var area = document.getElementById("area");
  const options = {
    filters: [
      {
        name: 'Image files',
        extensions: ['jpg', 'png', 'gif']
      }
    ]
  };
  const r = dialog.showOpenDialogSync(options);
  if (!r) return area.value //이미지 태그 추가 dialog 열었다가 취소 눌러서 껐을 때
  const temp = r[0].split('\\');
  const fileName = temp[temp.length - 1];
  const imgLocation = location + '/EPUB/images/' + fileName;
  const extension = fileName.split('.')[1]  // 확장자
  fse.copySync(r[0], imgLocation);  // 파일 복사
  let temp2 = fs.readFileSync(location + '/EPUB/content.opf').toString();
  let start = temp2.indexOf("<!-- 이미지 파일 추가 위치 -->");
  temp2 = temp2.slice(0, start-1).concat(` <item id="${fileName}" href="images/${fileName}" media-type="image/${extension}" />\n    `, temp2.slice(start, temp2.length));
  fs.writeFileSync(location + '/EPUB/content.opf', temp2, (err) => {
    if (err) {
      console.log('해당 디렉토리에 이미지 저장 실패');
    }
  });
  var resultString = `<img style="width: 100%;" src="../images/${fileName}" />`;
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  file.uploadFile(imgLocation, '/EPUB/images', bookName, email);
  file.uploadFile(location + '/EPUB/content.opf', '/EPUB', bookName, email);
  return area.value;
}

export function linkTag (link) {
  var area = document.getElementById("area");
  link = link.trim();
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    if (link.slice(0,5) === 'https') {
      area.setRangeText(`<a href="${link}" >${selected}</a>`);
    }
    else {
      area.setRangeText(`<a href="https://${link}" >${selected}</a>`);
    }
  }
  return area.value;
}

export function tableTag (row, col) {
  var resultString = `\n    <table>
     <caption>표 이름</caption>
     <thead>
      <tr>\n`;
  for (let i = 0; i < col; i++) {
    resultString += `       <th>제목</th>\n`;
  }
  resultString += `     </tr>
    </thead>
    <tbody>\n`;
  for (let i = 0; i < row; i++) {
    resultString += `     <tr>\n`;
    for (let j = 0; j < col; j++) {
      resultString += `      <td>data</td>\n`;
    }
    resultString += `     </tr>\n`;
  }
    resultString += `    </tbody>
   </table>`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function unorderedListTag () {
  var resultString = `<ul>
    <li>list1</li>
    <li>list2</li>
    <li>list3</li>
</ul>`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function orderedListTag () {
  var resultString = `<ol>
    <li>list1</li>
    <li>list2</li>
    <li>list3</li>
</ol>`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function convertImageTag (temp, path) {
  let str = 'src="file:///' + path + '/EPUB/images/';
  temp = temp.replaceAll('src="../images/', str);
  return temp;
}

export function convertStyleTag (temp, path) {
  path = path.replaceAll('\\', '/');
  let str = "url('" + path + '/EPUB/fonts/';
  temp = temp.replaceAll("url('../fonts/", str);
  return temp;
}

String.prototype.replaceAll = function(org, dest) {
  return this.split(org).join(dest);
}