export default function printBoard(board) {
  board.forEach((row) => {
    const rowString = row
      .map((tile) => {
        if (tile.isHit) return 'X'; // Hit tile
        if (tile.ship) return 'S'; // Ship is here
        return '.'; // Empty tile
      })
      .join(' ');
    console.log(rowString);
  });
}
