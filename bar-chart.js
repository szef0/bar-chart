$(document).ready(function () {

    var acChart = {
        data: $('.ac-chart-default').data('chart'),
        init: function () {
            var maxVal = Math.max.apply(Math, this.data['values']);
            maxVal = 0.05 * maxVal + maxVal;

            var minVal = Math.min.apply(Math, this.data['values']);
            minVal = minVal - 0.2 * minVal;

            this.handleLabelsX();
            this.handleLabelsY(minVal, maxVal);
            this.handleResults(minVal, maxVal);
        },
        handleLabelsX: function () {
            var labels = this.data['labels'];
            var middleLabel = "";

            if (this.data['labels'].length % 2 == 0) {
                middleLabel = labels[labels.length / 2 - 1]
            } else {
                middleLabel = labels[Math.round(labels.length / 2) + 1]
            }

            var resultLabels = [labels[0], middleLabel, labels[labels.length - 1]];
            var finalResultLabels = [];

            resultLabels.map(function (elem) {
                finalResultLabels += '<div>' + elem + '</div>';
            });

            $('.label-wrapper').append(finalResultLabels);
        },
        handleLabelsY: function (minVal, maxVal) {
            var val = (maxVal - minVal) * .25 + minVal;
            var val2 = (maxVal - minVal) * .75 + minVal;

            var leftLabels = [maxVal, val2, val, minVal];
            var resultValues = [];

            leftLabels.map(function (elem) {
                resultValues += '<div class="value">' + elem.toFixed(1) + '</div>';
            });

            $('.values-wrapper').append(resultValues);
        },
        handleResults: function (minVal, maxVal) {
            var result = [];

            this.data['values'].map(function (elem, index) {
                var valueX = (elem - minVal) / (maxVal - minVal) * 100;
                result += '<div class="chart"><div class="progress-chart" data-percent="' + valueX + '" data-sort="' + index + '"></div></div>';
            });

            $('.ac-chart-default').append(result);
        },
        animate: function (element) {
            element.find('.progress-chart').each(function () {
                var sort = $(this).data('sort');
                var value = $(this).data('percent');
                var elem = $(this);
                setTimeout(function () {
                    elem.css({height: value + "%", opacity: 1});
                }, 100 * sort);
            });
        },
        checkIfInViewPort: function () {
            var self = this;
            $('.ac-chart-default:not(.seen)').each(function () {
                var element = $(this);
                var pageTop = $(window).scrollTop();
                var pageBottom = pageTop + $(window).height();
                var elementTop = $(element).offset().top;
                var elementBottom = elementTop + $(element).height();
                if ((pageTop < elementTop) && (pageBottom > elementBottom)) {
                    element.addClass('seen');
                    self.animate(element);
                }
            });
        }
    };

    acChart.init();

    $(window).scroll(function () {
        acChart.checkIfInViewPort();
    });
});