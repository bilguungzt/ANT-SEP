const AssetLoader = (() => {
  const config = {
    gameDuration: 30,
    moleAppearanceRate: 1000,
    moleVisibleDuration: 1500,
    totalBlocks: 12,
    maxMoles: 3,
    moleImageURL: "mole.jpeg",
  };

  const getGameConfig = () => {
    console.log("getGameConfig() called");
    return Promise.resolve(config);
  };

  return {
    getGameConfig,
  };
})();
