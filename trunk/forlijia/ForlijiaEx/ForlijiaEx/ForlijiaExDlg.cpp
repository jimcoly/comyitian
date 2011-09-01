
// ForlijiaExDlg.cpp : implementation file
//

#include "stdafx.h"
#include <sstream>
#include <fstream> 
#include "ForlijiaEx.h"
#include "ForlijiaExDlg.h"
#include "DlgProxy.h"
#include "afxdialogex.h"
#include "ConfigurationDlg.h"
#include "..\AddressW\utitily.h" 
#include <algorithm>
#include "..\ExcelW\ExcelWrapper.h"
#include "exlDistribution.h"
#include "..\AddressW\FilterAddress.h"
#include "TipDlg.h" 
#include "Peisong.h"

using namespace std;

#ifdef _DEBUG
#define new DEBUG_NEW
#endif



// CAboutDlg dialog used for App About

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

	// Dialog Data
	enum { IDD = IDD_ABOUTBOX };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

	// Implementation
protected:
	DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialogEx(CAboutDlg::IDD)
{
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()


// CForlijiaExDlg dialog




IMPLEMENT_DYNAMIC(CForlijiaExDlg, CDialogEx);

CForlijiaExDlg::CForlijiaExDlg(CWnd* pParent /*=NULL*/)
	: CDialogEx(CForlijiaExDlg::IDD, pParent)
{
	m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
	m_pAutoProxy = NULL;
}

CForlijiaExDlg::~CForlijiaExDlg()
{
	// If there is an automation proxy for this dialog, set
	//  its back pointer to this dialog to NULL, so it knows
	//  the dialog has been deleted.
	if (m_pAutoProxy != NULL)
		m_pAutoProxy->m_pDialog = NULL;
	ExcelWrapper::ReleaseExcel();
}

void CForlijiaExDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CForlijiaExDlg, CDialogEx)
	ON_WM_SYSCOMMAND()
	ON_WM_CLOSE()
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
	ON_BN_CLICKED(IDC_BUTTON_config, &CForlijiaExDlg::OnBnClickedButtonconfig)
	ON_BN_CLICKED(IDC_BUTTON_LOAD, &CForlijiaExDlg::OnBnClickedButtonLoad)
	ON_BN_CLICKED(IDC_BUTTON_save, &CForlijiaExDlg::OnBnClickedButtonsave)
	ON_BN_CLICKED(IDC_BUTTON_slect, &CForlijiaExDlg::OnBnClickedButtonslect)
	ON_BN_CLICKED(IDC_BUTTON_Process, &CForlijiaExDlg::OnBnClickedButtonProcess)
	ON_BN_CLICKED(IDC_BUTTON_test, &CForlijiaExDlg::OnBnClickedButtontest)
END_MESSAGE_MAP()


// CForlijiaExDlg message handlers

BOOL CForlijiaExDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// Add "About..." menu item to system menu.

	// IDM_ABOUTBOX must be in the system command range.
	ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
	ASSERT(IDM_ABOUTBOX < 0xF000);

	CMenu* pSysMenu = GetSystemMenu(FALSE);
	if (pSysMenu != NULL)
	{
		BOOL bNameValid;
		CString strAboutMenu;
		bNameValid = strAboutMenu.LoadString(IDS_ABOUTBOX);
		ASSERT(bNameValid);
		if (!strAboutMenu.IsEmpty())
		{
			pSysMenu->AppendMenu(MF_SEPARATOR);
			pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
		}
	}

	// Set the icon for this dialog.  The framework does this automatically
	//  when the application's main window is not a dialog
	SetIcon(m_hIcon, TRUE);			// Set big icon
	SetIcon(m_hIcon, FALSE);		// Set small icon

	// TODO: Add extra initialization here

	return TRUE;  // return TRUE  unless you set the focus to a control
}

void CForlijiaExDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
	if ((nID & 0xFFF0) == IDM_ABOUTBOX)
	{
		CAboutDlg dlgAbout;
		dlgAbout.DoModal();
	}
	else
	{
		CDialogEx::OnSysCommand(nID, lParam);
	}
}

// If you add a minimize button to your dialog, you will need the code below
//  to draw the icon.  For MFC applications using the document/view model,
//  this is automatically done for you by the framework.

void CForlijiaExDlg::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // device context for painting

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// Center icon in client rectangle
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// Draw the icon
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		CDialogEx::OnPaint();
	}
}

// The system calls this function to obtain the cursor to display while the user drags
//  the minimized window.
HCURSOR CForlijiaExDlg::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}

// Automation servers should not exit when a user closes the UI
//  if a controller still holds on to one of its objects.  These
//  message handlers make sure that if the proxy is still in use,
//  then the UI is hidden but the dialog remains around if it
//  is dismissed.

void CForlijiaExDlg::OnClose()
{
	if (CanExit())
		CDialogEx::OnClose();
}

void CForlijiaExDlg::OnOK()
{
	if (CanExit())
		CDialogEx::OnOK();
}

