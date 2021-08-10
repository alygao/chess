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

import chess.domain.Player;


@Repository
public class PlayerDao {
	
	@Autowired
	private DataSource dataSource;
	
	private static String INSERT_SQL = "INSERT INTO Player (name, username, password) VALUES (?,?,?)";
	private static String SELECT_SQL = "SELECT pid, name, username FROM Player WHERE name = ?";
	private static String LOGIN_SQL = "SELECT pid FROM Player WHERE username = ? AND password = ?";

	public int createUser(String name, String username, String password) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS)){
			statement.setString(1, name);
			statement.setString(2, username);
			statement.setString(3, password);
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

	public List<Player> getPlayers(String name) {
		List<Player> players = new ArrayList<>();
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(SELECT_SQL)){
			statement.setString(1, name);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				players.add(new Player(
						rs.getInt("pid"),
						rs.getString("name"),
						rs.getString("username")
						));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return players;
	}
	
	public Integer login(String username, String password) {
		try (Connection conn = this.dataSource.getConnection();
				PreparedStatement statement = conn.prepareStatement(LOGIN_SQL)){
			statement.setString(1, username);
			statement.setString(2, password);
			ResultSet rs = statement.executeQuery();
			if (rs.next()) {
				return rs.getInt("pid");
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
