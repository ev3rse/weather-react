import React from "react";
import Slider from "react-slick";


const DetailedInfo = ({ data }) => {
	if (Object.entries(data).length !== 0 && data.constructor !== Object) {
		const settings = {
			infinite: false,
			slidesToShow: 5,
			swipeToSlide: true,
			vertical: true,
			verticalSwiping: true,
			accessibility: false
		};

		const getHour = (time) => {
			const date = new Date();

			if (time) {
				date.setTime(time * 1000);
			}

			return date.getHours();
		};

		const displayMoreInfo = (item, i) => {
			return (
				<div key={i}>
					<div className="hourly-info">
						<div className="hour-of-the-day">
							{`${getHour(item.dt)}:00`}
						</div>
						<div className="hour-temperature">
							{`${Math.round(item.main.temp)}°C`}
						</div>
					</div>
				</div>
			);
		};

		return (
			<div className="hourly">
				<Slider {...settings} >
					{data.map((item, i) => (
						displayMoreInfo(item, i)
					))}
				</Slider>
			</div>
		);
	} else {
		return (
			<div className="forecast-empty">There is no forecast for this date</div>
		)
	}
};

export default DetailedInfo;
