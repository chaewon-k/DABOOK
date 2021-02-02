

let arrPoint=-1;
let arr=[];
let arrSize=20;

export function Save (res){
  console.log("isSave");
  if(res>=37&&res<=40) // 방향키
    set('');
  else if(res==9) //tab
    set('');
  else if(res==13) //enter
    set('');
  else if(res==32) //space
    set(' ');
}


export function cut(){
  console.log("cut");
  document.execCommand('cut');
}
export function copy(){
  console.log("copy");
  document.execCommand('copy');
}
export function paste(){
  console.log("paste");
  document.execCommand('paste');
}

export function undo(){ 
  console.log("undo");
  if (arrPoint == 0) {
    return arr[arrPoint];
  }
  arrPoint-=1;
  var area=document.getElementById("area").value;
  area=arr[arrPoint];
  console.log(arrPoint+" "+arr[arrPoint]);
  return area;
}

export function redo(){
  console.log("redo");
  var area=document.getElementById("area").value;
  if (arrPoint == arr.length-1){
    return arr[arrPoint];
  }
  arrPoint+=1;
  area=arr[arrPoint];
  console.log(arrPoint+" "+arr[arrPoint]);
  return area;
}

export function set(res){
  console.log("Set");
  let data= document.getElementById("area").value;
  let point=document.getElementById("area").selectionStart;
  data=data.substring(0,point)+res+data.substring(point);
  if(arrPoint==arrSize){
    arrPoint-=1;
    arr.shift();
  }
  arrPoint+=1;
  arr[arrPoint]=data;
  console.log(arr);
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
  console.log(findIndexArray);
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