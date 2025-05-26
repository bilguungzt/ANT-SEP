const GameView = (() => {
  console.log("GameView: Module loaded.");
  const DOMStrings = {
    scoreDisplay: "#scoreDisplay",
    timeLeftDisplay: "#timeLeftDisplay",
    gameBoardElement: "#gameBoardElement",
    startGameBtn: "#startGameBtn",
    gameBlockClass: "game-block",
    hasMoleClass: "has-mole",
    hasSnakeClass: "has-snake", // New class for snake
  };

  const elements = {
    scoreDisplay: document.querySelector(DOMStrings.scoreDisplay),
    timeLeftDisplay: document.querySelector(DOMStrings.timeLeftDisplay),
    gameBoardElement: document.querySelector(DOMStrings.gameBoardElement),
    startGameBtn: document.querySelector(DOMStrings.startGameBtn),
  };

  const initBoard = (
    totalBlocks,
    moleImgSrc,
    snakeImgSrc,
    handleBlockClickCallback
  ) => {
    elements.gameBoardElement.innerHTML = "";
    const boardStatesForModel = [];
    for (let i = 0; i < totalBlocks; i++) {
      const blockElement = document.createElement("div");
      blockElement.classList.add(DOMStrings.gameBlockClass);
      blockElement.dataset.id = i;
      blockElement.addEventListener("click", () => handleBlockClickCallback(i));
      elements.gameBoardElement.appendChild(blockElement);
      boardStatesForModel.push({
        id: i,
        hasMole: false,
        hasSnake: false, // Initialize snake state
        element: blockElement,
        moleAsset: moleImgSrc, // Store mole image URL
        snakeAsset: snakeImgSrc, // Store snake image URL
        hideMoleTimeoutId: null,
      });
    }
    return boardStatesForModel;
  };

  const updateScore = (score) => {
    elements.scoreDisplay.textContent = score;
  };

  const updateTimeLeft = (timeLeft) => {
    elements.timeLeftDisplay.textContent = timeLeft;
  };

  const _createImageElement = (src, altText, fallbackText) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = altText;
    return img;
  };

  const showMole = (blockState) => {
    if (blockState && blockState.element && blockState.moleAsset) {
      blockState.element.innerHTML = "";
      blockState.element.appendChild(
        _createImageElement(blockState.moleAsset, "Mole", "Mole!")
      );
      blockState.element.classList.add(DOMStrings.hasMoleClass);
      blockState.element.classList.remove(DOMStrings.hasSnakeClass); // Ensure no snake class
    }
  };

  const hideMole = (blockState) => {
    if (blockState && blockState.element) {
      // Only clear if it's currently showing a mole and not a snake
      if (blockState.element.classList.contains(DOMStrings.hasMoleClass)) {
        blockState.element.innerHTML = "";
        blockState.element.classList.remove(DOMStrings.hasMoleClass);
      }
    }
  };

  const showSnake = (blockState) => {
    if (blockState && blockState.element && blockState.snakeAsset) {
      blockState.element.innerHTML = "";
      blockState.element.appendChild(
        _createImageElement(blockState.snakeAsset, "Snake", "Snake!")
      );
      blockState.element.classList.add(DOMStrings.hasSnakeClass);
      blockState.element.classList.remove(DOMStrings.hasMoleClass); // Ensure no mole class
    }
  };

  const hideSnake = (blockState) => {
    if (blockState && blockState.element) {
      // Only clear if it's currently showing a snake
      if (blockState.element.classList.contains(DOMStrings.hasSnakeClass)) {
        blockState.element.innerHTML = "";
        blockState.element.classList.remove(DOMStrings.hasSnakeClass);
      }
    }
  };

  const showAllSnakes = (allBlockStates) => {
    allBlockStates.forEach((blockState) => {
      showSnake(blockState); // Make every block show a snake
    });
  };

  const resetBoardVisuals = (allBlockStates) => {
    allBlockStates.forEach((blockState) => {
      hideMole(blockState);
      hideSnake(blockState); // Also hide snakes
      blockState.element.classList.remove(
        DOMStrings.hasMoleClass,
        DOMStrings.hasSnakeClass
      );
      blockState.element.innerHTML = ""; // Ensure clear
    });
  };

  const showAlert = (message) => {
    window.alert(message);
  };

  const setStartButtonState = (enabled) => {
    elements.startGameBtn.disabled = !enabled;
  };

  const setBoardClickable = (isClickable) => {
    if (isClickable) {
      elements.gameBoardElement.style.pointerEvents = "auto";
    } else {
      elements.gameBoardElement.style.pointerEvents = "none";
    }
  };

  return {
    initBoard,
    updateScore,
    updateTimeLeft,
    showMole,
    hideMole,
    showSnake,
    hideSnake,
    showAllSnakes,
    resetBoardVisuals,
    showAlert,
    setStartButtonState,
    setBoardClickable,
    getStartButtonElement: () => elements.startGameBtn,
  };
})();
