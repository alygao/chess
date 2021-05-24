package chess.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@RestController
@CrossOrigin
public class WebConfig{

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}
