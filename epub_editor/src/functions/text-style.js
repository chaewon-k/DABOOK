const { dialog } = require('electron').remote
//const fs = require('fs')

export function pTag() {
  var area = document.getElementById("area");
  var lines = area.value.split("\n");
  var resultString  = "";
  for (var i = 0; i < lines.length; i++) {
    resultString += "<p>" + lines[i] + "</p>\n";
  }
  return resultString;
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
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<h${index}>${selected}</h${index}>`);
  return area.value;
}

export function italicTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<em>${selected}</em>`);
  return area.value;
}

export function boldTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<strong>${selected}</strong>`);
  return area.value;
}

export function underlineTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<u>${selected}</u>`);
  return area.value;
}

export function mediumlineTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<del>${selected}</del>`);
  return area.value;
}

export function subscriptTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<sub>${selected}</sub>`);
  return area.value;
}

export function superscriptTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<sup>${selected}</sup>`);
  return area.value;
}

export function blockquoteTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<blockquote>\n<p>${selected}</p>\n</blockquote>`);
  return area.value;
}

export function citeTag() {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<cite>${selected}</cite>`);
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
  if (!r) return
  console.log(r.[0])

  var resultString = `<img src="${r.[0]}" >`;
  var area = document.getElementById("area");
  area.value = area.value.slice(0,  area.selectionStart) + resultString + area.value.slice(area.selectionStart);
  return area.value;
}

export function linkTag(link) {
  var area = document.getElementById("area");
  if (area.selectionStart === area.selectionEnd) {
    return;
  }
  let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  area.setRangeText(`<a href="${link}" >${selected}</a>`);
  return area.value;
}

export function tableTag() {
  // var area = document.getElementById("area");
  // if (area.selectionStart === area.selectionEnd) {
  //   return;
  // }
  // let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  // area.setRangeText(`<blackquote>${selected}</blackquote>`);
  // return area.value;
}

export function listTag() {
  // var area = document.getElementById("area");
  // if (area.selectionStart === area.selectionEnd) {
  //   return;
  // }
  // let selected = area.value.slice(area.selectionStart, area.selectionEnd);
  // area.setRangeText(`<blackquote>${selected}</blackquote>`);
  // return area.value;
}