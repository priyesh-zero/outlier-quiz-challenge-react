import React, { FC } from "react";

import { FullStar } from "./rating/FullStar";
import { EmptyStar } from "./rating/EmptyStar";

const difficultyLevel = {
  easy: 1,
  medium: 2,
  hard: 3,
};

interface RatingProps {
  difficulty: string;
}

export const Rating: FC<RatingProps> = ({ difficulty }) => {
  const level = difficultyLevel[difficulty];
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < level) {
      stars.push(<FullStar />);
    } else {
      stars.push(<EmptyStar />);
    }
  }
  return <div className="d-flex">{stars}</div>;
};
