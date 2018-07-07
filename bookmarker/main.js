document.getElementById("myform").addEventListener("submit" , addbookmark);

function addbookmark(e) {
	//get form inputs
	var name = document.getElementById("webname").value;
	var link = document.getElementById("weblink").value;

	if(!name || !link) {
		alert("please fill in the required inputs");
		return false;
	}
	var exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi ;
	var regex = new RegExp(exp);

	if(!link.match(regex)) {
		alert("please add a valid link");
		return false;
	}

	var bookmark = {
		name : name,
		url : link
	}

	if(localStorage.getItem('bookmarks') === null ) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//reset the form after completion
	document.getElementById("myform").reset();
	// Re-fetch bookmarks
  	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

function loadbookmarks() {

		var bookmarkresult = document.getElementById("bk");
		bookmarkresult.innerHTML = ''; //if we forget this line, function will concat. the already present bookmarks with old + new one and print double, which we dont want
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		for(var i=0; i<bookmarks.length;i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
			bookmarkresult.innerHTML += '<div class="well1">'+
										'<h3>'+name+
										'  <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
										'  <a class="btn btn-danger" onclick="deletebookmark(\''+url+'\')" href="#">Delete</a>'+
										'</h3>'+
										'</div>';
		}
	}
function deletebookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i=0; i < bookmarks.length;i++) {
		if(bookmarks[i].url == url) {
			//remove from the array
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	loadbookmarks();
}