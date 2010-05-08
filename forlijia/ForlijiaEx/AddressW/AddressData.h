#pragma once
#include <iostream>
using namespace std;
class AddressData
{
public:
	AddressData(void);
	~AddressData(void);

	friend std::wostream&   operator<<(std::wostream&   output,AddressData& ad); 
	friend std::wistream&   operator>>(std::wistream&   input,AddressData& ad); 

	std::wstring m_otherPorts;
	std::wstring m_UninstallPorts;
	std::wstring m_Release;
	int m_begin;
	int m_end;
	std::wstring m_jiou;
	std::wstring m_address;
}; 