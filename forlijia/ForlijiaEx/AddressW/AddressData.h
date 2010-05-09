#pragma once
#include <iostream>
using namespace std;

class StreetData
{	
public:
	StreetData(){}
	StreetData(std::wstring address,std::wstring jiou,int begin,int end)
		:m_address(address),m_jiou(jiou),m_begin(begin),m_end(end)
	{

	}
	~StreetData()
	{

	}
public:
	bool operator>(const StreetData& d)const;
	bool operator<(const StreetData& d)const;
	bool operator==(const StreetData& d)const;
	bool operator!=(const StreetData& d)const;

	friend std::wostream&   operator<<(std::wostream&   output,const StreetData& ad); 
	friend std::wistream&   operator>>(std::wistream&   input,StreetData& ad); 
	int m_begin;
	int m_end;
	std::wstring m_jiou;
	std::wstring m_address;
};
class PortData
{
public:
	PortData(){}
	PortData(	std::wstring otherPorts,
	std::wstring UninstallPorts,
	std::wstring Release)
	:m_otherPorts(otherPorts),m_UninstallPorts(UninstallPorts),m_Release(Release)
	{

	}
	~PortData(){}
public:
	bool operator==(const PortData& d)const;
	bool operator!=(const PortData& d)const;
	friend std::wostream&   operator<<(std::wostream&   output,const PortData& ad); 
	friend std::wistream&   operator>>(std::wistream&   input,PortData& ad); 
	std::wstring m_otherPorts;
	std::wstring m_UninstallPorts;
	std::wstring m_Release;
};
//class AddressData
//{
//public:
//	AddressData(void);
//	~AddressData(void);
//public:
//
//	bool operator>(const AddressData& d)const;
//	bool operator<(const AddressData& d)const;
//	bool operator==(const AddressData& d)const;
//	bool operator!=(const AddressData& d)const;
//public:
//
//
//	//bool isvalid;
//}; 