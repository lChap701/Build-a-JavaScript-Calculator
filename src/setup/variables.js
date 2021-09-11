// Max number that can be entered
const MAX = 1000000000000;

// Buttons (includes the classes of icons, ids of buttons, and styles)
const btns = [
  { id: "clear", btn: "AC", styles: "btn btn-danger btn-lg" },
  { id: "clear-prev", btn: "CE", styles: "btn btn-danger btn-lg" },
  { id: "sign-toggle", btn: "±", styles: "btn btn-warning btn-lg" },
  { id: "divide", btn: "/", styles: "btn btn-primary btn-lg" },
  { id: "seven", btn: "7", styles: "btn btn-info btn-lg" },
  { id: "eight", btn: "8", styles: "btn btn-info btn-lg" },
  { id: "nine", btn: "9", styles: "btn btn-info btn-lg" },
  { id: "multiply", btn: "x", styles: "btn btn-primary btn-lg" },
  { id: "four", btn: "4", styles: "btn btn-info btn-lg" },
  { id: "five", btn: "5", styles: "btn btn-info btn-lg" },
  { id: "six", btn: "6", styles: "btn btn-info btn-lg" },
  { id: "subtract", btn: "-", styles: "btn btn-primary btn-lg" },
  { id: "one", btn: "1", styles: "btn btn-info btn-lg" },
  { id: "two", btn: "2", styles: "btn btn-info btn-lg" },
  { id: "three", btn: "3", styles: "btn btn-info btn-lg" },
  { id: "add", btn: "+", styles: "btn btn-primary btn-lg" },
  { id: "zero", btn: "0", styles: "btn btn-info btn-lg" },
  { id: "decimal", btn: ".", styles: "btn btn-info btn-lg" },
  { id: "equals", btn: "=", styles: "btn btn-success btn-lg" }
];

// REGEX
let isOperator = /[x/+\-]/;

export {MAX, btns, isOperator};