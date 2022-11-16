export function isNumber(str: String | Number): Boolean {
  return str && Number.isNaN(parseInt(str.toString()));
}