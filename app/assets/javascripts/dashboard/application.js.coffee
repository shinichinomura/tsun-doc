$ ->
  $.get('/api/user/user_amazon_books.json', {}, (data) -> 
    chart_categories = []
    chart_data = []

    for month, count of data
      chart_categories.push(month)
      chart_data.push(count)
      
    Highcharts.chart('tsun_doc-chart', {
      chart: {
        type: 'column'
      },
      title: {
        text: '積ん読グラフ'
      },
      xAxis: {
        categories: chart_categories
      },
      yAxis: {
        min: 0,
        title: {
          text: '冊数'
        }
      },
      series: [{
        name: '積ん読数',
        data: chart_data
      }]
    })
  )
