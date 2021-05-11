//const dotenv =require('dotenv').config();

//const API_KEY=process.env.NEWS_API_KEY;
function getState(){
var title=document.getElementsByClassName("card-img-title");

var author=document.getElementsByClassName("card-author-content");
var pubAt=document.getElementsByClassName("card-date-content");
var description=document.getElementsByClassName("card-description");
var moreUrl=document.getElementsByClassName("read-more");

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
  for(var i=0;i<12;i++){
  
  var state_title=SData.articles[i].title;
  title[i].innerHTML=state_title;

  var state_description=SData.articles[i].description;
  description[i].innerHTML=state_description;

  var state_url=SData.articles[i].url;
  moreUrl[i].href=state_url;
  
  var imgUrl=document.getElementById(`img${i}`);
  var state_imgUrl=SData.articles[i].urlToImage;
  imgUrl.src=state_imgUrl;

  var state_pubAt=SData.articles[i].publishedAt;
  pubAt[i].innerHTML=state_pubAt;

  var state_author=SData.articles[i].author;
  console.log(state_author);
  author[i].innerHTML=state_author;
  }//for loop
});

}