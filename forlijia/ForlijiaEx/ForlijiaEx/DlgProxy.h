
// DlgProxy.h: header file
//

#pragma once

class CForlijiaExDlg;


// CForlijiaExDlgAutoProxy command target

class CForlijiaExDlgAutoProxy : public CCmdTarget
{
	DECLARE_DYNCREATE(CForlijiaExDlgAutoProxy)

	CForlijiaExDlgAutoProxy();           // protected constructor used by dynamic creation

// Attributes
public:
	CForlijiaExDlg* m_pDialog;

// Operations
public:

// Overrides
	public:
	virtual void OnFinalRelease();

// Implementation
protected:
	virtual ~CForlijiaExDlgAutoProxy();

	// Generated message map functions

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE(CForlijiaExDlgAutoProxy)

	// Generated OLE dispatch map functions

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

