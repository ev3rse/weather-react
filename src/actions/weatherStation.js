import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "./ActionTypes";
import { API_ID, API_URL } from "../constants/api";
import axios from "axios";


export const fetchData = (region) => (dispatch) => {
	const { latitude, longitude } = region || {};
	const getDataByCity = `${API_URL}?q=${region}&units=metric&appid=${API_ID}`;
	const getDataByCoords = `${API_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_ID}`;

	let location = typeof(region) === "object" ? getDataByCoords : getDataByCity;

	return axios.get(location)
		.then((response) => {
			dispatch({
				type: FETCH_DATA_FULFILLED,
				payload: response.data
			});
		})
		.catch((err) => {
			dispatch({
				type: FETCH_DATA_REJECTED,
				payload: err
			});
		});
};
