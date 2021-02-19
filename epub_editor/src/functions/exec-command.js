export function addStyle (tag, val) {
    let HTMLEDITOR = document.getElementById("area");
    let editorObj = HTMLEDITOR.innerHTML;
    editorObj.execCommand(tag, false, val);
    return editorObj;
}