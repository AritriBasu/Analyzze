console.log("National News");

const getNationalNews = async () => {
  console.log("Processing api call...");
  const request = await fetch("https://newsapi.org/v2/everything?q=india%20AND%20parties&apiKey=d486174026474909a29a1342be340ad5");
  const data = await request.json();
  return data;
};

getNationalNews().then(NData => {
  console.log(NData);
  let newsDisp="";
  let updatedNews=NData.articles;
  for(var i in updatedNews){
    if(!updatedNews[i].urlToImage)
    updatedNews[i].urlToImage="http://www.vermiculite.uz/admin/adminfiles/news_(5).jpg";
    newsDisp+=`<div class="col-md-4 card-container">
    <div class="card card-flip">
      <div class="front card-block">
        <img src="${updatedNews[i].urlToImage}" alt="img10" id="img10" class="news-card-img">
        <h5 class="card-img-title">${updatedNews[i].title}</h5>
      </div>
      <div class="back card-block">
        <p class="card-author"><b>Published by:</b>
          <p class="card-author-content">${updatedNews[i].source.name}</p>
        </p>
        <p class="card-date"><b>Published at:</b><p class="card-date-content">${updatedNews[i].publishedAt}</p></p>
        <p class="card-description">
        ${updatedNews[i].description}
        </p>
        <a href="${updatedNews[i].url}" class="btn btn-outline-primary read-more">Read More</a>
      </div>
    </div>
    </div>`;
  }
  if(newsDisp !== "")
     $("#newsResults").html(newsDisp);
     $(".loading").hide();
});