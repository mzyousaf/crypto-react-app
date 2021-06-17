function paddingNumberWithZero(num, length) {
    return ("0" + num).slice(-length);
}

function dateToString(date) {
    return paddingNumberWithZero(date.getHours(), 2)
            + ":" + paddingNumberWithZero(date.getMinutes(), 2)
            + ":" + paddingNumberWithZero(date.getSeconds(), 2);
}


const ID_SERIES_LINE = "chart-series-line-area",
      ID_SERIES_CANDLESTICK = "chart-series-candlestick",
      SERIES_DATA = {},
      ID_DATA_USD = "usd",
      ID_DATA_EURO = "euro";

SERIES_DATA[ID_SERIES_LINE] = [];
SERIES_DATA[ID_SERIES_CANDLESTICK] = [];

function generateData(isRenewLineSeriesData = true, isRenewCandlestickSeriesData = true, candlestickSeriesDataInterval = 5) {
    var curDate = new Date();
    curDate.setMilliseconds(0);
    curDate.setSeconds(0);
    curDate.setMinutes(curDate.getMinutes() - curDate.getMinutes() % 10);

    var time = curDate.getTime(),
        price = 10,
        open = 10,
        low = 9.3,
        high = 10.2,
        close = 10.1;

    if (isRenewLineSeriesData) {
        SERIES_DATA[ID_SERIES_LINE].splice(0);

        for (let i = 0; i <= 9000; i ++) {
            // Generate line series data.
            price = parseFloat(Math.abs(price - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));

            SERIES_DATA[ID_SERIES_LINE].push({
                date: new Date(time + (i - 9000) * 1000),
                value: price
            });
        }
    }

    if (isRenewCandlestickSeriesData) {
        SERIES_DATA[ID_SERIES_CANDLESTICK].splice(0);

        for (let i = 0; i <= SERIES_DATA[ID_SERIES_LINE].length - 1; i ++) {
            // Generate candlestick series data.
            if (i % candlestickSeriesDataInterval === 0) {
                open = parseFloat(Math.abs(close - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));
                close = parseFloat(Math.abs(open - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));
                low = parseFloat(Math.abs(open - Math.random() * 10).toFixed(5));
                high = parseFloat(Math.abs(low + Math.random() * 10).toFixed(5));

                SERIES_DATA[ID_SERIES_CANDLESTICK].push({
                    date: SERIES_DATA[ID_SERIES_LINE][i].date,
                    open: open,
                    low: low,
                    high: high,
                    close: close
                });
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    am4core.ready(function() {
        var chart,
            xAxis, yAxis,
            currentSeries,

            lastDataPointBulletInfo = {
                bullet: null,
                secondCircle: null,
                toScale: 0
            },

            currentDataInterval = 1,
            seriesArray = [],

            xAxisRange1, xAxisRange2, xAxisRange3, yAxisRange1,

            isFirstTimeDataLoading = false,

            currentCallPutInfo = {
                isCalling: false,
                isPutting: false,
                xAxisRange: null,
                yAxisRange: null,
                startDataItem: null,
                endDataItem: null,
                rect: null,
                startLabel: null,
                endLabel: null
            },

            currentZoomInfo = {
                zoomLevel: 0,
                maxZoomLevel: 0,
                minZoomTime: 0,
                maxZoomTime: 0
            };

        // Create axis range line.
        function createAxisRange(
            currentAxisRange,
            axis,
            value,
            strokeColor,
            strokeDasharray,
            className,
            text,
            iconTag,
            labelOffsets,zIndex
        ) {
            let axisRange = currentAxisRange || axis.axisRanges.create();
            axisRange[axis.axisFieldName] = value;
            axisRange.grid.stroke = strokeColor;
            axisRange.grid.strokeWidth = 1;
            axisRange.grid.strokeOpacity = 1;
            axisRange.grid.strokeDasharray = strokeDasharray;
            axisRange.label.disabled = true;
            axisRange.label.truncate = false;
            axisRange.label.hideOversized = false;

            if (labelOffsets) {
                for (let offsetFieldName in  labelOffsets) {
                    if (labelOffsets.hasOwnProperty(offsetFieldName))
                        axisRange.label[offsetFieldName] = labelOffsets[offsetFieldName];
                }
            }

            if (text) {
                axisRange.label.html = `<div class="range-label ${className}"><span>${iconTag || ""}${text}</span></div>`;
                axisRange.label.disabled = false;
            }

            return axisRange;
        }

        // Update chart data.
        function _updateChartData(data) {
            if (!chart)
                return;

            isFirstTimeDataLoading = true;
            chart.data = data;
        }

        // Toggle series.
        function _toggleChartSeries(seriesId) {
            if (!chart)
                return;

            var series = chart.map.getKey(seriesId);
            if (!series)
                return;

            if (series.isHiding || series.isHidden)
                series.show();
            else
                series.hide();
        }

        // Toggle two series.
        function _toggleMultiChartSeries(seriesIdToShow) {
            if (seriesIdToShow === ID_SERIES_LINE) {
                _updateCurrentDataInterval(1);

                lastDataPointBulletInfo.bullet.radius = 5;
                lastDataPointBulletInfo.bullet.fill = am4core.color("rgb(0, 136, 255)");
                lastDataPointBulletInfo.secondCircle.radius = 5;
                lastDataPointBulletInfo.toScale = 5;
            } else if (seriesIdToShow === ID_SERIES_CANDLESTICK) {
                _updateCurrentDataInterval(getCurrentCandlestickSeriesDataInterval());

                lastDataPointBulletInfo.bullet.radius = 2;
                lastDataPointBulletInfo.secondCircle.radius = 2;
                lastDataPointBulletInfo.toScale = 5;
            }

            chart.series.removeIndex(chart.series.indexOf(currentSeries)).dispose();

            if (currentSeries.id === ID_SERIES_LINE) {
                currentSeries = _createCandlestickSeries();
            } else {
                currentSeries = _createLineSeries();
            }

            chart.series.push(currentSeries);
        }

        // Move cursor to the last data point.
        function _moveCursorToLastDataPoint() {
            if (!currentSeries)
                return;

            let lastDataItemTime = currentSeries.dataItems.last.dateX.getTime(),
                currentZoomGap = xAxis.maxZoomed - xAxis.minZoomed,
                nextZoomStartTime = lastDataItemTime - currentZoomGap / 2,
                nextZoomEndTime = lastDataItemTime + currentZoomGap / 2;

            if (xAxisRange3 && xAxisRange3.date.getTime() >= nextZoomEndTime) {
                nextZoomEndTime = xAxisRange3.date.getTime() + 1000;
                nextZoomStartTime = nextZoomEndTime - currentZoomGap;
            }

            if (xAxis.max - xAxis.min <= currentZoomGap) {
                nextZoomStartTime = xAxis.min;
                nextZoomEndTime = xAxis.max;
            } else {
                if (nextZoomStartTime < xAxis.min) {
                    nextZoomStartTime = xAxis.min;
                    nextZoomEndTime = nextZoomStartTime + currentZoomGap;
                } else if (nextZoomEndTime > xAxis.max) {
                    nextZoomStartTime = nextZoomEndTime - currentZoomGap;
                    nextZoomEndTime = xAxis.max;
                }
            }

            xAxis.zoomToDates(
                new Date(nextZoomStartTime),
                new Date(nextZoomEndTime),
                true,
                true
            );
        }

        // Convert date/value to x/y coordinate.
        function _getXYCoordinate(date, value) {
            return  {
                        x: xAxis.dateToPoint(date).x,
                        y: yAxis.valueToPoint(value).y
                    };
        }

        function _updateCurrentDataInterval(interval) {
            document.querySelector("#zoom-chart-in").removeAttribute("disabled");
            document.querySelector("#zoom-chart-out").setAttribute("disabled", "");

            currentDataInterval = parseInt(interval);
            currentZoomInfo.zoomLevel = 0;

            xAxis.baseInterval = {
                timeUnit: currentDataInterval >= 60 ? "minute" : "second",
                count: currentDataInterval >= 60 ? currentDataInterval / 60 : currentDataInterval
            };

            switch (currentDataInterval) {
                case 1:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "second", count: 15},
                        {timeUnit: "second", count: 30},
                        {timeUnit: "minute", count: 1},
                        {timeUnit: "minute", count: 2},
                        {timeUnit: "minute", count: 4},
                        {timeUnit: "minute", count: 10}
                    ]);
                    xAxis.minZoomCount = 120;
                    xAxis.maxZoomCount = 5400;
                    currentZoomInfo.maxZoomLevel = 6;
                    currentZoomInfo.minZoomCount = 2 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 90 * 60 * 1000;
                    break;

                case 5:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "second", count: 15},
                        {timeUnit: "second", count: 30},
                        {timeUnit: "minute", count: 1}
                    ]);
                    xAxis.minZoomCount = 24;
                    xAxis.maxZoomCount = 120;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomTime = 2 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 10 * 60 * 1000;
                    break;

                case 10:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "second", count: 30},
                        {timeUnit: "minute", count: 1},
                        {timeUnit: "minute", count: 2}
                    ]);
                    xAxis.minZoomCount = 24;
                    xAxis.maxZoomCount = 84;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomCount = 4 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 14 * 60 * 1000;
                    break;

                case 15:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "minute", count: 2},
                        {timeUnit: "minute", count: 4}
                    ]);
                    xAxis.minZoomCount = 48;
                    xAxis.maxZoomCount = 84;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomCount = 12 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 26 * 60 * 1000;
                    break;

                case 30:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "minute", count: 2},
                        {timeUnit: "minute", count: 4},
                        {timeUnit: "minute", count: 10}
                    ]);
                    xAxis.minZoomCount = 24;
                    xAxis.maxZoomCount = 100;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomCount = 12 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 50 * 60 * 1000;
                    break;

                case 60:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "minute", count: 4},
                        {timeUnit: "minute", count: 10}
                    ]);
                    xAxis.minZoomCount = 24;
                    xAxis.maxZoomCount = 50;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomCount = 24 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 50 * 60 * 1000;
                    break;

                case 120:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "minute", count: 10},
                        {timeUnit: "minute", count: 30}
                    ]);
                    xAxis.minZoomCount = 30;
                    xAxis.maxZoomCount = 90;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomCount = 60 *  60 * 1000;
                    currentZoomInfo.maxZoomTime = 180 * 60 * 1000;
                    break;

                case 300:
                    xAxis.gridIntervals.setAll([
                        {timeUnit: "minute", count: 30}
                    ]);
                    xAxis.minZoomCount = 24;
                    xAxis.maxZoomCount = 72;
                    currentZoomInfo.maxZoomLevel = 2;
                    currentZoomInfo.minZoomCount = 120 * 60 * 1000;
                    currentZoomInfo.maxZoomTime = 360 * 60 * 1000;
                    break;
            }
        }

        // Update the interval of candlestick series.
        function _updateCandlestickSeriesDataInterval(interval) {
            _updateCurrentDataInterval(interval);

            generateData(false, true, interval);
            _updateChartData(SERIES_DATA[ID_SERIES_CANDLESTICK]);
        }

        // Get value from grid interval in milliseconds.
        function _getValueFromInterval(interval) {
            if (!interval)
                return 0;

            switch (interval.timeUnit) {
                case "millisecond":
                    return interval.count;

                case "second":
                    return interval.count * 1000;

                case "minute":
                    return interval.count * 60 * 1000;

                case "hour":
                    return interval.count * 60 * 60 * 1000;

                case "day":
                    return interval.count * 24 * 60 * 60 * 1000;

                case "week":
                    return interval.count * 7 * 24 * 60 * 60 * 1000;

                case "month":
                    return interval.count * 30 * 24 * 60 * 60 * 1000;

                case "year":
                    return interval.count * 365 * 24 * 60 * 60 * 1000;

                default:
                    return interval.count;
            }
        }

        // Zoom chart
        function _zoomChart(zoomLevel, centerTime = 0) {
            currentZoomInfo.zoomLevel = Math.max(Math.min(currentZoomInfo.maxZoomLevel, zoomLevel), 0);

            let xAxisMax = /*xAxis.maxDefined || */xAxis.max,
                xAxisMaxZoomed = /*xAxis.maxZoomed >= xAxis.max ? xAxis.maxDefined : */xAxis.maxZoomed,
                maxZoomGap = currentZoomInfo.maxZoomTime - currentZoomInfo.minZoomTime,
                nextZoomGap = maxZoomGap - maxZoomGap * currentZoomInfo.zoomLevel / currentZoomInfo.maxZoomLevel,
                currentZoomGap = xAxisMaxZoomed - xAxis.minZoomed,
                zoomStep = (currentZoomGap - nextZoomGap) / 2;
                nextZoomStartTime = xAxis.minZoomed + zoomStep,
                nextZoomEndTime = xAxisMaxZoomed - zoomStep;

            if (centerTime > 0) {
                nextZoomStartTime = centerTime - zoomStep;
                nextZoomEndTime = centerTime + zoomStep;

                if (xAxisMax - xAxis.min <= currentZoomGap) {
                    nextZoomStartTime = xAxis.min;
                    nextZoomEndTime = xAxisMax;
                } else {
                    if (nextZoomStartTime < xAxis.min) {
                        nextZoomStartTime = xAxis.min;
                        nextZoomEndTime = nextZoomStartTime + currentZoomGap;
                    } else if (nextZoomEndTime > xAxisMax) {
                        nextZoomStartTime = nextZoomEndTime - currentZoomGap;
                        nextZoomEndTime = xAxisMax;
                    }
                }
            }

            xAxis.zoomToDates(
                new Date(Math.max(nextZoomStartTime, xAxis.min)),
                new Date(Math.min(nextZoomEndTime, xAxisMax)),
                true,
                true
            );
        }

        // Call/Put function
        function _startCallOrPut(isCalling = true) {
            if (!currentSeries)
                return;

            _endCallOrPut();

            let lastDataItem = currentSeries.dataItems.last;

            currentCallPutInfo.isCalling = isCalling;
            currentCallPutInfo.isPutting = !isCalling;
            currentCallPutInfo.startDataItem = {
                date: lastDataItem.dateX,
                value: currentSeries.id === ID_SERIES_LINE
                            ? lastDataItem.dataContext.value
                            : lastDataItem.dataContext.close
            };

            let basePoint = _getXYCoordinate(
                    currentCallPutInfo.startDataItem.date,
                    currentCallPutInfo.startDataItem.value
                );

            if (xAxisRange1)
                xAxisRange1.hide();

            if (xAxisRange2) {
                xAxisRange2 = createAxisRange(
                    xAxisRange2,
                    xAxis,
                    currentCallPutInfo.startDataItem.date,
                    am4core.color("rgb(124, 154, 180)"),
                    "3,3",
                    "arrow-right x-axis-range4",
                    dateToString(currentCallPutInfo.startDataItem.date),
                    "<i class='fas fa-stopwatch'></i>",
                    {dx: -43, dy: -50}
                );
            }

            
            // Show y-axis range.
            currentCallPutInfo.yAxisRange = createAxisRange(
                currentCallPutInfo.yAxisRange,
                yAxis,
                currentCallPutInfo.startDataItem.value,
                am4core.color("rgb(124, 154, 180)"),
                null,
                "arrow-left y-axis-range2",
                (currentCallPutInfo.startDataItem.value + "").substr(0, 8),
                null,
                {dx: 3}
            );
            currentCallPutInfo.yAxisRange.show();


            // Create gradient rect.
            if (!currentCallPutInfo.rect) {
                let fillModifier = new am4core.LinearGradientModifier();
                fillModifier.opacities = [0.3, 0.1];
                fillModifier.offsets = [0, 1];

                currentCallPutInfo.rect = chart.plotContainer.createChild(am4core.Rectangle);
                currentCallPutInfo.rect.fillModifier = fillModifier;
            }

            currentCallPutInfo.rect.width = 0;
            currentCallPutInfo.rect.height = 0;
            currentCallPutInfo.rect.show();


            // Create start label.
            if (!currentCallPutInfo.startLabel) {
                currentCallPutInfo.startLabel = chart.createChild(am4core.Label);
                currentCallPutInfo.startLabel.isMeasured = false;
            }

            currentCallPutInfo.startLabel.html = `<div class="${isCalling ? "call" : "put"}-start-label"><i class="fas fa-arrow-right"></i></div>`;

            let callPutStartLabelPoint = {
                x: basePoint.x - 9,
                y: basePoint.y - 9
            };

            currentCallPutInfo.startLabel.moveTo(callPutStartLabelPoint);
            currentCallPutInfo.startLabel.show();


            // Create end label
            if (!currentCallPutInfo.endLabel) {
                currentCallPutInfo.endLabel = chart.createChild(am4core.Label);
                currentCallPutInfo.endLabel.isMeasured = false;
            }

            currentCallPutInfo.endLabel.html = `<div class="call-put-end-label"><i class='fas fa-flag'></i></div>`;
            currentCallPutInfo.endLabel.hide();
        }

        function _endCallOrPut() {
            currentCallPutInfo.isCalling = false;
            currentCallPutInfo.isPutting = false;

            if (xAxisRange1)
                xAxisRange1.show();

            if (currentCallPutInfo.yAxisRange)
                currentCallPutInfo.yAxisRange.hide();

            if (currentCallPutInfo.startLabel)
                currentCallPutInfo.startLabel.hide();

            if (currentCallPutInfo.endLabel)
                currentCallPutInfo.endLabel.hide();

            if (currentCallPutInfo.rect)
                currentCallPutInfo.rect.hide();

            currentCallPutInfo.startDataItem = null;
            currentCallPutInfo.endDataItem = null;
        }

        let prevTimeGridInterval = 0;
        function _adjustMaxDate() {
            if (!xAxis || !xAxisRange3)
                return;

            let time = xAxisRange3.date.getTime(),
                timeGridInterval = _getValueFromInterval(xAxis.gridInterval);

            if (prevTimeGridInterval !== timeGridInterval
                || xAxisRange3.date.getTime() >= xAxis.max - timeGridInterval) {
                xAxis.max = time + timeGridInterval * 3;
            }

            prevTimeGridInterval = timeGridInterval;
        }


        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        chart = am4core.create("chart", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;

        chart.padding(0, 0, 0, 0);

        chart.zoomOutButton.disabled = true;
        chart.background.fill = am4core.color("#192348");
        // chart.seriesContainer.zIndex = -1;
        // chart.bottomAxesContainer.zIndex = -1;
        chart.maskBullets = false;
        // chart.background.opacity = 0.9;

        generateData();
        _updateChartData(SERIES_DATA[ID_SERIES_LINE]);

        xAxis = chart.xAxes.push(new am4charts.DateAxis());
        // xAxis.renderer.grid.template.location = 0.5;
        xAxis.renderer.grid.template.stroke = am4core.color("#aaa");
        xAxis.renderer.labels.template.fill = am4core.color("#777");
        xAxis.renderer.labels.template.fontSize = 12;
        // xAxis.renderer.minGridDistance = 50;
        xAxis.dateFormats.setKey("second", "hh:mm:ss");
        xAxis.dateFormats.setKey("minute", "hh:mm:ss");
        xAxis.dateFormats.setKey("hour", "hh:mm:ss");
        xAxis.periodChangeDateFormats.setKey("second", "[bold]hh:mm:ss");
        xAxis.periodChangeDateFormats.setKey("minute", "[bold]hh:mm:ss");
        xAxis.periodChangeDateFormats.setKey("hour", "[bold]hh:mm:ss");
        xAxis.renderer.inside = true;
        xAxis.renderer.axisFills.template.disabled = true;
        xAxis.renderer.ticks.template.disabled = true;
        // xAxis.baseInterval = {timeUnit: "second", count: 1};
        // xAxis.startLocation = 0.5;
        // xAxis.endLocation = 0.5;
        // xAxis.gridIntervals.setAll([
        //     {timeUnit: "second", count: 15},
        //     {timeUnit: "second", count: 30},
        //     {timeUnit: "minute", count: 1},
        //     {timeUnit: "minute", count: 2},
        //     {timeUnit: "minute", count: 4},
        //     {timeUnit: "minute", count: 10}
        // ]);
        xAxis.strictMinMax = true;
        xAxis.interpolationDuration = 0;
        xAxis.rangeChangeDuration = 0;
        // xAxis.minZoomCount = 10;
        // xAxis.maxZoomCount = 5400;

        _updateCurrentDataInterval(1);

        yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.renderer.grid.template.stroke = am4core.color("#aaa");
        yAxis.renderer.grid.template.strokeDasharray = "3,3";
        yAxis.renderer.labels.template.fill = am4core.color("#777");
        yAxis.renderer.labels.template.fontSize = 12;
        yAxis.tooltip.disabled = true;
        yAxis.interpolationDuration = 0;
        yAxis.rangeChangeDuration = 0;
        yAxis.renderer.inside = true;
        yAxis.renderer.minLabelPosition = 0.05;
        yAxis.renderer.maxLabelPosition = 0.95;
        yAxis.renderer.axisFills.template.disabled = true;
        yAxis.renderer.ticks.template.disabled = true;
        yAxis.renderer.opposite = true;
        yAxis.renderer.minGridDistance = document.querySelector("#chart").offsetHeight / 5;
        yAxis.extraMin = 0.1;
        yAxis.extraMax = 0.1;
        yAxis.strictMinMax = true;
        // yAxis.fixedWidthGrid = true;


        // Line Area Series
        function _createLineSeries() {
            let series = new am4charts.LineSeries();
            series.id = ID_SERIES_LINE;
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";
            series.interpolationDuration = 0;
            series.defaultState.transitionDuration = 0;
            // series.tensionX = 0.8;
            series.stroke = am4core.color("rgb(0, 136, 255)");
            series.fill = am4core.color("rgb(0, 136, 255)");
            series.fillOpacity = 0.08;
            series.events.on("validated", _validateSeries);

            return series
        }

        currentSeries = chart.series.push(_createLineSeries());


        // Candlestick Series.
        function _createCandlestickSeries() {
            let series = new am4charts.CandlestickSeries();
            series.id = ID_SERIES_CANDLESTICK;
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "close";
            series.dataFields.openValueY = "open";
            series.dataFields.lowValueY = "low";
            series.dataFields.highValueY = "high";
            series.interpolationDuration = 500;
            series.events.on("validated", _validateSeries);

            return series;
        }
        

        // Create last data point bullet.
        lastDataPointBulletInfo.bullet = chart.createChild(am4charts.CircleBullet);
        lastDataPointBulletInfo.bullet.circle.radius = 5;
        lastDataPointBulletInfo.bullet.fillOpacity = 1;
        lastDataPointBulletInfo.bullet.fill = am4core.color("rgb(0, 136, 255)");
        lastDataPointBulletInfo.bullet.isMeasured = false;

        lastDataPointBulletInfo.secondCircle = lastDataPointBulletInfo.bullet.createChild(am4core.Circle);
        lastDataPointBulletInfo.secondCircle.radius = 5;

        lastDataPointBulletInfo.toScale = 5;

        lastDataPointBulletInfo.bullet.events.on("inited", (ev) => {
            // Animate bullet.
            function _animateBullet(bullet) {
                let animation = bullet.animate(
                        [
                            {property: "scale", from: 1, to: lastDataPointBulletInfo.toScale},
                            {property: "opacity", from: 1, to: 0}
                        ],
                        1000,
                        am4core.ease.circleOut
                    );
                animation.events.on("animationended", (event) => {
                    _animateBullet(event.target.object);
                });
            }

            _animateBullet(ev.target.circle);
        });


        // Add x-axis and y-axis ranges.
        currentCallPutInfo.yAxisRange = createAxisRange(
                currentCallPutInfo.yAxisRange,
                yAxis,
                0,
                am4core.color("rgb(124, 154, 180)"),
                null,
                "arrow-left y-axis-range2",
                "0",
                null,
                {dx: 3}
            );
        currentCallPutInfo.yAxisRange.hide();

        function _validateChartData() {
            let lastDataItem = chart.data[chart.data.length - 1],
                time = lastDataItem.date.getTime(),
                timeOffset = xAxis.baseDuration / 2;

            let baseDate = SERIES_DATA[ID_SERIES_LINE][SERIES_DATA[ID_SERIES_LINE].length - 1].date,
                baseTime = baseDate.getTime(),
                yAxisRange1Value = currentSeries.id === ID_SERIES_LINE
                                        ? lastDataItem.value
                                        : lastDataItem.close;

            if (!currentCallPutInfo.isCalling && !currentCallPutInfo.isPutting) {
                xAxisRange1 = createAxisRange(
                    xAxisRange1,
                    xAxis,
                    new Date(time + timeOffset),
                    am4core.color("rgb(0, 136, 255)"),
                    "3,3"
                );


                let xAxisRange2OffsetSeconds = 30 - baseDate.getSeconds();

                if (xAxisRange2OffsetSeconds <= 0)
                    xAxisRange2OffsetSeconds += 30;

                let xAxisRange2Date = new Date(baseTime + xAxisRange2OffsetSeconds * 1000 + timeOffset);
                xAxisRange2 = createAxisRange(
                    xAxisRange2,
                    xAxis,
                    xAxisRange2Date,
                    am4core.color("rgb(238, 150, 30)"),
                    "3,3",
                    "arrow-right x-axis-range2",
                    "00:" + paddingNumberWithZero(xAxisRange2OffsetSeconds, 2),
                    "<i class='fas fa-hourglass-half'></i>",
                    {dx: -34, dy: -50}
                );


                let xAxisRange3Date = new Date(baseTime + (xAxisRange2OffsetSeconds + 30) * 1000 + timeOffset);
                if (!xAxisRange3 || xAxisRange3.date.getTime() !== xAxisRange3Date.getTime()) {
                    xAxisRange3 = createAxisRange(
                        xAxisRange3,
                        xAxis,
                        xAxisRange3Date,
                        am4core.color("rgb(0, 164, 65)"),
                        null,
                        "arrow-left x-axis-range3",
                        dateToString(new Date(baseTime + (xAxisRange2OffsetSeconds + 30) * 1000)),
                        "<i class='fas fa-flag'></i>",
                        {dx: 42, dy: -50}
                    );

                    _adjustMaxDate();
                }

                if ((time <= xAxis.maxZoomed && xAxisRange3Date.getTime() > xAxis.maxZoomed)
                    || xAxisRange3Date.getTime() < xAxis.minZoomed) {
                    _moveCursorToLastDataPoint();
                }
            } else {
                if (baseTime >= xAxisRange3.date.getTime() + 2000) {
                    _endCallOrPut();
                } else if (baseTime >= xAxisRange3.date.getTime()) {
                    currentCallPutInfo.endDataItem = {
                        date: xAxisRange3.date,
                        value: yAxisRange1Value
                    };
                }
            }


            yAxisRange1 = createAxisRange(
                yAxisRange1,
                yAxis,
                yAxisRange1Value,
                am4core.color("rgb(0, 136, 255)"),
                null,
                "arrow-left y-axis-range1",
                (yAxisRange1Value + "").substr(0, 8),
                null,
                {dx: 3}
            );
        }

        function _validateSeries(ev) {
            let series = ev.target,
                lastDataItem = series.dataItems.last,
                time = lastDataItem.dateX.getTime(),
                timeOffset = xAxis.baseDuration / 2,
                value = lastDataItem.dataContext.value;

            // The label for last data point.
            if (series.id === ID_SERIES_LINE) {
                lastDataPointBulletInfo.bullet.moveTo(lastDataItem.point);
            } else {
                lastDataPointBulletInfo.bullet.moveTo(_getXYCoordinate(
                    new Date(time + timeOffset),
                    lastDataItem.dataContext.close
                ));

                value = lastDataItem.dataContext.close;

                let color = lastDataItem.dataContext.close >= lastDataItem.dataContext.open
                                ? "rgb(37, 223, 119)"
                                : "rgb(234, 102, 137)";

                lastDataPointBulletInfo.bullet.fill = am4core.color(color);
            }

            lastDataPointBulletInfo.bullet.validatePosition();

            // Processing call/put functionality.
            if (currentCallPutInfo.isCalling || currentCallPutInfo.isPutting) {
                let basePoint = _getXYCoordinate(
                        currentCallPutInfo.startDataItem.date,
                        currentCallPutInfo.startDataItem.value
                    );

                // Start label.
                if (currentCallPutInfo.startDataItem) {
                    let callPutStartLabelPoint = {
                            x: basePoint.x - 9,
                            y: basePoint.y - 9
                        };

                    currentCallPutInfo.startLabel.moveTo(callPutStartLabelPoint);
                }

                // End label.
                if (currentCallPutInfo.endDataItem) {
                    let callPutEndLabelPoint = _getXYCoordinate(
                            currentCallPutInfo.endDataItem.date,
                            currentCallPutInfo.endDataItem.value
                        );
                    callPutEndLabelPoint.x -= 9;
                    callPutEndLabelPoint.y -= 9;

                    currentCallPutInfo.endLabel.moveTo(callPutEndLabelPoint);
                    currentCallPutInfo.endLabel.show();
                }

                // Rectangle.
                if (value > currentCallPutInfo.yAxisRange.value) {
                    let lastPoint = _getXYCoordinate(
                            xAxisRange3.date,
                            yAxis.max
                        );

                    currentCallPutInfo.rect.fill = am4core.color(currentCallPutInfo.isCalling ? "#20b443" : "#e4462d");
                    currentCallPutInfo.rect.fillModifier.gradient.rotation = -90;
                    currentCallPutInfo.rect.width = lastPoint.x - basePoint.x;
                    currentCallPutInfo.rect.height = basePoint.y - lastPoint.y;
                    currentCallPutInfo.rect.moveTo({x: basePoint.x, y: lastPoint.y});
                } else if (value < currentCallPutInfo.yAxisRange.value) {
                    let lastPoint = _getXYCoordinate(
                            xAxisRange3.date,
                            yAxis.min
                        );

                    currentCallPutInfo.rect.fill = am4core.color(currentCallPutInfo.isCalling ? "#e4462d" : "#20b443");
                    currentCallPutInfo.rect.fillModifier.gradient.rotation = 90;
                    currentCallPutInfo.rect.width = lastPoint.x - basePoint.x;
                    currentCallPutInfo.rect.height = lastPoint.y - basePoint.y;
                    currentCallPutInfo.rect.moveTo(basePoint);
                } else {
                    currentCallPutInfo.rect.width = 0;
                    currentCallPutInfo.rect.height = 0;
                }
            }
        }

        // Adapters
        yAxis.adapter.add("min", function (min, target) {
            return Math.max(0, min);
        });


        // x-axis events.
        let isMoveCentered = false;
        xAxis.events.on("startendchanged", function (ev) {
            _adjustMaxDate();
        });
        xAxis.events.on("validated", function (ev) {
            if (isMoveCentered) {
                isMoveCentered = false;
                setTimeout(function () {
                    _moveCursorToLastDataPoint();
                });
            }

            if (isFirstTimeDataLoading) {
                isFirstTimeDataLoading = false;
                isMoveCentered = true;
                _zoomChart(currentZoomInfo.zoomLevel);
            }
        });

        // Chart events.
        chart.events.on("datavalidated", _validateChartData);
        chart.events.on("maxsizechanged", function (ev) {
            yAxis.renderer.minGridDistance = document.querySelector("#chart").offsetHeight / 5;
        });

        // Add cursor.
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panX";
        chart.cursor.xAxis = xAxis;
        chart.cursor.yAxis = yAxis;



        // Add data.
        var oneSecTimer, candlestickSeriesDataTimer;

        function startOneSecTimer() {
            oneSecTimer = setInterval(function () {
                var lastLineSeriesDataItem = SERIES_DATA[ID_SERIES_LINE][SERIES_DATA[ID_SERIES_LINE].length - 1],
                    newLineSeriesDataItem = {
                        date: new Date(lastLineSeriesDataItem.date.getTime() + 1000),
                        value: parseFloat(Math.abs(lastLineSeriesDataItem.value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5).toFixed(5))
                    };

                var lastCandlestickSeriesDataItem = SERIES_DATA[ID_SERIES_CANDLESTICK][SERIES_DATA[ID_SERIES_CANDLESTICK].length - 1],
                    open = parseFloat(Math.abs(lastCandlestickSeriesDataItem.close - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5)),
                    close = parseFloat(Math.abs(open - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5)),
                    low = parseFloat(Math.abs(open - Math.random() * 10).toFixed(5)),
                    high = parseFloat(Math.abs(low + Math.random() * 10).toFixed(5)),
                    newCandlestickSeriesDataItem = {
                        date: new Date(lastCandlestickSeriesDataItem.date.getTime() + currentDataInterval * 1000),
                        open: open,
                        low: low,
                        high: high,
                        close: close
                    };

                if (currentSeries.id === ID_SERIES_LINE) {
                    chart.addData(
                        newLineSeriesDataItem,
                        chart.data.length > 10000 ? 1200 : 0
                    );

                    if ((newLineSeriesDataItem.date.getMinutes() * 60 + newLineSeriesDataItem.date.getSeconds()) % currentDataInterval === 0) {
                        SERIES_DATA[ID_SERIES_CANDLESTICK].push(newCandlestickSeriesDataItem);
                    }
                } else {
                    SERIES_DATA[ID_SERIES_LINE].push(newLineSeriesDataItem);

                    if ((newLineSeriesDataItem.date.getMinutes() * 60 + newLineSeriesDataItem.date.getSeconds()) % currentDataInterval === 0) {
                        chart.addData(
                            newCandlestickSeriesDataItem,
                            (chart.data.length > 10000 / currentDataInterval) ? 1200 / currentDataInterval : 0
                        );
                    } else {
                        var lastCandlestickSeriesDataItem = chart.data[chart.data.length - 1];
                        lastCandlestickSeriesDataItem.close = parseFloat(Math.abs(lastCandlestickSeriesDataItem.open - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10).toFixed(5));
                        lastCandlestickSeriesDataItem.low = parseFloat(Math.abs(lastCandlestickSeriesDataItem.open - Math.random() * 10).toFixed(5));
                        lastCandlestickSeriesDataItem.high = parseFloat(Math.abs(lastCandlestickSeriesDataItem.low + Math.random() * 10).toFixed(5));

                        chart.invalidateRawData();

                        _validateChartData();
                    }
                }
            }, 1000);
        }

        startOneSecTimer();


        /**
         * Chart control events
         */

        // Change data.
        function getCurrentDataId() {
            return document.querySelector(".chart-data-control-container .dropdown .dropdown-toggle .dropdown-item-container").getAttribute("data-id");
        }

        function getCurrentCandlestickSeriesDataInterval() {
            return document.querySelector("#toggle-multi-chart-series-candlestick + .dropdown-menu a.dropdown-item.active").getAttribute("data-interval");
        }

        let changeChartDataElemList = document.querySelectorAll(".chart-data-control-container .dropdown .dropdown-menu a.dropdown-item");
        changeChartDataElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (this.classList.contains('active'))
                    return;

                changeChartDataElemList.forEach(elem1 => elem1.classList.remove("active"));
                this.classList.add('active');

                let clonedNode = this.querySelector(".dropdown-item-container").cloneNode(true);

                document.querySelector(".chart-data-control-container .dropdown .dropdown-toggle .dropdown-item-container").replaceWith(clonedNode);

                generateData(currentSeries.id === ID_SERIES_LINE, currentSeries.id === ID_SERIES_CANDLESTICK)
                _updateChartData(SERIES_DATA[currentSeries.id]);
            });
        });

        // Move chart to current quote.
        document.querySelector("#move-chart-to-current-quote").addEventListener("click", function (e) {
            e.preventDefault();

            _moveCursorToLastDataPoint();
        });

        // Zoom
        let zoomControlElemList = document.querySelectorAll("[id^='zoom-chart-']");
        zoomControlElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (elem.id === "zoom-chart-in") {
                    _zoomChart(currentZoomInfo.zoomLevel + 1);

                    if (currentZoomInfo.zoomLevel >= currentZoomInfo.maxZoomLevel)
                        this.setAttribute("disabled", "");

                    document.querySelector("#zoom-chart-out").removeAttribute("disabled");
                } else {
                    _zoomChart(currentZoomInfo.zoomLevel - 1);

                    if (currentZoomInfo.zoomLevel <= 0)
                        this.setAttribute("disabled", "");

                    document.querySelector("#zoom-chart-in").removeAttribute("disabled");
                }
            });
        });

        // Toggle line area/candlestick series.
        let toggleMultiChartSeriesElemList = document.querySelectorAll("[id^='toggle-multi-chart-series-']");
        toggleMultiChartSeriesElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (this.classList.contains('active'))
                    return;

                toggleMultiChartSeriesElemList.forEach(elem1 => elem1.classList.remove("active"));
                this.classList.add('active');

                let seriesId = this.id.substr(13);
                if (seriesId === ID_SERIES_CANDLESTICK)
                    _updateCandlestickSeriesDataInterval(getCurrentCandlestickSeriesDataInterval());
                else
                    _updateChartData(SERIES_DATA[seriesId]);

                _toggleMultiChartSeries(seriesId);
            });
        });

        // Change the interval of candlestick series.
        let candlestickSeriesIntervalElemList = document.querySelectorAll("#toggle-multi-chart-series-candlestick + .dropdown-menu a.dropdown-item");
        candlestickSeriesIntervalElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                e.preventDefault();

                if (this.classList.contains('active'))
                    return;

                candlestickSeriesIntervalElemList.forEach(elem1 => elem1.classList.remove("active"));
                this.classList.add('active');

                let interval = this.getAttribute("data-interval");
                _updateCandlestickSeriesDataInterval(interval);
            });
        });

        // Call/Put buttons.
        let callPutButtonElemList = document.querySelectorAll(".right-menu .call-put-block .call-put-buttons button");
        callPutButtonElemList.forEach(elem => {
            elem.addEventListener("click", function (e) {
                _startCallOrPut(elem.id === "btn-call");
            });
        });

    }); // end am4core.ready()
});