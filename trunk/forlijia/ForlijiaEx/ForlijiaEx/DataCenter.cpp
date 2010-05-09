#include "StdAfx.h"
//#include "DataCenter.h"
//#include <string>
//#include <iostream>
//#include <sstream>
//#include <fstream>
//#include "..\AddressW\utitily.h"
//#include <algorithm>
//
//#define  DATAFILENAME L"chengdudata.txt"
//DataCenter::DataCenter(void)
//{
//}
//
//
//DataCenter::~DataCenter(void)
//{
//}
//
//void DataCenter::Load()
//{	
//	m_addressList.clear();
//	std::wstring filename=getrunpath()+DATAFILENAME;
//	std::wifstream ifs(filename.c_str());
//	if (ifs)
//	{
//		ifs.imbue(locale("chs")); 
//		wstring temp;
//		while(getline(ifs,temp))
//		{
//			std::wstringstream ss;
//			ss.imbue(locale("chs")); 
//			AddressData data;
//			ss>>data;
// 
//			m_addressList.insert(data);
// 
//		}
//		ifs.close();
//	} 
//
//}
//
//void DataCenter::Save()
//{
//	std::wstring filename=getrunpath()+DATAFILENAME;
//	std::wofstream ofs(filename.c_str());
//	if (ofs)
//	{
//		ofs.imbue(locale("chs")); 
//		//for (auto iter = m_addressList.begin(); iter != m_addressList.end(); ++iter) {
//		//	ofs<<(*iter);
//		//}
//		for_each(m_addressList.begin(),m_addressList.end(),[&ofs](const AddressData &data){ofs<<data;});
//		ofs.close();
//	}
//	else
//	{
//		::MessageBox(NULL,L"save失败",L"失败",MB_OK);
//	}
//
//}
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