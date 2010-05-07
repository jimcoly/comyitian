
#include "utitily.h"
#include "stdafx.h"
#include <string>
std::wstring getrunpath()
{
	WCHAR filename[256]={0};
	GetModuleFileName(NULL,filename,256);
	std::wstring filenamestr(filename);
	int n=filenamestr.rfind(L"\\");
	filenamestr.resize(n+1);
	return filenamestr;
}