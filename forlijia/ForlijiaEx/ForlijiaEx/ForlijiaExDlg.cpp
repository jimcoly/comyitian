
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
	// TODO: Add your control notification handler code here
	m_dataCenter.Load();
}


void CForlijiaExDlg::OnBnClickedButtonsave()
{
	// TODO: Add your control notification handler code here
	for (auto iter=m_addaddressList.begin();iter!=m_addaddressList.end();iter++)
	{
		m_dataCenter.Insert(iter->first,iter->second);

	}
	m_dataCenter.Save();
}


void CForlijiaExDlg::OnBnClickedButtonslect()
{		
	FilterAddress fa;
	// TODO: Add your control notification handler code here
	WCHAR Filter[]=L"excel(*.xls)|*.xls||";
	CFileDialog dlgOpen(TRUE,0,0,OFN_HIDEREADONLY|OFN_FILEMUSTEXIST,(LPCTSTR)Filter,NULL);
	if(dlgOpen.DoModal()==IDOK)
	{
		CString filePathname=dlgOpen.GetPathName();
		ExlDistribution ed;
		if (!ed.Open(filePathname.GetString()))
		{
			MessageBox(L"打开失败");
		}
		addressDataList getdataList=ed.get_sep_list();
		for (addressDataList::iterator iter=getdataList.begin();iter!=getdataList.end();iter++)
		{
			std::wstring addressstr=iter->first.m_address;
			fa.process(addressstr);
			if (!m_dataCenter.IsOther(iter->second.m_UninstallPorts) 
				&& !m_dataCenter.IsTiaojian(addressstr)
				&& m_dataCenter.check(iter->first) )
			{
				StreetData sd(addressstr);
				m_addaddressList.insert(std::make_pair(sd,iter->second));
			}
		}

		SetDlgItemInt(IDC_STATIC_totalcount,getdataList.size());
		SetDlgItemInt(IDC_STATIC_addcount,m_addaddressList.size());
	}
	else 
	{
		return ;
	}
}
void CForlijiaExDlg::Process()
{
	WCHAR Filter[]=L"excel(*.xls)|*.xls||";
	CFileDialog dlgOpen(TRUE,0,0,OFN_HIDEREADONLY|OFN_FILEMUSTEXIST,(LPCTSTR)Filter,NULL);
	if(dlgOpen.DoModal()==IDOK)
	{
		CString filePathname=dlgOpen.GetPathName();
		ExlDistribution ed;
		if (!ed.Open(filePathname.GetString()))
		{
			MessageBox(L"打开失败");
		}
		addressDataList getdataList=ed.get_data_list();
		if (!ed.check_Port_is_empty(getdataList))
		{
			MessageBox(L"已经有数据");
		}
		else
		{
			for (auto iter=getdataList.begin();iter!=getdataList.end();iter++)
			{

			}
		}
	}
	else 
	{
		return ;
	}
}