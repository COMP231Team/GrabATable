var reservationData = JSON.parse(chart);
var restaurantData = JSON.parse(restaurant);

// chart.js
var arrayReservationData = [];
for (var key in reservationData) {
    arrayReservationData.push([key, reservationData[key]]);
}

arrayReservationData.sort((a,b) => {
    return new Date(a[0]) - new Date(b[0]);
});

const data = {
    labels: arrayReservationData.map(item => item[0]),
    datasets: [{
        label: 'Reservations By Date',
        data: arrayReservationData.map(item => item[1]),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0,
      }]
  };

(async function() {
  new Chart(document.getElementById('reservationsByDate'),
    {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Reservations'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    }
  );
})();