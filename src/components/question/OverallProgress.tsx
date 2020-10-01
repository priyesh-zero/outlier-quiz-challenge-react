import React, { useContext } from "react";
import { QuizContext } from "../../providers/contexts/QuizContext";

export const OverallProgress = () => {
  const { minScore, maxScore, actualScore } = useContext(QuizContext);
  const scores = [
    { score: actualScore, class: "bg-success" },
    { score: maxScore, class: "bg-info" },
    { score: minScore, class: "bg-warning" },
  ];

  return (
    <div className="m-5">
      <div className="d-flex align-items-center justify-content-between">
        <span className="text-white">Score: {actualScore}%</span>
        <span className="text-white">Max. Score: {maxScore}%</span>
      </div>
      <div
        className={`position-relative rounded overflow-hidden bg-light`}
        style={{ height: "2rem", boxSizing: "border-box" }}
      >
        {scores
          .sort((a, b) => b.score - a.score)
          .map((score) => (
            <div
              key={score.class}
              className={`${score.class} position-absolute h-100 rounded`}
              style={{ width: `${score.score}%`, transition: "all 300ms ease" }}
            />
          ))}
      </div>
    </div>
  );
};
