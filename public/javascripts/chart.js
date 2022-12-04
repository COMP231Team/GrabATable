var reservationData = JSON.parse(chart);
var restaurantData = JSON.parse(restaurant);

// chart.js
const options = { year: '2-digit', month: 'short', day: '2-digit' };
const data = {
    labels: Object.keys(reservationData).map(key => new Date(key).toLocaleString("en-US", options)),
    datasets: [{
        label: 'Reservations By Date',
        data: Object.values(reservationData),
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