var title=document.getElementsByClassName("card-img-title");
var imgUrl=document.getElementsByClassName("news-card-image").src;
var author=document.getElementsByClassName("card-author-content");
var pubAt=document.getElementsByClassName("card-date-content");
var description=document.getElementsByClassName("card-description");
var moreUrl=document.getElementsByClassName("read-more");

console.log("img object"+imgUrl);

console.log("National News");

const getNationalNews = async () => {
  console.log("Processing api call...");
  const request = await fetch("https://newsapi.org/v2/everything?q=india%20AND%20parties&apiKey=d486174026474909a29a1342be340ad5");
  const data = await request.json();
  return data;
};

getNationalNews().then(NData => {
  console.log(NData);
  for(var i=0;i<6;i++){
  /**console.log("title", NData.articles[i].title);
  console.log("description", NData.articles[i].description);
  console.log("url", NData.articles[i].url);
  console.log("image url", NData.articles[i].urlToImage);
  console.log("published at(time)", NData.articles[i].publishedAt);
  console.log("author", NData.articles[i].author);*/
  
  var national_title=NData.articles[i].title;
  console.log(typeof(national_title));
  title[i].innerHTML=national_title;

  var national_description=NData.articles[i].description;
  description[i].innerHTML=national_description;

  var national_url=NData.articles[i].url;
  moreUrl[i].href=national_url;

  var national_imgUrl=NData.articles[i].urlToImage;
  console.log(national_imgUrl);
  //imgUrl[i].src=national_imgUrl;

  var national_pubAt=NData.articles[i].publishedAt;
  pubAt[i].innerHTML=national_pubAt;

  var national_author=NData.articles[i].author;
  author[i].innerHTML=national_author;
  //document.getElementById("total-cases").innerText =
    //covidData.confirmed.value;
  }//for loop
});