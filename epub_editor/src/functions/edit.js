export function findText(inputText, findText) {
  const result = []
  let index = 0
  do {
    index = inputText.indexOf(findText, index);
    if (index == -1) {
      break
    } else {
      result.push(index)
      index += findText.length
    }
  } while (index < inputText.length)
  return result
}

export function replaceText(inputText, replaceText, findText, findIndexArray, replaceAlphabet, replaceAllText) {
  console.log(findIndexArray)
  if (replaceAlphabet && replaceAllText) {
    let regExp = new RegExp(findText, "gi");
    return inputText.replace(regExp, replaceText)
  } else if (replaceAlphabet) {
    let regExp = new RegExp(findText, "i")
    return inputText.replace(regExp, replaceText)
  } else if (replaceAllText) {
    let regExp = new RegExp(findText, "g")
    return inputText.replace(regExp, replaceText)
  } else {
    return inputText.replace(findText, replaceText)
  }
}