void CForlijiaExDlg::OnCancel()
{
	if (CanExit())
		CDialogEx::OnCancel();
}

BOOL CForlijiaExDlg::CanExit()
{
	// If the proxy object is still around, then the automation
	//  controller is still holding on to this application.  Leave
	//  the dialog around, but hide its UI.
	if (m_pAutoProxy != NULL)
	{
		ShowWindow(SW_HIDE);
		return FALSE;
	}

	return TRUE;
}



void CForlijiaExDlg::OnBnClickedButtonconfig()
{
	// TODO: Add your control notification handler code here
	ConfigurationDlg dlg;
	dlg.DoModal();
}
std::string WChar2Ansi( LPCWSTR pwszSrc )
{
	int nLen = WideCharToMultiByte(CP_ACP, 0, pwszSrc, -1, NULL, 0, NULL, NULL);

	if (nLen<= 0) return std::string("");

	char* pszDst = new char[nLen];
	if (NULL == pszDst) return std::string("");

	WideCharToMultiByte(CP_ACP, 0, pwszSrc, -1, pszDst, nLen, NULL, NULL);
	pszDst[nLen -1] = 0;

	std::string strTemp(pszDst);
	delete [] pszDst;

	return strTemp;
}

std::wstring Ansi2Wchar( std::string str )
{
	int nLen = (int)str.size(); 
	if (nLen==0)
	{
		return std::wstring();
	}
	int nwLen = MultiByteToWideChar(CP_ACP, 0, str.c_str(), nLen, NULL, 0);
	WCHAR *temp = new WCHAR[nwLen + 1];
	MultiByteToWideChar(CP_ACP, 0, str.c_str(), nLen, temp, nwLen);
	temp[nwLen] = 0;

	std::wstring wStrTemp(temp);
	delete [] temp;
	return wStrTemp;
}
void CForlijiaExDlg::OnBnClickedButtonLoad()
{
	//// TODO: Add your control notification handler code here
	//m_dataCenter.Load();
}


void CForlijiaExDlg::OnBnClickedButtonsave()
{
	//// TODO: Add your control notification handler code here
	//for (auto iter=m_addaddressList.begin();iter!=m_addaddressList.end();iter++)
	//{
	//	m_dataCenter.Insert(iter->first,iter->second);

	//}
	//m_dataCenter.Save();
}


void CForlijiaExDlg::OnBnClickedButtonslect()//读取更新用的
{		
	//FilterAddress fa;
	//// TODO: Add your control notification handler code here
	//WCHAR Filter[]=L"excel(*.xls)|*.xls||";
	//CFileDialog dlgOpen(TRUE,0,0,OFN_HIDEREADONLY|OFN_FILEMUSTEXIST,(LPCTSTR)Filter,NULL);
	//if(dlgOpen.DoModal()==IDOK)
	//{
	//	CString filePathname=dlgOpen.GetPathName();
	//	ExlDistribution ed;
	//	if (!ed.Open(filePathname.GetString()))
	//	{
	//		MessageBox(L"打开失败");
	//	}
	//	addressDataList getdataList=ed.get_sep_list();
	//	for (addressDataList::iterator iter=getdataList.begin();iter!=getdataList.end();iter++)
	//	{
	//		std::wstring addressstr=iter->first.m_address;
	//		fa.just_filter_sheng_and_Num(addressstr);	
	//		StreetData sd(addressstr);
	//		if (!m_dataCenter.IsOther(iter->second.m_UninstallPorts) 
	//			&& !m_dataCenter.IsTiaojian(addressstr)
	//			&& m_dataCenter.check(sd) )
	//		{
	//			m_addaddressList.insert(std::make_pair(sd,iter->second));
	//		}
	//	}
	//	ed.Close();

	//	SetDlgItemInt(IDC_STATIC_addcount,m_addaddressList.size());
	//	SetDlgItemInt(IDC_STATIC_totalcount,getdataList.size());
	//}
	//else 
	//{
	//	return ;
	//}
}
void CForlijiaExDlg::Process()
{	
#ifdef _MYTest
	Peisong ps;
	ps.Process();
#else
	CTipDlg *tipDlg=new CTipDlg(this);
	WCHAR Filter[]=L"excel(*.xls)|*.xls||";
	CFileDialog dlgOpen(TRUE,0,0,OFN_HIDEREADONLY|OFN_FILEMUSTEXIST,(LPCTSTR)Filter,NULL);
	if(dlgOpen.DoModal()==IDOK)
	{
		tipDlg->Create(IDD_DIALOG_TIP,this);
		tipDlg->ShowWindow(SW_SHOW);
		tipDlg->SetTipText(L"处理中...");
		CString filePathname=dlgOpen.GetPathName();
		CString GetPath=dlgOpen.GetFolderPath();
		Peisong ps;
		ps.Open(filePathname.GetString());
		ps.Process();
		ps.Save_And_Close(GetPath+L"\\");
		tipDlg->CloseWindow();
		delete tipDlg;
	}
#endif
	//CTipDlg *tipDlg=new CTipDlg(this);
	//WCHAR Filter[]=L"excel(*.xls)|*.xls||";
	//CFileDialog dlgOpen(TRUE,0,0,OFN_HIDEREADONLY|OFN_FILEMUSTEXIST,(LPCTSTR)Filter,NULL);
	//if(dlgOpen.DoModal()==IDOK)
	//{
	//	CString filePathname=dlgOpen.GetPathName();
	//	ExlDistribution ed;
	//	if (!ed.Open(filePathname.GetString()))
	//	{
	//		MessageBox(L"打开失败");
	//		return;
	//	}		
	//	tipDlg->Create(IDD_DIALOG_TIP,this);
	//	tipDlg->ShowWindow(SW_SHOW);
	//	tipDlg->SetTipText(L"正在初始化...");
	//	m_dataCenter.Load();
	//	tipDlg->SetTipText(L"正在读取excel数据...");
	//	ExlDistribution::addressDataListexl getdataList=ed.get_data_list();
	//	if (!ed.check_Port_is_empty(getdataList))
	//	{
	//		MessageBox(L"已经有数据");
	//		return;
	//	}
	//	else
	//	{
	//		tipDlg->SetTipText(L"正在处理...");
	//		std::list<PortData> pset=_Process(getdataList);
	//		ed.set_data_port(pset);
	//	}
	//	tipDlg->CloseWindow();
	//	delete tipDlg;
	//	ExcelWrapper::ReleaseExcel();
	//}
	//else 
	//{
	//	return ;
	//}
}
//std::list<PortData> CForlijiaExDlg::_Process( ExlDistribution::addressDataListexl &getdataList )
//{
//	//std::list<PortData> portdataList;
//	//for (auto iter=getdataList.begin();iter!=getdataList.end();iter++)
//	//{
//	//	PortData pdata;
//	//	//外敷处理
//	//	if(m_dataCenter.Tiaojian(iter->sd.m_address,pdata))
//	//	{
//	//		//continue;
//	//	}
//	//	else
//	//	{
//	//		pdata=m_dataCenter.process(iter->sd.m_address);
//	//	}
//	//	portdataList.push_back(pdata);
//	//}
//	//return portdataList;
//}
void CForlijiaExDlg::OnBnClickedButtonProcess()
{
	// TODO: Add your control notification handler code here

	Process();
}



