#include "StdAfx.h"
#include "AddressData.h"
#include <sstream>
#include "FilterWords.h"
#include "config.h"
AddressData::AddressData(void)
{
}

AddressData::~AddressData(void)
{
}

bool AddressData::operator>( const AddressData& d ) const
{
	return m_address>d.m_address;
}

bool AddressData::operator<( const AddressData& d ) const
{
	std::wstring str=m_address/*+m_jiou*/;
	std::wstring str2=d.m_address/*+d.m_jiou*/;
	return str<str2;
}
std::wostream&   operator<<(std::wostream&   output,const AddressData& ad)
{
	output<<ad.m_otherPorts<<L" "<<ad.m_UninstallPorts<<L" "<<ad.m_Release<<L" "
		<<ad.m_begin<<L" "<<ad.m_end<<L" "<<ad.m_jiou<<L" "<<ad.m_address<<std::endl;
	return output;
}
std::wistream&   operator>>(std::wistream&   input,AddressData& ad)
{
	input>>ad.m_address>>ad.m_begin>>ad.m_end>>ad.m_jiou>>ad.m_Release;
	ad.m_begin=ad.m_end=0;
	ad.m_UninstallPorts=ad.m_Release;
	if (ad.m_Release.find(L"·¢ÐÐÕ¾")!=std::wstring::npos)
	{	
		ad.isvalid=true;
		WCHAR chr1=ad.m_Release.at(0);
		WCHAR chr3=ad.m_Release.at(2);
	}
	else
	{
		int i=0;
		ad.isvalid=false;
	}
	if (ad.m_otherPorts.empty())
	{
		ad.m_otherPorts=L"null";
	}
	NumFilterWords nfw(config::getinstance()->numlist);
	nfw.process(ad.m_address);
	return input;
}