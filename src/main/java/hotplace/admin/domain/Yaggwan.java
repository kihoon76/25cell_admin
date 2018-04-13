package hotplace.admin.domain;

import org.apache.ibatis.type.Alias;

@Alias("Yaggwan")
public class Yaggwan {
	
	private String key;
	private String content;
	private String categoryCode;
	private String categoryName;
	private String writeDate;
	private String required;
	private int soonseo;
	private int originSoonseo;
	
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCategoryCode() {
		return categoryCode;
	}
	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getWriteDate() {
		return writeDate;
	}
	public void setWriteDate(String writeDate) {
		this.writeDate = writeDate;
	}
	public String getRequired() {
		return required;
	}
	public void setRequired(String required) {
		this.required = required;
	}
	public int getSoonseo() {
		return soonseo;
	}
	public void setSoonseo(int soonseo) {
		this.soonseo = soonseo;
	}
	public int getOriginSoonseo() {
		return originSoonseo;
	}
	public void setOriginSoonseo(int originSoonseo) {
		this.originSoonseo = originSoonseo;
	}
}
