#include "StringList.h"
#pragma once
#include "config.h"

class FilterWords
{
public:
	FilterWords(StringList sl,std::wstring word):m_sl(sl),m_word(word){};
	~FilterWords(void);

	std::wstring process(std::wstring& str);

	std::wstring RemoveStr( std::wstring &str ,std::wstring word=L"");
private:
	StringList m_sl;
	std::wstring m_word;
};
class ProvinceFilter
{
public:
	ProvinceFilter():m_Filter(config::getinstance()->shenglist,L"省"){}
	~ProvinceFilter(){}
public:
	std::wstring Filter(std::wstring& str)
	{
		return m_Filter.process(str);
	}

private:
	FilterWords m_Filter;
};
class CityFilter
{
public:
	CityFilter():m_Filter(config::getinstance()->shilist,L"市"){}
	~CityFilter(){}
public:
	std::wstring Filter(std::wstring& str)
	{
		return m_Filter.process(str);
	}

private:
	FilterWords m_Filter;
};
class CountyFilter
{
public:
	CountyFilter():m_Filter(config::getinstance()->xianlist,L"县"){}
	~CountyFilter(){}
public:
	std::wstring Filter(std::wstring& str)
	{
		return m_Filter.process(str);
	}

private:
	FilterWords m_Filter;
};
class AreaFilter
{
public:
	AreaFilter():m_Filter(config::getinstance()->qulist,L"区"){}
	~AreaFilter(){}
public:
	std::wstring Filter(std::wstring& str)
	{
		return m_Filter.process(str);
	}

private:
	FilterWords m_Filter;
};
class TownFilter
{
public:
	TownFilter():m_Filter(config::getinstance()->zhenlist,L"镇"){}
	~TownFilter(){}
public:
	std::wstring Filter(std::wstring& str)
	{
		return m_Filter.process(str);
	}

private:
	FilterWords m_Filter;
};
class OtherFilter
{
public:
	OtherFilter();
	~OtherFilter(){}
public:
	std::wstring Filter(std::wstring& str)
	{
		return m_Filter.process(str);
	}

private:
	FilterWords m_Filter;
};

class KeyAddressFilter
{
public:
	KeyAddressFilter() {}
	~KeyAddressFilter(){}
public:
	std::vector<std::wstring> Filter(std::wstring &orgaddress)
	{ 
		std::vector<std::wstring> keySet;
		std::wstring returnStr;
		while (returnStr!=orgaddress)
		{
			returnStr=FilterString(orgaddress);
			if (!returnStr.empty())
			{
				keySet.push_back(returnStr);
			}
		}
		return keySet;
	}
	std::wstring FilterString(std::wstring &orgaddress)
	{
		config *theconfig=config::getinstance();
		StringList keywordList=theconfig->addresskeywordlist;
		std::vector<std::wstring> keySet;
		for (auto iter=keywordList.begin();iter!=keywordList.end();iter++)
		{
			size_t pos=orgaddress.find(*iter);
			if(pos!=std::wstring::npos){
				std::wstring str=orgaddress.substr(0,pos+iter->size());
				orgaddress=orgaddress.substr(pos+iter->size());
				return str;
			} 
		}
		return orgaddress;
	}

};
class NumFilterWords
{
public:
	NumFilterWords():m_sl(config::getinstance()->numlist){};
	~NumFilterWords(void){};

	std::wstring process(std::wstring& str);

	bool FindStr( std::wstring &str );
	StringList m_sl;
};
