import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { Question } from "../../interface/question";
import { useFetch } from "../../hooks/useFetch";
import { questionsUrl } from "../../constant";
import { useHistory } from "react-router";

const dummyQuestions: Question[] = [];

type GetCurrentQuestion = () => Question | null;

interface IQuizContext {
  questions: Question[];
  loading: boolean;
  nextQuestion: () => void;
  currentQuestion: number;
  getCurrentQuestion: GetCurrentQuestion;
  minScore: number;
  maxScore: number;
  actualScore: number;
  progress: (_: boolean) => void;
  hasCompleted: () => boolean;
}

export const QuizContext = createContext<IQuizContext>({
  questions: dummyQuestions,
  loading: false,
  nextQuestion: () => {},
  currentQuestion: 0,
  getCurrentQuestion: () => {
    return null;
  },
  minScore: 0,
  maxScore: 0,
  actualScore: 0,
  progress: (_) => {},
  hasCompleted: () => false,
});

export const QuizProvider: FC<{}> = ({ children }) => {
  const localQuestions = window.localStorage.getItem("questions")
    ? JSON.parse(window.localStorage.getItem("questions")!)
    : [];
  const [data, loading] = useFetch(questionsUrl);
  const [questions, setQuestions] = useState<Question[]>(localQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const correctAnswer = useRef(0);
  const incorrectAnswer = useRef(0);
  const [actualScore, setActualScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [minScore, setMinScore] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (questions.length === 0 && data.length > 0) {
      window.localStorage.setItem("questions", JSON.stringify(data));
      setQuestions(data);
    }
  }, [data]);

  const nextQuestion = useCallback(() => {
    setCurrentQuestion((state) => state + 1);
  }, []);

  const getCurrentQuestion: GetCurrentQuestion = () => {
    if (!questions) return null;
    if (currentQuestion < 0) return null;
    return questions[currentQuestion];
  };

  const progress = useCallback(
    (result: boolean) => {
      result ? correctAnswer.current++ : incorrectAnswer.current++;
      setMinScore(Math.ceil((correctAnswer.current / questions.length) * 100));
      setMaxScore(
        Math.ceil(
          ((questions.length - incorrectAnswer.current) / questions.length) *
            100
        )
      );
      setActualScore(
        Math.ceil(
          (correctAnswer.current /
            (correctAnswer.current + incorrectAnswer.current)) *
            100
        )
      );
      if (questions.length - 1 === currentQuestion) {
        history.push("/quiz/complete");
      } else {
        setCurrentQuestion((state) => state + 1);
      }
    },
    [currentQuestion, questions]
  );

  const hasCompleted = useCallback(
    () => questions.length - 1 === currentQuestion,
    [currentQuestion, questions]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        loading,
        nextQuestion,
        currentQuestion,
        getCurrentQuestion,
        minScore,
        maxScore,
        actualScore,
        progress,
        hasCompleted,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
