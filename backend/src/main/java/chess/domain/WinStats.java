package chess.domain;

public class WinStats {
	int numWhiteWins, numBlackWins, numDraws, numGames;

	public WinStats() {
	}

	public WinStats(int numWhiteWins, int numBlackWins, int numDraws, int numGames) {
		this.numWhiteWins = numWhiteWins;
		this.numBlackWins = numBlackWins;
		this.numDraws = numDraws;
		this.numGames = numGames;
	}

	public int getNumWhiteWins() {
		return this.numWhiteWins;
	}

	public void setNumWhiteWins(int numWhiteWins) {
		this.numWhiteWins = numWhiteWins;
	}

	public int getNumBlackWins() {
		return this.numBlackWins;
	}

	public void setNumBlackWins(int numBlackWins) {
		this.numBlackWins = numBlackWins;
	}

	public int getNumDraws() {
		return this.numDraws;
	}

	public void setNumDraws(int numDraws) {
		this.numDraws = numDraws;
	}

	public int getNumGames() {
		return this.numGames;
	}

	public void setNumGames(int numGames) {
		this.numGames = numGames;
	}

	@Override
	public String toString() {
		return "{" + " numWhiteWins='" + getNumWhiteWins() + "'" + ", numBlackWins='" + getNumBlackWins() + "'"
				+ ", numDraws='" + getNumDraws() + ", numGames='" + getNumGames() + "'" + "}";
	}

}
