#include "StdAfx.h"
#include "ExcelWrapper.h" 

#pragma region Import the type libraries

#import "libid:2DF8D04C-5BFA-101B-BDE5-00AA0044DE52" \
	rename("RGB", "MSORGB")
// [-or-]
//#import "C:\\Program Files\\Common Files\\Microsoft Shared\\OFFICE12\\MSO.DLL" \
//	rename("RGB", "MSORGB")

using namespace Office;

#import "libid:0002E157-0000-0000-C000-000000000046"
// [-or-]
//#import "C:\\Program Files\\Common Files\\Microsoft Shared\\VBA\\VBA6\\VBE6EXT.OLB"

using namespace VBIDE;

#import "libid:00020813-0000-0000-C000-000000000046" \
	rename("DialogBox", "ExcelDialogBox") \
	rename("RGB", "ExcelRGB") \
	rename("CopyFile", "ExcelCopyFile") \
	rename("ReplaceText", "ExcelReplaceText")
// [-or-]
//#import "C:\\Program Files\\Microsoft Office\\Office12\\EXCEL.EXE" \
//	rename("DialogBox", "ExcelDialogBox") \
//	rename("RGB", "ExcelRGB") \
//	rename("CopyFile", "ExcelCopyFile") \
//	rename("ReplaceText", "ExcelReplaceText")

#pragma endregion

CString VariantToCString(VARIANT var)
{
	CString strValue;
	_variant_t var_t;
	_bstr_t bst_t;
	time_t cur_time;
	CTime time_value;
	COleCurrency var_currency;
	switch(var.vt)
	{
	case VT_EMPTY:
		strValue=_T("");
		break;
	case VT_UI1:
		strValue.Format(L"%d",var.bVal);
		break;
	case VT_I2:
		strValue.Format(L"%d",var.iVal);
		break;
	case VT_I4:
		strValue.Format(L"%d",var.lVal);
		break;
	case VT_R4:
		strValue.Format(L"%f",var.fltVal);
		break;
	case VT_R8:
		strValue.Format(L"%f",var.dblVal);
		break;
	case VT_CY:
		var_currency=var;
		strValue=var_currency.Format(0);
		break;
	case VT_BSTR:
		strValue=var.bstrVal;
/*		var_t=var;
		bst_t=var_t;
		strValue.Format (L"%s",(const char*)bst_t)*/;
		break;
	case VT_NULL:
		strValue=_T("");
		break;
	case VT_DATE:
		cur_time = (long)var.date;
		time_value=cur_time;
		strValue=time_value.Format(L"%A,%B%d,%Y");
		break;
	case VT_BOOL:
		strValue.Format(L"%d",var.boolVal );
		break;
	default: 
		strValue=_T("");
		break;
	}
	return strValue; 
}

CApplication ExcelWrapper::ExcelApp;
ExcelWrapper::ExcelWrapper(void)
{
}


ExcelWrapper::~ExcelWrapper(void)
{
}

void ExcelWrapper::InitExcel()
{
	if (ExcelApp.m_lpDispatch == NULL) {
		ExcelApp.CreateDispatch(L"Excel.Application");
	}
	//// Show Excel to the user.
	//oExcel.put_Visible(TRUE);
	//oExcel.put_UserControl(TRUE);
}

void ExcelWrapper::ReleaseExcel()
{

	ExcelApp.Quit();
	ExcelApp.ReleaseDispatch();
}

void ExcelWrapper::ShowExcel( bool bShow )
{
	ExcelApp.put_Visible(bShow);
}
bool ExcelWrapper::Create(  )
{
	COleVariant vTrue((short)TRUE),
		vFalse((short)FALSE),
		vOpt((long)DISP_E_PARAMNOTFOUND, VT_ERROR);
	m_Books = ExcelApp.get_Workbooks(); 
	m_Book = m_Books.Add(vOpt);
	m_Sheets = ExcelApp.get_Worksheets();
	return true;
}
void ExcelWrapper::Save( CString fileName )
{ 
	Excel::XlFileFormat vFileFormat;
	Excel::XlSaveAsAccessMode vSaveAsAccessMode;
	Excel::XlSaveConflictResolution vSaveConflictResolution;
	vSaveAsAccessMode = Excel::XlSaveAsAccessMode::xlNoChange ;
	vFileFormat = Excel::XlFileFormat::xlWorkbookNormal ;
	vSaveConflictResolution =Excel::XlSaveConflictResolution::xlLocalSessionChanges ;
	m_Book.SaveAs(COleVariant(fileName),_variant_t( vFileFormat),_variant_t(""),_variant_t(""), _variant_t(false),
		_variant_t(false), vSaveAsAccessMode, _variant_t(vSaveConflictResolution), _variant_t(false),_variant_t(false),_variant_t(false),_variant_t(false)) ;

}

bool ExcelWrapper::Open( CString fileName )
{  
	COleVariant vTrue((short)TRUE),
		vFalse((short)FALSE),
		vOpt((long)DISP_E_PARAMNOTFOUND, VT_ERROR);
	m_Books = ExcelApp.get_Workbooks(); 
	m_Book = m_Books.Open(fileName,vOpt,
		vOpt,vOpt,vOpt,vOpt,vOpt,vOpt,vOpt,vOpt,vOpt,vOpt,
		vOpt,vOpt,vOpt);
	if (!m_Books)
	{
		return false;
	}
	m_Sheets = ExcelApp.get_Worksheets(); 
	return true;
}

int ExcelWrapper::GetSheetCount()
{
	return m_Sheets.get_Count();
}


CString ExcelWrapper::GetSheetName( int iIndex )
{
	CString strSheetName;
	CWorksheet sheet;
	sheet= m_Sheets.get_Item(_variant_t((long)iIndex));
	strSheetName=sheet.get_Name();
	sheet.DetachDispatch();
	return strSheetName;
}

bool ExcelWrapper::LoadSheet( int iIndex )
{ 
	m_Range.ReleaseDispatch();
	m_Sheet.ReleaseDispatch();
	m_Sheet = m_Sheets.get_Item(_variant_t((long)iIndex));
	if (!m_Sheet)
	{
		return false;
	}
	m_Range=m_Sheet.get_Cells();
	return true;
}

int ExcelWrapper::GetRowCount()
{
	CRange oRange=m_Sheet.get_UsedRange();//得到使用的
	CRange RowRange=oRange.get_Rows();//得到列

	int cout=RowRange.get_Count();//得到列数量
	oRange.DetachDispatch();
	RowRange.DetachDispatch();
	return cout;
}

int ExcelWrapper::GetColumnCount()
{
	CRange oRange=m_Sheet.get_UsedRange();//得到使用的
	CRange ColumnRange=oRange.get_Columns();//得到列
	
	int cout=ColumnRange.get_Count();//得到列数量
	oRange.DetachDispatch();
	ColumnRange.DetachDispatch();
	return cout;
}

CString ExcelWrapper::GetCell( int iRow, int iColumn )
{
	CRange rang;
	CString str;
	VARIANT var;
	var=m_Range.get_Item(COleVariant((long)iRow),COleVariant((long)iColumn));
	rang=var.pdispVal;
	str=VariantToCString(rang.get_Value2());
	return str;
}

void ExcelWrapper::SetCell( int iRow, int iColumn,CString valuestr )
{
	m_Range.put_Item(COleVariant((long)iRow),COleVariant((long)iColumn),COleVariant(valuestr));
}
