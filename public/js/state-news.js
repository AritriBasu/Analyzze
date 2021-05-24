function getState(){
  var state=document.getElementById("state").value;
  console.log(state);
  console.log("State News");
  

const getStateNews = async () => {
  console.log("Processing api call...");
  const request = await fetch(`https://newsapi.org/v2/everything?q=${state}%20AND%20politics&apiKey=d486174026474909a29a1342be340ad5`);
  const data = await request.json();
  return data;
};

getStateNews().then(SData => {
  console.log(SData);
  let stateNewsDisp="";
  let updatedStateNews=SData.articles;
  for(var i in updatedStateNews){
    if(!updatedStateNews[i].urlToImage)
    updatedStateNews[i].urlToImage="http://www.vermiculite.uz/admin/adminfiles/news_(5).jpg";
    stateNewsDisp+=`<div class="col-md-4 card-container">
    <div class="card card-flip">
      <div class="front card-block">
        <img src="${updatedStateNews[i].urlToImage}" alt="img10" id="img10" class="news-card-img">
        <h5 class="card-img-title">${updatedStateNews[i].title}</h5>
      </div>
      <div class="back card-block">
        <p class="card-author"><b>Published by:</b>
          <p class="card-author-content">${updatedStateNews[i].source.name}</p>
        </p>
        <p class="card-date"><b>Published at:</b><p class="card-date-content">${updatedStateNews[i].publishedAt}</p></p>
        <p class="card-description">
        ${updatedStateNews[i].description}
        </p>
        <a href="${updatedStateNews[i].url}" class="btn btn-outline-primary read-more">Read More</a>
      </div>
    </div>
    </div>`;
  }
  if(stateNewsDisp !== "")
     $("#stateNewsResults").html(stateNewsDisp);
     $(".loading").hide();
     $("#state-form").height("10vh");
  
  });
}//get state ends