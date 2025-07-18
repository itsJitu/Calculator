import React, { useState, useEffect } from "react";
import "./calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isResult, setIsResult] = useState(false);

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
        setResult("0");
        setIsResult(true);
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
      const evalResult = eval(expression);
      if (isNaN(evalResult) || !isFinite(evalResult)) {
        setResult("Error");
      } else {
        setResult(evalResult.toString());
      }
      setIsResult(true);
    } catch (error) {
      setResult("Error");
      setIsResult(true);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setIsResult(false);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
    setResult("");
    setIsResult(false);
  };

  useEffect(() => {
    const handlekeyDown = (event) => {
      const { key } = event;
      if (/^[0-9+\-*/.%]$/.test(key)) {
        if (isResult) {
          setInput(key);
          setResult("");
          setIsResult(false);
        } else {
          setInput((prev) => prev + key);
        }
      } else if (key === "Enter" || key === "=") {
        try {
          if (!input || !/\d/.test(input)) {
            setResult("0");
            setIsResult(true);
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
          const evalResult = eval(expression);
          if (isNaN(evalResult) || !isFinite(evalResult)) {
            setResult("Error");
          } else {
            setResult(evalResult.toString());
          }
          setIsResult(true);
        } catch (error) {
          setResult("Error");
          setIsResult(true);
        }
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

  return (
    <>
      <div className="container">
        <div className="calculator-box">
          {/* Display both input and result */}
          <div className="display-area">
            <div className="input-string">{input || "0"}</div>
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

export default Calculator;
