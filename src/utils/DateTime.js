import  React, { useState , useEffect } from 'react'

export const DateTime = () => {
	return(
		<div className="dayTime">
			<div className="day"><PrintDate /></div>
			<div className="time"><PrintTime /></div>
		</div>
	)
}

export const PrintDate = () => {
	const [date, setDate] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(()=>setDate(new Date()), 1000 )
		return function cleanup() {
			clearInterval(timer)
		}
	});
	return(
		date.toLocaleDateString()
	)
}

export const PrintTime = () => {
	const [date, setDate] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(()=>setDate(new Date()), 1000 )
		return function cleanup() {
			clearInterval(timer)
		}
	});
	return(
		date.toLocaleTimeString()
	)
}

export default DateTime