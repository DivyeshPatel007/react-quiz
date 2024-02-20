import React, { useEffect, useReducer } from 'react'
import Error from "./Error"
import Header from "./Header"
import Loader from "./Loader"
import Main from './Main'
import Question from './Question'
import StartScreen from './StartScreen'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'


const SECS_PER_QUESTIONS = 30;
const initialState = {
  questions: [],
  // laoding, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  remainingSecond: 0
}

function reducerFn(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      }
    case "start":
      return {
        ...state,
        status: "active",
        remainingSecond: state.questions.length * SECS_PER_QUESTIONS,

      }
    case "newAnswer":
      const question = state.questions[state.index];
      let points = state.points;
      if (question.correctOption === action.payload) {
        points += question.points;
      }
      return {
        ...state,
        answer: action.payload,
        points
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case "finish":
      return {
        ...state,
        status: "finished"
      }
    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0
      }
    case "tick":
      return {
        ...state,
        remainingSecond: state.remainingSecond - 1,
        status: state.remainingSecond === 0 ? 'finish' : state.status,
      }
    default:
      throw new Error("Unkown type ")
  }
}

function App() {

  const [state, dispatchFn] = useReducer(reducerFn, initialState);
  const { questions, status, index, answer, points, remainingSecond } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0)


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions ");
        const data = await response.json();
        dispatchFn({ type: "dataReceived", payload: data })
      } catch (error) {
        dispatchFn({ type: "dataFailed" })
      }
    }
    fetchQuestions()
  }, [])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatchFn={dispatchFn} />}
        {status === "active" &&
          <>
            <Progress index={index} numQuestion={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions[index]} numQuestions={numQuestions} dispatchFn={dispatchFn} answer={answer} />
            <Footer>
              <Timer dispatchFn={dispatchFn} remainingSecond={remainingSecond} />
              <NextButton answer={answer} dispatchFn={dispatchFn} index={index} numQuestion={numQuestions} />
            </Footer>
          </>
        }
        {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPoints} dispatchFn={dispatchFn} />}
      </Main>



    </div>
  )
}

export default App