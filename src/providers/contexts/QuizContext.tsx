import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";

import { Question } from "../../interface/question";
import { useFetch } from "../../hooks/useFetch";
import { questionsUrl } from "../../constant";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";

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
  checkAuth: () => boolean;
  persistScore: () => void;
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
  checkAuth: () => false,
  persistScore: () => {},
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
  const users = JSON.parse(window.localStorage.getItem("users") || "{}");
  const { name } = useContext(UserContext);

  useEffect(() => {
    if (questions.length === 0 && data.length > 0) {
      window.localStorage.setItem("questions", JSON.stringify(data));
      setQuestions(data);
    }
  }, [data, questions.length]);

  const nextQuestion = useCallback(() => {
    setCurrentQuestion((state) => state + 1);
  }, []);

  const checkAuth = useCallback(() => {
    if (name === "") return false;
    return Object.keys(users).indexOf(name) === -1;
  }, [name, users]);

  const persistScore = useCallback(() => {
    users[name] = { maxScore, actualScore, minScore };
    window.localStorage.setItem("users", JSON.stringify(users));
  }, [name, users, actualScore, minScore, maxScore]);

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
    [currentQuestion, questions, history]
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
        checkAuth,
        persistScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
