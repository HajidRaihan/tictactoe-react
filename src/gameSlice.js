// gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  squares: Array(9).fill(null),
  nextValue: "X",
  winner: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectSquare(state, action) {
      if (state.squares[action.payload] || state.winner) {
        return state;
      }

      state.squares[action.payload] = state.nextValue;

      const winner = calculateWinner(state.squares);
      const nextValue = state.nextValue === "X" ? "O" : "X";

      state.winner = winner;
      state.nextValue = winner ? state.nextValue : nextValue;
    },

    restart(state) {
      Object.assign(state, initialState);
    },
  },
});

// Helper function for determining the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const { selectSquare, restart } = gameSlice.actions;
export default gameSlice.reducer;
