export function alignText (val) {
  const area = document.getElementById("area");
  let start = area.selectionStart;
  // span 아닌 다른 태그를 여는 <를 찾을 때까지 실행. <> 안에서 버튼을 누를 때도 적용시키기 위해 >가 아닌 <를 찾는다.
  while (area.value[start] !== '<' || area.value.slice(start, start + 2) === '</' || area.value.slice(start, start + 2) === '<s') {
    if (area.value[start] === '\n') {
      return area.value;
    }
    start--;
  }
  // 찾으면 일단 닫는 태그를 찾고 
  const end = area.value.indexOf('>', start);
  // 1. 이미 적용된 text-align이 있으면
  const tagArea = area.value.slice(start, end)
  const alignStart = tagArea.indexOf('text-align: ')
  const alignEnd = tagArea.indexOf(';', alignStart)
  if (alignStart !== -1) {
    // 1-1. val 이면
    if (tagArea.slice(alignStart + 12, alignEnd) === val) {
      // 다른 style 은 제외하고 text-align: center; 만 제외하기 위해서 아래와 같이 복잡한 코드가 사용되었다.
      // 혹시나 text-align 말고는 style로 들어오는게 없다면 나중에 간단하게 바꾸자.
      area.value = area.value.slice(0, start) + tagArea.slice(0, alignStart) + tagArea.slice(alignEnd + 1, tagArea.length) + area.value.slice(end, area.value.length);
      // 1-2. val이 아니면
    } else {
      area.value = area.value.slice(0, start) + tagArea.slice(0, alignStart + 12) + val + tagArea.slice(alignEnd, tagArea.length) + area.value.slice(end, area.value.length);
    }
  } else if (alignStart === -1) {  // 2. 없으면
    const styleStart = tagArea.indexOf('style')
    const styleEnd = tagArea.indexOf('"', styleStart + 7)
    if (styleStart !== -1) {  // 2-1. style 속성이 있으면
      // console.log(tagArea.slice(styleStart, styleEnd))
      area.value = area.value.slice(0, start) + tagArea.slice(0, styleEnd) + `text-align: ${val};` + tagArea.slice(styleEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (tagArea.slice(0, 5) !== '<body') {  // 2-2. style 속성이 없으면, body 태그 제외하고
      area.value = area.value.slice(0, end) + ` style="text-align: ${val};"` + area.value.slice(end, area.value.length);
    }
  }  
  return area.value;
}


export function makeCustomStyle (val, path) {
  const fs = require("fs");
  let temp = fs.readFileSync(path + '/EPUB/styles/stylesheet.css').toString();
  let range = '', font = '', backgroundColor = '', fontColor = '';
  if (val.range === '왼쪽 정렬') {
    range = ` text-align: left;\n`;
  }
  else if (val.range == '오른쪽 정렬') {
    range = ` text-align: right;\n`;
  }
  else if (val.range == '가운데 정렬') {
    range = ` text-align: center;\n`;
  }
  else {
    range = ` text-align: justify;\n`;
  }

  if (val.font != '') {
    font = ` font-family:${val.font};\n`;
  }

  if (val.backgroundColor != '') {
    backgroundColor = ` background-color:${val.backgroundColor};\n`;
  }

  if (val.fontColor != '') {
    fontColor = ` color:${val.fontColor};\n`;
  }

  let cssStr = `.user_${val.title}
{ 
${fontColor}${backgroundColor}${range}${font}
}\n\n`;
  // console.log(cssStr);

  fs.writeFile(path + '/EPUB/styles/stylesheet.css', temp + cssStr, (err) => {
    if (err) {
      console.log('fs.writeFile 실패');
    }
  });

}

export function attachCustomStyleTag (title) {
  const area = document.getElementById("area");
  let preStr = `\n  <div class ="user_${title}">\n    `;
  let postStr = `\n  </div>`;
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(preStr + selected + postStr);
  }
  return area.value;
}

export function setFontColor (val) {
  const area = document.getElementById("area");
  const start = area.selectionStart;  // 드래그 한 단어 시작
  const end = area.selectionEnd;  // 드래그 한 단어 끝
  if (start !== end) {  // 드래그 해서 하면 해당 부분에 span 태그를 달아준다.
    // 이미 색이 적용된 단어면 <span style="color: ${}"> 의 색깔만 바꿔주면 됨
    area.value = area.value.slice(0, start) + `<span style="color: ${val};">` + area.value.slice(start, end) + '</span>' + area.value.slice(end, area.value.length)
  } else { // 드래그가 아니라면, 앞으로 가서 span이나 p나 h 등 태그를 찾아서 거기다가 적용시켜준다.

  }
  return area.value
}

export function setBackgroundColor (val) {
  const area = document.getElementById("area");
  const start = area.selectionStart;  // 드래그 한 단어 시작
  const end = area.selectionEnd;  // 드래그 한 단어 끝
  if (start !== end) {  // 한 군데 클릭하고 실행 못함
    // 이미 색이 적용된 단어면 <span style="color: ${}"> 의 색깔만 바꿔주면 됨
    area.value = area.value.slice(0, start) + `<span style="background-color: ${val};">` + area.value.slice(start, end) + '</span>' + area.value.slice(end, area.value.length)
  }
  return area.value
}

export function setFont (val) {
  const area = document.getElementById("area");
  let start = area.selectionStart;
  while (area.value[start] !== '<' || area.value.slice(start, start + 2) === '</' || area.value.slice(start, start + 2) === '<s') {
    if (area.value[start] === '\n') {
      return area.value;
    }
    start--;
  }
  const end = area.value.indexOf('>', start);
  const tagArea = area.value.slice(start, end)
  const fontStart = tagArea.indexOf('font-family: ')
  const fontEnd = tagArea.indexOf(';', fontStart)
  if (fontStart !== -1) {
    if (tagArea.slice(fontStart + 13, fontEnd) === val) {
      area.value = area.value.slice(0, start) + tagArea.slice(0, fontStart) + tagArea.slice(fontEnd + 1, tagArea.length) + area.value.slice(end, area.value.length);
    } else {
      area.value = area.value.slice(0, start) + tagArea.slice(0, fontStart + 13) + val + tagArea.slice(fontEnd, tagArea.length) + area.value.slice(end, area.value.length);
    }
  } else if (fontStart === -1) {
    const styleStart = tagArea.indexOf('style')
    const styleEnd = tagArea.indexOf('"', styleStart + 7)
    if (styleStart !== -1) {
      area.value = area.value.slice(0, start) + tagArea.slice(0, styleEnd) + ` font-family: ${val};` + tagArea.slice(styleEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (tagArea.slice(0, 5) !== '<body') {
      area.value = area.value.slice(0, end) + ` style="font-family: ${val};"` + area.value.slice(end, area.value.length);
    }
  }
  return area.value;
}

export function fontSize(val) {
  const area = document.getElementById("area");
  let start = area.selectionStart;
  while (area.value[start] !== '<' || area.value.slice(start, start + 2) === '</') {
    if (area.value[start] === '\n') {
      return area.value;
    }
    start--;
  }
  const end = area.value.indexOf('>', start);
  const tagArea = area.value.slice(start, end);
  const sizeStart = tagArea.indexOf('font-size: ');
  const sizeEnd = tagArea.indexOf(';', sizeStart);
  if (sizeStart !== -1) {
    const size = tagArea.slice(sizeStart + 11, sizeEnd)
    if (size === 'medium') {
      let newSize = (val === 'down' ? 'small' : 'large')
      area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + newSize + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (size === 'small') {
      let newSize = (val === 'down' ? 'x-small' : 'medium')
      area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + newSize + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (size === 'x-small') {
      let newSize = (val === 'down' ? 'xx-small' : 'small')
      area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + newSize + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (size === 'xx-small') {
      if (val === 'up') {
        area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + 'x-small' + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
      }
    } else if (size === 'large') {
      let newSize = (val === 'down' ? 'medium' : 'x-large')
      area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + newSize + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (size === 'x-large') {
      let newSize = (val === 'down' ? 'large' : 'xx-large')
      area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + newSize + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (size === 'xx-large') {
      if (val === 'down') {
        area.value = area.value.slice(0, start) + tagArea.slice(0, sizeStart + 11) + 'x-large' + tagArea.slice(sizeEnd, tagArea.length) + area.value.slice(end, area.value.length);
      }
    }
  } else if (sizeStart === -1) {
    const styleStart = tagArea.indexOf('style')
    const styleEnd = tagArea.indexOf('"', styleStart + 7)
    let newSize = (val === 'down' ? 'small' : 'large')
    if (styleStart !== -1) {
      area.value = area.value.slice(0, start) + tagArea.slice(0, styleEnd) + ` font-size: ${newSize};` + tagArea.slice(styleEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (tagArea.slice(0, 5) !== '<body') {
      area.value = area.value.slice(0, end) + ` style="font-size: ${newSize};"` + area.value.slice(end, area.value.length);
    }
  }
  return area.value;
}

export function inTag() {
  const area = document.getElementById("area");
  let current = area.selectionStart;
  let preBracket = area.value.indexOf('<', current);
  let postBracket = area.value.indexOf('>', current);
  // console.log(preBracket, postBracket);
  if (preBracket > postBracket) {
    return false;
  } 
  return true;

}