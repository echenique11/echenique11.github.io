$( document ).ready(function() {
	buildContent();
	$("section header").click(function(){
		var id = $(this).html();
		$("#" + id).toggle();
	});
});

var content = {
	"rubyHowTo" : {
		"create a class" : "class Person </br> end",
		"instantiate an object" : "Person.new()",
		"make methods private" : "define them below private keyword ",
		"define a Hash" : "options = { :font_size => 10, :font_family => \"Arial\" } </br> options = { font_size: 10, font_family: \"Arial\" }",
		"define an Array" :"arr = ['a', 'b', 'c', 'd', 'e', 'f']"
	},

	"rubyBuildIn" : {
		"delete_if" : "hash.delete_if {|key, value| key >= \"b\" }",
		"each" : "hash.each {|key, value| puts \"#{key} is #{value}\" }",
		"each_key" : "hash.each_key {|key| puts key }",
		"select" : "array.select { |num|  num.even?  }"
	},

	"jsHowTo" : {
		"create a constructor function" : "function Person(name,lastName){ </br> this.name = name; </br> this.last_name = last_name; </br> }",
		"instantiate an object from constructor function " : "var person = new Person('Luis','Echenique');"
	},

	"jsBuildIn" : {
		"sort" : "var numbers = [4, 2, 5, 1, 3];</br>numbers.sort(function(a, b) {</br> return a - b;</br>});",
		"filter" : "function isBigEnough(element) {</br>return element >= 10;</br>}</br>var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);"
	},

	"dbcWeek" : {
		"1- " : "on console git fetch upstream master",
		"2- " : "on console git merge upstream/master"
	},

	"dbcUnit" : {
		"1- " : "on github fork unit repo",
		"2- " : "on console git clone [url]",
		"3- " : "on console git remote add upstream [url]"
	}
}

function buildContent(){
	for(title in content){		
		$("#" + title).append(getContentByTitle(title));
	}
}

function getContentByTitle(title){
	var htmlContent = "";
	for(key in content[title]){
		htmlContent += "<div class='container'><label>" + key +"</label>";
		htmlContent += "<div class='description'>" + content[title][key] + "</div></div>";
	}
	return htmlContent;
}