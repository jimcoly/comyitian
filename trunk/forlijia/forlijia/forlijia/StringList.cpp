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
std::ofstream& StringList::operator<<( ofstream& out )
{
 
	out<<m_stringlist.size()<<std::endl;
	for (iterator iter=m_stringlist.begin();iter!=m_stringlist.end();iter++)
	{
		out<<(*iter)<<" ";
	}
	out<<std::endl;
	return out;
}

std::ifstream& StringList::operator>>( ifstream& in )
{
	int size=0;
	in>>size;
	for (int i=0;i<size;i++)
	{
		std::string str;
		in>>str;
	}
	return in;
}

