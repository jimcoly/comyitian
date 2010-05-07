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
	StringList(std::string context);
	~StringList(void);
public:
	std::string get_context();
	typedef vector<std::string> stringvec;
	typedef stringvec::iterator iterator;
public:
	std::ofstream& operator<<(ofstream& out);
	std::ifstream& operator>>(ifstream& in);
private:
	stringvec m_stringlist;
};
