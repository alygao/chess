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

import chess.domain.Event;

@Repository
public class EventDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String SELECT_SQL = "SELECT eid, name FROM EVENT";

	public List<Event> getEvents(String name) {
		List<Event> events = new ArrayList<>();
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(SELECT_SQL)){
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				events.add(new Event(
						rs.getInt("eid"),
						rs.getString("name")
						));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return events;
	}
	
	
}
