// ConfigurationDlg.cpp : implementation file
//

#include "stdafx.h"
#include "ForlijiaEx.h"
#include "ConfigurationDlg.h"
#include "afxdialogex.h"
#include "..\AddressW\config.h"


// ConfigurationDlg dialog

IMPLEMENT_DYNAMIC(ConfigurationDlg, CDialogEx)

ConfigurationDlg::ConfigurationDlg(CWnd* pParent /*=NULL*/)
	: CDialogEx(ConfigurationDlg::IDD, pParent)
{

}

ConfigurationDlg::~ConfigurationDlg()
{
}

void ConfigurationDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}


BEGIN_MESSAGE_MAP(ConfigurationDlg, CDialogEx)
	ON_WM_CLOSE()
END_MESSAGE_MAP()


// ConfigurationDlg message handlers


BOOL ConfigurationDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// TODO:  Add extra initialization here
	config *theConfig=config::getinstance();
	SetDlgItemText(IDC_EDIT_sheng,theConfig->shenglist.get_context().c_str());
	SetDlgItemText(IDC_EDIT_shi,theConfig->shilist.get_context().c_str());
	SetDlgItemText(IDC_EDIT_dijishi,theConfig->dijishilist.get_context().c_str());
	SetDlgItemText(IDC_EDIT_qu,theConfig->qulist.get_context().c_str());
	SetDlgItemText(IDC_EDIT_xian,theConfig->xianlist.get_context().c_str());
	SetDlgItemText(IDC_EDIT_zhen,theConfig->zhenlist.get_context().c_str());
	SetDlgItemText(IDC_EDIT3_addresskeyword,theConfig->addresskeywordlist.get_context().c_str());

	return TRUE;  // return TRUE unless you set the focus to a control
	// EXCEPTION: OCX Property Pages should return FALSE
}


void ConfigurationDlg::OnClose()
{
	// TODO: Add your message handler code here and/or call default
	config *theConfig=config::getinstance();
	CString sheng,shi,dijishi,qu,xian,zhen,addresskeword;
	GetDlgItemText(IDC_EDIT_sheng,sheng);
	GetDlgItemText(IDC_EDIT_shi,shi);
	GetDlgItemText(IDC_EDIT_dijishi,dijishi);
	GetDlgItemText(IDC_EDIT_qu,qu);
	GetDlgItemText(IDC_EDIT_xian,xian);
	GetDlgItemText(IDC_EDIT_zhen,zhen);
	GetDlgItemText(IDC_EDIT3_addresskeyword,addresskeword);

	theConfig->shenglist	=StringList(	sheng.GetString());
	theConfig->shilist	=StringList(	shi.GetString());
	theConfig->dijishilist	=StringList(	dijishi.GetString());
	theConfig->qulist	=StringList(	qu.GetString());
	theConfig->xianlist	=StringList(	xian.GetString());
	theConfig->zhenlist	=StringList(	zhen.GetString());
	theConfig->	   addresskeywordlist=StringList(	addresskeword.GetString());
	theConfig->save();
	CDialogEx::OnClose();
}