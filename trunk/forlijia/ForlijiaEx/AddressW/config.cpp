#include "StdAfx.h"
#include "config.h"
#include "utitily.h"

#define CONFIGFILENAME L"config.txt"
config config::TheConfig;
config::config(void)
{
}

config::~config(void)
{
}

void config::save()
{
	std::wstring filename=getrunpath()+CONFIGFILENAME;
	std::wofstream ofs(filename.c_str());
	if (ofs)
	{
		ofs.imbue(locale("chs")); 

		ofs<<shenglist;
		ofs<<shilist;
		ofs<<dijishilist;
		ofs<<qulist;
		ofs<<xianlist;
		ofs<<zhenlist;
		ofs<<addresskeywordlist;
		ofs<<numlist;
		ofs.close();
	}
	else
	{
		MessageBox(NULL,L"saveÊ§°Ü",L"Ê§°Ü",MB_OK);
	}

}

void config::load()
{
	std::wstring filename=getrunpath()+CONFIGFILENAME;
	std::wifstream ifs(filename.c_str());
	if (ifs)
	{
		ifs.imbue(locale("chs")); 
		ifs>>shenglist;
		ifs>>shilist;
		ifs>>dijishilist;
		ifs>>qulist;
		ifs>>xianlist;
		ifs>>zhenlist;
		ifs>>addresskeywordlist;
		ifs>>numlist;
		ifs.close();
	} 
}