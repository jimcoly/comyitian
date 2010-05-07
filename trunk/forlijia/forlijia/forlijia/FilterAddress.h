#include "filterwords.h"
#pragma once

class FilterAddressHeader
{
public:
	FilterAddressHeader(void);
	~FilterAddressHeader(void);

public:
	bool process(std::wstring &str);
private:
	FilterWords *m_shengFilter;
	FilterWords *m_shiFilter;
	FilterWords *m_quFilter;
	FilterWords *m_xianFilter;
	FilterWords *m_zhenFilter;
};
