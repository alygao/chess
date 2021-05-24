package chess.domain;

public class GreetingRequest {
	private String name;

	public GreetingRequest(String name) {
		super();
		this.name = name;
	}
	
	public GreetingRequest() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "GreetingRequest [name=" + name + "]";
	}
	
	
}
