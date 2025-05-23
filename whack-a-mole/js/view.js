const GameView = (() => {
  console.log("GameView: Module loaded.");
  const DOMStrings = {
    scoreDisplay: "#scoreDisplay",
    timeLeftDisplay: "#timeLeftDisplay",
    gameBoardElement: "#gameBoardElement",
    startGameBtn: "#startGameBtn",
    gameBlockClass: "game-block",
    hasMoleClass: "has-mole",
  };

  const elements = {
    scoreDisplay: document.querySelector(DOMStrings.scoreDisplay),
    timeLeftDisplay: document.querySelector(DOMStrings.timeLeftDisplay),
    gameBoardElement: document.querySelector(DOMStrings.gameBoardElement),
    startGameBtn: document.querySelector(DOMStrings.startGameBtn),
  };

  const initBoard = (totalBlocks, moleAsset, handleBlockClickCallback) => {
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
        element: blockElement,
        moleAsset: moleAsset,
        hideTimeoutId: null,
      });
    }
    console.log(
      `Initialized board with ${totalBlocks} blocks. Mole asset: ${moleAsset}`
    );
    return boardStatesForModel;
  };

  const updateScore = (score) => {
    elements.scoreDisplay.textContent = score;
    console.log(`Displayed score: ${score}`);
  };

  const updateTimeLeft = (timeLeft) => {
    elements.timeLeftDisplay.textContent = timeLeft;
  };

  const showMole = (blockState) => {
    if (blockState && blockState.element && blockState.moleAsset) {
      blockState.element.innerHTML = "";

      const img = document.createElement("img");
      img.src = blockState.moleAsset;
      img.alt = "Mole";
      blockState.element.appendChild(img);

      blockState.element.classList.add(DOMStrings.hasMoleClass);
    } else {
      console.warn(
        `Invalid blockState, element, or moleAsset for ID: ${
          blockState ? blockState.id : "unknown"
        }`
      );
    }
  };

  const hideMole = (blockState) => {
    if (blockState && blockState.element) {
      blockState.element.innerHTML = "";
      blockState.element.classList.remove(DOMStrings.hasMoleClass);
      console.log(`hideMole() Mole hidden in block ID: ${blockState.id}`);
    } else {
      console.warn(
        `Invalid blockState or element for ID: ${
          blockState ? blockState.id : "unknown"
        }`
      );
    }
  };

  const resetBoardVisuals = (allBlockStates) => {
    console.log("resetBoardVisuals() called.");
    allBlockStates.forEach((blockState) => {
      hideMole(blockState);
    });
  };

  const showAlert = (message) => {
    window.alert(message);
  };

  const setStartButtonState = (enabled) => {
    elements.startGameBtn.disabled = !enabled;
  };

  function setBoardClickable(isClickable) {
    if (isClickable) {
      elements.gameBoardElement.style.pointerEvents = "auto";
    } else {
      elements.gameBoardElement.style.pointerEvents = "none";
    }
  }

  return {
    initBoard,
    updateScore,
    updateTimeLeft,
    showMole,
    hideMole,
    resetBoardVisuals,
    showAlert,
    setStartButtonState,
    setBoardClickable,
    getStartButtonElement: () => elements.startGameBtn,
  };
})();
