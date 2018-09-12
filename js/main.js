// getting word variable to use in page
function splashTextInsert () {
  var splashWords = ["html ", "css ", "modals ", "APIs ", "javascript ", "jQuery ", "handlebars ", "reactJS ", "responsive", "the grid ", "flexbox ", "mongoDB ", "mySQL ", "git ", "github ", "nodeJS ", "php "];
  var i = Math.floor(Math.random() * splashWords.length);
  splitWord = splashWords[i].split("");

  x = 0;
  wordLoader()
}

//actually displaying the word in the splash page
function wordLoader() {
  if (splitWord.length === 0) {
    setTimeout(function() {
      splashTextInsert()
    }, 1000);
  } else if (x <= splitWord.length && x>=0) {
    setTimeout(function() {
      $("#splashLoader").append(splitWord[x]);
      x++;
      wordLoader();
    }, Math.floor(Math.random() * 400) + 100);
  } else if (x > splitWord.length && x>=0) {

    setTimeout(function() {
      $("#splashLoader").empty();
      splitWord.pop();
      $("#splashLoader").text(splitWord.join(""));
      --x;
      wordLoader();
    }, 200);
  }
}

//portfolio project display//
function projectDisplay (data) {
  $("#modalContentName").empty();
  $("#modalContentName").html("<h2>" + data.name);

  $("#modalContentDescription").empty();
  $("#modalContentDescription").html("<p>" + data.description);

  $("#modalContentGif").removeAttr("src");
  $("#modalContentGif").attr("src", data.gif)

  $("#modalContentLink").removeAttr("href");
  $("#modalContentLink").attr("href", data.link);
}


//website progression//
splashTextInsert();

for ( i = 0; i < ; i++) {
    
}