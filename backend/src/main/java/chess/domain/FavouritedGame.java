package chess.domain;

public class FavouritedGame {
	private int gid;
	private String username;
	
	
	public FavouritedGame(int gid, String username) {
		super();
		this.gid = gid;
		this.username = username;
	}
	
	public int getGid() {
		return gid;
	}
	public void setGid(int gid) {
		this.gid = gid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "FavouritedGame [gid=" + gid + ", username=" + username + "]";
	}
	
	
}
