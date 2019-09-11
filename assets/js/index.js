// created by py 
var hourEchart = echarts.init(document.getElementById('hour-echart'));
var data_year_rang = ["小时报", "日报", "预报"]
var data_dd = [
    {
        'dim_year': '小时报',
        'radar_indicator': [{
            name: 'PM2.5',
            max: 300
        }, {
            name: 'CO',
            max: 300
        }, {
            name: 'O3',
            max: 300
        }, {
            name: 'NO2',
            max: 300
        }, {
            name: 'SO2',
            max: 300
        }, {
            name: 'PM10',
            max: 300
        }],
        'trade_range': [200, 200, 120, 150, 50, 20]
    },
    {
        'dim_year': "日报",
        'radar_indicator': [{
            name: 'PM2.5',
            max: 300
        }, {
            name: 'CO',
            max: 300
        }, {
            name: 'O3',
            max: 300
        }, {
            name: 'NO2',
            max: 300
        }, {
            name: 'SO2',
            max: 300
        }, {
            name: 'PM10',
            max: 300
        }],
        'trade_range': [20, 300, 146, 89, 56, 24]
    }, {
        'dim_year': '预报',
        'radar_indicator': [{
            name: 'PM2.5',
            max: 300
        }, {
            name: 'CO',
            max: 300
        }, {
            name: 'O3',
            max: 300
        }, {
            name: 'NO2',
            max: 300
        }, {
            name: 'SO2',
            max: 300
        }, {
            name: 'PM10',
            max: 300
        }],
        'trade_range': [30, 29, 123, 134, 54, 56]
    }

]
option = {
    baseOption: {

        title: {
            top: 'center',
            left: 'center',
        },
        timeline: {
            show: false, //是否显示
           /*  left: 10,
            top: 10, */
            // right: 600,
            autoPlay: true, //自动播放
            playInterval: 2000, //播放间隔
            axisType: 'category',
            inverse: false, //是否反向放置 timeline，反向则首位颠倒过来。
            symbol: 'circle',
            symbolSize: 0,
            itemStyle: { //轴的图形样式
                normal: {
                    color: '#04a5f1'
                },
                emphasis: {
                    color: '#04a5f1'
                }
            },
            label: { //轴的文本标签样式
                normal: {
                    show: true,
                    color: '#04a5f1'
                },
                emphasis: {
                    color: '#04a5f1'
                }

            },
            lineStyle: { //轴线控制
                show: false,
                color: '#ddd'
            },
            checkpointStyle: { //当前选择项的样式

                symbolSize: 0,
                //color: '#04a5f1',
                //borderColor: 'rgba(4, 165, 261, .5)'
            },
            controlStyle: { //控制按钮样式
                show: false,
            },
            data: data_year_rang,

        },
        //backgroundColor:'#333333',
        tooltip: {},
        legend: {
            //data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },

        series: [{
            name: '',
            type: 'radar',
            areaStyle: {
                normal: {
                    color: '#3399FF'

                }
            },
            itemStyle: {
                color: '#59abe1',
                borderColor: '#59abe1'
            },

        }]
    },

    options: [{
        title: {
            text: data_dd[0].dim_year,
        },
        radar: {
            // shape: 'circle',
            indicator: data_dd[0].radar_indicator
        },
        series: [{
            data: [{
                value: data_dd[0].trade_range
            }]
        }]
    },

    {
        title: {
            text: data_dd[1].dim_year,
        },
        radar: {
            // shape: 'circle',
            indicator: data_dd[1].radar_indicator
        },
        series: [{
            data: [{
                value: data_dd[1].trade_range
            }]
        }]
    },
    {
        title: {
            text: data_dd[2].dim_year,
        },
        radar: {
            // shape: 'circle',
            indicator: data_dd[2].radar_indicator
        },
        series: [{
            data: [{
                value: data_dd[2].trade_range
            }]
        }]
    }


    ]
};
hourEchart.setOption(option);