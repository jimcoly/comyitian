#pragma once


// ConfigurationDlg dialog

class ConfigurationDlg : public CDialog
{
	DECLARE_DYNAMIC(ConfigurationDlg)

public:
	ConfigurationDlg(CWnd* pParent = NULL);   // standard constructor
	virtual ~ConfigurationDlg();

// Dialog Data
	enum { IDD = IDD_DIALOG_Configuration };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

	DECLARE_MESSAGE_MAP()
};
