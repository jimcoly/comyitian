#include "StdAfx.h"
#include "DataCenter.h"
#include <string>
#include <iostream>
#include <sstream>
#include <fstream>
#include "..\AddressW\utitily.h"
#include <algorithm>
#include "..\AddressW\FilterAddress.h"
#include "..\AddressW\config.h"

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
		::MessageBox(NULL,L"save失败",L"失败",MB_OK);
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

PortData DataCenter::process( std::wstring address )
{
	PortData pd;
	static FilterAddress fa;
	fa.process(address);

	std::set<std::wstring> aset=getKeyAddress(address);
	for (auto iter=aset.begin();iter!=aset.end();iter++)
	{
		for (auto iter1=m_addressList.begin();iter1!=m_addressList.end();iter1++)
		{
			if (iter1->first.m_address.find(*iter)!=std::wstring::npos)
			{
				pd=iter1->second;
				return pd;
			}
		}

	}
	return PortData();
}
std::set<std::wstring> DataCenter::getKeyAddress(std::wstring orgaddress)
{
	config *theconfig=config::getinstance();
	StringList keywordList=theconfig->addresskeywordlist;
	std::set<std::wstring> keySet;
	for (auto iter=keywordList.begin();iter!=keywordList.end();iter++)
	{
		size_t pos=orgaddress.find(*iter);
		if(pos!=std::wstring::npos)
		{
			std::wstring str=orgaddress.substr(0,pos+1);
			keySet.insert(str);
			break;
		}
		else if (orgaddress.size()<5)
		{
			keySet.insert(orgaddress);
			break;
		}
	}
	return keySet;
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
		int i=0;
		while(getline(ifs,temp))
		{
			std::wstringstream ss;
			//ss.imbue(locale("chs")); 
			ss<<temp;
			StreetData sdata;
			PortData pdata;
			ss>>pdata>>sdata;

			m_addressList.insert(std::make_pair(sdata,pdata));
			i++;
			if (i>2000)
			{
				int t=0;
			}
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
WCHAR *chengqu[12]={L"成1",L"成2",L"锦1",L"锦2",L"金1",L"金2",L"武1",L"武2",L"武3",L"青1",L"青2",L"花"};


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
bool DataCenter::Tiaojian(std::wstring address,PortData& pdata)
{
	for (auto iter=m_otherDataList.begin();iter!=m_otherDataList.end();iter++)
	{
		if (address.find(iter->first)!=std::wstring::npos)
		{
			pdata=iter->second;
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
////下面是第一次为了处理一些无效数据 和从ansi本文读入
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