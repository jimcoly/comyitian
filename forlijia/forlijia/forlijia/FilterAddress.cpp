#include "StdAfx.h"
#include "FilterAddress.h"
#include "config.h"

FilterAddressHeader::FilterAddressHeader(void)
{
	config *theConfig=config::getinstance();
	m_shengFilter=new FilterWords(theConfig->shenglist,L"省");
	m_shiFilter=new FilterWords(theConfig->shilist,L"市");
	m_quFilter=new FilterWords(theConfig->qulist,L"区");
	m_xianFilter=new FilterWords(theConfig->xianlist,L"县");
	m_zhenFilter=new FilterWords(theConfig->zhenlist,L"镇");
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
	}//省是必须的
	if (!m_shiFilter->process(str)){
		return false;
	}//市是必须的


	if (!m_quFilter->process(str)){ //区不存在就给县镇处理
		m_xianFilter->process(str);
		m_zhenFilter->process(str);
	}

	return true;
}