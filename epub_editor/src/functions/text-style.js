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
  area.setRangeText(`<i>${selected}</i>`);
  return area.value;
}
