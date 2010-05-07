#pragma once
#include "StringList.h"
class config
{
private:
	config(void);
	~config(void);
public:
	static config* getinstance()
	{
		static bool isload=false;
		if (!isload)
		{	
			TheConfig.load();
		isload=true;
		}

		return &TheConfig;
	}
	void save();
	void load();
public:
	StringList shenglist;
	StringList shilist;
	StringList dijishilist;
	StringList qulist;
	StringList xianlist;
	StringList zhenlist;
	StringList addresskeywordlist;
private:
	static config TheConfig;
};
