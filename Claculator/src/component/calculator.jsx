import React, { useState, useEffect, useRef } from "react";
import "./calculator.css";
import Decimal from "decimal.js";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  const handleClick = (value) => {
    if (isResult) {
      setInput(value); // Start new input
      setResult("");
      setIsResult(false);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleEqual = () => {
    try {
      if (!input || !/\d/.test(input)) {
        setResult("Error");
        setIsResult(true);
        // Do not clear input
        return;
      }
      let expression = input;
      expression = expression.replace(
        /(\d+(?:\.\d+)?)%(\d+(?:\.\d+)?)/g,
        (_, a, b) => `(${a} * ${b} / 100)`
      );
      expression = expression.replace(
        /(\d+(?:\.\d+)?)%/g,
        (_, a) => `(${a} / 100)`
      );
      if (/[\+\-\*\/]$/.test(expression)) {
        expression = expression.slice(0, -1);
      }
      // Use Decimal.js for evaluation
      let resultValue = computeWithDecimal(expression);
      if (resultValue === null) {
        setResult("Error");
        setIsResult(true);
        // Do not clear input
        return;
      } else {
        // Show full number, not scientific notation
        let dec = new Decimal(resultValue);
        let formatted = dec.isInteger() ? dec.toFixed(0) : dec.toString();
        setResult(formatted);
        setIsResult(true);
        // Do not clear input
      }
    } catch (error) {
      setResult("Error");
      setIsResult(true);
      // Do not clear input
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setIsResult(false);
  };

  const handleBackspace = () => {
    setInput((prev) => {
    const updated = prev.slice(0, -1);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      }
    }, 0); // Delay ensures DOM has updated
    return updated;
  });
  setResult("");
  setIsResult(false);
  };

  useEffect(() => {
    const handlekeyDown = (event) => {
      const { key, code, shiftKey } = event;
      // Support % via Shift+5 as well as direct % key
      if (/^[0-9+\-*/.%]$/.test(key) || (code === 'Digit5' && shiftKey)) {
        const value = (code === 'Digit5' && shiftKey) ? '%' : key;
        if (isResult) {
          setInput(value);
          setResult("");
          setIsResult(false);
        } else {
          setInput((prev) => prev + value);
        }
      } else if (key === "Enter" || key === "=") {
        // Always evaluate current input, regardless of isResult
        handleEqual();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        setResult("");
        setIsResult(false);
      } else if (key === "Escape") {
        setInput("");
        setResult("");
        setIsResult(false);
      }
    };
    window.addEventListener("keydown", handlekeyDown);
    return () => window.removeEventListener("keydown", handlekeyDown);
  }, [input, isResult]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  // Calculate dynamic font size for input
  const getInputFontSize = () => {
    const baseSize = 20;
    if (input.length < 20) return baseSize;
    if (input.length < 30) return 18;
    if (input.length < 40) return 16;
    if (input.length < 50) return 14;
    if (input.length < 60) return 12;
    return 10;
  };

  return (
    <>
      <div className="container">
        <div className="calculator-box">
          {/* Display both input and result */}
          <div className="display-area">
            <div className="input-string" ref={inputRef} style={{ fontSize: getInputFontSize() }}>{input || "0"}</div>
            {result !== "" && (
              <div className="result-string">= {result}</div>
            )}
          </div>
          <div className="first-four">
            <button
              onClick={handleBackspace}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              C
            </button>
            <button
              onClick={() => handleClick("%")}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              %
            </button>
            <button
              onClick={() => handleClick("/")}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              /
            </button>
            <button
              onClick={() => handleClick("*")}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              *
            </button>
          </div>
          <div className="first-four">
            <button onClick={() => handleClick("7")}>7</button>
            <button onClick={() => handleClick("8")}>8</button>
            <button onClick={() => handleClick("9")}>9</button>
            <button
              onClick={() => handleClick("-")}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              -
            </button>
          </div>
          <div className="first-four">
            <button onClick={() => handleClick("4")}>4</button>
            <button onClick={() => handleClick("5")}>5</button>
            <button onClick={() => handleClick("6")}>6</button>
            <button
              onClick={() => handleClick("+")}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              +
            </button>
          </div>
          <div className="first-four">
            <button onClick={() => handleClick("1")}>1</button>
            <button onClick={() => handleClick("2")}>2</button>
            <button onClick={() => handleClick("3")}>3</button>
            <button onClick={handleEqual}>=</button>
          </div>
          <div className="last-three">
            <button onClick={() => handleClick(".")}>.</button>
            <button
              onClick={() => handleClick("0")}
              style={{
                width: "120px", // Make the 0 button wider
                fontSize: "24px",
                fontWeight: "bold"
              }}
            >
              0
            </button>
            <button
              onClick={handleClear}
              style={{
                background: "linear-gradient(90deg, #ADD8FF 0%, #007bff 100%)",
                color: "#222"
              }}
            >
              AC
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function computeWithDecimal(expr) {
  try {
    // Tokenize the expression (supports +, -, *, /, %, decimals, and parentheses)
    let tokens = expr.match(/(\d*\.\d+|\d+|[+\-*/()])/g);
    if (!tokens) return null;
    // Shunting Yard Algorithm to convert to RPN
    let output = [];
    let ops = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    for (let token of tokens) {
      if (/^\d*\.\d+$|^\d+$/.test(token)) {
        output.push(token);
      } else if (token in precedence) {
        while (
          ops.length &&
          precedence[ops[ops.length - 1]] >= precedence[token]
        ) {
          output.push(ops.pop());
        }
        ops.push(token);
      } else if (token === '(') {
        ops.push(token);
      } else if (token === ')') {
        while (ops.length && ops[ops.length - 1] !== '(') {
          output.push(ops.pop());
        }
        ops.pop();
      }
    }
    while (ops.length) output.push(ops.pop());
    // Evaluate RPN with Decimal
    let stack = [];
    for (let token of output) {
      if (/^\d*\.\d+$|^\d+$/.test(token)) {
        stack.push(new Decimal(token));
      } else {
        let b = stack.pop();
        let a = stack.pop();
        if (token === '+') stack.push(a.plus(b));
        else if (token === '-') stack.push(a.minus(b));
        else if (token === '*') stack.push(a.times(b));
        else if (token === '/') stack.push(a.div(b));
      }
    }
    if (stack.length !== 1) return null;
    // Remove unnecessary trailing zeros
    return stack[0].toString();
  } catch {
    return null;
  }
}

export default Calculator;
