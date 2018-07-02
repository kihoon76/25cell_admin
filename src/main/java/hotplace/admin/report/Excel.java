package hotplace.admin.report;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import hotplace.admin.domain.ExcelCouponVO;


@Component("Excel")
public class Excel {

	
	private List<ExcelCouponVO> readXlsx() {
		List<ExcelCouponVO> list = new ArrayList<ExcelCouponVO>();

	    FileInputStream fis = null;
	    XSSFWorkbook workbook = null;

	    try {
	    	fis = new FileInputStream("");

	        workbook = new XSSFWorkbook(fis);
	        XSSFSheet curSheet;
	        XSSFRow curRow;
	        XSSFCell curCell;

	        ExcelCouponVO vo;

	        for(int sheetIdx = 0; sheetIdx < workbook.getNumberOfSheets(); sheetIdx++) {
	        	curSheet = workbook.getSheetAt(sheetIdx);
	            for(int rowIdx = 0; rowIdx < curSheet.getPhysicalNumberOfRows(); rowIdx++) {
                    //row 0은 헤더정보이기 때문에 무시
                    if(rowIdx !=0) {
                       curRow = curSheet.getRow(rowIdx);
                       vo = new ExcelCouponVO();
                       String value;
	                      
                       //row의 첫번째 cell 값이 비어있지 않는 경우만 cell 탐색
                       if(!"".equals(curRow.getCell(0).getStringCellValue())) {

                           //cell 탐색 for문
                            for(int cellIdx = 0; cellIdx < curRow.getPhysicalNumberOfCells(); cellIdx++) {
                                curCell = curRow.getCell(cellIdx);
                                value = "";
	                              
                                switch(curCell.getCellTypeEnum()) {
                                case FORMULA :
                                	value = curCell.getCellFormula();
                                	break;
                                case NUMERIC :
                                	value = curCell.getNumericCellValue() + "";
                                	break;
                                case STRING :
                                	value = curCell.getStringCellValue();
                                	break;
                                case BOOLEAN :
                                	value = curCell.getBooleanCellValue() + "";
                                	break;
                                case ERROR :
                                	value = curCell.getErrorCellValue() + "";
                                	break;
                                default :
                                	value = "";
                                	break;
                                }

                                switch(cellIdx) {
                                case 0 : //쿠폰번호
                                    vo.setCouponNum(value);
                                    break;
                                case 1 : //쿠폰발행대상번호
                                    vo.setTargetNum(value);
                                    break;
                                case 2 : //쿠폰발행대상명
                                    vo.setTargetName(value);
                                    break;
                                default :
                                    break;
                                }
	                                
                                System.out.println("value=========="+value);
                           }

                           list.add(vo);
                       }
                    }
                } 
            }
        }
        catch(FileNotFoundException e) {
        	System.err.println("FileNotFoundException : " + e.getMessage());
        }
	    catch(IOException e) {
	        System.err.println("IOException : " + e.getMessage());
	    } 
	    finally {
	    	try {
	    		if(workbook != null) workbook.close();
	            if(fis != null) fis.close();
	        }
	        catch(IOException e) {
	        	System.err.println(e.getMessage());
	        }
	    }

	    return list;
	}

	private XSSFWorkbook writeXlsx(List<ExcelCouponVO> list, String sheetName) {
		XSSFWorkbook workbook = null;
	    FileOutputStream fos = null;
	    XSSFSheet sheet = null;

	    workbook = new XSSFWorkbook();
        sheet = workbook.createSheet(sheetName);

        int rowCount = list.size();

        //header
        XSSFRow rowHeader = sheet.createRow(0);
        rowHeader.createCell(0).setCellValue("쿠폰번호(총 " + rowCount + "개)");
        
        for(int r = 0; r < rowCount; r++) {
        	XSSFRow row = sheet.createRow(r+1);
            //XSSFCell curCell;
            //XSSFCell cell = row.createCell(0);
            row.createCell(0).setCellValue(list.get(r).getCouponNum());
            //row.createCell(1).setCellValue(list.get(r).getTargetNum());
            //row.createCell(2).setCellValue(list.get(r).getTargetName());
        }

        //fos = new FileOutputStream(fileOutPath);
        
        return workbook;
	   
	}

    public XSSFWorkbook getWorkbook(List<ExcelCouponVO> list) {
       return writeXlsx(list, "발행쿠폰");
    }
}
