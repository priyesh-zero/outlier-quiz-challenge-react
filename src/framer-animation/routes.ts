const transition = {
  duration: 0.5,
};

export const routeVariants = {
  entry: {
    x: 2000,
    opacity: 0,
    transition,
  },
  stage: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: -2000,
    opacity: 0,
    transition,
  },
};
