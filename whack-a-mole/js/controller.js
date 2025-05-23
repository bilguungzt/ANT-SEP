const GameController = ((assetLoader, model, view) => {
  console.log("GameController: Module loaded.");
  const { GameState } = model;
  let gameStateInstance;
  let gameConfig;

  let moleIntervalId = null;
  let timerIntervalId = null;
  let gameIsRunning = false;

  const handleBlockClick = (blockId) => {
    if (!gameIsRunning || gameStateInstance.timeLeft <= 0) {
      return;
    }

    const clickedBlockState = gameStateInstance.getBlockState(blockId);
    if (clickedBlockState && clickedBlockState.hasMole) {
      console.log(`Mole found at block ${blockId}!`);
      gameStateInstance.incrementScore();

      gameStateInstance.setBlockMoleState(blockId, false);

      gameStateInstance.removeActiveMole();

      view.updateScore(gameStateInstance.score);
      view.hideMole(clickedBlockState);
      console.log(
        `Mole whacked at block ${blockId}. Current Score: ${
          gameStateInstance.score
        }. Model thinks block ${blockId} 'hasMole': ${
          gameStateInstance.getBlockState(blockId).hasMole
        }`
      );
    } else {
      console.log(`No mole or invalid block state at block ${blockId}.`);
    }
  };

  const spawnMole = () => {
    if (
      !gameIsRunning ||
      gameStateInstance.activeMoles >= gameConfig.maxMoles ||
      gameStateInstance.timeLeft <= 0
    ) {
      if (gameStateInstance.activeMoles >= gameConfig.maxMoles)
        console.log("Max moles reached, not spawning.");
      return;
    }

    const emptyBlocks = gameStateInstance.getEmptyBlocks();
    if (emptyBlocks.length === 0) {
      console.log("No empty blocks to spawn a mole.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyBlocks.length);
    const blockToSpawnIn = emptyBlocks[randomIndex];

    console.log(`Attempting to spawn mole in block ID: ${blockToSpawnIn.id}`);
    gameStateInstance.addActiveMole();

    const hideTimeoutId = setTimeout(() => {
      const currentBlockStateForTimeout = gameStateInstance.getBlockState(
        blockToSpawnIn.id
      );
      if (currentBlockStateForTimeout && currentBlockStateForTimeout.hasMole) {
        console.log(
          `GameController: Mole at block ${blockToSpawnIn.id} timed out. Hiding it.`
        );
        gameStateInstance.setBlockMoleState(blockToSpawnIn.id, false); // Model updated
        gameStateInstance.removeActiveMole(); // Model updated
        view.hideMole(currentBlockStateForTimeout); // View updated
      } else {
      }
    }, gameConfig.moleVisibleDuration);

    gameStateInstance.setBlockMoleState(blockToSpawnIn.id, true, hideTimeoutId);
    view.showMole(blockToSpawnIn);
  };

  const updateTimer = () => {
    if (!gameIsRunning) return;
    gameStateInstance.decrementTime();
    view.updateTimeLeft(gameStateInstance.timeLeft);

    if (gameStateInstance.timeLeft <= 0) {
      endGame();
    }
  };

  const startGame = () => {
    gameIsRunning = true;
    gameStateInstance.resetState();

    view.updateScore(gameStateInstance.score);
    view.updateTimeLeft(gameStateInstance.timeLeft);
    view.resetBoardVisuals(gameStateInstance.gameBoardState);

    if (moleIntervalId) {
      clearInterval(moleIntervalId);
    }
    if (timerIntervalId) {
      console.log("Clearing existing timerIntervalId:", timerIntervalId);
      clearInterval(timerIntervalId);
    }

    moleIntervalId = setInterval(spawnMole, gameConfig.moleAppearanceRate);
    timerIntervalId = setInterval(updateTimer, 1000);
    console.log(
      "Mole spawn interval SET:",
      moleIntervalId,
      "Rate:",
      gameConfig.moleAppearanceRate
    );
    console.log("Game timer interval SET:", timerIntervalId);

    view.setBoardClickable(true);
    view.setStartButtonState(false);
  };

  const endGame = () => {
    console.log(gameStateInstance.score);
    gameIsRunning = false;
    console.log("GameController: gameIsRunning SET to false.");

    if (moleIntervalId) {
      console.log("Clearing moleIntervalId:", moleIntervalId);
      clearInterval(moleIntervalId);
      moleIntervalId = null;
    }

    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }

    gameStateInstance.gameBoardState.forEach((block) => {
      if (block.hideTimeoutId) {
        console.log(`Clearing hideTimeoutId for block ${block.id}`);
        clearTimeout(block.hideTimeoutId);
        if (block.hasMole) {
          gameStateInstance.setBlockMoleState(block.id, false);
          gameStateInstance.removeActiveMole();
          view.hideMole(block);
        }
      }
    });

    view.showAlert(`Time is Over! Your score: ${gameStateInstance.score}`);

    view.setBoardClickable(false);

    view.setStartButtonState(true);
  };

  const bootstrap = () => {
    console.log("bootstrap() called.");
    assetLoader
      .getGameConfig()
      .then((config) => {
        gameConfig = config;
        gameStateInstance = new GameState(gameConfig);
        const initialBoardStatesFromView = view.initBoard(
          gameConfig.totalBlocks,
          gameConfig.moleImageURL,
          handleBlockClick
        );
        gameStateInstance.gameBoardState = initialBoardStatesFromView;

        view.getStartButtonElement().addEventListener("click", startGame);

        view.setBoardClickable(false);
        view.updateScore(gameStateInstance.score);
        view.updateTimeLeft(gameStateInstance.timeLeft);
      })
      .catch((error) => {
        console.error("Error during bootstrap:", error);
        view.showAlert("Error loading game configuration!");
      });
  };

  return {
    bootstrap,
  };
})(AssetLoader, GameModel, GameView);

document.addEventListener("DOMContentLoaded", GameController.bootstrap);
