export function alignText (val) {
  const area = document.getElementById("area");
  let start = area.selectionStart;
  // 태그 여는 <를 찾을 때까지 실행. <> 안에서 버튼을 누를 때도 적용시키기 위해 >가 아닌 <를 찾는다.
  while (area.value[start] !== '<' || area.value.slice(start, start + 2) === '</') {
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
      area.value = area.value.slice(0, start) + tagArea.slice(0, styleStart + 7) + `text-align: ${val};` + tagArea.slice(styleEnd, tagArea.length) + area.value.slice(end, area.value.length);
    } else if (tagArea.slice(0, 5) !== '<body') {  // 2-2. style 속성이 없으면, body 태그 제외하고
      area.value = area.value.slice(0, end) + ` style="text-align: ${val};"` + area.value.slice(end, area.value.length);
    }
  }  
  return area.value;
}

export function setColor (val) {
  console.log(val)
}

export function makeCustomStyle (val, path) {
  console.log(path);
  const fs = require("fs");
  let temp = fs.readFileSync(path + '/EPUB/styles/stylesheet.css').toString();
  console.log(temp);
  let range = '', font = '', backgroundColor = '', fontColor = '';
  if (val.range === '왼쪽 정렬') {
    range = ` text-align: left;\n`;
  }
  else if (val.range == '오른쪽 정렬') {
    range = ` text-align: right;\n`;
  }
  else if (val.range == '가운데 정렬'){
    range = ` text-align: center;\n`;
  }

  if (val.font != '') {
    font = `  font-family:${val.font};\n`;
  }

  if (val.backgroundColor != '') {
    backgroundColor = ` backgroundColor:${val.backgroundColor};\n`;
  }

  if (val.fontColor != '') {
    fontColor = ` color:${val.fontColor};`;
  }

  let cssStr = `.user_${val.title}
{ 
${fontColor}${backgroundColor}${range}${font}
}\n\n`;
  console.log(cssStr);

  fs.writeFile(path + '/EPUB/styles/stylesheet.css', cssStr, (err) => {
    if (err) {
      console.log(err);
    }
  });

  const area = document.getElementById("area");
  let preStr = `<div class ="user_${val.title}">\n`;
  let postStr = `\n</div>`;
  if (area.selectionStart != area.selectionEnd) {
    let selected = area.value.slice(area.selectionStart, area.selectionEnd);
    area.setRangeText(preStr + selected + postStr);
  }
  return area.value;

}
