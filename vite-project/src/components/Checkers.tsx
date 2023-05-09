import React, { useCallback, useState } from "react";

const Checkers = () => {
  const [board, setBoard] = useState([
    ["", "X", "", "X", "", "X", "", "X"],
    ["X", "", "X", "", "X", "", "X", ""],
    ["", "X", "", "X", "", "X", "", "X"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["O", "", "O", "", "O", "", "O", ""],
    ["", "O", "", "O", "", "O", "", "O"],
    ["O", "", "O", "", "O", "", "O", ""],
  ]);

  const [turn, setTurn] = useState({ piece: "O", king: "KO" });
  const [passedTiles, setPassedTiles] = useState<number[][] | null>(null);
  let draggedPiece: { row: number | null; col: number | null } = {
    row: null,
    col: null,
  };

  const legalMove = (
    row: number,
    col: number
  ): [boolean, [number, number] | null] => {
    if (draggedPiece.row !== null && draggedPiece.col !== null) {
      const fromRow = draggedPiece.row;
      const fromCol = draggedPiece.col;
      const piece = board[fromRow][fromCol];
      if (
        (board[row][col] === "" && piece === turn.piece) ||
        piece === turn.king
      ) {
        const isKing = piece === "KX" || piece === "KO";
        const dy = row - fromRow;
        const dx = col - fromCol;
        const isDiagonal = Math.abs(dy) === Math.abs(dx);
        const isForward = piece === "X" ? dy === 1 : dy === -1;

        const isEating = piece === "X" ? dy === 2 : dy === -2;
        const leftAttack = col - fromCol < 0;
        const tilesPassed = [];
        const boardTilesPassed = [];
        for (let i = 1; i < Math.abs(dx); i++) {
          const passedRow = fromRow + Math.sign(dy) * i;
          const passedCol = fromCol + Math.sign(dx) * i;
          tilesPassed.push([passedRow, passedCol]);
          boardTilesPassed.push(board[passedRow][passedCol]);
        }

        if (isKing && isDiagonal) {
          const illegalKingAttack = boardTilesPassed.some((tile) =>
            piece === "KO"
              ? tile === "O" || tile === "KO"
              : tile === "K" || tile === "KO"
          );
          if (!illegalKingAttack) {
            const isEating = boardTilesPassed.some((tile) =>
              piece === "KO" ? tile === "X" : tile === "O"
            );
            if (isEating) {
              let isOverDouble = false;
              for (let i = 0; i < boardTilesPassed.length; i++) {
                isOverDouble = boardTilesPassed[i] === boardTilesPassed[i - 1];
              }
              if (!isOverDouble) {
                const attackedPiece = tilesPassed.filter(
                  (tile) =>
                    board[tile[0]][tile[1]] === "X" ||
                    board[tile[0]][tile[1]] === "KX"
                );
                // console.log(attackedPiece.length);
                // return [true, null];
              }
            } else {
              return [true, null];
            }
            // setPassedTiles(tilesPassed);
          }
        }
        if (isDiagonal && isForward) {
          return [true, null];
        } else if (isEating && isDiagonal) {
          const opponentRow =
            piece === "X" ? draggedPiece.row + 1 : draggedPiece.row - 1;
          const leftCol = col - 1;
          const rightCol = col + 1;
          const legalAttackMove =
            piece === "X"
              ? board[opponentRow][rightCol] === "O" ||
                board[opponentRow][leftCol] === "O"
              : (piece === "O" && board[opponentRow][rightCol] === "X") ||
                board[opponentRow][leftCol] === "X";
          if (legalAttackMove) {
            // console.log(tilesPassed);

            if (leftAttack) {
              return [true, [tilesPassed[0][0], tilesPassed[0][1]]];
            } else {
              return [true, [opponentRow, leftCol]];
            }
          }
        }
      }
    }
    return [false, null];
  };

  const handleDragStart = useCallback(
    (row: number, col: number) => {
      if (
        board[row][col] === "X" ||
        board[row][col] === "KX" ||
        board[row][col] === "O" ||
        board[row][col] === "KO"
      ) {
        draggedPiece.row = row;
        draggedPiece.col = col;
      }
    },
    [board]
  );

  const RenderSquare = ({
    i,
    row,
    col,
  }: {
    i: number;
    row: number;
    col: number;
  }) => {
    const handleDrop = (
      e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      e.preventDefault();
      if (draggedPiece.row !== null && draggedPiece.col !== null) {
        const [isLegalMove, opponentLoc] = legalMove(row, col);
        if (isLegalMove) {
          const newBoard = [...board];
          newBoard[row][col] = board[draggedPiece.row][draggedPiece.col];
          newBoard[draggedPiece.row][draggedPiece.col] = "";
          const isKing =
            newBoard[row][col] === "O"
              ? row === 0
              : newBoard[row][col] === "X" && row === 7;
          if (isKing) {
            newBoard[row][col] = newBoard[row][col] === "X" ? "KX" : "KO";
          }
          if (opponentLoc !== null) {
            newBoard[opponentLoc[0]][opponentLoc[1]] = "";
          }
          setBoard(newBoard);
          turn.piece === "O"
            ? setTurn({ piece: "X", king: "KX" })
            : setTurn({ piece: "O", king: "KO" });
        }
      }
    };
    return (
      <div
        key={i}
        className="board-square"
        draggable={board[row][col] === "X" || board[row][col] === "O"}
        onDragStart={() => handleDragStart(row, col)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
        onTouchStart={() => handleDragStart(row, col)}
        onTouchMove={(e) => e.preventDefault()}
        onTouchEnd={(e) => handleDrop(e)}
      >
        {board[row][col] !== "" && (
          <img
            src={
              board[row][col] === "X"
                ? "https://cdn0.iconfinder.com/data/icons/board-games-colored-1/48/Games_BoardGames_Artboard_15-512.png"
                : board[row][col] === "KX"
                ? "https://cdn4.iconfinder.com/data/icons/board-games-glyph/48/Games_BoardGames_Artboard_14-512.png"
                : board[row][col] === "KO"
                ? "https://cdn0.iconfinder.com/data/icons/board-games/48/Paul-15-512.png"
                : "https://cdn0.iconfinder.com/data/icons/board-games-flat-1/48/Games_BoardGames_Artboard_14-512.png"
            }
            alt={`square-${board[row][col]}`}
            width={"100%"}
          />
        )}
      </div>
    );
  };
  console.log(document.querySelector(".board-square:nth-child(16n + 2)"));

  return (
    <div className="board">
      {board.map((boardRow, idx) =>
        boardRow.map((boardSquare, i) => (
          <RenderSquare key={i} i={i} row={idx} col={i} />
        ))
      )}
    </div>
  );
};

export default Checkers;
