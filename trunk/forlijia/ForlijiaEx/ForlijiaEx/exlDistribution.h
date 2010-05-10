#include <string>
#include <map>
#include "..\AddressW\AddressData.h"
#include <list>
#include "..\ExcelW\ExcelWrapper.h"

class ExlDistribution
{
public:
	ExlDistribution():m_isopen(false){}
public:
	bool Open(std::wstring filename);
	void Close();	
	typedef std::map<StreetData,PortData> addressDataList; 
public:
	addressDataList get_data_list();	
	ExlDistribution::addressDataList get_sep_list();
public:
	bool check_Port_is_empty(addressDataList &datalist);
	bool set_data_port( std::list<PortData> &pdatalist);

public:

	std::wstring m_filename;
	ExcelWrapper m_ew;
	bool m_isopen;
};