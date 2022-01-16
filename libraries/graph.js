class graph {
    constructor(Countainer, Title, xAxis, yAxis, dataPoints) {
        this.countainer = Countainer;
        this.title = Title;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.dataPoints = dataPoints;
    }

    initialise() {
        var chart = new CanvasJS.Chart(this.countainer, {
            animationEnabled: true,
            theme: "light1",
            title: {
                text: this.title
            },
            axisY: {
                title: this.yAxis,
                includeZero: false,
                prefix: "",
                suffix: ""
            },
            axisX: {
                title: this.xAxis,
                includeZero: false,
                prefix: "",
                suffix: ""
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
            },
            data: [{
                type: "line",
                axisYType: "primary",
                name: "Blue",
                showInLegend: true,
                markerSize: 0,
                dataPoints: this.dataPoints.b,
            },
            {
                type: "line",
                axisYType: "primary",
                name: "Red",
                showInLegend: true,
                markerSize: 0,
                dataPoints: this.dataPoints.r,
            },
            {
                type: "line",
                axisYType: "primary",
                name: "Green",
                showInLegend: true,
                markerSize: 0,
                dataPoints: this.dataPoints.g,
            }
        ]
        });
        chart.render();
    }
}
