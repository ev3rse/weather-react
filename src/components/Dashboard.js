import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/weatherStation";


class Dashboard extends Component {

	_updateCity = () => {
		const city = this.__cityInput.value;
		city.length !== 0 ? this.props.dispatch(fetchData(city)) : null; // eslint-disable-line no-unused-expressions
	};

	_onKeyPress = (e) => {
		e.key === 'Enter' ? this._updateCity() : null; // eslint-disable-line no-unused-expressions
	};

	render() {

		const { city, status } = this.props;
		const wrapperClass = (status === "failed") ? "weather-dashboard invalid-city" : "weather-dashboard";

		return (
			<div className={wrapperClass}>
				<header>
					<h1 className="heading">Weather Forecast</h1>
				</header>
				<section className="controls">
					<div>
						<input
							type="text"
							className="city-input"
							id="city-name"
							ref={input => {
								this.__cityInput = input;
								return this.__cityInput;
							}}
							onKeyPress={this._onKeyPress}
							placeholder={city}
						/>
						<input
							type="button"
							value="&gt;"
							className="search"
							onClick={this._updateCity}
							id="change-city-btn"
						/>
					</div>
				</section>
				<span className="error">Please enter valid city name!</span>
			</div>
		);
	}
}


const mapStateToProps = store => ({
	status: store.weatherStation.status
});

export default connect(mapStateToProps)(Dashboard);
