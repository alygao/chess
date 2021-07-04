package chess.domain;

public class Player {
	private int id;
	private String name;
	private String username;
	private int elo;
	
	public Player() {
	}

	public Player(int id, String name, String username) {
		this.id = id;
		this.name = name;
		this.username = username;
	}
	
	public Player(int id, String name, String username, int elo) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.elo = elo;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getElo() {
		return this.elo;
	}

	public void setElo(int elo) {
		this.elo = elo;
	}


	@Override
	public String toString() {
		return "{" +
			" id='" + getId() + "'" +
			", name='" + getName() + "'" +
			", username='" + getUsername() + "'" +
			", elo='" + getElo() + "'" +
			"}";
	}
	
}
