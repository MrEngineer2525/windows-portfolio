import React, { useState, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";
import { WINDOW_SIZES } from "../../utils/constants";

const CalculatorButton = ({ label, onClick, variant = "number", colSpan = 1 }) => {
  const baseStyles = "h-12 rounded font-bold text-lg transition-all active:scale-95";
  const variants = {
    number: "bg-neutral-700 hover:bg-neutral-600 text-white",
    operator: "bg-cyan-600 hover:bg-cyan-500 text-white",
    function: "bg-neutral-600 hover:bg-neutral-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${colSpan > 1 ? `col-span-${colSpan}` : ""}`}
    >
      {label}
    </button>
  );
};

const Calculator = ({
  isAppOpen,
  toggleCalculator,
  isActive = false,
  bringToFront,
  minimizeWindow,
  isMinimized = false,
  bounds,
}) => {
  const calculatorRef = useRef(null);
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = useCallback((num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  }, [display, waitingForNewValue]);

  const handleOperation = useCallback((op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  }, [display, previousValue, operation]);

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = useCallback(() => {
    if (operation && previousValue !== null) {
      const result = performCalculation(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  }, [display, operation, previousValue]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  }, []);

  const handleDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForNewValue]);

  if (!isAppOpen || isMinimized) return null;

  return (
    <div
      className={`${isActive ? "z-40" : "z-30"} w-full h-screen pointer-events-none absolute transition-none`}
    >
      <Draggable handle=".title-bar" nodeRef={calculatorRef} bounds={bounds}>
        <div
          ref={calculatorRef}
          className="window bg-neutral-900 h-auto w-80 rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto"
          onMouseDown={bringToFront}
        >
          <div className="title-bar bg-neutral-800 text-white h-9 w-full flex justify-between items-center select-none">
            <div className="ml-4 font-normal text-sm">Calculator</div>
            <div className="flex">
              <button
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-xl"
                onClick={minimizeWindow}
              >
                <MdMinimize />
              </button>
              <button className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-sm">
                <MdCheckBoxOutlineBlank />
              </button>
              <button
                className="hover:bg-red-700 w-12 h-9 flex justify-center items-center text-xl"
                onClick={toggleCalculator}
              >
                <MdClose />
              </button>
            </div>
          </div>

          <div className="p-4 bg-neutral-900">
            <input
              type="text"
              value={display}
              className="w-full mb-4 px-4 py-3 text-3xl rounded-lg bg-neutral-800 text-white text-right shadow-inner border border-neutral-700"
              disabled
              readOnly
            />

            <div className="grid grid-cols-4 gap-2">
              <CalculatorButton label="AC" onClick={handleClear} variant="function" colSpan={2} />
              <CalculatorButton label="/" onClick={() => handleOperation("/")} variant="operator" />
              <CalculatorButton label="*" onClick={() => handleOperation("*")} variant="operator" />

              <CalculatorButton label="7" onClick={() => handleNumberClick(7)} />
              <CalculatorButton label="8" onClick={() => handleNumberClick(8)} />
              <CalculatorButton label="9" onClick={() => handleNumberClick(9)} />
              <CalculatorButton label="-" onClick={() => handleOperation("-")} variant="operator" />

              <CalculatorButton label="4" onClick={() => handleNumberClick(4)} />
              <CalculatorButton label="5" onClick={() => handleNumberClick(5)} />
              <CalculatorButton label="6" onClick={() => handleNumberClick(6)} />
              <CalculatorButton label="+" onClick={() => handleOperation("+")} variant="operator" />

              <CalculatorButton label="1" onClick={() => handleNumberClick(1)} />
              <CalculatorButton label="2" onClick={() => handleNumberClick(2)} />
              <CalculatorButton label="3" onClick={() => handleNumberClick(3)} />
              <CalculatorButton label="=" onClick={handleEquals} variant="operator" rowSpan={2} />

              <CalculatorButton label="0" onClick={() => handleNumberClick(0)} colSpan={2} />
              <CalculatorButton label="." onClick={handleDecimal} />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

Calculator.defaultProps = {
  minimizeWindow: null,
  isMinimized: false,
};

Calculator.propTypes = {
  isAppOpen: PropTypes.bool.isRequired,
  toggleCalculator: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  bringToFront: PropTypes.func,
  minimizeWindow: PropTypes.func,
  isMinimized: PropTypes.bool,
  bounds: PropTypes.object,
};

export default React.memo(Calculator);
