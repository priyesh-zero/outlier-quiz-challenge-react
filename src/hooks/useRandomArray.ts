import { useEffect, useState } from "react";

export const useRandomArray = (array: string[]) => {
  const [randomizeArray, setRandomizeArray] = useState<string[]>([]);
  useEffect(() => {
    const randomizeArrayStage: string[] = [];
    for (let i = 0; i < array.length; i++) {
      const filteredArray = array.filter(
        (entry) => randomizeArrayStage.indexOf(entry) === -1
      );
      randomizeArrayStage.push(
        filteredArray[Math.floor(Math.random() * (filteredArray.length - 1))]
      );
    }
    setRandomizeArray(randomizeArrayStage);
  }, [array]);
  return randomizeArray;
};
