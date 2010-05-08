#include "StdAfx.h"
#include "FilterAddress.h"
#include "config.h"

FilterAddressHeader::FilterAddressHeader(void)
{
	config *theConfig=config::getinstance();
	m_shengFilter=new FilterWords(theConfig->shenglist,L"ʡ");
	m_shiFilter=new FilterWords(theConfig->shilist,L"��");
	m_quFilter=new FilterWords(theConfig->qulist,L"��");
	m_xianFilter=new FilterWords(theConfig->xianlist,L"��");
	m_zhenFilter=new FilterWords(theConfig->zhenlist,L"��");
}

FilterAddressHeader::~FilterAddressHeader(void)
{
	delete		m_shengFilter;
	delete		m_shiFilter;
	delete		m_quFilter;
	delete		m_xianFilter;
	delete		m_zhenFilter;
}

bool FilterAddressHeader::process( std::wstring &str )
{
	if (!m_shengFilter->process(str)){
		return false;
	}//ʡ�Ǳ����
	if (!m_shiFilter->process(str)){
		return false;
	}//���Ǳ����


	if (!m_quFilter->process(str)){ //�������ھ͸�������
		m_xianFilter->process(str);
		m_zhenFilter->process(str);
	}

	return true;
}