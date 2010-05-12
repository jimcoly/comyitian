#include "StringList.h"
#pragma once

class FilterWords
{
public:
	FilterWords(StringList sl,std::wstring word):m_sl(sl),m_word(word){};
	~FilterWords(void);

	bool process(std::wstring& str)
	{
		std::wstring::size_type pos=str.find(m_word);
		if (pos==std::wstring::npos){
			return RemoveStr(str);
		}
		else
		{
			return RemoveStr(str,m_word);
		}
	}

	bool RemoveStr( std::wstring &str ,std::wstring word=L"")
	{
		StringList::iterator iter;
		if (m_sl.empty()){
			return true;
		}
		for(iter=m_sl.begin();iter!=m_sl.end();iter++)
		{
			std::wstring removalStr=(*iter)+word;
			int pos1=str.find(removalStr.c_str());
			if (pos1!=0)	{
				continue;
			}
			else
			{
				str=str.substr(removalStr.size(),(str.size()-removalStr.size()));
				return true;
			}
		}
		return false;
	}
	StringList m_sl;
	std::wstring m_word;
};

class NumFilterWords
{
public:
	NumFilterWords(StringList sl):m_sl(sl){};
	~NumFilterWords(void){};

	bool process(std::wstring& str)
	{
		WCHAR c1=L'1';
		WCHAR c2=L'9';
		int pos=0;
		std::wstring::iterator iter;
		int numcount=0;
		for( iter=str.begin();iter!=str.end();iter++,pos++)
		{
			WCHAR chr=*iter;
			bool s=(chr>47/*L'0'-1*/ && chr<58 /*L'9'+1*/) ;
			if(s) 
			{
				numcount++;
			}
			else
			{
				numcount=0;
				continue;
			}
			std::wstring houstr=str.substr(pos+1);
			if (FindStr(houstr) || pos==str.size()-1)
			{
				str.resize(pos-(numcount-1));
				return true;
			} 
		}
		return false;

	}

	bool FindStr( std::wstring &str )
	{
		StringList::iterator iter;
		if (m_sl.empty()){
			return true;
		}
		for(iter=m_sl.begin();iter!=m_sl.end();iter++)
		{ 
			int pos1=str.find(*iter);
			if (pos1==0)	{
				return true;
			}
			else
			{
				continue;
			}
		}
		return false;
	}
	StringList m_sl;
};
