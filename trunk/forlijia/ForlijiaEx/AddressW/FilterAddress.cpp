#include "StdAfx.h"
#include "FilterAddress.h"
//#include "config.h"
//
//FilterAddress::FilterAddress(void)
//{
//	config *theConfig=config::getinstance();
//	m_shengFilter=new FilterWords(theConfig->shenglist,L"ʡ");
//	m_shiFilter=new FilterWords(theConfig->shilist,L"��");
//	m_quFilter=new FilterWords(theConfig->qulist,L"��");
//	m_xianFilter=new FilterWords(theConfig->xianlist,L"��");
//	m_zhenFilter=new FilterWords(theConfig->zhenlist,L"��");
//	m_hao=new NumFilterWords(theConfig->numlist);
//}
//
//FilterAddress::~FilterAddress(void)
//{
//	delete		m_shengFilter;
//	delete		m_shiFilter;
//	delete		m_quFilter;
//	delete		m_xianFilter;
//	delete		m_zhenFilter;
//	delete		m_hao;
//}
//
//bool FilterAddress::process( std::wstring &str )
//{
//	if (!m_shengFilter->process(str)){
//		return false;
//	}//ʡ�Ǳ����
//	if (!m_shiFilter->process(str)){
//		return false;
//	}//���Ǳ����
//
//
//	if (!m_quFilter->process(str)){ //�������ھ͸�������
//		m_xianFilter->process(str);
//		m_zhenFilter->process(str);
//	}
//	m_hao->process(str);
//	return true;
//}
//
//bool FilterAddress::process_get_num( std::wstring &str,int &num )
//{
//	return false;
//}
//
//bool FilterAddress::just_filter_sheng_and_Num( std::wstring &str )
//{
//	if (!m_shengFilter->process(str)){
//		return false;
//	}//ʡ�Ǳ���� 
//
// 
//	m_hao->process(str);
//	return true;
//}