import { useState, useEffect, useCallback } from "react";

const fetchCurrentWeather = (locationName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-B8138F22-DEBF-4D18-AA71-8C443A958AF3&locationName=${locationName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      // console.log(data);
      // console.log(locationData);
      // console.log(locationData.weatherElement);
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }

          return neededElements;
        },
        {}
      );
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        description: locationData.weatherElement[20].elementValue,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD
      };
    });
};
const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B8138F22-DEBF-4D18-AA71-8C443A958AF3&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log("data", data);
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );
      // console.log(weatherElements);

      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  // useState ??????????????? weatherElement ?????????
  // ?????? useCallback ???????????? fetchData() ?????????
  // ?????? useEffect ???????????? fetchData ?????????
  // ?????? return ??????????????????????????? React ???????????????????????????????????????????????????

  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    isLoading: true
  });
  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName)
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false
      });
    };
    // setState ?????????????????????????????????????????????????????????????????????
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true
    }));
    fetchingData();
  }, [locationName, cityName]);

  useEffect(() => {
    // console.log("useEffect");
    fetchData();
  }, [fetchData]);
  // ??????????????? React ??????????????????????????????return??????
  return [weatherElement, fetchData];
};

export default useWeatherApi;
