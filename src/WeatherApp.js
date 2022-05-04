import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
// import dayjs from "dayjs";
import { ThemeProvider } from "@emotion/react";
import sunriseAndSunsetData from "./sunrise-sunset.json";
import WeatherCard from "./WeatherCard.js";
import useWeatherApi from "./useWeatherApi.js";
import WeatherSetting from "./WeatherSetting";
import { findLocation } from "./utils";
var dayjs = require('dayjs');
//訂定主題顏色樣式
const theme = {
  light: {
    backgroundColor: "#EBEBEB",
    foregroundColor: "#EBEBEB",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#000000",
    temperatureColor: "#383838",
    textColor: "#000000"
  },
  dark: {
    backgroundColor: "#323334",
    foregroundColor: "#323334",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#ffffff",
    temperatureColor: "#ffffff",
    textColor: "#ffffff"
  }
};
const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//當地的當地時間查詢
const getMoment = (locationName) => {
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  );
  // console.log("12312313:" + locationName, sunriseAndSunsetData);
  if (!location) return null;
  const now = dayjs();
  // 將當前時間以 "2019-10-08" 的時間格式呈現
  const nowDate = Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(now)
    .replace(/\//g, "-");
  // 從該地區中找到對應的日期
  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);
  //將日出日落以及當前時間轉成時間戳記（TimeStamp）
  const sunriseTimestamp = dayjs(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).unix();
  const sunsetTimestamp = dayjs(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).unix();
  const nowTimeStamp = now.unix();

  // 若當前時間介於日出和日落中間，則表示為白天，否則為晚上
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? "day"
    : "night";
};

const WeatherApp = () => {
  // console.log("-----before useState");
  //從 localStorage 取出 cityName，並取名為 storageCity
  const storageCity = localStorage.getItem("cityName");

  //若 storageCity 存在則作為 currentCity 的預設值，否則使用 '臺北市'
  const [currentCity, setCurrentCity] = useState(storageCity || "臺北市");
  const currentLocation = findLocation(currentCity) || {};

  // 定義 currentPage 這個 state，預設值是 WeatherCard
  const [currentPage, setCurrentPage] = useState("WeatherCard");
  //使用 useState 定義決定亮色或暗色主題的資料、方法及「預設(亮色)」資料狀態
  const [currentTheme, setCurrentTheme] = useState("light");

  //使用 useWeatherApi Hook 取得 weatherElement 和 fetchData 兩方法
  const [weatherElement, fetchData] = useWeatherApi(currentLocation);

  //時間地點天氣查詢API中地點資料傳入，得到當前時間所要使用的顏色主題
  const moment = useMemo(() => getMoment(currentLocation.cityName), [
    currentLocation.cityName
  ]);

  // 根據 moment 的值設定當前顏色主題的資料狀態
  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]); // 記得把 moment 放入 dependencies 中
  // 當 currentCity 有改變的時候，儲存到 localStorage 中
  useEffect(() => {
    localStorage.setItem("cityName", currentCity);
  }, [currentCity]);
  return (
    <ThemeProvider theme={theme[currentTheme]}>
      {/* {console.log(currentTheme, moment, currentLocation)} */}
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "WeatherSetting" && (
          <WeatherSetting
            cityName={currentLocation.cityName}
            setCurrentCity={setCurrentCity}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;

// useMemo 會在組件渲染時（rendering）被呼叫，
//因此不應該在這個時間點進行任何會有副作用（side effect）的操作；
//若需要有副作用的操作，則應該使用的是 useEffect 而不是 useMemo。
