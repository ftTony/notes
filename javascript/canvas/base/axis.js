// 绘制坐标
function drawAxis(context, options) {
    let chartZone = options.chartZone
    context.beginPath()
    context.strokeWidth = 4;
    context.strokeStyle = "#353535";
    context.moveTo(chartZone[0], chartZone[1])
    context.lineTo(chartZone[0], chartZone[3])
    context.stroke()
    context.beginPath()
    context.moveTo(chartZone[0], chartZone[3])
    context.lineTo(chartZone[2], chartZone[3])
    context.stroke()
}

// 绘制y轴坐标
function drawYLabels(context, options) {
    let chartZone = options.chartZone
    let labels = options.yAxisLabel
    let gap = ((chartZone[3] - chartZone[0]) * 0.98) / (labels.length - 1)
    labels.forEach((label, index) => {
        // 绘制文字
        context.beginPath()
        context.strokeStyle = '#353535';
        context.moveTo(chartZone[0], chartZone[3] - (gap * index))
        context.lineTo(chartZone[0] - 10, chartZone[3] - (gap * index))
        context.stroke()

        // 绘制间隔
        context.beginPath()
        context.strokeStyle = '#eaeaea';
        context.font = '16px';
        let offset = context.measureText(label).width
        context.fillText(label, chartZone[0] - 20 - offset, chartZone[3] - (gap * index))

        // 绘制辅助线
        if (index > 0) {
            context.beginPath()
            context.strokeStyle = 'eaeaea'
            context.lineWidth = 2
            context.moveTo(chartZone[0], chartZone[3] - (gap * index))
            context.lineTo(chartZone[2], chartZone[3] - (gap * index))
            context.stroke()
        }
    })
}

// 绘制x轴
function drawXLabels(context, options) {
    let labels = options.xAxisLabel;
    let xLength = options.chartZone[2] - options.chartZone[0];
    let gap = xLength / labels.length;

    labels.forEach(function (label, index) {
        if (index % 4 === 0) {
            context.strokeStyle = '#eaeaea';
            context.font = '18px';
            context.textAlign = 'center';
            context.fillText(label, options.chartZone[0] + (index + 1) * gap, options.chartZone[3] + 20);
        }
        //绘制小间隔
        context.beginPath();
        context.strokeStyle = '#353535';
        context.moveTo(options.chartZone[0] + (index + 1) * gap, options.chartZone[3]);
        context.lineTo(options.chartZone[0] + (index + 1) * gap, options.chartZone[3] + 5);
        context.stroke();
        //由于
        options.xAxisPos[index] = (index + 1) * gap;
    });
    options.xAxisPos[0] = 0;
}