import React, { useState, useEffect } from "react";
import "./calculator.css";

function calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleEqual = () => {
    try {
      let expression = input;
      expression = expression.replace(
        /(\d+(?:\.\d+)?)\s*%\s*(\d+(?:\.\d+)?)/g,
        (_, a, b) => {
          return `(${a} * (${b} / 100))`;
        }
      );

      const result = eval(expression);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handlekeyDown = (event) => {
      const { key } = event;

      if (/[\d+\-*/.%]/.test(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        handleEqual();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handlekeyDown);
    return () => window.removeEventListener("keydown", handlekeyDown);
  }, []);

  return (
    <>
      <div className="container">
        

        <div className="calculator-box">
          {/* Number Buttons */}
          <div style={{color: "black", padding: "0px 10px", fontSize: "30px", backgroundColor: "white", height: "200px", width: "150px"}}>{input || "0"}</div>
          <div className="first-four">
            <button onClick={handleBackspace}>C</button>
            <button onClick={() => handleClick("%")}>%</button>
            <button onClick={() => handleClick("/")}>/</button>
            <button onClick={() => handleClick("*")}>*</button>
          </div>

          <div>
            <button onClick={() => handleClick("7")}>7</button>
            <button onClick={() => handleClick("8")}>8</button>
            <button onClick={() => handleClick("9")}>9</button>
            <button onClick={() => handleClick("-")}>-</button>
          </div>

          <div>
            <button onClick={() => handleClick("4")}>4</button>
            <button onClick={() => handleClick("5")}>5</button>
            <button onClick={() => handleClick("6")}>6</button>
            <button onClick={() => handleClick("+")}>+</button>
          </div>

          <div>
            <button onClick={() => handleClick("1")}>1</button>
            <button onClick={() => handleClick("2")}>2</button>
            <button onClick={() => handleClick("3")}>3</button>
            <button onClick={handleEqual}>=</button>
          </div>

          <div>
            
            <button onClick={() => handleClick(".")}>.</button>
            <button onClick={() => handleClick("0")}>0</button>
            <button onClick={handleClear}>AC</button>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default calculator;
