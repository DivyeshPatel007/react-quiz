import { useReducer } from "react";

function reducerFn(state, action) {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step }
    case "inc":
      return { ...state, count: state.count + state.step }
    case "input":
      return { ...state, count: action.payload }
    case "reset":
      return { step: 0, count: 0 }
    case "step":
      return { ...state, step: action.payload }


    default:
      break;
  }
}
const initialState = {
  count: 0,
  step: 1
}

function DateCounter() {

  const [state, dispatch] = useReducer(reducerFn, initialState)
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "dec" })
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" })
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "input", payload: Number(e.target.value) })
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "step", payload: Number(e.target.value) })
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" })
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
