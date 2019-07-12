import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import night from "../moon.svg";
import rain from "../rain.svg";
import hurricane from "../hurricane.svg";
import clouds from "../clouds.svg";
import blizzard from "../blizzard.svg";
import cloudy from "../cloudy-day.svg";
import clear from "../Clear.svg";
import dateFormat from "dateformat";
import smoke from "../Smoke.svg";
import thunder from "../storm.svg";
import dateformat from "dateformat";
const api_key = "208990df1dbbe8f38d20e0a14d7b4329";

class Design extends Component {
  state = {
    city: "",
    name: "",
    degree: "",
    description: "",
    wind: "",
    humidity: "",
    pressure: "",
    wid: "",
    wic: "",
    loading: true,
    lastLoc: ""
  };
  getCurrentLocWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var { latitude, longitude } = position.coords;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
          )
          .then(res => {
            var { data } = res;
            this.setState({
              city: data.name,
              degree: Math.round(data.main.temp - 273.15),
              description: data.weather[0].main,
              wid: data.weather[0].id,
              wic: data.weather[0].icon,
              wind: data.wind.speed,
              humidity: data.main.humidity,
              minTemp: Math.round(data.main.temp_min - 273.15),
              maxTemp: Math.round(data.main.temp_max - 273.15),
              pressure: data.main.pressure,
              loading: false,
              lastLoc: data.name
            });
          })
          .catch(err => {
            alert("Unable to detect your current location");
          });
      });
    } else {
      this.setState({
        city: this.state.lastLoc
      });
      alert("You need to enable gps to access the location");
    }
  };
  componentDidMount() {
    this.getCurrentLocWeather();
  }

  handleChange = e => {
    this.setState({
      city: e.target.value
    });
  };
  handleSubmit = async e => {
    this.setState({
      loading: true
    });
    e.preventDefault();
    var city = this.state.city;
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        )
        .then(res => {
          const { data } = res;
          this.setState({
            city: data.name,
            degree: Math.round(data.main.temp - 273.15),
            description: data.weather[0].main,
            wid: data.weather[0].id,
            wind: data.wind.speed,
            wic: data.weather[0].icon,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            minTemp: Math.round(data.main.temp_min - 273.15),
            maxTemp: Math.round(data.main.temp_max - 273.15),
            clouds: data.clouds.all,
            loading: false,
            lastLoc: data.name
          });
        })
        .catch(err => {
          this.setState({
            loading: false,
            city: this.state.lastLoc
          });
          alert("Please check whether you have entered correct city name");
        });
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <div className="main-container clear-bg center">
          <p>Loading...</p>
        </div>
      );
    }
    var now = new Date();
    var img = undefined;
    var bg = undefined;
    if (this.state.description === "Haze") {
      img = smoke;
      bg = "clear-bg";
    } else if (this.state.wic === "13d") {
      img = blizzard;
    } else if (this.state.description === "Clouds") {
      img = cloudy;
      bg = "cloudy-bg";
    } else if (this.state.description === "Clear") {
      img = clear;
      bg = "Clean-bg";
    } else if (
      this.state.description === "Thunder" ||
      this.state.description === "Storm"
    ) {
      img = thunder;
      bg = "Clean-bg";
    } else if (
      this.state.description === "Fog" ||
      this.state.description === "Smoke" ||
      this.state.description === "Mist"
    ) {
      img = smoke;
    } else if (this.state.description === "Rain") {
      img = rain;
      bg = "rain-bg";
    } else {
      bg = "day-bg";
    }
    return (
      <div className={`main-container ${bg}`}>
        <div className="navbar">
          <div>
            <p className="logo">
              <i className="fa fa-bolt" /> weather
            </p>
          </div>
        </div>
        <div className="container">
          <div className="city-date-container">
            <form onSubmit={this.handleSubmit} className="inline">
              <input
                type="text"
                className="city-name"
                onChange={this.handleChange}
                value={this.state.city}
              />
              <button className="fa fa-arrow-right" type="submit" />
            </form>
            <div className="date-time">
              <p className="date">{dateFormat(now, "ddd,dS mmmm ")}</p>
              <p className="time">
                {dateFormat(now, "HH:MM")}
                {}
              </p>
            </div>
          </div>

          <div className="weather-data">
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="weather-temp">{this.state.degree}°C</p>
                <div>
                  <img src={img} alt="Icon" className="icon" />
                  <p className="weather-desc">{this.state.description}</p>
                </div>
              </div>
              <div className="other-data">
                <div className="card">
                  <p className="title-light">Wind</p>
                  <p className="data-value">{this.state.wind}</p>
                  <p className="data-unit">m/s</p>
                </div>
                <div className="card">
                  <p className="title-light">Humidity</p>
                  <p className="data-value">{this.state.humidity}</p>
                  <p className="data-unit">%</p>
                </div>
                <div className="card">
                  <p className="title-light">Pressure</p>
                  <p className="data-value">{this.state.pressure}</p>
                  <p className="data-unit">hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Design;
