#pragma once
#include "..\AddressW\AddressData.h"

#include <map>




class DataCenter
{
public:
	DataCenter(void);
	~DataCenter(void);

public:
	void Load();

	void LoadOtherData();
	void LoadChengduData();
	void Save();
	//int check(AddressData data,AddressData *olddata);
	bool check(StreetData sdata);
	void Insert(StreetData sdata,PortData pdata);
	bool IsOther(std::wstring unrelease);
	PortData process(std::string address);
	bool IsTiaojian(std::wstring address);
public:
	typedef std::map<StreetData,PortData> addressDataList;
	addressDataList m_addressList;
//	addressDataList m_motifeaddressList;
	typedef std::map<std::wstring,PortData> OtherDataList;
	OtherDataList m_otherDataList;
};


