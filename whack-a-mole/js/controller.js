const GameController = ((assetLoader, model, view) => {
  console.log("GameController: Module loaded.");
  const { GameState } = model;
  let gameStateInstance;
  let gameConfig;

  let moleIntervalId = null;
  let timerIntervalId = null;
  let gameIsRunning = false;

  const handleBlockClick = (blockId) => {
    console.log(
      `GameController: handleBlockClick() - Block ID: ${blockId} clicked. Game running: ${gameIsRunning}, Time left: ${gameStateInstance.timeLeft}`
    );
    if (!gameIsRunning || gameStateInstance.timeLeft <= 0) {
      return;
    }

    const clickedBlockState = gameStateInstance.getBlockState(blockId);
    if (clickedBlockState && clickedBlockState.hasMole) {
      console.log(`GameController: Mole found at block ${blockId}!`);
      gameStateInstance.incrementScore();

      if (clickedBlockState.hideTimeoutId) {
        clearTimeout(clickedBlockState.hideTimeoutId);
      }

      view.updateScore(gameStateInstance.score);
      view.hideMole(clickedBlockState);
    } else {
      console.log(
        `GameController: No mole or invalid block state at block ${blockId}.`
      );
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

    console.log(
      `GameController: Attempting to spawn mole in block ID: ${blockToSpawnIn.id}`
    );
    gameStateInstance.addActiveMole();

    const hideTimeoutId = setTimeout(() => {
      const currentBlockState = gameStateInstance.getBlockState(
        blockToSpawnIn.id
      );
      if (currentBlockState && currentBlockState.hasMole) {
        console.log(
          `GameController: Mole at block ${blockToSpawnIn.id} timed out. Hiding it.`
        );
        gameStateInstance.setBlockMoleState(blockToSpawnIn.id, false); // Model updated
        gameStateInstance.removeActiveMole(); // Model updated
        view.hideMole(currentBlockState); // View updated
      } else {
      }
    }, gameConfig.moleVisibleDuration);

    gameStateInstance.setBlockMoleState(blockToSpawnIn.id, true, hideTimeoutId);
    view.showMole(blockToSpawnIn);
    console.log(
      `GameController: Mole spawned at block ${blockToSpawnIn.id}. Active moles: ${gameStateInstance.activeMoles}. Auto-hide ID: ${hideTimeoutId}`
    );
  };

  const updateTimer = () => {
    if (!gameIsRunning) return;
    gameStateInstance.decrementTime();
    view.updateTimeLeft(gameStateInstance.timeLeft);

    if (gameStateInstance.timeLeft <= 0) {
      console.log("Time is up! Ending game.");
      endGame();
    }
  };

  const startGame = () => {
    console.log("startGame() called.");
    gameIsRunning = true;
    console.log("gameIsRunning SET to true.");
    gameStateInstance.resetState();

    view.updateScore(gameStateInstance.score);
    view.updateTimeLeft(gameStateInstance.timeLeft);
    view.resetBoardVisuals(gameStateInstance.gameBoardState);

    if (moleIntervalId) {
      console.log("Clearing existing moleIntervalId:", moleIntervalId);
      clearInterval(moleIntervalId);
    }
    if (timerIntervalId) {
      console.log("Clearing existing timerIntervalId:", timerIntervalId);
      clearInterval(timerIntervalId);
    }

    moleIntervalId = setInterval(spawnMole, gameConfig.moleAppearanceRate);
    timerIntervalId = setInterval(updateTimer, 1000);
    console.log(
      "GameController: Mole spawn interval SET:",
      moleIntervalId,
      "Rate:",
      gameConfig.moleAppearanceRate
    );

    view.setBoardClickable(true);
    view.setStartButtonState(false);
    console.log("Game started successfully.");
  };

  const endGame = () => {
    gameIsRunning = false;
    console.log("gameIsRunning SET to false.");

    if (moleIntervalId) {
      console.log("Clearing moleIntervalId:", moleIntervalId);
      clearInterval(moleIntervalId);
      moleIntervalId = null;
    }

    if (timerIntervalId) {
    }

    gameStateInstance.gameBoardState.forEach((block) => {
      if (block.hideTimeoutId) {
        clearTimeout(block.hideTimeoutId);
        if (block.hasMole) {
          gameStateInstance.setBlockMoleState(block.id, false);
          gameStateInstance.removeActiveMole();
          view.hideMole(block);
        }
      }
    });

    view.showAlert(`Time is Over! Your score: ${gameStateInstance.score}`);

    view.setStartButtonState(true);
    console.log("Game ended.");
  };

  const bootstrap = () => {
    console.log("bootstrap() called.");
    assetLoader
      .getGameConfig()
      .then((config) => {
        gameConfig = config;
        console.log("Game configuration loaded:", gameConfig);
        gameStateInstance = new GameState(gameConfig);
        const initialBoardStatesFromView = view.initBoard(
          gameConfig.totalBlocks,
          gameConfig.moleImageURL,
          handleBlockClick
        );
        gameStateInstance.gameBoardState = initialBoardStatesFromView;

        view.getStartButtonElement().addEventListener("click", startGame);
        console.log("Start button event");

        view.setBoardClickable(false);
        view.updateScore(gameStateInstance.score);
        view.updateTimeLeft(gameStateInstance.timeLeft);
      })
      .catch((error) => {
        console.error("Error during bootstrap", error);
        view.showAlert("Error loading game configuration!");
      });
  };

  return {
    bootstrap,
  };
})(AssetLoader, GameModel, GameView);

console.log("Adding DOMContentLoaded.");
document.addEventListener("DOMContentLoaded", GameController.bootstrap);
