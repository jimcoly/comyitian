#pragma once
#include "StringList.h"
class config
{
private:
	config(void);
	~config(void);

	static config* getinstance()
	{
		return &TheConfig;
	}
	void save(std::string filefullname);
	void load(std::string filefullname);
public:
	StringList shenglist;
	StringList shilist;
	StringList dijishilist;
	StringList qulist;
	StringList qianlist;
	StringList zhenlist;
	StringList addresskeywordlist;
private:
	static config TheConfig;
};
