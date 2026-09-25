//^ Q1
// let str = "123";
// let result = Number(str) + 7;
// console.log(result); 


//^ Q2
// let value = 0;
// let result = value ? value : "invalid";
// console.log(result); 


//^ Q3
// for (let i = 1; i <= 10; i++) {
//     if (i % 2 === 0) {
//         continue;
//     }
//     console.log(i);
// }


// //^ Q4
// let numbers = [1, 2, 3, 4, 5];
// let even = numbers.filter(num => num % 2 === 0);
// console.log(even); 

// //^ Q5
// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];
// let res = [...arr1, ...arr2];
// console.log(res); // [1, 2, 3, 4, 5, 6]
// //^ Q6

// let day = 4;
// switch (day) {
//     case 1:
//         console.log("Sunday");
//         break;
//     case 2:
//         console.log("Monday");
//         break;
//     case 3:
//         console.log("Tuesday");
//         break;
//     case 4:
//         console.log("Wednesday");
//         break;
//     case 5:
//         console.log("Thursday");
//         break;
//     case 6:
//         console.log("Friday");
//         break;
//     case 7:
//         console.log("Saturday");
//         break;
//     default:
//         console.log("invalid");
// }


// //^ Q7
// let arr = ["abf", "abdgds", ""];
// let res = arr.map(str => str.length);
// console.log(res); 

// //Q8
// function checkDivisible(num) {
//     if (num % 3 === 0 && num % 5 === 0) {
//         return "Divisible by both";
//     }
//     return "Not divisible by both";
// }
// console.log(checkDivisible(30));

// //Q9
// const square = num => num * num;
// console.log(square(5)); 

// //Q10
// const person = {
//     name: "Anter",
//     age: 22
// };
// function getInfo({ name, age }) {
//     return `${name} is ${age} years old`;
// }
// console.log(getInfo(person));
 
// //Q11
// function sum(...numbers) {
//     return numbers.reduce((total, num) => total + num, 0);
// }
// console.log(sum(10, 20, 30, 40, 50)); 

// //Q12
// function getSuccess() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Success");
//         }, 3000);
//     });
// }
// getSuccess().then(result => console.log(result));

// //Q13
// function findLargest(numbers) {
//     return Math.max(...numbers);
// }
// console.log(findLargest([1, 3, 7, 2, 4]));


//Q14
// function extractKeys(obj) {
//     return Object.keys(obj);
// }
// const person = {
//     name: "Anter",
//     age: 22
// };
// console.log(extractKeys(person));

// //Q15
// function splitWords(str) {
//     console.log(str.split(" "));
// }
// splitWords("The quick brown fox");
















//Q1
// forEach is an array method that executes a function for each element in array
//  can't be used with break or continue statements. 
// for...of → can use break and continue statements.
// used for control flow

//Q2
// Hoisting → declarations moved to top & results in undefined if accessed before initialization ,
//  can't use let/const before declaration, but can use var before declaration.
// TDZ → let & const can't be accessed before declaration

//Q3
// ==  → compares values only after type coercion
// === → compares values and types without type coercion

//Q4
// try → used to execute code that may throw an error to catch it and handle it
// catch → accepts an error object from try and handle it

//Q5
// Conversion → converting a value from one type to another manually
// Coercion → converting a value from one type to another automatically 