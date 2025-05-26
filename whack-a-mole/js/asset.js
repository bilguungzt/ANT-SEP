const AssetLoader = (() => {
  const config = {
    gameDuration: 30,
    moleAppearanceRate: 1000,
    moleVisibleDuration: 2000,
    snakeAppearanceRate: 2000,
    totalBlocks: 12,
    maxMoles: 3,
    moleImageURL: "mole.jpeg",
    snakeImageURL: "snake.png",
  };

  const getGameConfig = () => {
    return Promise.resolve(config);
  };

  return {
    getGameConfig,
  };
})();
