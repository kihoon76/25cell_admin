package hotplace.admin.domain;

public class Email {

	private String subject = "Hotplace25 DB 장애사항입니다.";
	private String content = "";
	private String address;
	private String addressCC;
	
	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getEmailBody() {
		StringBuilder sb = new StringBuilder();
		
		sb.append("<table style=\"width:500px;\">");
		sb.append("<tbody>");
		sb.append("<tr style=\"background-color:#333336\">");
		sb.append("<td><img src=\"https://www.hotplace25.com/resources/img/gnb_logo.png\" /></td>");
		sb.append("</tr>");
		sb.append("<tr>");
		sb.append("<td>" + content + "</td>");
		sb.append("</tr>");
		
		sb.append("</tbody>");
		sb.append("</table>");
		
		
		return sb.toString();
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddressCC() {
		return addressCC;
	}

	public void setAddressCC(String addressCC) {
		this.addressCC = addressCC;
	}
	
	
}
