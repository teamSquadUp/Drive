import React from "react";

const Weather = (props) => (
    <div className="weather__info">
    {
        props.city && props.country && <p className="weather__key"> Location: 
        <span className="weather__value"> {props.city}, {props.country} </span>
        </p>
        }
    {
        props.temperature && <p className="weather__key"> Temperature: 
        <span className="weather__value"> {props.temperature} {"K"} </span> 
        </p>
        }
    {
        props.humidity && <p className="weather__key"> Humidity: 
        <span lassName="weather__value"> {props.humidity} {"%"} </span> 
        </p>
        } 
    {
        props.description && <p className="weather__key"> Conditions: 
        <span className="weather__value"> {props.description} </span> 
        </p>
        }
    {
        props.error && <p className="weather__key"> {props.error}</p>
        }
    </div>
);

const Titles = () => (
    <div> 
        <h1 className="title-container__title"> Weather Finder </h1>
    </div>
);

const Form = props => (
    <form onSubmit={props.getWeather}>
        <input type = "text" name="city" placeholder="City..."/>
        <input type = "text" name="country" placeholder="Country..."/>
        <button> Get Weather </button>
    </form>
);

const API_KEY = "2c28be1d4a184670d6c5cdcb016fa51b";

export class weatherapi extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e)=> {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metic`);
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
      } else{
        this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });
    }
  }
  render() {
    return (
      <div>
          <div>
                  <Titles />
                </div>
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
      </div>
    );
  }
};


export default weatherapi;