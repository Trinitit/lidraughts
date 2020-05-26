package draughts
package variant

case object Frysk extends Variant(
  id = 8,
  gameType = 97,
  key = "frysk",
  name = "Frysk!",
  shortName = "Frysk",
  title = "Frisian draughts starting with 5 pieces each.",
  standardInitialPosition = false,
  boardSize = Board.D100
) {

  val pieces = Variant.symmetricBackrank(Vector(Man, Man, Man, Man, Man), boardSize)

  def captureDirs = Frisian.captureDirs
  def moveDirsColor = Frisian.moveDirsColor

  override val initialFen = "W:W46,47,48,49,50:B1,2,3,4,5:H0:F1"

  override def validMoves(situation: Situation, finalSquare: Boolean = false): Map[Pos, List[Move]] = Frisian.validMoves(situation, finalSquare)
  override def shortRangeCaptures(actor: Actor, finalSquare: Boolean): List[Move] = Frisian.shortRangeCaptures(actor, finalSquare)
  override def longRangeCaptures(actor: Actor, finalSquare: Boolean): List[Move] = Frisian.longRangeCaptures(actor, finalSquare)

  override def finalizeBoard(board: Board, uci: format.Uci.Move, captured: Option[List[Piece]], remainingCaptures: Int): Board = Frisian.finalizeBoard(board, uci, captured, remainingCaptures)
  override def updatePositionHashes(board: Board, move: Move, hash: draughts.PositionHash): PositionHash = Frisian.updatePositionHashes(board, move, hash)

  override protected def validSide(board: Board, strict: Boolean)(color: Color) = {
    val roles = board rolesOf color
    (roles.count(_ == Man) > 0 || roles.count(_ == King) > 0) &&
      (!strict || roles.size <= 5) &&
      (!menOnPromotionRank(board, color) || board.ghosts != 0)
  }

}
