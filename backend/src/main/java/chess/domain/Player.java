package chess.domain;

public class Player {
	private int id;
	private String name;
	private String username;
	
	public Player() {
	}

	public Player(int id, String name, String username) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
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

	@Override
	public String toString() {
		return "Player {" +
			" id='" + getId() + "'" +
			", name='" + getName() + "'" +
			", username='" + getUsername() + "'" +
			"}";
	}
	
}
