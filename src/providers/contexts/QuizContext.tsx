import React, {
  createContext,
  FC,
  useState,
  useEffect,
  useCallback,
} from "react";

import { Question } from "../../interface/question";
import { useFetch } from "../../hooks/useFetch";
import { questionsUrl } from "../../constant";

const dummyQuestions: Question[] = [];

type GetCurrentQuestion = () => Question | null;

interface IQuizContext {
  questions: Question[];
  loading: boolean;
  nextQuestion: () => void;
  currentQuestion: number;
  getCurrentQuestion: GetCurrentQuestion;
}

export const QuizContext = createContext<IQuizContext>({
  questions: dummyQuestions,
  loading: false,
  nextQuestion: () => {},
  currentQuestion: 0,
  getCurrentQuestion: () => {
    return null;
  },
});

export const QuizProvider: FC<{}> = ({ children }) => {
  const localQuestions = window.localStorage.getItem("questions")
    ? JSON.parse(window.localStorage.getItem("questions")!)
    : [];
  const [data, loading] = useFetch(questionsUrl);
  const [questions, setQuestions] = useState<Question[]>(localQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  return (
    <QuizContext.Provider
      value={{
        questions,
        loading,
        nextQuestion,
        currentQuestion,
        getCurrentQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
