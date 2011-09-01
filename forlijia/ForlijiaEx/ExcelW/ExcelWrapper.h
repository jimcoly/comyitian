#pragma once
#include "CApplication.h"
#include "CRange.h"
#include "CWorkbook.h"
#include "CWorkbooks.h"
#include "CWorksheet.h"
#include "CWorksheets.h"
class ExcelWrapper
{
public:
	ExcelWrapper(void);
	~ExcelWrapper(void);

public:
	static void InitExcel();
	static void ReleaseExcel();	
	static void ShowExcel(bool bShow);
public:	

	bool Open(CString fileName);
	void Close();
public:
	bool Create();
	void Save(CString fileName);
public:
	bool LoadSheet(int iIndex);
	CString GetSheetName(int iIndex);
	int GetSheetCount(); 
public:
	//bool InsertColumn(CString cell,int count);//≤Â»Î¡–
public:
	CString GetCell(int iRow, int iColumn);
	void SetCell(int iRow, int iColumn,CString valuestr);
	int GetRowCount();
	int GetColumnCount();
	COleSafeArray GetRange( CString Cell1,CString Cell2);
	void SetRange( CString Cell1,CString Cell2,COleSafeArray array);
private:
	static CApplication ExcelApp;
	CWorkbook m_Book;
	CWorkbooks m_Books;
	CWorksheets m_Sheets;
	CWorksheet m_Sheet;
	CRange m_Range;
};
CString VariantToCString(VARIANT vResult);
