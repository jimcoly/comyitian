function im007boy_Chrome_gmpllenfapkfpdkahamlbmbichihpmmg(){
	//��ҳ���ڵĿ쳵�������ӽ��д���
	var aDoms = document.getElementsByTagName("a");
	for(var i = 0; i < aDoms.length; i++)
	{
		var aouterHTML = aDoms.item(i).outerHTML;
		var FakeLink = aouterHTML.match(/[fF][lL][aA][sS][hH][gG][eE][tT][_][sS][eE][tT][hH][rR][eE][fF][_][jJ][sS]/);
						if(FakeLink && fUrl != null)
						{
							//���д���
							if(aDoms.item(i).hasAttribute("onclick"))
								aDoms.item(i).removeAttribute("onclick");
							if(aDoms.item(i).hasAttribute("oncontextmenu"))
								aDoms.item(i).removeAttribute("oncontextmenu");
							aDoms.item(i).setAttribute("href",fUrl);
							console.log("�������");
						}
	}
}
im007boy_Chrome_gmpllenfapkfpdkahamlbmbichihpmmg();