export const randomizeArray = (array: string[]) =>
  new Promise<string[]>((resolve) => {
    const randomizeArrayStage: string[] = [];
    for (let i = 0; i < array.length; i++) {
      const filteredArray = array.filter(
        (entry) => randomizeArrayStage.indexOf(entry) === -1
      );

      randomizeArrayStage.push(
        decodeURIComponent(
          filteredArray[Math.floor(Math.random() * (filteredArray.length - 1))]
        )
      );
      if (randomizeArrayStage.length === array.length) {
        resolve(randomizeArrayStage);
      }
    }
  });
