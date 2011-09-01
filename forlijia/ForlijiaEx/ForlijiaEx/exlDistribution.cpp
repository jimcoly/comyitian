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

ExlDistribution::addressDataListexl ExlDistribution::get_data_list()
{
	addressDataListexl datalist;
	if (!m_isopen){
		return datalist;
	} 

	int row=m_ew.GetRowCount(); 
	for(int i=3;i<=row;i++)
	{ 
		CString saddress,swaifu,srelease,sunrealse;
		saddress=m_ew.GetCell(i,ADDRESSCOlUMN);
		swaifu=m_ew.GetCell(i,OTHERPORTCOLUMN);
		srelease=m_ew.GetCell(i,RELEASECOLUMN);
		sunrealse=m_ew.GetCell(i,UNRELEASECOLMN);
		StreetData sdata(saddress.GetString());//
		PortData pdata(swaifu.GetString(),sunrealse.GetString(),srelease.GetString());
		exldata ed={sdata,pdata};
		datalist.push_back(ed);
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
	for(int i=2;i<row;i++)
	{ 
		CString saddress,swaifu,srelease,sunrealse;
		saddress=m_ew.GetCell(i,8); 
		sunrealse=m_ew.GetCell(i,2);

		StreetData sdata(saddress.GetString());//
		PortData pdata(swaifu.GetString(),sunrealse.GetString(),sunrealse.GetString());
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
	if(pdatalist.size()!=row-2)
	{
		return false;
	}
	int i=3;
	for(auto iter=pdatalist.begin();iter!=pdatalist.end();iter++,i++)
	{ 
		CString swaifu,srelease,sunrealse; 
		if (iter->IsCity()){
			swaifu==L"";
		}
		else
		{
			swaifu=iter->m_otherPorts.c_str();
			if(swaifu==L"NULL")
			{
				swaifu=L"";
			}
		}
		srelease=iter->m_Release.c_str();
		sunrealse=iter->m_UninstallPorts.c_str();
		m_ew.SetCell(i,OTHERPORTCOLUMN,swaifu);
		m_ew.SetCell(i,RELEASECOLUMN,srelease);
		m_ew.SetCell(i,UNRELEASECOLMN,sunrealse);
	}
	return true;
}

void ExlDistribution::Save_And_Close()
{
	m_ew.Save(L"c:\\new.xls");
	m_ew.Close();
	ExcelWrapper::ReleaseExcel();
}
void ExlDistribution::Close()
{
	m_ew.Close();
	ExcelWrapper::ReleaseExcel();
}

bool ExlDistribution::check_Port_is_empty(addressDataListexl &datalist)
{
	for (auto iter=datalist.begin();iter!=datalist.end();iter++)
	{
		if (!iter->pd.Empty())
		{
			return false;
		}
	}
	return true;
}

