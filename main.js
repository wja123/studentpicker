var docReady=document.addEventListener('DOMContentLoaded',function(){
	console.log("worked");
	var addStudent = document.querySelector('.addStudent');
	var getStudent = document.querySelector('.getRandom');
	var genGroups = document.querySelector('.genGroup');
	var studentListArr=[];
	var ranStudent="";
	var studentGroup=[];
	var shuffledGroup=[];
	var studentListEvent=addStudent.addEventListener("click",addStudentFunc);
	var ranStudentEvent=getStudent.addEventListener("click",getRandomFunc);
	var genGroupEvent=genGroups.addEventListener("click",genGroupsFunc);

	function addStudentFunc(){
		var inputValue = document.querySelector(".input-list").value;
		if(inputValue.search(/[,]/)>0){
			studentListArr=studentListArr.concat(inputValue.split(","));
			studentListArr=studentListArr.map(function(x){return x.trim();});
			document.querySelector(".input-list").value="";
		}else{
			if(inputValue!==""){
				studentListArr.push(inputValue);

				document.querySelector(".input-list").value="";
			}
			
		}	
		var appendString="<tr><td class='nametitle'>Student Name</tr></td>";

		for(var i=0;i<studentListArr.length;i++){
			appendString+="<tr><td class='"+studentListArr[i]+"''>"+studentListArr[i]+"</tr></td>";
		}
		document.querySelector(".student-list").innerHTML="";
		document.querySelector(".student-list").innerHTML=appendString;
		if(ranStudent!==""){
			document.getElementsByClassName(ranStudent)[0].classList.add("highlight");
		}

	};


	function getRandomFunc(){
		if(studentListArr.length>0){
			if(ranStudent!=""){
				document.getElementsByClassName(ranStudent)[0].classList.remove("highlight");
			}
			ranStudent=studentListArr[Math.floor(Math.random()*(studentListArr.length))];
			document.getElementsByClassName(ranStudent)[0].classList.add("highlight");
		}
	}

	//CREATES GROUPS AS ROWS
	// function genGroupsFunc(){
	// 	var groupAppend="<tr><td>";
	// 	if(studentListArr.length>0){
	// 		if(document.querySelector('.groupSize').value>0){
	// 			var groupSize=document.querySelector('.groupSize').value;
	// 			var shuffledGroup=studentListArr.shuffle();
	// 			var rowCount=0;
	// 			for(var i=0;i<shuffledGroup.length;i++){
	// 				console.log(i);
	// 				if(i%groupSize===0){
	// 					groupAppend+="</tr><tr><td class='"+shuffledGroup[i]+"''>"+shuffledGroup[i]+"</td>";
	// 				}
	// 				else{
	// 					groupAppend+="<td class='"+shuffledGroup[i]+"''>"+shuffledGroup[i]+"</td>";
	// 				}
	// 			}
	// 			groupAppend+="</tr>";
	// 			console.log(groupAppend);
	// 			document.querySelector(".student-list").innerHTML="";
	// 			document.querySelector(".student-list").innerHTML=groupAppend;
	// 		}
	// 	}
	// }
	
	//CREATES GROUPS AS COLUMNS
	function genGroupsFunc(){
		var groupAppend1="<tr>";
		var groupAppend2="";
		if(studentListArr.length>0){
			if(document.querySelector('.groupSize').value>0){
				var groupSize=document.querySelector('.groupSize').value;
				var shuffledGroup=studentListArr.shuffle();
				var numGroups = Math.ceil(shuffledGroup.length/groupSize);
				var subGroupSize=0;
				console.log(numGroups);

				for(var i=0;i<numGroups;i++){
					groupAppend1+="<td class='group'>Group " + (i+1) + "</td>";
					groupAppend2+="<tr>";
					for(var j=i*numGroups;j<numGroups*i + numGroups;j++){
						console.log(j);
						if(j<shuffledGroup.length){
							
							groupAppend2+="<td class="+shuffledGroup[j]+">"+shuffledGroup[j]+"</td>";
						}
						
					}
					groupAppend2+="</tr>";
				}
				groupAppend1+="</tr>";
				document.querySelector(".student-list").innerHTML="";
				document.querySelector(".student-list").innerHTML=groupAppend1+groupAppend2;
			}
		}
		if(ranStudent!==""){
			document.getElementsByClassName(ranStudent)[0].classList.add("highlight");
		}
	}


	Array.prototype.shuffle = function() { //Stackoverflow
		var input = this;

		for (var i = input.length-1; i >=0; i--) {

			var randomIndex = Math.floor(Math.random()*(i+1)); 
			var itemAtIndex = input[randomIndex]; 

			input[randomIndex] = input[i]; 
			input[i] = itemAtIndex;
		}
		return input;
	}

});