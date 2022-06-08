function count(num = 0) {
  console.log(num);
  if (num === 5) {
    return;
  }
  count(++num);
}

let a = 10; 

let x = ++a

var langs = ['jabva']

langs.length = 0; 

langs.push('go')

const ali = [1, 2, 3]; 

ali[-1] = 1; 

console.log(ali)

let mike: any = { y: 1}

mike.x = mike; 

//JSON stringify will wail here as it does not support circula referencae JSON.stringify(mike)
/* 
let arr = [1, "Turin", { x: 3}]
//this loop will just print first value in the array
//as arr.splice(i, 1) will modify the arr and remove all elements
for(let i = 0; i < arr.length; i++) {
  if(arr[i] === 'Turin') arr.splice(i, 1); 

  else console.log(arr[i])
}
 */