void CForlijiaExDlg::OnBnClickedButtontest()
{
	// TODO: Add your control notification handler code here
	//std::wstring str1=L"成都市城区通锦路";
	//std::wstring str2=L"四川省成都市武侯区四川大学望江校区财务处";
	//std::wstring str3=L"四川省成都市金牛区蜀汉路520号天河馨城4栋1单元1302室";
	//std::wstring str4=L"四川省成都市金牛区荷花池市场东1区C排29号";
	//std::wstring str5=L"四川省成都市成华区荷花池市场童装市场2期B做 临街30号";
	//std::wstring str6=L"四川省成都市锦江区静居寺帕丽湾1栋1单元305";
	//std::wstring str7=L"四川省成都市锦江区东大街澳龙名城 10栋1单元3305";
	//std::wstring str8=L"四川省成都市青羊区通惠门路锦都花园2栋1单元603";
	//std::wstring str9=L"四川省成都市青羊区家园南街成都花园上层3栋3单元903";
	//std::wstring str10=L"四川省成都市青羊区通惠门路锦都花园2栋1单元603";
	//std::wstring str11=L"四川省成都市金牛区站西桥西街16号3单元31";

	//ExlDistribution::addressDataListexl getdataList;
	//ExlDistribution::exldata ed1={StreetData(str1),PortData()};
	//getdataList.push_back(ed1);
	//ExlDistribution::exldata ed2={StreetData(str2),PortData()};
	//getdataList.push_back(ed2);
	//ExlDistribution::exldata ed3={StreetData(str3),PortData()};
	//getdataList.push_back(ed3);
	//ExlDistribution::exldata ed4={StreetData(str4),PortData()};
	//getdataList.push_back(ed4);
	//ExlDistribution::exldata ed5={StreetData(str5),PortData()};
	//getdataList.push_back(ed5);
	//ExlDistribution::exldata ed6={StreetData(str6),PortData()};
	//getdataList.push_back(ed6);
	//ExlDistribution::exldata ed7={StreetData(str7),PortData()};
	//getdataList.push_back(ed7);
	//ExlDistribution::exldata ed8={StreetData(str8),PortData()};
	//getdataList.push_back(ed8);
	//ExlDistribution::exldata ed9={StreetData(str9),PortData()};
	//getdataList.push_back(ed9);
	//ExlDistribution::exldata ed10={StreetData(str10),PortData()};
	//getdataList.push_back(ed10);
	//ExlDistribution::exldata ed11={StreetData(str11),PortData()};
	//getdataList.push_back(ed11);
	//_Process(getdataList);
}