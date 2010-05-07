#include "StdAfx.h"
#include "config.h"
#include "utitily.h"

#define CONFIGFILENAME "config.txt"
config config::TheConfig;
config::config(void)
{
}

config::~config(void)
{
}

void config::save()
{
	std::string filename=getrunpath()+CONFIGFILENAME;
	std::ofstream ofs(filename.c_str());
	if (ofs)
	{
		ofs<<shenglist;
		ofs<<shilist;
		ofs<<dijishilist;
		ofs<<qulist;
		ofs<<xianlist;
		ofs<<zhenlist;
		ofs<<addresskeywordlist;
		ofs.close();
	}
	else
	{
		MessageBox(NULL,"saveÊ§°Ü","Ê§°Ü",MB_OK);
	}

}

void config::load()
{
	std::string filename=getrunpath()+CONFIGFILENAME;
	std::ifstream ifs(filename.c_str());
	if (ifs)
	{
		ifs>>shenglist;
		ifs>>shilist;
		ifs>>dijishilist;
		ifs>>qulist;
		ifs>>xianlist;
		ifs>>zhenlist;
		ifs>>addresskeywordlist;
		ifs.close();
	} 
}