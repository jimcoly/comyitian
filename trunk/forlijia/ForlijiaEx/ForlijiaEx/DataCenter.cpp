#include "StdAfx.h"
#include "DataCenter.h"
#include <string>
#include <iostream>
#include <sstream>
#include <fstream>
#include "..\AddressW\utitily.h"
#include <algorithm>

#define  DATAFILENAME L"chengdudata.txt"
#define  OTHERFILENAME L"otherdata.txt"
DataCenter::DataCenter(void)
{
}


DataCenter::~DataCenter(void)
{
}

void DataCenter::Load()
{	
	LoadChengduData();
	LoadOtherData();
}

void DataCenter::Save()
{
	std::wstring filename=getrunpath()+DATAFILENAME;
	std::wofstream ofs(filename.c_str());
	if (ofs)
	{
		ofs.imbue(locale("chs")); 
		for (auto iter = m_addressList.begin(); iter != m_addressList.end(); ++iter) {
			ofs<<iter->second<<L" "<<iter->first<<std::endl;
		}
		//for_each(m_addressList.begin(),m_addressList.end(),[&ofs](const AddressData &data){ofs<<data;});
		ofs.close();
	}
	else
	{
		::MessageBox(NULL,L"saveʧ��",L"ʧ��",MB_OK);
	}

}

bool DataCenter::check( StreetData sdata )
{
	auto iter=m_addressList.find(sdata);
	if (iter==m_addressList.end())
	{
		return true;
	}
	return false;
}

void DataCenter::Insert( StreetData sdata,PortData pdata )
{
	m_addressList.insert(std::make_pair(sdata,pdata));
}

PortData DataCenter::process( std::string address )
{
	return PortData();
}

void DataCenter::LoadChengduData()
{
	m_addressList.clear();
	std::wstring filename=getrunpath()+DATAFILENAME;
	std::wifstream ifs(filename.c_str());
	if (ifs)
	{
		ifs.imbue(locale("chs")); 
		wstring temp;
		while(getline(ifs,temp))
		{
			std::wstringstream ss;
			ss.imbue(locale("chs")); 
			ss<<temp;
			StreetData sdata;
			PortData pdata;
			ss>>pdata>>sdata;

			m_addressList.insert(std::make_pair(sdata,pdata));

		}
		ifs.close();
	}
}

void DataCenter::LoadOtherData()
{
	m_otherDataList.clear();
	std::wstring filename=getrunpath()+OTHERFILENAME;
	std::wifstream ifs(filename.c_str());
	if (ifs)
	{
		ifs.imbue(locale("chs")); 
		wstring temp;
		while(getline(ifs,temp))
		{
			std::wstringstream ss;
			ss.imbue(locale("chs"));
			ss<<temp;
			std::wstring str;
			PortData pdata;
			ss>>str>>pdata;

			m_otherDataList.insert(std::make_pair(str,pdata));

		}
		ifs.close();
	}
}
WCHAR *chengqu[12]={L"��1",L"��2",L"��1",L"��2",L"��1",L"��2",L"��1",L"��2",L"��3",L"��1",L"��2",L"��"};

bool DataCenter::IsOther( std::wstring unrelease )
{
	bool result=true;
	for(int i=0;i<12;i++)
	{
		if(unrelease==chengqu[i])
		{
			result=false;
		}
	}
	return result;

}
bool DataCenter::IsTiaojian(std::wstring address)
{
	for (auto iter=m_otherDataList.begin();iter!=m_otherDataList.end();iter++)
	{
		if (address.find(iter->first)!=std::wstring::npos)
		{
			return true;
		}
	}
	return false;
}
//
//
//
//
//
////�����ǵ�һ��Ϊ�˴���һЩ��Ч���� �ʹ�ansi���Ķ���
////std::wstring filename=getrunpath()+DATAFILENAME;
////std::ifstream ifs(WChar2Ansi(filename.c_str()));
////if (ifs)
////{
////	m_addressList.clear();
////	ifs.imbue(locale("chs")); 
////	string temp;
////	while(getline(ifs,temp))
////	{
////		std::wstringstream ss;
////		//ss.imbue(locale("chs"));
////		ss<<Ansi2Wchar(temp);
////		AddressData data;
////		ss>>data;
////		if(data.isvalid)
////		{
////			m_addressList.insert(data);
////		}
////	}
////	ifs.close();
////} 