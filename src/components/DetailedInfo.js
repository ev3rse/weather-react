import React from "react";
import Slider from "react-slick";

const DetailedInfo = ({ data }) => {
	if (Object.entries(data).length !== 0 && data.constructor !== Object) {
		const getHour = (time) => {
			if (time) {
				const date = new Date();
				date.setTime(time * 1000);

				return date.getHours();
			} else {
				const date = new Date();

				return date.getHours();
			}
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

		const settings = {
			infinite: false,
			slidesToShow: 5,
			swipeToSlide: true,
			vertical: true,
			verticalSwiping: true,
			accessibility: false
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
			<div className="forecast-empty">На указанную дату прогноз отсутствует</div>
		)
	}
};

export default DetailedInfo;
