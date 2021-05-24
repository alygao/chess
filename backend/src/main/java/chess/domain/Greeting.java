package chess.domain;

public class Greeting {
	private int id;
	private String greeting;
	private String timestamp;
	
	public Greeting() {
	}

	public Greeting(int id, String greeting, String timestamp) {
		super();
		this.id = id;
		this.greeting = greeting;
		this.timestamp = timestamp;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGreeting() {
		return greeting;
	}

	public void setGreeting(String greeting) {
		this.greeting = greeting;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "Greeting [id=" + id + ", greeting=" + greeting + ", timestamp=" + timestamp + "]";
	}
	
	
}
