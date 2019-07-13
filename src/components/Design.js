import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import rain from "../rain.svg";
import drizzle from "../drizzle.svg";
import blizzard from "../blizzard.svg";
import cloudy from "../cloudy-day.svg";
import clear from "../Clear.svg";
import dateFormat from "dateformat";
import smoke from "../Smoke.svg";
import thunder from "../storm.svg";
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
    sunsetime: "",
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
              sunsetime: data.sys.sunset,
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
          console.log(data);
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
            sunsetime: data.sys.sunset,
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
    var loader = "";
    if (this.state.loading) {
      loader = "";
    } else {
      loader = "hidden";
    }
    var now = new Date();
    var img = undefined;
    var bg = undefined;
    if (this.state.wic === "01d") {
      img = clear;
      bg = "clearday-bg";
    } else if (this.state.wid === 701 || this.state.wid === 741) {
      img = smoke;
      bg = "fog-bg";
    } else if (
      this.state.wid === 711 ||
      this.state.wid === 721 ||
      this.state.wid === 731 ||
      this.state.wid === 751 ||
      this.state.wid === 761 ||
      this.state.wid === 762 ||
      this.state.wid === 771 ||
      this.state.wid === 781
    ) {
      img = smoke;
      bg = "haze-bg";
    } else if (this.state.wic === "01n") {
      img = clear;
      bg = "clearnight-bg";
    } else if (this.state.description === "Snow") {
      img = blizzard;
      bg = "snow-bg";
    } else if (
      this.state.wic === "02d" ||
      this.state.wic === "03d" ||
      this.state.wic === "04d"
    ) {
      img = cloudy;
      bg = "cloudy-bg";
    } else if (
      this.state.wic === "02n" ||
      this.state.wic === "03n" ||
      this.state.wic === "04n"
    ) {
      img = cloudy;
      bg = "cloudynight-bg";
    } else if (this.state.description === "Clear") {
      img = clear;
      bg = "Clean-bg";
    } else if (this.state.description === "Thunderstorm") {
      img = thunder;
      bg = "thunder-bg";
    } else if (this.state.description === "Drizzle") {
      bg = "drizzle-bg";
      img = drizzle;
    } else if (this.state.description === "Rain") {
      img = rain;
      bg = "rain-bg";
    } else {
      bg = "default-bg";
    }
    return (
      <div className={`main-container ${bg}`}>
        <div>
          <div className="navbar">
            <div>
              <p className="logo">
                <i className="fa fa-bolt" /> weather
              </p>
            </div>
            <div className={`lds-ellipsis ${loader}`}>
              <div />
              <div />
              <div />
              <div />
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
                  autoFocus
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
      </div>
    );
  }
}

export default Design;
