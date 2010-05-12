#pragma once
#include "..\AddressW\AddressData.h"

#include <map>
#include <set>




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
	PortData process(std::wstring address);
	bool IsTiaojian(std::wstring address);
	bool Tiaojian(std::wstring address,PortData& pdata);
	std::set<std::wstring> getKeyAddress(std::wstring orgaddress);
public:
	typedef std::map<StreetData,PortData> addressDataList;
	addressDataList m_addressList;
//	addressDataList m_motifeaddressList;
	typedef std::map<std::wstring,PortData> OtherDataList;
	OtherDataList m_otherDataList;
};


