function searchParty(){

var keyword=document.getElementById("key").value;

const fetchTweets=async()=>{
    try {
        const response=await fetch(`http://localhost:3000/search/${keyword}`,{mode:'no-cors'});
        const body = await response.json()
        return body;
    } catch (err) {
        console.error(err)
    }
}

fetchTweets().then(data=>{
    console.log(data);
});

}//function

/**function twitterSentiment(){
    $('#tweet-list').addClass('d-none');
    $('#positive').empty();
    $('#neutral').empty();
    $('#negative').empty();
    $('#chartContainer').empty();
    $('.spinner-border').removeClass('d-none');
    
    getTwitterHashTagData($("#tag-input").val(), processTwitterData);
}
*/

/** 
//have to pass tweets in this function
function processTwitterData(tweets,sentiment_score){
            const twitterData = [];
            $.each(tweets, function( index, tweet ) {
                let tweet_sentiment = '';
                if(sentiment_score >0){
                    tweet_sentiment = 'positive'
                }else if(sentiment_score ==0){
                    tweet_sentiment = 'neutral'
                }else if(sentiment_score < 0){
                    tweet_sentiment = 'negative'
                }
                twitterData.push({
                    sentiment: tweet_sentiment,
                    score: sentiment_score.toFixed(4),
                    tweet: tweet_text
                });
            });
            console.log(twitterData);
            $('.spinner-border').addClass('d-none');
            displayTweets(twitterData.filter(t => t.sentiment == 'positive'), 'positive');
            displayTweets(twitterData.filter(t => t.sentiment == 'neutral'), 'neutral');
            displayTweets(twitterData.filter(t => t.sentiment == 'negative'), 'negative');
            $('#tweet-list').removeClass('d-none');
            displayPieChart(twitterData);
}


function displayTweets(twitterData, sentiment){
    var tbl  = document.createElement('table');
    var tr = tbl.insertRow();
    for( var j in twitterData[0] ) {
        if(j !=='sentiment'){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(j));
        }
    }

    for( var i = 0; i < twitterData.length; i++) {
        var tr = tbl.insertRow();
        for( var j in twitterData[i] ) {
            if(j !=='sentiment'){
                var td = tr.insertCell();
                var text = twitterData[i][j];
                td.appendChild(document.createTextNode(text));
            }
        }
    }
    tbl.setAttribute('class', 'tweet-table')
    $('#'+sentiment).append(tbl);
    $('#'+sentiment+'-counter').html('('+ twitterData.length +')');
}

function displayPieChart(twitterData){
    var sentimentsCounter = {"Negative": 0, "Neutral": 0, "Positive": 0};
    for( var i = 0; i < twitterData.length; i++) {
        switch(twitterData[i].sentiment) {
            case 'positive':
              sentimentsCounter["Positive"] += 1;
              break;
            case 'negative':
              sentimentsCounter["Negative"] += 1;
              break;
            case 'neutral':
              sentimentsCounter["Neutral"] += 1;
              break;
        }
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: (sentimentsCounter["Positive"] * 100.00/twitterData.length).toFixed(2), label: "Positive" },
                { y: (sentimentsCounter["Neutral"] * 100.00/twitterData.length).toFixed(2), label: "Neutral" },
                { y: (sentimentsCounter["Negative"] * 100.00/twitterData.length).toFixed(2), label: "Negative" },
            ]
        }]
    });
    chart.render();
}
*/
