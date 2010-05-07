#include "StdAfx.h"
#include "StringList.h"

StringList::StringList(void)
{
}

StringList::StringList( std::wstring context )
{
	m_stringlist.clear();
	std::wstringstream oss; 
	oss<<context;
	wstring temp;
	while (getline(oss,temp,L';'))
	{
		m_stringlist.push_back(temp);
	}

}
StringList::~StringList(void)
{
}
std::wstring StringList::get_context()
{
	std::wostringstream oss; 
	for (iterator iter=m_stringlist.begin();iter!=m_stringlist.end();iter++)
	{
		oss<<(*iter)<<";";
	}
	return oss.str();
}
std::wofstream& operator<<(wofstream& out,StringList& sl)
{
 
	out<<sl.m_stringlist.size()<<std::endl;
	for (StringList::iterator iter=sl.m_stringlist.begin();iter!=sl.m_stringlist.end();iter++)
	{
		out<<(*iter)<<" ";
	}
	out<<std::endl;
	return out;
}

std::wifstream& operator>>(wifstream& in,StringList& sl)
{
	sl.m_stringlist.clear();
	int size=0;
	in>>size;
	for (int i=0;i<size;i++)
	{
		std::wstring str;
		in>>str;
		sl.m_stringlist.push_back(str);
	}
	return in;
}

