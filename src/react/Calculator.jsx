import React from "react";
import {MAX, btns, isOperator} from "../setup/variables";
import { convert, format } from "../setup/functions";
import Screen from "./Screen";
import HistoryModal from "./HistoryModal";
import Button from "./Button";

// Number of times the operator is clicked (written this way to pass freeCodeCamp's automated tests)
let clicked = 0

/* Stateful component */
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    // States
    this.state = {
      curVal: 0,
      prevVal: 0,
      expression: "",
      sign: "pos",
      toggle: false,
      max: false,
      disable: false,
      dec: false,
      ans: null,
      ce: false,
      cnt: 0
    };

    // Functions
    this.clicked = this.clicked.bind(this);
    this.ac = this.ac.bind(this);
    this.ce = this.ce.bind(this);
    this.toggleSign = this.toggleSign.bind(this);
    this.addOp = this.addOp.bind(this);
    this.addDec = this.addDec.bind(this);
    this.numCheck = this.numCheck.bind(this);
    this.maxDigits = this.maxDigits.bind(this);
    this.calc = this.calc.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.deleteExpression = this.deleteExpression.bind(this);
    this.clearHistory = this.clearHistory.bind(this);

    // Event listener
    document.addEventListener("keydown", this.keyPressed);
  }

  clicked(e) {
    switch (e.target.id) {
      case "clear":
        this.ac();
        break;
      case "clear-prev":
        this.ce();
        break;
      case "sign-toggle":
        this.toggleSign();
        break;
      case "divide":
      case "multiply":
      case "subtract":
      case "add":
        this.addOp(e.target.id);
        break;
      case "equals":
        let exp =
          this.state.expression === ""
            ? "0"
            : this.state.toggle && this.state.sign === "neg"
            ? this.state.expression + ")"
            : this.state.expression;
        this.calc(exp);
        break;
      case "decimal":
        this.addDec(this.state.curVal);
        break;
      default:
        this.numCheck(e.target.innerHTML);
    }
  }

  ac() {
    this.setState({
      curVal: 0,
      prevVal: 0,
      expression: "",
      sign: "pos",
      max: false,
      dec: false,
      cnt: 0,
      ans: null
    });
  }

  ce() {
    const LAST_ACTION = /\(?-?\d+\.?\d*$|\)?\s[*+\-/]\s?[-]?$/;
    const NUMBER = /-?\d+\.?\d*$/;
    const { expression } = this.state;

    // Resets values to default state or it's previous state
    if (this.state.toggle && this.state.sign === "neg") {
      this.setState({
        curVal: 0,
        expression: expression.substring(0, expression.lastIndexOf("(-")),
        ce: true
      });
    } else if (
      expression.indexOf("=") > -1 ||
      expression.split(" ").length === 1
    ) {
      this.setState({
        curVal: 0,
        expression: "",
        ans: null,
        ce: true
      });
    } else {
      this.setState({
        curVal: 0,
        expression: expression.replace(LAST_ACTION, ""),
        ce: true
      });
    }

    setTimeout(
      () =>
        this.setState((state) => ({
          sign:
            state.expression === "" ||
            /\)?\s[*+\-/]\s?[-]?$/.test(state.expression) ||
            state.expression.match(/\(?-?\d+\.?\d*$/)[0].indexOf("-") == -1
              ? "pos"
              : "neg",
          toggle:
            state.expression === "" ||
            /\)?\s[*+\-/]\s?[-]?$/.test(state.expression) ||
            state.expression.match(/\(?-?\d+\.?\d*$/)[0].indexOf("-") > -1
              ? true
              : false
        })),
      100
    );
  }

  toggleSign() {
    const VAL = this.state.sign === "pos" ? "neg" : "pos";
    const LAST_NUM = /(\d*\.?\d*)$/;
    const NEG = /[(\-]/;

    // Prevents sign from being toggled when it shouldn't be toggled
    if (isOperator.test(this.state.curVal) && !NEG.test(this.state.curVal))
      return;

    if (VAL === "neg") {
      this.setState((state) => ({
        curVal:
          state.expression.indexOf("(-") == -1
            ? "-" +
              state.expression.match(LAST_NUM)[
                state.expression.match(LAST_NUM).length - 1
              ]
            : state.curVal === 0
            ? "-"
            : "-" + state.curVal,
        expression:
          state.expression === "" || state.expression.split(" ").length == 1
            ? state.expression.replace(
                LAST_NUM,
                "(-" + state.expression.match(LAST_NUM)[0]
              )
            : state.ans === null && state.expression !== ""
            ? state.expression
                .replace(new RegExp(state.curVal + "$"), "")
                .trim() +
              " (-" +
              state.curVal
            : "(-" + state.curVal,
        sign: VAL,
        toggle: true
      }));
    } else {
      const NUM =
        this.state.curVal === "-" ? 0 : this.state.curVal.match(/[^\-]/g);

      const LAST = this.state.expression.lastIndexOf("(-");

      this.setState((state) => ({
        curVal: NUM,
        expression:
          state.expression.substring(0, LAST) +
          state.expression.substring(LAST + 2),
        sign: VAL,
        toggle: false
      }));
    }
  }

  addOp(id) {
    const { disable, expression, prevVal, toggle } = this.state;
    let op = "";
    let addNeg = false;
    clicked++;

    if (disable || expression === "(-") return;
    if (id == "subtract" && clicked > 1) addNeg = true;

    switch (id) {
      case "divide":
        op = " / ";
        break;
      case "multiply":
        op = " * ";
        break;
      case "subtract":
        op = addNeg ? " -" : " - ";
        break;
      default:
        op = " + ";
    }

    this.setState((state) => ({
      curVal: document.getElementById(id).innerHTML,
      expression: addNeg
        ? expression + op
        : state.ans !== null
        ? state.ans + op
        : state.toggle && state.sign === "neg"
        ? expression + ")" + op
        : expression !== ""
        ? expression + op
        : 0 + op,
      sign: addNeg && state.sign == "pos" ? "neg" : "pos",
      toggle: false,
      dec: false,
      cnt: state.cnt + 1,
      ans: null,
      ce: false
    }));
  }

  addDec(digs) {
    if (this.state.dec || this.state.disable) return;

    // Checks how decimals should be added
    if (/^\d+/g.test(digs.toString())) {
      if (digs < MAX) {
        this.setState((state) => ({
          curVal: digs + ".",
          expression: state.cnt > 0 ? state.expression + "." : digs + ".",
          dec: true
        }));
      } else {
        this.maxDigits();
      }
    } else {
      this.setState((state) => ({
        curVal: "0.",
        expression: state.cnt > 0 ? state.expression + "0." : digs + ".",
        dec: true
      }));
    }
  }

  numCheck(val) {
    let { curVal, expression, dec, ce, sign, disable, ans } = this.state;
    clicked = 0;

    // Prevents user input while "TOO MANY DIGITS" is displayed
    if (disable) return;

    // Clears previous values when using the answer from a previous expression
    if (ans != null) {
      ans = null;
      expression = "";
      curVal = 0;
    }

    if (curVal.toString().length < 13) {
      this.setState({
        curVal:
          (curVal == 0 || isOperator.test(curVal.toString())) &&
          !curVal.toString().includes(".") &&
          !(curVal.toString().includes("-") && sign === "neg") &&
          !ce
            ? val
            : ce
            ? expression.substring(0, expression.length) + val
            : curVal + val,
        expression:
          curVal === 0 && val === "0"
            ? expression === ""
              ? val
              : expression
            : !ce
            ? /(0[1-9]$|^0)$/.test(expression) && curVal == 0
              ? expression.slice(0, -1) + val
              : expression + val
            : expression + val,
        ans: ans,
        ce: false
      });
    } else {
      this.maxDigits();
    }
  }

  maxDigits() {
    this.setState((state) => ({
      curVal: "TOO MANY DIGITS",
      prevVal: state.curVal,
      max: true,
      disable: true
    }));

    // Prevents user input for 4 seconds
    setTimeout(
      () =>
        this.setState((state) => ({
          curVal: state.prevVal,
          disable: false
        })),
      4000
    );
  }

  calc(exp) {
    let answer = 0;
    const REGEX_OP = /(\s?[+\-/*]\s|-\d+\s?){2,}/g;
    const OPS_CHECK = exp.match(REGEX_OP);

    if (this.state.ans !== null) return;

    // Gets all operators and numbers that should be used
    if (OPS_CHECK !== null) {
      const OPS = OPS_CHECK.join("")
        .split(" ")
        .join("")
        .split(/\d/)
        .join("")
        .split("");

      const OP = OPS[OPS.length - 1];
      const INDEX = exp.lastIndexOf(OP);
      exp = exp.slice(0, 2) + exp.slice(INDEX);
    }

    if (this.state.max) {
      answer = Math.round((MAX * convert(format(exp))) / MAX);
    } else {
      answer = convert(format(exp));
    }

    this.setState((state) => ({
      curVal: answer,
      prevVal: state.curVal,
      expression:
        (state.toggle && state.sign === "neg") || state.expression === ""
          ? exp + " = " + answer
          : state.expression + " = " + answer,
      cnt: 0,
      ans: answer,
      sign: window.Number(answer) < 0 ? "neg" : "pos",
      toggle: false,
      dec: answer.toString().includes(".") ? true : false,
      history:
        (state.toggle && state.sign === "neg") || state.expression === ""
          ? this.props.addToHistory(exp + " = " + answer)
          : this.props.addToHistory(state.expression + " = " + answer)
    }));
  }

  keyPressed(e) {
    const KEYS = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".",
      "+",
      "-",
      "*",
      "/",
      "=",
      "a",
      "c",
      "t"
    ];

    const OPS = {
      "+": "add",
      "-": "subtract",
      "*": "multiply",
      "/": "divide"
    };

    KEYS.forEach((k) => {
      if (e.key === k) {
        if (/\d/.test(e.key)) this.numCheck(e.key);
        if (e.key === ".") this.addDec(this.state.curVal);
        if (/[*/+-]/.test(e.key)) this.addOp(OPS[e.key]);
        if (e.key === "=") {
          let exp =
            this.state.toggle && this.state.sign === "neg"
              ? this.state.expression + ")"
              : this.state.expression === ""
              ? "0"
              : this.state.expression;
          this.calc(exp);
        }
        if (e.key === "a") this.ac();
        if (e.key === "c") this.ce();
        if (e.key === "t") this.toggleSign();
      }
    });
  }

  deleteExpression(e) {
    this.setState({
      history: this.props.removeFromHistory(e.target.dataset.exp)
    });
  }

  clearHistory() {
    this.setState({ history: this.props.clear() });
  }

  render() {
    return (
      <div id="calculator" className="bg-dark rounded">
        <Screen val={this.state.curVal} exp={this.state.expression} />
        <div id="modal-container">
          <HistoryModal
            history={this.props.history}
            remove={this.deleteExpression}
            clear={this.clearHistory}
          />
        </div>
        <div id="btn-container">
          {btns.map((b) => {
            return (
              <Button
                id={b.id}
                name={b.btn}
                class={b.styles}
                onClick={this.clicked}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Calculator;