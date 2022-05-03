// ./src/WeatherCard.js

import React from "react";
import styled from "@emotion/styled";
import WeatherIcon from "./WeatherIcon.js";
// import dayjs from "dayjs";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RedoIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";
import { ReactComponent as CogIcon } from "./images/cog.svg";
var dayjs = require('dayjs');

const WeatherCardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width:475px;
  max-height: 896px;
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 2rem ;
  border-radius: 1rem;
  letter-spacing: .15rem;

`;
const Titlebar = styled.div`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.titleColor};
  margin-top: 4%;
  padding-bottom: 3%;
  text-align  :center ;
  border-bottom: 3px solid ${({ theme }) => theme.titleColor};
`;
const Cog = styled(CogIcon)`
  position: absolute;
  top: 9rem;
  right: 2rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  *{
      fill: ${({ theme }) => theme.temperatureColor};
    }
  `;
const Location = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.titleColor};
  margin: 10% 0 5%;
`;
const Description = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 5%;
  letter-spacing: .015rem;

`;
const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10%;
`;
const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 6rem;
  font-weight: 400;
  display: flex;
  margin-top: 1rem;
`;
const Celsius = styled.div`
  font-weight: normal;
  font-size: 2rem;
`;
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  svg {
    width: 1.5rem;
    height: auto;
    margin-right: 1.3rem;
  }
`;
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 1.2rem;
    height: auto;
    margin-right: 1.5rem;
    margin-left: .2rem;
  }
`;
const Redo = styled.div`
  position: absolute;
  left: 2rem;
  bottom: 10%;
  font-size: 1rem;
  width:calc(100% - 4rem);
  /* display: inline-flex;
  align-items: flex-start; */
  color: ${({ theme }) => theme.textColor};
  border-top: 3px solid ${({ theme }) => theme.titleColor};
  padding-top: 5%;
  letter-spacing: .015rem;
  line-height: 0;

  svg {
    margin:0 0 -.1rem .5rem;
    width: .9rem;
    height: .9rem;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    /* 取得傳入的 props 並根據它來決定動畫要不要執行 */
    *{
      fill: ${({ theme }) => theme.textColor};
    }

    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const WeatherCard = (props) => {
  // 透過物件的解構賦值從 props 中取出傳入的資料
  const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;
  // 將 weatherElement 中的資料透過解構賦值取出後，放置到 JSX 中使用
  const {
    observationTime,
    // locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading
  } = weatherElement;
  return (
    <WeatherCardWrapper>
      <Titlebar>Taiwan Weather</Titlebar>
      <Cog
        onClick={() => {
          setCurrentPage("WeatherSetting");
        }}
      />
      <Location>{cityName}</Location>
      <Description>
        {description} {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)}
          <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon
          currentWeatherCode={weatherCode}
          moment={moment || "day"}
        />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon />
        {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon />
        {rainPossibility} %
      </Rain>
      <Redo onClick={fetchData} isLoading={isLoading}>
        最後觀測時間：
        {Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric"
        }).format(dayjs(observationTime))}
        {""}
        {/* 當 isLoading 的時候顯示 LoadingIcon 否則顯示 RedoIcon */}
        {isLoading ? <LoadingIcon /> : <RedoIcon />}
      </Redo>
    </WeatherCardWrapper>


  );
};

export default WeatherCard;
