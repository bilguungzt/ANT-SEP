const GameModel = (() => {
  console.log("GameModel");
  class GameState {
    constructor(config) {
      this.score = 0;
      this.timeLeft = config.gameDuration;
      this.gameBoardState = [];
      this.activeMoles = 0;
      this.currentSnakeBlockId = null;
      this.config = config;
    }

    resetState() {
      this.score = 0;
      this.timeLeft = this.config.gameDuration;
      this.activeMoles = 0;
      this.gameBoardState.forEach((block) => {
        block.hasMole = false;
        block.hasSnake = false;
        if (block.hideTimeoutId) {
          clearTimeout(block.hideTimeoutId);
          block.hideTimeoutId = null;
        }
      });
    }

    incrementScore() {
      this.score++;
    }

    decrementTime() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }

    addActiveMole() {
      this.activeMoles++;
    }

    removeActiveMole() {
      if (this.activeMoles > 0) {
        this.activeMoles--;
      }
    }

    setBlockMoleState(blockId, hasMole, hideTimeoutId = null) {
      const block = this.gameBoardState.find((block) => block.id === blockId);
      if (!block) {
        return;
      }
      block.hasMole = hasMole;
      if (block.hideTimeoutId && !hasMole) {
        clearTimeout(block.hideTimeoutId);
      }
      if (hasMole) {
        block.hideTimeoutId = hideTimeoutId;
      } else {
        block.hideTimeoutId = null;
      }

      if (hasMole) block.hasSnake = false;
      if (hasMole && hideTimeoutId) {
      }
    }
    setBlockSnakeState(blockId, hasSnake) {
      const block = this.getBlockState(blockId);
      if (block) {
        block.hasSnake = hasSnake;
        if (hasSnake) {
          this.currentSnakeBlockId = blockId;
          // If snake appears, remove mole from that spot
          if (block.hasMole) {
            this.setBlockMoleState(blockId, false); // This also clears mole's hide timeout
            this.removeActiveMole(); // Adjust active mole count
          }
        } else if (this.currentSnakeBlockId === blockId) {
          this.currentSnakeBlockId = null; // Clear current snake if this one is removed
        }
      }
    }

    getBlockState(blockId) {
      return this.gameBoardState.find((b) => b.id === blockId);
    }

    getEmptyBlocksForMole() {
      return this.gameBoardState.filter(
        (block) => !block.hasMole && !block.hasSnake
      );
    }
  }

  return {
    GameState,
  };
})();
