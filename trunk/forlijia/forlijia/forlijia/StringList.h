#pragma once
#include <vector>
#include <fstream>
 #include<iostream>
#include <sstream>
using namespace std;
class StringList
{
public:
	StringList(void);
	StringList(std::wstring context);
	~StringList(void);
public:
	std::wstring get_context();
	typedef vector<std::wstring> stringvec;
	typedef stringvec::iterator iterator;
	iterator begin()
	{
		return m_stringlist.begin();
	}
	iterator end()
	{
		return m_stringlist.end();
	}
public:
	friend std::wofstream& operator<<(wofstream& out,StringList& sl);
	friend std::wifstream& operator>>(wifstream& in,StringList& sl);
public:
	stringvec m_stringlist;
};
