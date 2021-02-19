const {clipboard} =require('electron');
let arrPoint=-1;
let arr=[];
let arrSize=20;
let direction=0;
let maxStack=0;

export function Save (res) {
  //if(res>=37&&res<=40) // 방향키
  // set('');
  if (res == 9) //tab
    set('');
  else if (res == 13) //enter
    set('');
  else if (res == 32) //space
    set(' ');
}

export function cut () {
  set('');
  let area=document.getElementById("area");
  let start = area.selectionStart;
  let end=area.selectionEnd;
  let content=area.value.slice(start,end);
  area.value=area.value.slice(0,start)+area.value.slice(end);
  clipboard.writeText(content,"save");
  set('');
  return area.value;
}

export function copy () {
  console.log("copy");
  let area=document.getElementById("area");
  let start = area.selectionStart;
  let end=area.selectionEnd;
  let content=area.value.slice(start,end);
  clipboard.writeText(content,"save");
}

export function paste () {
  // console.log("paste");
  set('');
  //document.execCommand('paste');
  let area=document.getElementById("area");
  let start=area.selectionStart;
  area.value=area.value.slice(0,start)+clipboard.readText('save')+area.value.slice(start);
  console.log(clipboard.readText('save'));
  set('');
  return area.value;
}
export function reset(){
  console.log("reset");
  arr.length=0;
  arrPoint=-1;
  maxStack=0;
  direction=0;
}
export function undo () { 
  if (maxStack == arrPoint)
    this.set('');
  direction = 1;
  if (arr[arrPoint + 1] === undefined)
    this.set('');
  if (arrPoint == 0) {
    return arr[arrPoint];
  }
  arrPoint -= 1;
  direction = 1;
  return arr[arrPoint];
}

export function redo () {
  direction = 1;
  if (arrPoint == arr.length - 1){
    return arr[arrPoint];
  }
  if(arrPoint == maxStack){
    return arr[arrPoint];
  }
  arrPoint += 1;
  return arr[arrPoint];
}

export function set (res) {
  if (direction == 1) {
    maxStack = arrPoint;
    direction = 0;
  }
  // console.log("Set");
  let data = document.getElementById("area").value;
  let point = document.getElementById("area").selectionStart;
  data = data.substring(0,point) + res + data.substring(point);
  if (arr[arrPoint] == data)
    return;
  if (arrPoint == arrSize) {
    arrPoint -= 1;
    arr.shift();
  }
  arrPoint += 1;
  arr[arrPoint] = data;
  maxStack = maxStack + 1;
}

export function findText (inputText, findText) {
  const result = [];
  let index = 0;
  do {
    index = inputText.indexOf(findText, index);
    if (index == -1) {
      break;
    } else {
      result.push(index);
      index += findText.length;
    }
  } while (index < inputText.length)
  return result;
}

export function replaceText (inputText, replaceText, findText, findIndexArray, replaceAlphabet, replaceAllText) {
  // console.log(findIndexArray);
  if (replaceAlphabet && replaceAllText) {
    let regExp = new RegExp(findText, "gi");
    return inputText.replace(regExp, replaceText);
  } else if (replaceAlphabet) {
    let regExp = new RegExp(findText, "i");
    return inputText.replace(regExp, replaceText);
  } else if (replaceAllText) {
    let regExp = new RegExp(findText, "g");
    return inputText.replace(regExp, replaceText);
  } else {
    return inputText.replace(findText, replaceText);
  }
}

export function setCursor (index, length) {
  var area = document.getElementById("area");
  area.selectionStart = index;
  area.selectionEnd = index + length;
  area.focus();
  return area.value;
}