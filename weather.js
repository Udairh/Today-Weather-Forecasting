$(document).ready(function() {
    const apiKey = "your_api_from_openweather_api";

    const states = {
        'US': ['California', 'New York', 'Texas'],
        'IN': ['Karnataka', 'Telangana', 'Andhra Pradesh', 'Kerala', 'Tamil Nadu']
    };

    const cities = {
        'California': ['Los Angeles', 'San Francisco'],
        'New York': ['New York City', 'Buffalo'],
        'Texas': ['Houston', 'Austin'],
        'Karnataka': ['Bangalore', 'Mysore'],
        'Telangana': ['Hyderabad', 'Warangal'],
        'Andhra Pradesh': ['Visakhapatnam', 'Tirupati'],
        'Kerala': ['Thiruvananthapuram', 'Kochi'],
        'Tamil Nadu': ['Chennai', 'Coimbatore']
    };

    $('#country').change(function() {
        let country = $(this).val();
        let stateOptions = states[country] || [];
        $('#state').html('<option value="">Select State</option>');
        stateOptions.forEach(function(state) {
            $('#state').append(`<option value="${state}">${state}</option>`);
        });
        $('#city').html('<option value="">Select City</option>'); // Reset city dropdown
    });

    $('#state').change(function() {
        let state = $(this).val();
        let cityOptions = cities[state] || [];
        $('#city').html('<option value="">Select City</option>');
        cityOptions.forEach(function(city) {
            $('#city').append(`<option value="${city}">${city}</option>`);
        });
    });

    // Set current date
    let today = new Date();
    let dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
    $('#current-date').text(`Date: ${dateString}`);

    $('#get-weather').click(function() {
        let city = $('#city').val();
        if (!city) {
            alert('Please select a city');
            return;
        }

        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, function(data) {
            let cityName = data.name;
            let temp = data.main.temp;
            let humidity = data.main.humidity;
            let rainChances = data.weather[0].description;
            
            $('#city-name').text(`Weather in ${cityName}`);
            $('#temperature').text(`Temperature: ${temp}°C`);
            $('#humidity').text(`Humidity: ${humidity}%`);
            $('#rain-chances').text(`Condition: ${rainChances}`);

            $('#weather-result').fadeIn();
        }).fail(function() {
            alert('Error fetching weather data');
        });
    });

    // Ensure the video keeps playing
    document.getElementById('bg-video').addEventListener('ended', function() {
        this.play();
    }, false);
});
