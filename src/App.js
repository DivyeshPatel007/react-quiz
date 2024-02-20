import React from 'react'
import Error from "./Error"
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Header from "./Header"
import Loader from "./Loader"
import Main from './Main'
import NextButton from './NextButton'
import Progress from './Progress'
import Question from './Question'
import StartScreen from './StartScreen'
import Timer from './Timer'
import  { useQuiz } from './context/QuizContext'



function App() {
  const { status,questions,index,numQuestions,dispatchFn,answer } = useQuiz()
  console.log(status);


  return (
    <div className="app">

      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" &&
          <>
            <Progress />
            <Question question={questions[index]} numQuestions={numQuestions} dispatchFn={dispatchFn} answer={answer} />
            <Footer>
              <Timer />
              <NextButton answer={answer} dispatchFn={dispatchFn} index={index} numQuestion={numQuestions} />
            </Footer>
          </>
        }
        {status === "finished" && <FinishScreen />}
      </Main>



    </div>
  )
}

export default App