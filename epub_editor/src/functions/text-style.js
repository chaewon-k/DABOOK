const { dialog } = require('electron').remote
//const fs = require('fs')

export function pTag() {
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + "<p></p>" + area.value.slice(area.selectionStart);
  return area.value;
}

export function enterTag() {
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + "<br>\n" + area.value.slice(area.selectionStart);
  return area.value;
}

export function lineTag() {
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + "<hr>\n" + area.value.slice(area.selectionStart);
  return area.value;
}

export function hTag(index) {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<h${index}>${selected}</h${index}>`);
  }
  return area.value;
}

export function italicTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<em>${selected}</em>`);
  }
  return area.value;
}

export function boldTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<strong>${selected}</strong>`);
  }
  return area.value;
}

export function underlineTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<u>${selected}</u>`);
  }
  return area.value;
}

export function mediumlineTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<del>${selected}</del>`);
  }
  return area.value;
}

export function subscriptTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<sub>${selected}</sub>`);
  }
  return area.value;
}

export function superscriptTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<sup>${selected}</sup>`);
  }
  return area.value;
}

export function blockquoteTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<blockquote>\n<p>${selected}</p>\n</blockquote>`);
  }
  return area.value;
}

export function citeTag() {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<cite>${selected}</cite>`);
  }
  return area.value;
}

export function imageTag() {
  const options = {
    filters: [
      {
        name: 'Image files',
        extensions: ['jpg', 'png']
      }
    ]
  }
  const r = dialog.showOpenDialogSync(options)
  if (!r) return area.value;
  console.log(r[0])

  var resultString = `<img src="${r[0]}" >`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function linkTag(link) {
  var area = document.getElementById("area");
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(`<a href="${link}" >${selected}</a>`);
  }
  return area.value;
}

export function tableTag(row, col) {
  var resultString = `<table>
  <caption>표 이름</caption>
  <thead>
  <tr>\n`;
  for (let i = 0; i < col; i++) {
    resultString += `   <th>제목</th>\n`;
  }
  resultString += `   </tr>
  </thead>
  <tbody>\n`;
  for (let i = 0; i < row; i++) {
    resultString += `   <tr>\n`;
    for (let j = 0; j < col; j++) {
      resultString += `     <td>data</td>\n`;
      
    }
    resultString += `   </tr>\n`;
  }
  
    resultString += ` </tbody>
</table>
<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td {
    padding: 15px;
    text-align: left;
  }
</style>`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function unorderedListTag() {
  var resultString = `<ul>
    <li>list1</li>
    <li>list2</li>
    <li>list3</li>
</ul>`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function orderedListTag() {
  var resultString = `<ol>
    <li>list1</li>
    <li>list2</li>
    <li>list3</li>
</ol>`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}