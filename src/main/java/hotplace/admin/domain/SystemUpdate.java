package hotplace.admin.domain;

import org.apache.ibatis.type.Alias;

@Alias("SystemUpdate")
public class SystemUpdate {

	private String idx;							//일련번호
	private String version;
	private String content;
	private String tempNum;
	private String applyDate;					//적용일자
	private String bigo;
	
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTempNum() {
		return tempNum;
	}
	public void setTempNum(String tempNum) {
		this.tempNum = tempNum;
	}
	public String getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getBigo() {
		return bigo;
	}
	public void setBigo(String bigo) {
		this.bigo = bigo;
	}
}
