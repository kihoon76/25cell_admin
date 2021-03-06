package hotplace.admin.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("Account")
public class Account {

	private String accountId;
	private String userName;
	private String password;
	private String phone;
	private String email;
	private String regDate;
	private String grade;
	private String gradeNum;
	private String gradeExpire;
	private String admin;
	private String qaAdmin;
	private String out;
	private String paymentHistory;					//결제이력이 있는 사용자여부 
	private String cheheom;							//체험판여부
	
	private List<String> gradeArr;
	
	private List<Authority> authorities;
	
	public List<Authority> getAuthorities() {
		return authorities;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public String getGradeNum() {
		return gradeNum;
	}
	public void setGradeNum(String gradeNum) {
		this.gradeNum = gradeNum;
	}
	public String getAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	public String getOut() {
		return out;
	}
	public void setOut(String out) {
		this.out = out;
	}
	public List<String> getGradeArr() {
		return gradeArr;
	}
	public void setGradeArr(List<String> gradeArr) {
		this.gradeArr = gradeArr;
	}
	public String getQaAdmin() {
		return qaAdmin;
	}
	public void setQaAdmin(String qaAdmin) {
		this.qaAdmin = qaAdmin;
	}
	public String getGradeExpire() {
		return gradeExpire;
	}
	public void setGradeExpire(String gradeExpire) {
		this.gradeExpire = gradeExpire;
	}
	public String getPaymentHistory() {
		return paymentHistory;
	}
	public void setPaymentHistory(String paymentHistory) {
		this.paymentHistory = paymentHistory;
	}
	public String getCheheom() {
		return cheheom;
	}
	public void setCheheom(String cheheom) {
		this.cheheom = cheheom;
	}
	
}
