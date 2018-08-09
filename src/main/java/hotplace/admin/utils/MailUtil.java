package hotplace.admin.utils;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

import hotplace.admin.domain.Email;

@Component("mailUtil")
public class MailUtil {
	
	public void sendMail(Email email) throws AddressException, MessagingException {
		
		String host = "smtp.naver.com";
		String userName = "upmc2013";
		String password = "up##2080";
		int port = 587;
		
		String recipient = email.getAddress();
		String cc = email.getAddressCC();
		String subject = email.getSubject();
		String body = email.getEmailBody();
		
		Properties props = System.getProperties();
		// SMTP 서버 정보 설정
		props.put("mail.smtp.host", host); 
		props.put("mail.smtp.port", port); 
		props.put("mail.smtp.auth", "true"); 
				
		if("smtp.naver.com".equals(host)) {
			props.put("mail.smtp.starttls.enable", "true"); 
		}
		else if("smtp.gmail.com".equals(host)) {
			props.put("mail.smtp.ssl.enable", "true"); 
			props.put("mail.smtp.ssl.trust", host);
		}
		
		Session session = Session.getDefaultInstance(props, new Authenticator() {
			String un = userName;
			String pw = password;
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(un, pw);
			}
		});
		
		session.setDebug(true);
		
		Message mimeMessage = new MimeMessage(session);
		mimeMessage.setFrom(new InternetAddress("upmc2013@naver.com")); 
		
		mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
		
		if(cc != null || !"".equals(cc)) {
			mimeMessage.addRecipients(Message.RecipientType.CC, InternetAddress.parse(cc));
		}
		
		mimeMessage.setSubject(subject);
		mimeMessage.setContent(body, "text/html; charset=UTF-8");
		Transport.send(mimeMessage);
	}
}