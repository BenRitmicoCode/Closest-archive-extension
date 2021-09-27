document.querySelector('.date-limit').max = new Date().toISOString().split("T")[0];
document.querySelector('.search').addEventListener('click',function(){
	document.getElementsByClassName("no-archives")[0].style.visibility = "hidden";
	document.getElementsByClassName("recent-archive")[0].style.visibility = "hidden";
	var date = document.querySelector('.date-limit').value.replace(/-/g,"");
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	    var urlQuery = "http://archive.org/wayback/available?url="+tabs[0].url+"&timestamp="+date;
	   // var urlQuery = "C:/Users/Rithvik/Desktop/temp.json";
	    console.log(urlQuery);
	  	//getData(urlQuery);
	
	    fetch(urlQuery).then(function(res){
	    	console.log(res);
	    	if(res.status !== 200){
	    		console.log("There was an error");
	    		return;
	    	}
	    	//console.log(res.json());
	    	res.json().then(function(data){
	    		console.log(data.archived_snapshots);
	    		if(JSON.stringify(data.archived_snapshots) === '{}'){
	    			document.getElementsByClassName("no-archives")[0].style.visibility = "visible";
	    			console.log("No Previous Archives exist");
	    		}else{
	    			var currTime = data.archived_snapshots.closest.timestamp;
	    			document.getElementsByClassName("recent-archive")[0].style.visibility = "visible";
	    			console.log(currTime);
		    		var year = currTime.substring(0,4);
		    		var month = currTime.substring(4,6);
		    		var day = currTime.substring(6,8);
		    		var newDate = day+"-"+month+"-"+year;
		    		console.log(newDate);
		    		var archivedUrl = data.archived_snapshots.closest.url;
		    		console.log(archivedUrl);
		    		document.getElementsByClassName("recent-archive-text")[0].innerHTML = "The Most Recent Archive Was On "+newDate;
		    		document.getElementsByClassName("open-button")[0].onclick=function(){
		    			chrome.tabs.create({url: archivedUrl});
		    		}
	    		}
	    	})
    			    	
	    }).catch(function(err){
	    	console.log(err);
	    });
	    return true;
	});

});