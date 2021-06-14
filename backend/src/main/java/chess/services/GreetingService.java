package chess.services;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chess.dao.GreetingDao;
import chess.domain.Greeting;

@Service
public class GreetingService {
	
	@Autowired
	private GreetingDao greetingDao;
	
	public List<Greeting> saveGreeting(String name) {
		// String greeting = "";
		// if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) < 12 ) {
		// 	greeting += "Good Morning, " + name;
		// } else if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) < 18 ) {
		// 	greeting += "Good Afternoon, " + name;
		// } else {
		// 	greeting += "Good Evening, " + name;
		// }
		this.greetingDao.saveGreeting(name);
		return this.greetingDao.getAllGreetings();
	}
}
