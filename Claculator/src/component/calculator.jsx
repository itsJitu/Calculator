import React, { useState, useEffect } from "react";
import "./calculator.css";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleEqual = () => {
    try {
      console.log("Input:", input);
      
      // Check if input is empty or doesn't contain any numbers
      if (!input || !/\d/.test(input)) {
        console.log("Empty input, setting to 0");
        setInput("0");
        return;
      }

      let expression = input;
      console.log("Original expression:", expression);
      
      // Handle percentage calculations
      // Convert 100%50 to 50 (100% of 50 = 50)
      expression = expression.replace(
        /(\d+(?:\.\d+)?)%(\d+(?:\.\d+)?)/g,
        (_, a, b) => `(${a} * ${b} / 100)`
      );
      
      // Convert 50% to 0.5 (50/100) - for single percentages
      expression = expression.replace(
        /(\d+(?:\.\d+)?)%/g,
        (_, a) => `(${a} / 100)`
      );

      // Ensure the expression ends with a number, not an operator
      if (/[\+\-\*\/]$/.test(expression)) {
        expression = expression.slice(0, -1);
      }

      console.log("Final expression:", expression);
      const result = eval(expression);
      console.log("Result:", result);
      
      // Check if result is valid
      if (isNaN(result) || !isFinite(result)) {
        console.log("Invalid result, setting Error");
        setInput("Error");
      } else {
        console.log("Setting result:", result.toString());
        setInput(result.toString());
      }
    } catch (error) {
      console.log("Error:", error);
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
  }, [handleEqual, handleBackspace, handleClear]);

  return (
    <>
      <div className="container">
        

        <div className="calculator-box">
          {/* Number Buttons */}
          <div style={{color: "black", padding: "0px 10px", fontSize: "30px", backgroundColor: "white", height: "200px", width: "150px"}}>{input || "0"}</div>
          
          <div className="first-four">
            <button onClick={handleBackspace} style={{backgroundColor: "rgb(97 179 59)",}}>C</button>
            <button onClick={() => handleClick("%")}>%</button>
            <button onClick={() => handleClick("/")}>/</button>
            <button onClick={() => handleClick("*")}>*</button>
          </div>

          <div className="first-four">
            <button onClick={() => handleClick("7")}>7</button>
            <button onClick={() => handleClick("8")}>8</button>
            <button onClick={() => handleClick("9")}>9</button>
            <button onClick={() => handleClick("-")}>-</button>
          </div>

          <div className="first-four">
            <button onClick={() => handleClick("4")}>4</button>
            <button onClick={() => handleClick("5")}>5</button>
            <button onClick={() => handleClick("6")}>6</button>
            <button onClick={() => handleClick("+")}>+</button>
          </div>

          <div className="first-four">
            <button onClick={() => handleClick("1")}>1</button>
            <button onClick={() => handleClick("2")}>2</button>
            <button onClick={() => handleClick("3")}>3</button>
            <button onClick={handleEqual}>=</button>
          </div>

          <div className="last-three">
            <button onClick={() => handleClick(".")}>.</button>
            <button onClick={() => handleClick("0")}>0</button>
            <button onClick={handleClear} style={{backgroundColor: "red"}}>AC</button>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default Calculator;
