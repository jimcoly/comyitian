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
