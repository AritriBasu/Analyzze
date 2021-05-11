var title=document.getElementsByClassName("card-img-title");
var author=document.getElementsByClassName("card-author-content");
var pubAt=document.getElementsByClassName("card-date-content");
var description=document.getElementsByClassName("card-description");
var moreUrl=document.getElementsByClassName("read-more");

console.log("National News");

const getNationalNews = async () => {
  console.log("Processing api call...");
  const request = await fetch("https://newsapi.org/v2/everything?q=india%20AND%20parties&apiKey=d486174026474909a29a1342be340ad5");
  const data = await request.json();
  return data;
};

getNationalNews().then(NData => {
  console.log(NData);
  for(var i=0;i<12;i++){
  
  var national_title=NData.articles[i].title;
  console.log(typeof(national_title));
  title[i].innerHTML=national_title;

  var national_description=NData.articles[i].description;
  description[i].innerHTML=national_description;

  var national_url=NData.articles[i].url;
  moreUrl[i].href=national_url;

  var imgUrl=document.getElementById(`img${i}`);
  var national_imgUrl=NData.articles[i].urlToImage;
  console.log(national_imgUrl);
  imgUrl.src=national_imgUrl;

  var national_pubAt=NData.articles[i].publishedAt;
  pubAt[i].innerHTML=national_pubAt;

  var national_author=NData.articles[i].author;
  author[i].innerHTML=national_author;
  
  }//for loop
});