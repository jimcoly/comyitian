
// DlgProxy.cpp : implementation file
//

#include "stdafx.h"
#include "ForlijiaEx.h"
#include "DlgProxy.h"
#include "ForlijiaExDlg.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CForlijiaExDlgAutoProxy

IMPLEMENT_DYNCREATE(CForlijiaExDlgAutoProxy, CCmdTarget)

CForlijiaExDlgAutoProxy::CForlijiaExDlgAutoProxy()
{
	EnableAutomation();
	
	// To keep the application running as long as an automation 
	//	object is active, the constructor calls AfxOleLockApp.
	AfxOleLockApp();

	// Get access to the dialog through the application's
	//  main window pointer.  Set the proxy's internal pointer
	//  to point to the dialog, and set the dialog's back pointer to
	//  this proxy.
	ASSERT_VALID(AfxGetApp()->m_pMainWnd);
	if (AfxGetApp()->m_pMainWnd)
	{
		ASSERT_KINDOF(CForlijiaExDlg, AfxGetApp()->m_pMainWnd);
		if (AfxGetApp()->m_pMainWnd->IsKindOf(RUNTIME_CLASS(CForlijiaExDlg)))
		{
			m_pDialog = reinterpret_cast<CForlijiaExDlg*>(AfxGetApp()->m_pMainWnd);
			m_pDialog->m_pAutoProxy = this;
		}
	}
}

CForlijiaExDlgAutoProxy::~CForlijiaExDlgAutoProxy()
{
	// To terminate the application when all objects created with
	// 	with automation, the destructor calls AfxOleUnlockApp.
	//  Among other things, this will destroy the main dialog
	if (m_pDialog != NULL)
		m_pDialog->m_pAutoProxy = NULL;
	AfxOleUnlockApp();
}

void CForlijiaExDlgAutoProxy::OnFinalRelease()
{
	// When the last reference for an automation object is released
	// OnFinalRelease is called.  The base class will automatically
	// deletes the object.  Add additional cleanup required for your
	// object before calling the base class.

	CCmdTarget::OnFinalRelease();
}

BEGIN_MESSAGE_MAP(CForlijiaExDlgAutoProxy, CCmdTarget)
END_MESSAGE_MAP()

BEGIN_DISPATCH_MAP(CForlijiaExDlgAutoProxy, CCmdTarget)
END_DISPATCH_MAP()

// Note: we add support for IID_IForlijiaEx to support typesafe binding
//  from VBA.  This IID must match the GUID that is attached to the 
//  dispinterface in the .IDL file.

// {46362D4D-4B19-4B41-9309-A0E840F52358}
static const IID IID_IForlijiaEx =
{ 0x46362D4D, 0x4B19, 0x4B41, { 0x93, 0x9, 0xA0, 0xE8, 0x40, 0xF5, 0x23, 0x58 } };

BEGIN_INTERFACE_MAP(CForlijiaExDlgAutoProxy, CCmdTarget)
	INTERFACE_PART(CForlijiaExDlgAutoProxy, IID_IForlijiaEx, Dispatch)
END_INTERFACE_MAP()

// The IMPLEMENT_OLECREATE2 macro is defined in StdAfx.h of this project
// {61541EFC-E048-43E7-BDAF-21B8B1BEABED}
IMPLEMENT_OLECREATE2(CForlijiaExDlgAutoProxy, "ForlijiaEx.Application", 0x61541efc, 0xe048, 0x43e7, 0xbd, 0xaf, 0x21, 0xb8, 0xb1, 0xbe, 0xab, 0xed)


// CForlijiaExDlgAutoProxy message handlers
