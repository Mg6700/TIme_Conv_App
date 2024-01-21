document.addEventListener('DOMContentLoaded', function () {
    // Populate time zone dropdowns with city/country names
    populateTimeZones('fromTimeZone', true);
    populateTimeZones('toTimeZone', true);
  });
  
  function populateTimeZones(selectId, useCityNames) {
    const selectElement = document.getElementById(selectId);
    const timeZones = moment.tz.names();
    const timeZoneMap = {};
  
    // Create a mapping between city/country names and time zone identifiers
    timeZones.forEach((tz) => {
      const cityOrCountry = useCityNames ? extractCityOrCountry(tz) : tz;
      timeZoneMap[cityOrCountry] = tz;
    });
  
    // Populate the dropdown
    Object.keys(timeZoneMap).forEach((name) => {
      const option = document.createElement('option');
      option.value = timeZoneMap[name];
      option.textContent = name;
      selectElement.appendChild(option);
    });
  }
  
  function extractCityOrCountry(timezone) {
    // Extract city or country name from the time zone identifier
    const parts = timezone.split('/');
    return parts.length > 1 ? parts[1] : parts[0];
  }
  
  function convertTime() {
    const fromTime = document.getElementById('fromTime').value;
    const fromTimeZone = document.getElementById('fromTimeZone').value;
    const toTimeZone = document.getElementById('toTimeZone').value;
  
    const convertedTime = convert(fromTime, fromTimeZone, toTimeZone);
  
    document.getElementById('result').textContent = `Converted Time: ${convertedTime}`;
  }
  
  function convert(time, fromTimeZone, toTimeZone) {
    const fromDateTime = moment.tz(time, fromTimeZone);
    const toDateTime = fromDateTime.clone().tz(toTimeZone);
  
    return toDateTime.format('YYYY-MM-DD HH:mm:ss');
  }
  