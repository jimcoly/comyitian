#include <string>
#include <map>
#include "..\AddressW\AddressData.h"
#include <list>
#include "..\ExcelW\ExcelWrapper.h"
#pragma once
class ExlDistribution
{
public:
	struct exldata
	{
		StreetData sd;
		PortData pd;
	};
public:
	ExlDistribution():m_isopen(false){}
public:
	bool Open(std::wstring filename);
	void Close();	
	typedef std::map<StreetData,PortData> addressDataList; 
		typedef std::list<exldata> addressDataListexl; 
public:
	addressDataListexl get_data_list();	
	ExlDistribution::addressDataList get_sep_list();
public:
	bool check_Port_is_empty(addressDataListexl &datalist);
	bool set_data_port( std::list<PortData> &pdatalist);
	void Save_And_Close();
public:

	std::wstring m_filename;
	ExcelWrapper m_ew;
	bool m_isopen;
};