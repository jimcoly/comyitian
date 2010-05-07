#pragma once
std::string getrunpath()
{
	char filename[256]={0}£»
	GetModuleFileName(NULL,filename,256);
	string filenamestr(filename);
	int n=filename.rfind("\\");
	return std::string(filename.resize(0,))

}
