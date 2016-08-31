
const randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"

export default function randomId(length=10){
  let str = ""
  for(var i=0; i<length; i++){
    str += randomLetters[Math.floor(Math.random()*randomLetters.length)]
  }
  return str
}