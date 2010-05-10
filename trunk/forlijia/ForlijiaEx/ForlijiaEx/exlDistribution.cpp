#include "StdAfx.h"
#include "exlDistribution.h"

#define ADDRESSCOlUMN 11
#define OTHERPORTCOLUMN 2
#define RELEASECOLUMN 4
#define UNRELEASECOLMN 3
#define SHEETNUM 1
bool ExlDistribution::Open( std::wstring filename )
{
	ExcelWrapper::InitExcel();
	ExcelWrapper::ShowExcel(TRUE);

	if(m_ew.Open(filename.c_str()))
	{	
		m_ew.LoadSheet(SHEETNUM); 
		m_isopen=true;
		return true;
	}
	return false;
}
ExlDistribution::addressDataList ExlDistribution::get_data_list()
{
	addressDataList datalist;
	if (!m_isopen){
		return datalist;
	} 

	int row=m_ew.GetRowCount(); 
	for(int i=3;i<row;i++)
	{ 
		CString saddress,swaifu,srelease,sunrealse;
		saddress=m_ew.GetCell(i,ADDRESSCOlUMN);
		swaifu=m_ew.GetCell(i,OTHERPORTCOLUMN);
		srelease=m_ew.GetCell(i,RELEASECOLUMN);
		sunrealse=m_ew.GetCell(i,UNRELEASECOLMN);
		StreetData sdata(saddress.GetString());//
		PortData pdata(swaifu.GetString(),sunrealse.GetString(),srelease.GetString());
		datalist.insert(std::make_pair(sdata,pdata));
	}
	return datalist;
}
ExlDistribution::addressDataList ExlDistribution::get_sep_list()
{
	addressDataList datalist;
	if (!m_isopen){
		return datalist;
	} 
	int row=m_ew.GetRowCount(); 
	for(int i=1;i<row;i++)
	{ 
		CString saddress,swaifu,srelease,sunrealse;
		saddress=m_ew.GetCell(i,8); 
		sunrealse=m_ew.GetCell(i,2);

		StreetData sdata(saddress.GetString());//
		PortData pdata(swaifu.GetString(),sunrealse.GetString(),srelease.GetString());
		datalist.insert(std::make_pair(sdata,pdata));
	}
	return datalist;
}
bool ExlDistribution::set_data_port(  std::list<PortData> &pdatalist)
{
	if (!m_isopen){
		return false;
	} 
	int row=m_ew.GetRowCount(); 
	if(pdatalist.size()!=row-3)
	{
		return false;
	}
	int i=4;
	for(auto iter=pdatalist.begin();iter!=pdatalist.end();iter++,i++)
	{ 
		CString swaifu,srelease,sunrealse; 
		if (iter->IsCity()){
			swaifu==L"";
		}
		else
		{
			swaifu=iter->m_otherPorts.c_str();
		}
		srelease=iter->m_Release.c_str();
		sunrealse=iter->m_UninstallPorts.c_str();
		m_ew.SetCell(i,OTHERPORTCOLUMN,swaifu);
		m_ew.SetCell(i,RELEASECOLUMN,srelease);
		m_ew.SetCell(i,UNRELEASECOLMN,sunrealse);
	}
	return true;
}


void ExlDistribution::Close()
{
	ExcelWrapper::ReleaseExcel();
}

bool ExlDistribution::check_Port_is_empty(addressDataList &datalist)
{
	for (auto iter=datalist.begin();iter!=datalist.end();iter++)
	{
		if (!iter->second.Empty())
		{
			return false;
		}
	}
	return true;
}

