package hotplace.admin.domain;

import org.apache.ibatis.type.Alias;

@Alias("ExcelCouponVO")
public class ExcelCouponVO {

	private String couponNum;
	private String targetNum;
	private String targetName;
	
	public String getCouponNum() {
		return couponNum;
	}
	public void setCouponNum(String couponNum) {
		this.couponNum = couponNum;
	}
	public String getTargetNum() {
		return targetNum;
	}
	public void setTargetNum(String targetNum) {
		this.targetNum = targetNum;
	}
	public String getTargetName() {
		return targetName;
	}
	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}
}
