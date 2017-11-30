package hotplace.admin.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("ExtjsStoreVO")
public class ExtjsStoreVO<T> {

	private int total;
	private String searchType;
	private String seachValue;
	private int start;
	private int limit;
	private List<T> datas;
	
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public List<T> getDatas() {
		return datas;
	}
	public void setDatas(List<T> datas) {
		this.datas = datas;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getSeachValue() {
		return seachValue;
	}
	public void setSeachValue(String seachValue) {
		this.seachValue = seachValue;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
}
