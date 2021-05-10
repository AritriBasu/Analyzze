//const dotenv =require('dotenv').config();

//const API_KEY=process.env.NEWS_API_KEY;
function getState(){
var title=document.getElementsByClassName("card-img-title");
var imgUrl=document.getElementsByClassName("news-card-image").src;
var author=document.getElementsByClassName("card-author-content");
var pubAt=document.getElementsByClassName("card-date-content");
var description=document.getElementsByClassName("card-description");
var moreUrl=document.getElementsByClassName("read-more");

console.log("img object"+imgUrl);

console.log("State News");

var state=document.getElementById("state").value;
console.log(state);

const getStateNews = async () => {
  console.log("Processing api call...");
  const request = await fetch(`https://newsapi.org/v2/everything?q=${state}%20AND%20politics&apiKey=d486174026474909a29a1342be340ad5`);
  const data = await request.json();
  return data;
};

getStateNews().then(SData => {
  console.log(SData);
  for(var i=0;i<6;i++){
  /**console.log("title", SData.articles[i].title);
  console.log("description", SData.articles[i].description);
  console.log("url", SData.articles[i].url);
  console.log("image url", SData.articles[i].urlToImage);
  console.log("published at(time)", SData.articles[i].publishedAt);
  console.log("author", SData.articles[i].author);*/
  
  var state_title=SData.articles[i].title;
  title[i].innerHTML=state_title;

  var state_description=SData.articles[i].description;
  description[i].innerHTML=state_description;

  var state_url=SData.articles[i].url;
  moreUrl[i].href=state_url;

  var state_imgUrl=SData.articles[i].urlToImage;
  console.log(state_imgUrl);
  //imgUrl[i].src=national_imgUrl;

  var state_pubAt=SData.articles[i].publishedAt;
  pubAt[i].innerHTML=state_pubAt;

  var state_author=SData.articles[i].author;
  console.log(state_author);
  author[i].innerHTML=state_author;
  }//for loop
});

}