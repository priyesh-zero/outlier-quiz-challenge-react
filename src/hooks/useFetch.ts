import { useState, useEffect } from "react";

import { Question } from "../interface/question";

type UseFetchType = (url: string) => [Question[], boolean, Error | null];

export const useFetch: UseFetchType = (url) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);
  return [questions, loading, error];
};
