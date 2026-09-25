let path = require ('node:path')
let fs = require('node:fs')
const EventEmitter = require("events");
const zlib = require("zlib");
//Q1
// let x = '/home/user/project/index.js'
// let file = x
// const dirname = path.dirname(file)
// console.log(file) 
// console.log(dirname)

//Q2
// let x =' /user/files/report.pdf'
// function getFileName(filePath) {
//   return path.basename(filePath)
// }
// console.log(getFileName(x))


//Q3
// function bulidPath({dir, fileName, ext}) {
//     return path.join(dir, fileName + ext)
// }
// const filePath = bulidPath({ dir:"/folder", name:"app", ext:".js"})
// console.log(filePath)


//Q4
//  function getFileExtension(filePath) {
//     return path.extname(filePath)
// }
// let x = '/home/user/project/index.js'
// console.log(getFileExtension(x))


//Q5
// function parsePath(filePath) {
//     let parsedPath = path.parse(filePath)
//     let {name, ext} = parsedPath
//     return {name, ext}
// }
// let x = '/home/user/project/index.js'
// console.log(parsePath(x))


//Q6
// function checkAbsolutePath(filePath) {
//     return path.isAbsolute(filePath)
// }
// let x = '/home/user/project/index.js'
// console.log(checkAbsolutePath(x))


//Q7
// function joinSegments(segments) {
//     return path.join(...segments)
// }
// let segments = ['folder', 'subfolder', 'file.txt']
// console.log(joinSegments(segments))

//Q8
// function resolvePath(relativePath) {
//   return path.resolve(relativePath);
// }
// console.log(resolvePath("./index.js"));


//Q9
// function joinPaths(paths) {
//   return path.join(...paths);
// }
// console.log(joinPaths(["folder", "folder2/file.txt"]));


//Q10
// function deleteFileAsync(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(`the ${filePath} is deleted .`);
//       }
//     });
//   });
// }

// deleteFileAsync("./delete.js")
//   .then((message) => console.log(message))
//   .catch((err) => console.log(err));

// //Q11
// function createFolderAsync(folderPath) {
//   return new Promise((resolve, reject) => {
//     fs.mkdir(folderPath, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(`the ${folderPath} is created .`);
//       }
//     });
//   });
// }
// createFolderAsync("./newfolder")
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


//Q12
// const emitter = new EventEmitter();
// emitter.on("start", () => {
//   console.log("Welcome event triggered!");
// });
// emitter.emit("start");


//Q13
// const emitter = new EventEmitter();
// emitter.on("login", (username) => {
//   console.log(`User logged in:${username}.`);
// });
// function loginUser(username) {
//   emitter.emit("login", username);
// }
// loginUser("Anter");


//Q14
// fs.readFile("./test.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

//Q15
// function writeFileAsync(filePath, data) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(
//       filePath,
//       data,
//       { flag: "a", encoding: "utf-8"},
//       (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(`Data written to ${filePath}`);
//         }
//       }
//     );
//   });
// }

// writeFileAsync("./test.txt", " Hello Anter ")
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((err) => {
//     console.error(err);
//   });


//Q16
// function checkDirectoryExists(dirPath) {
//   fs.existsSync(dirPath) ? 
//   console.log(`Directory ${dirPath} exists.`) : 
//    console.log(`Directory ${dirPath} does not exist.`)
// }
//  checkDirectoryExists("./Anter");


//Q17
// function OSandArch() {
//   return {
//     os: process.platform,
//     arch: process.arch,
//   };
// }
// console.log(OSandArch());

//Q18
// function readFileStream(filePath) {
//     const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
//     readStream.on("data", (chunk) => {
//         console.log(chunk);
//     });
//     readStream.on("end", () => {
//         console.log("File reading completed.");
//     });
// }
// readFileStream("./test.txt");


//Q19
// function copyFileAsync(source, dest) {
//     const readStream = fs.createReadStream(source);
//     const writeStream = fs.createWriteStream(dest);
//     writeStream.on("finish", () => {
//         console.log(`File copied from ${source} to ${dest}`);
//     });
//     readStream.pipe(writeStream);
// }
// copyFileAsync("./test.txt", "./copy.txt");



//Q20
// fs.createReadStream("./test.txt")
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream("./test.txt.gz"));