import { createContext, useContext, useEffect, useReducer } from "react";

const QuixContext = createContext();

const SECS_PER_QUESTIONS = 30;
const initialState = {
  questions: [],
  // laoding, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  remainingSecond: 0,
};

function reducerFn(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSecond: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      let points = state.points;
      if (question.correctOption === action.payload) {
        points += question.points;
      }
      return {
        ...state,
        answer: action.payload,
        points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        remainingSecond: state.remainingSecond - 1,
        status: state.remainingSecond === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unkown type ");
  }
}

export default function QuizProvider({ children }) {
  const [state, dispatchFn] = useReducer(reducerFn, initialState);
  const { questions, status, index, answer, points, remainingSecond } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8001/questions");
        const data = await response.json();
        dispatchFn({ type: "dataReceived", payload: data })
      } catch (error) {
        dispatchFn({ type: "dataFailed" })
      }
    }
    fetchQuestions()
  }, [])
  return (
    <QuixContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        remainingSecond,
        numQuestions,
        maxPoints,
        dispatchFn
      }}
    >
      {children}
    </QuixContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuixContext);
  if(context===undefined)throw new Error("QuizContext is used outside the QuizProvider")
  return context;
}
