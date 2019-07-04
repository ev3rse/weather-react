import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";
import WeatherForecast from './components/WeatherForecast';


class App extends Component {
	componentDidMount() {
		const getPosition = (options) => (
			new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, options);
			})
		);

		getPosition()
			.then((position) => {
				this.props.dispatch(fetchData(position.coords));
			})
			.catch(() => {
				this.props.dispatch(fetchData('Tomsk'));
			});
	}

	render() {
		const { forecast } = this.props;

		return (
			forecast === null ? (
				<div className="lds-ellipsis">
					<div></div><div></div><div></div><div></div>
				</div>
			) : (
				<div className="App">
					<WeatherForecast data={forecast} />
				</div>
			)
		);
	}
}

const mapStateToProps = store => ({
	forecast: store.weatherStation.data
});

export default connect(mapStateToProps)(App);
