const GameModel = (() => {
  console.log("GameModel");
  class GameState {
    constructor(config) {
      this.score = 0;
      this.timeLeft = config.gameDuration;
      this.gameBoardState = [];
      this.activeMoles = 0;
      this.config = config;
      console.log(
        "GameModel Constructor ... Initialized with config. Score:",
        this.score,
        "TimeLeft:",
        this.timeLeft,
        "ActiveMoles:",
        this.activeMoles
      );
    }

    resetState() {
      console.log(
        "GameModel resetState() called. Current Score:",
        this.score,
        "TimeLeft:",
        this.timeLeft,
        "ActiveMoles:",
        this.activeMoles
      );
      this.score = 0;
      this.timeLeft = this.config.gameDuration;
      this.activeMoles = 0;
      this.gameBoardState.forEach((block) => {
        block.hasMole = false;
        if (block.hideTimeoutId) {
          console.log(`Clearing hideTimeoutId for block ${block.id}`);
          clearTimeout(block.hideTimeoutId);
          block.hideTimeoutId = null;
        }
      });
      console.log(
        "GameModel State AFTER reset. Score:",
        this.score,
        "TimeLeft:",
        this.timeLeft,
        "ActiveMoles:",
        this.activeMoles
      );
    }

    incrementScore() {
      this.score++;
      console.log("GameModel incrementScore() New score:", this.score);
    }

    decrementTime() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }

    addActiveMole() {
      this.activeMoles++;
      console.log(
        "GameModel (GameState): addActiveMole() - Active moles:",
        this.activeMoles
      );
    }

    removeActiveMole() {
      if (this.activeMoles > 0) {
        this.activeMoles--;
      }
      console.log(
        "GameModel  removeActiveMole() - Active moles:",
        this.activeMoles
      );
    }

    setBlockMoleState(blockId, hasMole, hideTimeoutId = null) {
      const block = this.gameBoardState.find((block) => block.id === blockId);
      if (!block) {
        console.warn(`Block with ID ${blockId} not found.`);
        return;
      }
      block.hasMole = hasMole;
      if (block.hideTimeoutId && !hasMole) {
        clearTimeout(block.hideTimeoutId);
      }
      block.hideTimeoutId = hasMole ? hideTimeoutId : null;
      if (hasMole && hideTimeoutId) {
        console.log(`Saved timeout ID for block ${blockId}`);
      }
    }

    getBlockState(blockId) {
      return this.gameBoardState.find((b) => b.id === blockId);
    }

    getEmptyBlocks() {
      const emptyBlocks = this.gameBoardState.filter((block) => !block.hasMole);
      return emptyBlocks;
    }
  }

  return {
    GameState,
  };
})();
