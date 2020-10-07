var x1, x2, x3, x4;

function Retry() {
    var x1 = 0,
        x2 = 0,
        x3 = 0,
        x4 = 0;
    myFunction();
}

function myFunction() {
    var text;

    // Get the value of the input field with id="numb"
    x1 = document.getElementById("amp-carr").value;
    x2 = document.getElementById("freq-carr").value;
    x3 = document.getElementById("amp-data").value;
    x4 = document.getElementById("freq-data").value;

    // If x is Not a Number or less than one or greater than 1000
    if (isNaN(x1) || x1 < 1 || x1 > 1000) {
        text = "Input not valid amp-carr";
    } else if (isNaN(x2) || x2 < 1 || x2 > 1000) {
        text = "Input not valid freq-carr";
    } else if (isNaN(x3) || x3 < 1 || x3 > 1000) {
        text = "Input not valid amp-data";
    } else if (isNaN(x4) || x4 < 1 || x4 > 100) {
        text = "Input not valid freq-data";
    } else {
        text = "Input OK";
    }
    document.getElementById("demo").innerHTML = text;
    plot(x1, x2, x3, x4);
}

function plot(ac, fc, ad, fd) {

    var amp_carr = ac;
    var freq_carr = fc;
    var amp_data = ad;
    var freq_data = fd;

    var frames = [
        { name: 'carier', data: [{ x: [], y: [] }] },
        { name: 'data', data: [{ x: [], y: [] }] },
    ];

    // omega  2*pi*f

    var omega_carr = 2.0 * Math.PI * freq_carr;
    var omega_data = 2.0 * Math.PI * freq_data;

    // dot on graph
    var n = 1000000;
    for (var i = 0; i < n; i++) {
        var t = i / (n - 1) * 2 - 1;

        // A carrier sine wave 1:
        frames[0].data[0].x[i] = t * omega_carr;
        frames[0].data[0].y[i] = amp_carr * Math.sin(t * omega_carr);

        // A data sine wave 1:
        frames[1].data[0].x[i] = t * omega_carr;
        frames[1].data[0].y[i] = amp_data * Math.sin(t * omega_data);


    }

    Plotly.plot('graph', [{
        x: frames[0].data[0].x,
        y: frames[0].data[0].y,
        line: { simplify: false },
    }], {
        xaxis: { range: [0, 100] },
        yaxis: { range: [-20, 20] },
        updatemenus: [{
            buttons: [{
                    method: 'animate',
                    args: [
                        ['carrier']
                    ],
                    label: 'carrier'
                },
                {
                    method: 'animate',
                    args: [
                        ['data']
                    ],
                    label: 'data'
                },

            ]
        }]
    }, { displayModeBar: false }).then(function() {
        Plotly.addFrames('graph', frames);
    });
}