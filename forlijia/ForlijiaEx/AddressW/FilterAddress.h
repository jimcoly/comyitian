#include "filterwords.h"
#pragma once

class FilterAddress
{
public:
	FilterAddress(void);
	~FilterAddress(void);

public:
	bool process(std::wstring &str);
	bool process_get_num(std::wstring &str,int &num);
	bool just_filter_sheng_and_Num(std::wstring &str);
private:
	FilterWords *m_shengFilter;
	FilterWords *m_shiFilter;
	FilterWords *m_quFilter;
	FilterWords *m_xianFilter;
	FilterWords *m_zhenFilter;
	NumFilterWords *m_hao;
};
