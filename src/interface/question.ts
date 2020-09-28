export interface Question {
  category: string;
  question: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
}
