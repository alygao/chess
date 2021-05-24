package chess.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import chess.domain.Greeting;


@Repository
public class GreetingDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String INSERT_SQL = "INSERT INTO DEMO (GREETING, TIMESTAMP) VALUES (?,CURRENT_TIMESTAMP)";
	private static String SELECT_ALL_SQL = "SELECT ID, GREETING, TIMESTAMP FROM DEMO";

	public int saveGreeting(String greeting) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS)){
			statement.setString(1, greeting);
			statement.executeUpdate();
			ResultSet keys = statement.getGeneratedKeys();
			if (keys.next()) {
				return keys.getInt(1);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return -1;
	}

	public List<Greeting> getAllGreetings() {
		List<Greeting> greetings = new ArrayList<>();
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(SELECT_ALL_SQL)){
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				greetings.add(new Greeting(
						rs.getInt("ID"),
						rs.getString("GREETING"),
						rs.getTimestamp("TIMESTAMP").toString()
						));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return greetings;
	}
	
	
}
