import React from "react";

const DetailedInfo = ({ data }) => {
	if (Object.entries(data).length !== 0 && data.constructor !== Object) {
		const getHour = (time) => {
			if (time) {
				const date = new Date();
				date.setTime(time * 1000);

				return date.getHours();
			} else {
				return new Date().getHours();
			}
		};

		const displayMoreInfo = (item, i) => {
			return (
				<div className="hourly-info" key={i}>
					<div className="hour-of-the-day">
						{`${getHour(item.dt)}:00`}
					</div>
					<div className="hour-temperature">
						{`${Math.round(item.main.temp)}°C`}
					</div>
				</div>
			);
		};

		return (
			<div className="hourly">
				{data.map((item, i) => (
					displayMoreInfo(item, i)
				))}
			</div>
		);
	} else {
		return (
			<div className="forecast-empty">На указанную дату прогноз отсутствует</div>
		)
	}
};

export default DetailedInfo;
