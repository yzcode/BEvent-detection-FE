export function preEventFilter (data) {
  for (var i in data) {
    data[i].burst_tweets_count = parseInt(data[i].burst_tweets_count, 10)
    data[i].sum_tweets_count = parseInt(data[i].sum_tweets_count, 10)
    var tmpWords = []
    for (var key in data[i].burst_words) {
      if (key !== undefined) {
        tmpWords.push({'word': key, 'value': parseInt(data[i].burst_words[key], 10)})
      }
    }
    tmpWords.sort((a, b) => {
      return b.value - a.value
    })
    var wordsStr = tmpWords[0].word
    for (var index in tmpWords) {
      if (wordsStr !== tmpWords[index].word && wordsStr.length + tmpWords[index].word.length < 25 && tmpWords[index].word.length > 1) {
        wordsStr += '，' + tmpWords[index].word
      }
    }
    data[i].wordsStr = wordsStr
  }
  return data
}
