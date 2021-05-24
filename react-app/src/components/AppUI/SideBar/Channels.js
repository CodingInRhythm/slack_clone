import React, { useEffect, useState } from 'react';
import './Channels.css';
import { NavLink } from 'react-router-dom';

const Channels = () => {
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/channels/');
			const responseData = await response.json();
			setChannels(responseData.channels);
		}
		fetchData();
	}, []);

	const channelComponents = channels.map(channel => {
		return (
			<li key={channel.id} className="channels__button">
				<NavLink to={`/channels/${channel.id}`}>
					<span>{channel.name}</span>
				</NavLink>
			</li>
		);
	});

	return (
		<div className="channels">
			<h2 className="channels__heading">
				<span>
					Channels <span className="channels__number">({channels.length})</span>
				</span>
			</h2>
			<ul className="channels__list">
				<li className="channels__item">
					<button className="channels__button">
						<span>general</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button">
						<span>2021-01-11-online</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button">
						<span>2021-01-gp6-kangchenjunga</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button channels__button--active">
						<span>2021-01-group02-juice-and-the-thunks</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button">
						<span>2021-01-online-project-questions</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button">
						<span>2021-01-team-polis</span>
					</button>
				</li>
				<ul>{channelComponents}</ul>
				<li className="channels__item">
					<button className="channels__add">
						<span className="dm__add--plussign">+</span>
						<span className="dm__add">Add channels</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default Channels;
