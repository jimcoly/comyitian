#include "StdAfx.h"
#include "AddressData.h"
#include <sstream>
AddressData::AddressData(void)
{
}

AddressData::~AddressData(void)
{
}

std::wostream&   operator<<(std::wostream&   output,AddressData& ad)
{
	output<<ad.m_otherPorts<<L" "<<ad.m_UninstallPorts<<L" "<<ad.m_Release<<L" "
		<<ad.m_begin<<L" "<<ad.m_end<<L" "<<ad.m_jiou<<L" "<<ad.m_address<<std::endl;
	return output;
}
std::wistream&   operator>>(std::wistream&   input,AddressData& ad)
{
	input>>ad.m_address>>ad.m_begin>>ad.m_end>>ad.m_jiou>>ad.m_Release;
	ad.m_begin=ad.m_end=0;
	return input;
}