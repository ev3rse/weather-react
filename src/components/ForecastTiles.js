import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class ForecastTiles extends Component {
	constructor(props) {
		super(props);

		this._slickSettings = {
			centerMode: true,
			centerPadding: "0px",
			focusOnSelect: true,
			infinite: true,
			touchMove: false,
			slidesToShow: 3,
			slidesToScroll: 1
		};

		this.state = {
			forecast: {}
		};

		this._setForecast = this._setForecast.bind(this);
	}

	_groupByDays = data => {
		return (data.reduce((list, item) => {
			const forecastDate = this._getDate(parseInt(item.dt));
			list[forecastDate] = list[forecastDate] || [];
			list[forecastDate].push(item);

			return list;
		}, {}));
	};

	_getDate = (time) => {
		let date = new Date(time * 1000);
		let dd = String(date.getDate()).padStart(2, '0');
		let mm = String(date.getMonth() + 1).padStart(2, '0');
		let yyyy = date.getFullYear();

		return yyyy + '-' + mm + '-' + dd;
	};

	_getDay = data => {
		const date = new Date((data[0].dt) * 1000);

		return String(date.getDate()).padStart(2, '0');
	};

	_getDayOfTheWeek = data => {
		const daysOfWeek = [ 'ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
		const date = new Date((data[0].dt) * 1000);
		const day = date.getDay();

		return daysOfWeek[day];
	};

	_getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

	_getInfo = (data, min=[], max=[], humidity=[]) => {
		data.forEach(item => {
			max.push(item.main.temp_max);
			min.push(item.main.temp_min);
			humidity.push(item.main.humidity);
		});

		const minMax = {
			min: Math.round(Math.min(...min)),
			max: Math.round(Math.max(...max)),
		};

		return (
			<div className="weather-info">
				<div className="min-max">
					<p>{`${minMax.max}°C`}</p>
					<p>{`${minMax.min}°C`}</p>
				</div>
			</div>
		);
	};

	_setForecast(newForecast) {
		this.setState({
			forecast: newForecast
		})
	};

	_showMoreInfo = (index = 0) => {
		const { forecasts } = this.props;
		const tiles = Object.values(this._groupByDays(forecasts));

		this._setForecast(tiles[index]);
	};

	componentDidMount() {
		this._showMoreInfo();
	}

	render() {
		const { forecasts } = this.props;
		const forecastTiles = Object.values(this._groupByDays(forecasts));

		return (
			<div className="forecast">
				<div className="weather-info">Select day</div>
				<div className="forecast-tiles">
					<Slider {...this._slickSettings}>
						{forecastTiles.map((item, i) => (
							<div
								className={`forecast-tile tile-${i}`}
								key={i}
								ref={`div-${i}`}
								onClick={() => {this._showMoreInfo(i)}}
							>
								<div className="primary-info">
									<div className="icon">
										<img src={this._getIcon(item)} alt="" />
										<p>{this._getDay(item)}</p>
										<p>{this._getDayOfTheWeek(item)}</p>
									</div>
									{this._getInfo(item)}
								</div>
							</div>
						))}
					</Slider>
				</div>

				<div className={`detailed-info detailed-info-`}>
					<DetailedInfo data={this.state.forecast} />
				</div>
			</div>
		);
	};
}

export default ForecastTiles;
