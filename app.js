/* 
Use this inside "Apps script" in Google spreadsheet, make sure to ad the youtube Data API in "services" 
Youtube API general page: https://developers.google.com/youtube/v3/
Youtube API documentation: https://developers.google.com/youtube/v3/docs
Helpful youtube tutorial (his channel is awesome!): https://www.youtube.com/watch?v=zSgx8U16stk 
*/

function YoutubeScraper() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  var activeSheet = spreadSheet.getActiveSheet()

  var search = YouTube.Search.list(`snippet, id`, {q: "vlog 1", maxResults: 10}) /* Read the api for more complex info*/

  var results = search.items.map((item) => [item.id.videoId, item.snippet.title, item.snippet.channelTitle, item.snippet.publishedAt])

  var ids = results.map((id) => id[0]).join(",")

  var stats = YouTube.Videos.list("statistics", {id: ids})

  var videoStats = stats.items.map((item) => [item.statistics.viewCount, item.statistics.likeCount])

  activeSheet.getRange(2, 1, results.length, results[0].length).setValues(results)
  activeSheet.getRange(2, 5, videoStats.length, videoStats[0].length).setValues(videoStats)
}

/*
If you find getRange(row, column, optNumRows, optNumColumns) arguments confusing:
row --- int --- top row of the range
column --- int--- leftmost column of the range
optNumRows --- int --- number of rows in the range.
optNumColumns --- int --- number of columns in the range
*/
