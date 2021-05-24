package chess.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chess.domain.Greeting;
import chess.services.GreetingService;

@RestController
@RequestMapping("/v1/greeting")
@CrossOrigin
public class GreetingController {
	
	@Autowired
	private GreetingService greetingService;
	
	@PostMapping("/*")
	public List<Greeting> getGreeting(@RequestBody String name) {
		System.out.println("name = " + name );
//		return new Greeting(1, "hello " + name, Calendar.getInstance().getTime().toString());
		return greetingService.saveGreeting(name);
	}
}
