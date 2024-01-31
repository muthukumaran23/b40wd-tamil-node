const fs = require("fs");

const quote = "No beauty shines brighter than that of a good heart 🤩🎉 !!!.";

fs.writeFile("./awesome.html", quote, (err) => {
  console.log("Completed writing !!!");
});

const quote2 = "Live more, worry less 😄😊";

//Task 1
//Create the below files with quote2 as the content
// /backup/
// text-1.html
// text-2.html
// text-3.html
// ....
// text-10.html

// for (let i = 1; i <= 10; i++) {
//   fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
//     console.log("Completed writing !!!");
//   });
// }

// Task 2
// node file.js 30 -> 30 files to be created | text-1.html ... text-30.html

// const [, , noOfFiles] = process.argv;

// console.log(noOfFiles);

// for (let i = 1; i <= noOfFiles; i++) {
//   fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
//     console.log("Completed writing !!!");
//   });
// }

// fs.readFile("./cool.txt", (err, data) => {
//   if (err) {
//     console.log("❌", err);
//   } else {
//     console.log(data);
//   }
// });

// const quote3 = "Dream without fear, love without limits 🧡";

// fs.appendFile("./fun.html", "\n" + quote3, (err) => {
//   console.log("Completed appending!!!");
// });

fs.unlink("./delete-me.css", (err) => {
  console.log("Deleted Successfully");
});
