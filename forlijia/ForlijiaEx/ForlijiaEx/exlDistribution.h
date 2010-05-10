class ExlDistribution
{
public:
	ExlDistribution():m_isopen(false){}
public:
	bool Open(std::wstring filename);
	void Close();
public:
	addressDataList get_data_list();
public:
	bool check_Port_is_empty(addressDataList &datalist);
	bool set_data_port(const std::list<PortData> &pdatalist);
public:
	typedef std::map<StreetData,PortData> addressDataList; 
	std::wstring m_filename;
	ExcelWrapper m_ew;
	bool m_isopen;
};