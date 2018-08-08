package hotplace.admin.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("schedule")
public class ScheduleUtil {

	@Value("#{dsCfg['mssql.datasource.driverClassName']}")
	private String driverName;
	
	@Value("#{dsCfg['mssql.datasource.url']}")
	private String url43;
	
	@Value("#{dsCfg['mssql.datasource.url42']}")
	private String url42;
	
	@Value("#{dsCfg['mssql.datasource.url2']}")
	private String url2;
	
	@Value("#{dsCfg['mssql.datasource.username']}")
	private String userName;
	
	@Value("#{dsCfg['mssql.datasource.password']}")
	private String password;
	
	public Map<String, Boolean> viewDatabaseConnection() {
		Map<String, Boolean> result = null;
		
		try {
			Class.forName(driverName);
			
			Connection conn = null;
			String[] dbs = { url43, url42, url2 };
			String[] key = { "43", "42", "2" };
			
			result = new HashMap<>(); 
			
			System.err.println("=========================");
			for(int i=0; i<3; i++) {
				try {
					conn = DriverManager.getConnection(dbs[i], userName, password);
					System.out.println(dbs[i] + " : connection OK");
					result.put(key[i], true);
				}
				catch(SQLException e) {
					System.out.println(dbs[i] + " : connection FAIL");
					result.put(key[i], false);
				}
				finally {
					if(conn != null) {
						try {
							conn.close();
						} 
						catch (SQLException e) {
							System.err.println(dbs[i] + " : connection close error");
						}
					}
				}
			}
		} 
		catch(ClassNotFoundException e1) {
			System.err.println("driver class load failed.....");
		}
		
		return result;
	}
}
