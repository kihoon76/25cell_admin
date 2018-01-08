package hotplace.admin.domain;

import org.apache.ibatis.type.Alias;

@Alias("Configure")
public class Configure {

	private String confNum;
	private String confContent;
	private String confValue;
	private String confBigo;
	private String confDate;
	public String getConfNum() {
		return confNum;
	}
	public void setConfNum(String confNum) {
		this.confNum = confNum;
	}
	public String getConfContent() {
		return confContent;
	}
	public void setConfContent(String confContent) {
		this.confContent = confContent;
	}
	public String getConfValue() {
		return confValue;
	}
	public void setConfValue(String confValue) {
		this.confValue = confValue;
	}
	public String getConfBigo() {
		return confBigo;
	}
	public void setConfBigo(String confBigo) {
		this.confBigo = confBigo;
	}
	public String getConfDate() {
		return confDate;
	}
	public void setConfDate(String confDate) {
		this.confDate = confDate;
	}
}
