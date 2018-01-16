adjustChart = () => {
    let that = this;
    let endArray;

    if (this.state.items.length > 0) {
      let dataAdjust = this.state.items;
      itemCharts = [];
      endArray = _.uniq(dataAdjust).map((value) => {
        if (document.getElementById(`${value.i}`)) {
          let myChart = echarts.init(document.getElementById(`${value.i}`), 'vintage');
          itemCharts.push(myChart);
          _.uniq(itemCharts);
          let xyData;
          let podList = [],
            seriesDatas = [],
            xDatas = [],
            yDatas = [],
            xyDatas = [];
          if (value.data.chartLocation) {
            value.data.dataList.map((datas) => {
              xDatas = datas['x-data'];
              yDatas = datas['y-data'];
              podList.push(datas.podName);
              const xyDatas = _.zip(xDatas, yDatas);
              const oneSeries = {
                name: datas.podName,
                type: 'line',
                yAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                symbol: 'emptyCircle',
                showAllSymbol: false,
                symbolSize: 4,
                data: xyDatas,
                itemStyle: {
                  normal: {
                    barBorderRadius: [7, 7, 0, 0],
                    areaStyle: { type: 'default' }
                  },
                  emphasis: {
                    barBorderRadius: [7, 7, 0, 0],
                  },
                },
              };
              seriesDatas.push(oneSeries);
            });
          }
          const option = {
            tooltip: {
              show: true,
              showDelay: 0,
              hideDelay: 0,
              transitionDuration: 0,
              enterable: false,
              trigger: 'axis',
              //enterable: true,
              confine: true,
              showContent: false,
              formatter: function (params) {
                //var res = params[0].seriesName + ' : ' + params[0].value[0] + '<br/>' + params[0].value[1];
                var time = new Date(params[0].value[0]);
                var num;
                var res = time.toLocaleDateString() + time.toLocaleTimeString() + '<br/>';
                params.map((data) => {
                  if (value.data.indicatorId === 1) {
                    num = data.value[1] === '0' ? 0 : (data.value[1] * 100).toFixed(5) * 1 + ' %';
                  } else if (value.data.indicatorId === 2) {
                    num = data.value[1] === '0' ? 0 : data.value[1] / 1073741824 < 1 ? (data.value[1] / 1048576).toFixed(2) * 1 + ' M' : (data.value[1] / 1073741824).toFixed(4) * 1 + ' G';
                  } else {
                    num = data.value[1] === '0' ? 0 : (data.value[1] * 1).toFixed(2) * 1 + ' BPS';
                  }
                  res = res + data.seriesName + ' : ' + num + '<br/>';
                });
                return res;
              },
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            },
            legend: {
              show: false,
              textStyle: {
                align: 'center',
              },
              orient: 'vertical',
              itemGap: podList.length,
              data: podList,
              top: 'top',
            },
            dataZoom: [{
              show: false,
            }],
            xAxis: [{
              show: true,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              type: 'time',
              boundaryGap: false,
              data: [],
              axisLabel: {

              },
              name: '',
            }],
            yAxis: [{
              show: true,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#F0F0F0'],
                  width: 1,
                  // type: 'dotted',
                },
              },
              axisLabel: {
                formatter: function (v) {
                  if (value.data.indicatorId === 1) {
                    return (v * 100).toFixed(5) * 1 + '%';
                  } else if (value.data.indicatorId === 2) {
                    if (v / 1073741824 < 1) {
                      return (v / 1048576).toFixed(2) * 1 + 'M'
                    } else {
                      return (v / 1073741824).toFixed(4) * 1 + 'G';
                    }
                  } else if (value.data.indicatorId === 3) {
                    return v + 'BPS';
                  } else if (value.data.indicatorId === 4) {
                    return v + 'BPS';
                  } else {
                    return v + 'BPS';
                  }
                }
              },
              scale: true,
              // name: value.data.name.split('.').pop(),
              // name: value.data.indicatorId,
              name: that.state.indicatorList.filter((item) => item.id === value.data.indicatorId)[0].name,
              nameTextStyle: {
                marginLeft: '-20px',
                marginTop: '10px',
                marginBottom: '10px',
                fontSize: 12,
                fontWeight: 600
              }
            }],
            series: seriesDatas,
            grid: {
              borderColor: 'black',
              borderWidth: 1,
              top: 50,
              right: 50,
              bottom: 50,
              left: 80,
            },
            title: {
              show: true,
              // text: value.data.name,
              text: value.data.service,
              x: 'center',
              padding: 10,
              textStyle: {
                fontSize: 14,
                fontWeight: 500,
                color: '#5A555A'
              },
              subtext: '',
            },
          };
          myChart.setOption(option, true);
          document.getElementById(`${value.i}`).addEventListener('mouseover', function () {
            myChart.setOption({
              tooltip: [{
                showContent: true,
              }]
            });
          });
          document.getElementById(`${value.i}`).addEventListener('mouseout', function () {
            myChart.setOption({
              tooltip: [{
                showContent: false,
              }]
            });
          });
          myChart.resize();
          // let that = this;
          // var t = setInterval(function () {
          //   //that.handleTimeChangeByNumber('0.04');
          //   seriesDatas.map((datas) => {
          //     datas.data.shift()
          //   })
          //   myChart.setOption({
          //     series: seriesDatas
          //   });
          // }, 1000)
        }
      });
      echarts.connect(itemCharts);
    }
  }