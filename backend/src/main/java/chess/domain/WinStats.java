package chess.domain;

public class WinStats {
	int numWhiteWins, numBlackWins, numGames;


	public WinStats() {
	}

	public WinStats(int numWhiteWins, int numBlackWins, int numGames) {
		this.numWhiteWins = numWhiteWins;
		this.numBlackWins = numBlackWins;
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

	public int getNumGames() {
		return this.numGames;
	}

	public void setNumGames(int numGames) {
		this.numGames = numGames;
	}

	@Override
	public String toString() {
		return "{" +
			" numWhiteWins='" + getNumWhiteWins() + "'" +
			", numBlackWins='" + getNumBlackWins() + "'" +
			", numGames='" + getNumGames() + "'" +
			"}";
	}

}
