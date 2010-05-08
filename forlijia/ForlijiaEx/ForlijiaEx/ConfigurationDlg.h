#pragma once


// ConfigurationDlg dialog

class ConfigurationDlg : public CDialogEx
{
	DECLARE_DYNAMIC(ConfigurationDlg)

public:
	ConfigurationDlg(CWnd* pParent = NULL);   // standard constructor
	virtual ~ConfigurationDlg();

// Dialog Data
	enum { IDD = IDD_FORLIJIAEX_DIALOG };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

	DECLARE_MESSAGE_MAP()
public:
	virtual BOOL OnInitDialog();
	afx_msg void OnClose();
};
