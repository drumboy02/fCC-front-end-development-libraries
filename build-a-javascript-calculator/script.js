import React, { useState } from "https://esm.sh/react"
import ReactDOM, { createRoot } from "https://esm.sh/react-dom/client"

const App = () => {
  const evaluate = (a, b, operator) => {
    a = Number(a)
    b = Number(b)
    
    switch (operator) {
      case '+':
        return (a + b).toString();
      case '-':
        return (a - b).toString();
      case '/':
        if (b == '0') {
          return "I AM ERROR"
        }
        return (a / b).toString();
      case '*':
        return (a * b).toString();
    }  
  }
  
  return (
    <div className="app-container">
      <Calculator evaluate={evaluate} />
    </div>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<App />)

const Calculator = ({ evaluate }) => {
  const [calcState, setCalcState] = useState({
    opA: '0',
    opB: null,
    operator: null,
    evaluate
  })
  const [result, setResult] = useState(null)
  
  // console.log('opA:', calcState.opA)
  // console.log('opB:', calcState.opB)
  // console.log('operator:', calcState.operator)
  
  return (
    <div className="calculator-container">
      <Display calcState={calcState} result={result} />
      <Buttons calcState={calcState} setCalcState={setCalcState} result={result} setResult={setResult} />
    </div>
  )
}

const Display = ({ calcState, result }) => {
  const display = !calcState.opB ? calcState.opA : calcState.opB
  return (
    <div id="display">{!result ? display : result}</div>
  )
}

const digits = [
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['zero', '0']
]

const Buttons = ({ calcState, setCalcState, result, setResult }) => {
  
  const handleDigit = (e) => {
    if (result) setResult(null)    
    const d = e.target.textContent
    
    if (calcState.opA == '0') {
      setCalcState({ ...calcState, opA: d })
      return
    }
    if (calcState.opA && calcState.operator) {
      if (calcState.opB === null) {
        setCalcState({ ...calcState, opB: d })
        return
      } else {
        setCalcState({ ...calcState, opB: calcState.opB + d })
        return
      }
    }
    setCalcState({ ...calcState, opA: calcState.opA + d })
  }
  
  const handleOperator = (e) => {
    const op = e.target.textContent
    
    if (result) {
      setCalcState({ ...calcState, opA: result, operator: op })
      return
    }
    
    if (calcState.operator && op == '-') {
      if (!calcState.opB) {
        setCalcState({ ...calcState, opB: '-' })
        return
      }
    }
    
    if (calcState.opA && calcState.opB && calcState.operator) {
      if (calcState.opB == '-') {
        setCalcState({ ...calcState, opB: null, operator: op })
        return
      }
      if (op != '=') {
        setCalcState({
          ...calcState,
          opA: calcState.evaluate(calcState.opA, calcState.opB, calcState.operator),
          opB: null,
          operator: op,
        })
        return        
      }
        setCalcState({
          ...calcState,
          opA: '0',
          opB: null,
          operator: null,
        })
        setResult(calcState.evaluate(calcState.opA, calcState.opB, calcState.operator))
        return      
    }
    setCalcState({ ...calcState, operator: op })
  }
  
  const handleDecimal = (e) => {
    if (result) {
      setCalcState({ ...calcState, opA: result.concat('.')})
      setResult(null)
      return
    }
    if (!calcState.opB) {
      if (calcState.opA.includes('.')) return
      setCalcState({ ...calcState, opA: calcState.opA.concat('.')})
      return
    }
    if (calcState.opB.includes('.')) return
    setCalcState({ ...calcState, opB: calcState.opB.concat('.')})
    return
  }
  
  return (
    <div className="button-container">
      <div className="ac-div">
        <button 
          id="clear" 
          onClick={() => {
            setResult(null)
            setCalcState({
              ...calcState,
              opA: "0",
              opB: null,
              operator: null
            })}
          }
        >
          AC
        </button>
        <button id="divide" onClick={handleOperator}>/</button>
      </div>
      <div className="digit-container">
        {digits.map(digit => (
          <button 
            id={digit[0]}
            className="digit"
            onClick={handleDigit}
          >
            {digit[1]}
          </button>
        ))}
        <button id="decimal" onClick={handleDecimal}>.</button>
      </div>
      <div className="operators">
        <button id="multiply" onClick={handleOperator}>*</button>
        <button id="subtract" onClick={handleOperator}>-</button>
        <button id="add" onClick={handleOperator}>+</button>
        <button id="equals" onClick={handleOperator}>=</button>
      </div>
    </div>
  )
}

