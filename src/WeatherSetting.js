import React, { useState } from 'react';
import styled from '@emotion/styled';
import { availableLocations } from './utils';

const WeatherSettingWrapper = styled.div`
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
  margin-top: 1rem;
  padding-bottom: 1.5rem;
  text-align  :center ;
  border-bottom: 3px solid ${({ theme }) => theme.titleColor};
`;
const Title = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.titleColor};
  margin: 2rem 0 1rem 0;
  text-align: center;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 5rem;
  text-align: center;
`;

const StyledSelect = styled.select`
  display: block;
  box-sizing: border-box;
  width: calc( 100% - 2rem);
  max-width: 100%;
  font-size: 1.8rem;
  margin: 0 1rem;
  padding: .5rem 0;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.textColor};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  /* -webkit-appearance: none;
  -moz-appearance: none; */
  box-shadow: none;
  outline: 0;

`;

const ButtonGroup = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc( 100% - 2rem);
  padding: 0 1rem;
  > button {
    position: absolute;
    bottom: 40%;
    height: 2rem;
    width: 5rem;
    border-radius: 5px;
    font-size: 1rem;
    white-space: nowrap;
    user-select: none;
    letter-spacing: 0.5rem;
    line-height: 1;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    padding-left:.8rem;
    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }
    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const Save = styled.button`
  && {
    color:  ${({ theme }) => theme.backgroundColor};
    background-color: ${({ theme }) => theme.temperatureColor};
    right:3rem;
  }
`;

const Line = styled.div`
  position: absolute;
  left: 2rem;
  bottom: calc(10%);
  border-top: 3px solid ${({ theme }) => theme.titleColor};
  width:calc(100% - 4rem);
`;
const locations = availableLocations.map((location) => location.cityName);

const WeatherSetting = ({ setCurrentPage, cityName, setCurrentCity }) => {
  const [locationName, setLocationName] = useState(cityName);

  const handleChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleSave = () => {
    if (locations.includes(locationName)) {
      console.log(`儲存的地區資訊為：${locationName}`);
      setCurrentPage('WeatherCard');
      setCurrentCity(locationName);
    } else {
      alert(`儲存失敗：您輸入的 ${locationName} 並非有效的地區`);
      return;
    }
  };

  return (
    <WeatherSettingWrapper>
      <Titlebar>Taiwan Weather</Titlebar>
      <Title>地區設定</Title>
      <StyledLabel htmlFor="location">請選擇地區</StyledLabel>
      <StyledSelect
        id="location"
        name="location"
        onChange={handleChange}
        value={locationName}
      >
        {locations.map((location) => (
          <option value={location} key={location}>
            {location}
          </option>
        ))}
      </StyledSelect>

      <ButtonGroup>
        <Back onClick={() => setCurrentPage('WeatherCard')}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
      <Line></Line>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting;