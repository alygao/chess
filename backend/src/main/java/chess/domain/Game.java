package chess.domain;

import java.util.ArrayList;
import java.util.List;

public class Game {
	int gid;
	char winner;
	String date;
	Player white, black;
	List<Move> moves;

	public Game() {
		moves = new ArrayList<>();
	}

	public Game(int gid, char winner, String date) {
		this.gid = gid;
		this.winner = winner;
		this.date = date;
		moves = new ArrayList<>();
	}

	public char getWinner() {
		return this.winner;
	}

	public void setWinner(char winner) {
		this.winner = winner;
	}

	public String getDate() {
		return this.date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Player getWhite() {
		return this.white;
	}

	public void setWhite(Player white) {
		this.white = white;
	}

	public Player getBlack() {
		return this.black;
	}

	public void setBlack(Player black) {
		this.black = black;
	}

	public List<Move> getMoves() {
		return this.moves;
	}

	public void setMoves(List<Move> moves) {
		this.moves = moves;
	}


	public int getGid() {
		return this.gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}
	
}
