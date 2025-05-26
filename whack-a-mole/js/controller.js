const GameController = ((assetLoader, model, view) => {
  const { GameState } = model;
  let gameStateInstance;
  let gameConfig;

  let moleIntervalId = null;
  let timerIntervalId = null;
  let snakeIntervalId = null; // For snake spawning
  let gameIsRunning = false;

  const handleBlockClick = (blockId) => {
    if (!gameIsRunning || gameStateInstance.timeLeft <= 0) return;

    const clickedBlockState = gameStateInstance.getBlockState(blockId);
    if (!clickedBlockState) return;

    if (clickedBlockState.hasSnake) {
      endGame("snake_clicked");
    } else if (clickedBlockState.hasMole) {
      gameStateInstance.incrementScore();
      gameStateInstance.setBlockMoleState(blockId, false);
      gameStateInstance.removeActiveMole();
      view.updateScore(gameStateInstance.score);
      view.hideMole(clickedBlockState);
    }
  };

  const spawnMole = () => {
    if (
      !gameIsRunning ||
      gameStateInstance.activeMoles >= gameConfig.maxMoles ||
      gameStateInstance.timeLeft <= 0
    ) {
      if (gameStateInstance.activeMoles >= gameConfig.maxMoles) return;
    }

    const emptyBlocks = gameStateInstance.getEmptyBlocksForMole();
    if (emptyBlocks.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyBlocks.length);
    const blockToSpawnIn = emptyBlocks[randomIndex];

    gameStateInstance.addActiveMole();

    const hideMoleTimeoutId = setTimeout(() => {
      const currentBlockStateForTimeout = gameStateInstance.getBlockState(
        blockToSpawnIn.id
      );
      if (currentBlockStateForTimeout && currentBlockStateForTimeout.hasMole) {
        gameStateInstance.setBlockMoleState(blockToSpawnIn.id, false);
        gameStateInstance.removeActiveMole();
        view.hideMole(currentBlockStateForTimeout);
      }
    }, gameConfig.moleVisibleDuration);

    gameStateInstance.setBlockMoleState(
      blockToSpawnIn.id,
      true,
      hideMoleTimeoutId
    );
    view.showMole(blockToSpawnIn);
  };

  const spawnSnake = () => {
    if (!gameIsRunning || gameStateInstance.timeLeft <= 0) return;

    // Hide previous snake if one exists
    if (gameStateInstance.currentSnakeBlockId !== null) {
      const prevSnakeBlock = gameStateInstance.getBlockState(
        gameStateInstance.currentSnakeBlockId
      );
      if (prevSnakeBlock) {
        gameStateInstance.setBlockSnakeState(prevSnakeBlock.id, false);
        view.hideSnake(prevSnakeBlock);
      }
    }

    const randomBlockIndex = Math.floor(Math.random() * gameConfig.totalBlocks);
    const blockToSpawnSnakeIn =
      gameStateInstance.getBlockState(randomBlockIndex);

    if (blockToSpawnSnakeIn) {
      gameStateInstance.setBlockSnakeState(blockToSpawnSnakeIn.id, true);
      view.showSnake(blockToSpawnSnakeIn);
    }
  };

  const updateTimer = () => {
    if (!gameIsRunning) return;
    gameStateInstance.decrementTime();
    view.updateTimeLeft(gameStateInstance.timeLeft);

    if (gameStateInstance.timeLeft <= 0) {
      endGame("time_up");
    }
  };

  const startGame = () => {
    gameIsRunning = true;
    gameStateInstance.resetState();

    view.updateScore(gameStateInstance.score);
    view.updateTimeLeft(gameStateInstance.timeLeft);
    view.resetBoardVisuals(gameStateInstance.gameBoardState);

    // Clear any existing intervals
    if (moleIntervalId) clearInterval(moleIntervalId);
    if (timerIntervalId) clearInterval(timerIntervalId);
    if (snakeIntervalId) clearInterval(snakeIntervalId);

    moleIntervalId = setInterval(spawnMole, gameConfig.moleAppearanceRate);
    timerIntervalId = setInterval(updateTimer, 1000);
    snakeIntervalId = setInterval(spawnSnake, gameConfig.snakeAppearanceRate); // Start snake spawning

    view.setBoardClickable(true);
    view.setStartButtonState(false);
  };

  const endGame = (reason) => {
    gameIsRunning = false;

    if (moleIntervalId) clearInterval(moleIntervalId);
    if (timerIntervalId) clearInterval(timerIntervalId);
    if (snakeIntervalId) clearInterval(snakeIntervalId); // Stop snake spawning
    moleIntervalId = null;
    timerIntervalId = null;
    snakeIntervalId = null;

    // Clear any pending mole auto-hide timeouts
    gameStateInstance.gameBoardState.forEach((block) => {
      if (block.hideMoleTimeoutId) {
        clearTimeout(block.hideMoleTimeoutId);
      }
    });

    let alertMessage = "";
    if (reason === "snake_clicked") {
      alertMessage =
        "Game Over! You clicked a snake! Your score: " +
        gameStateInstance.score;
      view.showAllSnakes(gameStateInstance.gameBoardState); // Show all snakes
    } else if (reason === "time_up") {
      alertMessage = "Time is Over! Your score: " + gameStateInstance.score;
    } else {
      alertMessage = "Game Over! Your score: " + gameStateInstance.score;
    }
    view.showAlert(alertMessage);

    view.setBoardClickable(false);
    view.setStartButtonState(true);
  };

  const bootstrap = () => {
    assetLoader
      .getGameConfig()
      .then((config) => {
        gameConfig = config;
        gameStateInstance = new GameState(gameConfig);
        const initialBoardStatesFromView = view.initBoard(
          gameConfig.totalBlocks,
          gameConfig.moleImageURL,
          gameConfig.snakeImageURL,
          handleBlockClick
        );
        gameStateInstance.gameBoardState = initialBoardStatesFromView;

        view.getStartButtonElement().addEventListener("click", startGame);

        view.setBoardClickable(false);
        view.updateScore(gameStateInstance.score);
        view.updateTimeLeft(gameStateInstance.timeLeft);
      })
      .catch((error) => {
        console.error("GameController: Error during bootstrap:", error);
        view.showAlert("Error loading game configuration!");
      });
  };

  return {
    bootstrap,
  };
})(AssetLoader, GameModel, GameView);

document.addEventListener("DOMContentLoaded", GameController.bootstrap);
