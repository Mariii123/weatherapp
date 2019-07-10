import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import logo from "../logo.svg";
import night from "../moon.svg";

const api_key = "208990df1dbbe8f38d20e0a14d7b4329";

class Design extends Component {
  state = {
    city: "",
    name: "",
    degree: "",
    description: "",
    wind: "",
    humidity: "",
    pressure: ""
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var { latitude, longitude } = position.coords;
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
          )
          .then(res => {
            var { data } = res;
            this.setState({
              name: data.name,
              degree: Math.round(data.main.temp - 273.15),
              description: data.weather[0].main,
              wind: data.wind.speed,
              humidity: data.main.humidity,
              minTemp: Math.round(data.main.temp_min - 273.15),
              maxTemp: Math.round(data.main.temp_max - 273.15),
              pressure: data.main.pressure
            });
          });
      });
    }
  }
  handleChange = e => {
    this.setState({
      city: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    var city = this.state.city;

    if (city) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        )
        .then(res => {
          console.log(res.data);
          const { data } = res;
          this.setState({
            name: data.name,
            degree: Math.round(data.main.temp - 273.15),
            description: data.weather[0].main,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            minTemp: Math.round(data.main.temp_min - 273.15),
            maxTemp: Math.round(data.main.temp_max - 273.15),
            clouds: data.clouds.all
          });
        });
    }
  };
  render() {
    return (
      <div className="container day-bg">
        <div className="navbar">
          <div className="logo">
            <img className="App-logo" src={logo} alt="Logo" />
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleChange}
                id="city"
                required
                type="text"
                value={this.state.city}
                placeholder="City Name / Pincode"
              />
              <button type="submit">Find</button>
            </form>
          </div>
        </div>
        <div>
          <p className="city-name">{this.state.name}</p>
          <p className="date">Sunday, 7 July</p>
        </div>
        <div className="weather-data">
          <p className="weather-temp">{this.state.degree}°</p>
          <div>
            <img src={night} alt="Night" className="icon" />
            <p className="weather-desc">{this.state.description}</p>
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
    );
  }
}

export default Design;
