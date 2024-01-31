// console.log(document); - ❌
// console.log(window); - ❌

//console.log(global); // - ✅

//console.log(process.argv); // argumentValues

const [, , num] = process.argv;
const double = (n) => n * 2;
//console.log(double(10));
//console.log(double(process.argv[2]));
console.log(double(num));
