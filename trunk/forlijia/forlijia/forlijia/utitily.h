#pragma once
std::string getrunpath()
{
	char filename[256]={0};
	GetModuleFileName(NULL,filename,256);
	string filenamestr(filename);
	int n=filenamestr.rfind("\\");
	 filenamestr.resize(n+1);
	 return filenamestr;
}
