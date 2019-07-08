import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import logo from "../logo.svg";
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
            clouds: data.clouds.all
          });
        });
    }
  };
  render() {
    return (
      <div className="container">
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
        <div className="main-content">
          <div>
            <h2 className="title-bold">{this.state.name}</h2>
            <p className="title-light">Sunday, 7 July</p>
          </div>
          <div className="weather-data">
            <div className="weather-report">
              <h1 className="data-ubold">{this.state.degree}°</h1>
              <h4 className="data-bold1">{this.state.description}</h4>
            </div>
            <div className="other-data">
              <div>
                <p className="title-light">Wind</p>
                <p className="data-bold">{this.state.wind} m/s</p>
              </div>
              <div>
                <p className="title-light">Humidity</p>
                <p className="data-bold">{this.state.humidity} %</p>
              </div>
              <div>
                <p className="title-light">Pressure</p>
                <p className="data-bold">{this.state.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Design;
