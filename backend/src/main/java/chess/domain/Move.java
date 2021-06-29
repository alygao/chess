package chess.domain;

public class Move {
	int gid, turnNum;
	String moveString, fromSquare, toSquare, chessPiece, anotation;
	
	public Move() {
	}

	public Move(String moveString, String fromSquare, String toSquare, String chessPiece, String anotation) {
		this.moveString = moveString;
		this.fromSquare = fromSquare;
		this.toSquare = toSquare;
		this.chessPiece = chessPiece;
		this.anotation = anotation;
	}

	public String getMoveString() {
		return this.moveString;
	}

	public void setMoveString(String moveString) {
		this.moveString = moveString;
	}

	public String getFromSquare() {
		return this.fromSquare;
	}

	public void setFromSquare(String fromSquare) {
		this.fromSquare = fromSquare;
	}

	public String getToSquare() {
		return this.toSquare;
	}

	public void setToSquare(String toSquare) {
		this.toSquare = toSquare;
	}

	public String getChessPiece() {
		return this.chessPiece;
	}

	public void setChessPiece(String chessPiece) {
		this.chessPiece = chessPiece;
	}

	public String getAnotation() {
		return this.anotation;
	}

	public void setAnotation(String anotation) {
		this.anotation = anotation;
	}

	public Move moveString(String moveString) {
		setMoveString(moveString);
		return this;
	}

	public Move fromSquare(String fromSquare) {
		setFromSquare(fromSquare);
		return this;
	}

	public Move toSquare(String toSquare) {
		setToSquare(toSquare);
		return this;
	}

	public Move chessPiece(String chessPiece) {
		setChessPiece(chessPiece);
		return this;
	}

	public Move anotation(String anotation) {
		setAnotation(anotation);
		return this;
	}

	public int getGid() {
		return this.gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public int getTurnNum() {
		return this.turnNum;
	}

	public void setTurnNum(int turnNum) {
		this.turnNum = turnNum;
	}

	@Override
	public String toString() {
		return "{" +
			" moveString='" + getMoveString() + "'" +
			", fromSquare='" + getFromSquare() + "'" +
			", toSquare='" + getToSquare() + "'" +
			", chessPiece='" + getChessPiece() + "'" +
			", anotation='" + getAnotation() + "'" +
			"}";
	}

}