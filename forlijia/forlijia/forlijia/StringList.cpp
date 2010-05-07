#include "StdAfx.h"
#include "StringList.h"

StringList::StringList(void)
{
}

StringList::StringList( std::string context )
{
	m_stringlist.clear();
	std::stringstream oss; 
	oss<<context;
	string temp;
	while (getline(oss,temp,';'))
	{
		m_stringlist.push_back(temp);
	}

}
StringList::~StringList(void)
{
}
std::string StringList::get_context()
{
	std::ostringstream oss; 
	for (iterator iter=m_stringlist.begin();iter!=m_stringlist.end();iter++)
	{
		oss<<(*iter)<<";";
	}
	return oss.str();
}
std::ofstream& operator<<(ofstream& out,StringList& sl)
{
 
	out<<sl.m_stringlist.size()<<std::endl;
	for (StringList::iterator iter=sl.m_stringlist.begin();iter!=sl.m_stringlist.end();iter++)
	{
		out<<(*iter)<<" ";
	}
	out<<std::endl;
	return out;
}

std::ifstream& operator>>(ifstream& in,StringList& sl)
{
	sl.m_stringlist.clear();
	int size=0;
	in>>size;
	for (int i=0;i<size;i++)
	{
		std::string str;
		in>>str;
		sl.m_stringlist.push_back(str);
	}
	return in;
}

