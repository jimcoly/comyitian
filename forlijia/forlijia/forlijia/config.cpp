#include "StdAfx.h"
#include "config.h"

config::config(void)
{
}
#include "utitily.h"
config::~config(void)
{
}

void config::save( std::string filefullname )
{
	std::ifstream ifs(getrunpath());
	if (ifs)
	{
		ifs>>shenglist;
		ifs>>shilist;
		ifs>>dijishilist;
		ifs>>qulist;
		ifs>>qianlist;
		ifs>>zhenlist;
		ifs>>addresskeywordlist;
		ifs.close();
	}
	
}

void config::load( std::string filefullname )
{

}