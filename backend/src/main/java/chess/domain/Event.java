package chess.domain;

public class Event {
	private int eid;
	private String name;
	
	public Event() {
	}

	public Event(int eid, String name) {
		super();
		this.eid = eid;
		this.name = name;
	}

	public int getEid() {
		return eid;
	}

	public void setEid(int eid) {
		this.eid = eid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
	// @Override
	// public String toString() {
	// 	return "{" +
	// 		" id='" + getId() + "'" +
	// 		", name='" + getName() + "'" +
	// 		", username='" + getUsername() + "'" +
	// 		", elo='" + getElo() + "'" +
	// 		"}";
	// }
	
}
