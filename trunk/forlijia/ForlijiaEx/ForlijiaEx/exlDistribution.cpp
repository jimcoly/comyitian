#include "exlDistribution.h"
#define ADDRESSCOlUMN 6
#define OTHERPORTCOLUMN 1
#define RELEASECOLUMN 2
#define UNRELEASECOLMN 3
#define SHEETNUM 1
bool ExlDistribution::Open( std::wstring filename )
{
	ExcelWrapper::InitExcel();
	ExcelWrapper::ShowExcel(false);
	ExcelWrapper ew;
	if(ew.Open(filename.c_str())
	{	
		m_ew.LoadSheet(SHEETNUM); 
		m_isopen=false;
		return true;
	}
	return false;
}
addressDataList ExlDistribution::get_data_list()
{
	addressDataList datalist;
	if (!m_isopen){
		return datalist;
	} 

	int row=m_ew.GetRowCount(); 
	for(int i=3;i<row+3 /*����������*/;i++)
	{ 
		CString saddress,swaifu,srelease,sunrealse;
		saddress=m_ew.GetCell(i,ADDRESSCOlUMN);
		swaifu=m_ew.GetCell(i,OTHERPORTCOLUMN);
		srelease=m_ew.GetCell(i,RELEASECOLUMN);
		sunrealse=m_ew.GetCell(i,SHEETNUM);
		StreetData sdata(saddress.GetString());//
		PortData pdata(swaifu.GetString(),sunrealse.GetString(),srelease.GetString());
		datalist.insert(std::make_pair(sdata,pdata));
	}
	return datalist;
}
bool ExlDistribution::set_data_port( const std::list<PortData> &pdatalist)
{
	if (!m_isopen){
		return false;
	} 
	int row=m_ew.GetRowCount(); 
	if(pdatalist.size()!=row-3)
	{
		return false
	}
	for(int i=4,auto iter=pdatalist.begin();pdatalist.end();iter++,i++)
	{ 
		CString swaifu,srelease,sunrealse; 
		if (iter->IsCity()){
			swaifu==L"";
		}
		else
		{
			swaifu=iter->m_otherPorts;
		}
		srelease=iter->m_Release;
		sunrealse=iter->m_UninstallPorts
		m_ew.SetCell(i,OTHERPORTCOLUMN,swaifu);
		m_ew.GetCell(i,RELEASECOLUMN,srelease);
		m_ew.GetCell(i,UNRELEASECOLMN,sunrealse);
	}
	return true;
}


void ExlDistribution::Close()
{
	ExcelWrapper::ReleaseExcel();
}

bool ExlDistribution::check_Port_is_empty(addressDataList &datalist)
{
	for (auto iter=datalist.begin();iter=datalist.end();iter++)
	{
		if (!iter->second.Empty())
		{
			return false;
		}
	}
	return true;
}
