#include "StdAfx.h"
#include "FilterWords.h"


FilterWords::~FilterWords(void)
{
}

std::wstring FilterWords::process( std::wstring& str )
{
	if (m_word.empty())
	{
		return RemoveStr(str);
	}
	std::wstring::size_type pos=str.find(m_word);
	if (pos==std::wstring::npos){
		return RemoveStr(str);
	}
	else{
		return RemoveStr(str,m_word);
	}
}

std::wstring FilterWords::RemoveStr( std::wstring &str ,std::wstring word/*=L""*/ )
{
	StringList::iterator iter;
	if (m_sl.empty()){
		return L"";
	}
	for(iter=m_sl.begin();iter!=m_sl.end();iter++)
	{
		std::wstring removalStr=(*iter)+word;
		int pos1=str.find(removalStr.c_str());
		if (pos1!=0)	{
			continue;
		}
		else{
			str=str.substr(removalStr.size(),(str.size()-removalStr.size()));
			return removalStr;
		}
	}
	return L"";
}

std::wstring NumFilterWords::process( std::wstring& str )
{
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
			return houstr;
		} 
	}
	return L"";
}

bool NumFilterWords::FindStr( std::wstring &str )
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
#define OTHERLIST L"西门;东门;南门;北门"
OtherFilter::OtherFilter() :m_Filter(StringList(OTHERLIST),L"")
{
}
