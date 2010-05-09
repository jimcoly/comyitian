#include "StdAfx.h"
#include "AddressData.h"
#include <sstream>
#include "FilterWords.h"
#include "config.h"
//
//
//AddressData::AddressData(void)
//{
//}
//
//AddressData::~AddressData(void)
//{
//}
//
//bool AddressData::operator>( const AddressData& d ) const
//{
//	return m_address>d.m_address;
//}
//
//bool AddressData::operator<( const AddressData& d ) const
//{
//	wstringstream ss1<<*this;
//	wstringstream ss2<<d;
//	return ss1.str()<ss2.str();
//}
//std::wostream&   operator<<(std::wostream&   output,const AddressData& ad)
//{
//	output<<ad.m_otherPorts<<L" "<<ad.m_UninstallPorts<<L" "<<ad.m_Release<<L" "
//		<<ad.m_begin<<L" "<<ad.m_end<<L" "<<ad.m_jiou<<L" "<<ad.m_address<<std::endl;
//	return output;
//}
//std::wistream&   operator>>(std::wistream&   input,AddressData& ad)
//{
//	input>>ad.m_address>>ad.m_begin>>ad.m_end>>ad.m_jiou>>ad.m_Release;
//	
//	//下面是第一次为了处理一些无效数据
//	//ad.m_begin=ad.m_end=0;
//	//ad.m_UninstallPorts=ad.m_Release;
//	//if (ad.m_Release.find(L"发行站")!=std::wstring::npos)
//	//{	
//	//	ad.isvalid=true;
//	//	WCHAR chr1=ad.m_Release.at(0);
//	//	WCHAR chr3=ad.m_Release.at(2);
//	//}
//	//else
//	//{
//	//	int i=0;
//	//	ad.isvalid=false;
//	//}
//	//if (ad.m_otherPorts.empty())
//	//{
//	//	ad.m_otherPorts=L"null";
//	//}
//	//NumFilterWords nfw(config::getinstance()->numlist);
//	//nfw.process(ad.m_address);
//	return input;
//}

//////////////////////////////////////////////////////////////////////////

bool StreetData::operator>( const StreetData& d ) const
{
	wstringstream ss1,ss2;
	ss1<<*this;
	ss2<<d;
	return ss1.str()>ss2.str();
}

bool StreetData::operator<( const StreetData& d ) const
{
	wstringstream ss1,ss2;
	ss1<<*this;
	ss2<<d;
	return ss1.str()<ss2.str();
}

bool StreetData::operator==( const StreetData& d ) const
{
	wstringstream ss1,ss2;
	ss1<<*this;
	ss2<<d;
	return ss1.str()==ss2.str();
}
bool StreetData::operator!=( const StreetData& d ) const
{
	return !(*this==d);
}

std::wostream& operator<<( wostream& output,const StreetData& ad )
{
	output<<ad.m_begin<<L" "<<ad.m_end<<L" "<<ad.m_jiou<<L" "<<ad.m_address<<std::endl;
	return output;
}	
std::wistream& operator>>( wistream& input,StreetData& ad )
{
	input>>ad.m_begin>>ad.m_end>>ad.m_jiou>>ad.m_address;
	return input;
}
//////////////////////////////////////////////////////////////////////////

bool PortData::operator==( const PortData& d ) const
{
	wstringstream ss1,ss2;
	ss1<<*this;
	ss2<<d;
	return ss1.str()==ss2.str();
}

bool PortData::operator!=( const PortData& d ) const
{
	return !(*this==d);
}	
std::wostream& operator<<( wostream& output,const PortData& ad )
{
	output<<ad.m_otherPorts<<L" "<<ad.m_UninstallPorts<<L" "<<ad.m_Release<<std::endl;
	return output;
}

std::wistream& operator>>( wistream& input,PortData& ad )
{
	input>>ad.m_otherPorts>>ad.m_UninstallPorts>>ad.m_Release;
	return input;
}