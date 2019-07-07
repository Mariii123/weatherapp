import React, { Component } from "react";

const Weather = (props) => {
    return(
        <div>
            {props.city && props.country && <p>Location: {props.city}, {props.country}</p>}
            {props.temp && <p>Temperature: {props.temp - 273.15}</p>}
            {props.humidity && <p>Humidity: {props.humidity}</p>}
            {props.desc && <p>Condition: {props.desc}</p>}
            {props.error && <p>Error: {props.error}</p>}
            
        </div>
    )
}
export default Weather