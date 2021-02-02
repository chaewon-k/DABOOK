

let arrPoint=-1;
let arr=[];
let arrSize=20;


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
    return;
  }
  arrPoint-=1;
  var area=document.getElementById("area").value;
  area=arr[arrPoint];
  console.log(arrPoint+" "+arr[arrPoint]);
  return area;
}

export function redo(){
  console.log("redo");
  if (arrPoint == arrSize)
    return;
  arrPoint+=1;
  var area=document.getElementById("area").value;
  area=arr[arrPoint];
  console.log(arrPoint+" "+arr[arrPoint]);
  return area;
}

export function set(){
  console.log("Set");
  setTimeout(() => console.log("after"), 500)
  var area=document.getElementById("area").value;
  if(arr[arrPoint]!=area){
    if(arrPoint==arrSize){
      arrPoint-=1;
      arr.shift();
    }
    arrPoint+=1;
    arr.push(area);
    console.log("ArrPoint : "+ arrPoint+" "+arr[arrPoint]);
    console.log(arr);
  }
}


export function inputTextSet() {
  //this.SET_EDITINGTEXT(this.editingTextArr[this.editingTextArrPoint]);
  //eventBus.$emit('set');
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