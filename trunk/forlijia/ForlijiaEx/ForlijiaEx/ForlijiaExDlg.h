
// ForlijiaExDlg.h : header file
//

#pragma once
#include <list>
#include <set>
#include "..\AddressW\AddressData.h"
#include <map>
#include "DataCenter.h"

class CForlijiaExDlgAutoProxy;


// CForlijiaExDlg dialog
class CForlijiaExDlg : public CDialogEx
{
	DECLARE_DYNAMIC(CForlijiaExDlg);
	friend class CForlijiaExDlgAutoProxy;

// Construction
public:
	CForlijiaExDlg(CWnd* pParent = NULL);	// standard constructor
	virtual ~CForlijiaExDlg();

// Dialog Data
	enum { IDD = IDD_DIALOG_MAIN };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV support


// Implementation
protected:
	CForlijiaExDlgAutoProxy* m_pAutoProxy;
	HICON m_hIcon;

	BOOL CanExit();

	// Generated message map functions
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	afx_msg void OnClose();
	virtual void OnOK();
	virtual void OnCancel();
	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnBnClickedButtonconfig();
	afx_msg void OnBnClickedButtonLoad();
public:


	afx_msg void OnBnClickedButtonsave();
	afx_msg void OnBnClickedButtonslect();
	void Process();
	DataCenter m_dataCenter;

	typedef std::map<StreetData,PortData> addressDataList;
	addressDataList m_mmmaddressList;
	addressDataList m_addaddressList;
};
