/**********************************************************************
*  Copyright (C) 2010 by Josorek@gmail.com
*  All rights reserved.
*
**********************************************************************/
function Tree(continaer, treeNodes, callBack, css, allowLinks) {

	var t = this;
	
	t.treeContainer = continaer;
	t.callBack      = callBack;
	t.treeNodes     = treeNodes;
	t.allowLinks    = allowLinks;

	t.css = {};
	t.css.treeNodeText = " ";
	t.css.treeNodeFolderText = " ";
	
	var selectedTreeRow = null;


	if (css) {
		if (css.treeNodeText) t.css.treeNodeText = " " + css.treeNodeText;
		if (css.treeNodeFolderText) t.css.treeNodeFolderText = " " + css.treeNodeFolderText;
	}

	t.createTree = function() {
		t.createTreeNodes(t.treeContainer, t.treeNodes, 0);
	}

	t.createTreeNodes = function(containerNode, treeNodes, level) {
		if (level==null) level = 0;

		for (var i=0;i<treeNodes.length;i++) {
			 var treeRow = t.createNode(containerNode, treeNodes[i], level);
			 if (treeNodes[i].type==1) {
				 if (treeNodes[i].nodes) {
					 t.createTreeNodes(treeRow.treeNode.folderContainer, treeNodes[i].nodes, level + 1)
				 }
				 treeRow.treeNode.addEventListener("click", function(e){
					 var folder = e.currentTarget;
					 if (folder.isOpen) {
						folder.folderContainer.style.display = 'none';
						folder.setAttribute("class", "tree-node folder" + t.css.treeNodeFolderText);
					 } else {
						folder.folderContainer.style.display = '';
						folder.setAttribute("class", "tree-node folderClose" + t.css.treeNodeFolderText);
					 }
					 folder.isOpen = !folder.isOpen;
				  }, false);
			 }
		}
	}
	
	t.createNode = function(containerNode, node, level) {
		 var treeRow = createElement({element : "div", class : "tree-row"})

		 if (node.type==0) {
			 if (node.iconPath) {
				  favIcon = createElement({
						element : "img",
						class   : "favIcon"
				  })
				  favIcon = "<img src='"+ node.iconPath +"'>"
			  } else {
				  favIcon = "<div></div>"
			 }
			 if ((node.url) && (t.allowLinks)) {
				 treeNode = createElement({element : "a", class : "tree-node" + t.css.treeNodeText})
				 treeNode.setAttribute("href", node.url);
			 } else {
				 treeNode = createElement({element : "div", class : "tree-node" + t.css.treeNodeText})
			 }
			 treeNode.innerHTML = "<nobr>" + favIcon + " <font>" + node.title +"</font></nobr>";
			 treeNode.itemId = node.itemId;
			 treeRow.appendChild(treeNode);
			 treeNode.style.marginLeft = (level * 20) + "px"	
			 containerNode.appendChild(treeRow);
		 } else if (node.type==1) {
			 favIcon = "<img src='images/folder.png'>"
			 treeNode = createElement({element : "div", class : "tree-node folder" + t.css.treeNodeFolderText})
			 treeNode.innerHTML = favIcon + " <font><nobr>" + node.title +"</nobr></font>";
			 treeNode.itemId = node.itemId;		
			 folderContainer = createElement({element : "div", class : "tree-node-folder-container"})
			 if (node.isClose) {
				 treeNode.isOpen = false;
				 folderContainer.style.display = 'none';
			 } else {
				 treeNode.isOpen = true;
			 }
			 treeNode.folderContainer = folderContainer;
			 treeNode.style.marginLeft = (level * 20) + "px"
			 treeRow.treeNode = treeNode;
			 treeRow.appendChild(treeNode);
			 containerNode.appendChild(treeRow);
			 containerNode.appendChild(folderContainer);
		 } else if (node.type==2) {
			 treeNode = createElement({element : "div", class : "tree-node-separator"})
			 treeRow.appendChild(treeNode);
			 containerNode.appendChild(treeRow);
		 }
		 if ((treeRow) && (node.type!=2)){
			 treeRow.node = node;
			 treeRow.addEventListener("mousedown", function(e){
				 var treeRow = e.currentTarget;
				 if (selectedTreeRow!=null) {
					 selectedTreeRow.setAttribute("class", "tree-row");
				 }
				 selectedTreeRow = treeRow;
				 treeRow.setAttribute("class", "tree-row selected");
				 if (t.callBack) t.callBack.apply(this, new Array(treeRow.node, e));

			 }, false);	 
			 return treeRow;
		 }
	}
	t.createBookmarkTree = function(title) {

			tree = t.treeContainer;

			title = "";

			if (title) {
				var openTabs = {
					title : title,
					type  : 1,
				}
				 t.loadBookmarks(0, treeRow.treeNode.folderContainer, 1);
			} else {
				t.loadBookmarks(0, t.treeContainer, 0);
			}

	}
	t.loadBookmarks = function(folderID, treeNode, level)  {
		chrome.bookmarks.get(new Array(folderID+""), function(result){
			t.createBookmarkTreeNodes(treeNode, result[0], level);
		})
		rootNode.containerOpen = false;

    }
	t.createBookmarkTreeNodes = function(containerNode, treeNodes, level)  {

		chrome.bookmarks.getChildren(treeNodes.id, function (children) {

			if (level==null) level = 0;
			var type, title, iconPath;
			for (var i=0;i<children.length;i++) {
				 var node = children[i];

				 if (node.title) {
				   title = node.title;
				 } else {
				   title = node.url;
				 }	
				
				 if (node.url==null) {
					 type= 1;
					 iconPath = null;
				 } else {
					 type= 0;
					 iconPath = "http://www.google.com/s2/favicons?domain_url=" + node.url;
				 }
				
				 var _node = {
						title  : title,
						url    : node.url,
						type   : type,
						itemId : node.id,
						iconPath : iconPath
				 }
						
				 var treeRow = t.createNode(containerNode, _node, level);
				 if (_node.type==1) {
					 treeRow.treeNode.addEventListener("mousedown", function(e){
						 var folder = e.currentTarget;
						 if (folder.init==null) {
							 folder.init = true;
							 folder.isOpen = true;
							 t.loadBookmarks(folder.itemId, folder.folderContainer, level + 1);
							 folder.setAttribute("class", "tree-node folderClose" + t.css.treeNodeFolderText);
						 } else {
							 if (folder.isOpen) {
								folder.folderContainer.style.display = 'none';
								folder.setAttribute("class", "tree-node folder" + t.css.treeNodeFolderText);
							 } else {
								folder.folderContainer.style.display = '';
								folder.setAttribute("class", "tree-node folderClose" + t.css.treeNodeFolderText);
							 }
							 folder.isOpen = !folder.isOpen;
						 }
					  }, false);
					  if (node.id==1) {
							 var f = treeRow.treeNode;
							 var a = setTimeout(function() {
								 var folder = f;
								 folder.init = true;
								 folder.isOpen = true;
								 t.loadBookmarks(folder.itemId, folder.folderContainer, level + 1);
							
								 folder.setAttribute("class", "tree-node folderClose" + t.css.treeNodeFolderText);
							 }, 50);
					  }
				 }
			}
		})
	
	}
}	

function createElement(el) {

	var element = document.createElement(el.element); 
	if (el.id) {
		element.setAttribute("id", el.id);
	}
	if (el.style) {
		for (var i=0;i<el.style.length;i++){
			element.style[el.style[i][0]] = el.style[i][1];
		}
	}
	if (el.attr) {
		for (var i=0;i<el.attr.length;i++){
			element.setAttribute(el.attr[i][0], el.attr[i][1]);
		}
	}
	if (el.class) element.setAttribute("class", el.class);
					

	return element;
}