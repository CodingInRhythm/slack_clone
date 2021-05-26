import React, { useEffect, useState } from 'react';
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6

import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../../store/channel_messages';
import { useParams, useLocation } from 'react-router-dom';
import { getDirectMessages } from '../../../store/direct_messages';

const Content = ({ room, setRoom }) => {
	let modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			['clean'],
		],
	};
	let formats = [
		'header',
		'bold',
		'italic',
		'font',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];

	//val 1 will either be channelId or userId
	const hashingRoom = (val1, recipientId) => {
		if (!recipientId) {
			return `Channel: ${val1}`;
		} else {
			return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
		}
	};

	const { id } = useParams();
	const location = useLocation();
	console.log(location);
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
	const direct_messages = useSelector(state => state.directMessages);
	const userId = useSelector(state => state.session.user.id);

	let slice;
	let roomNum;
	if (location.pathname.includes('channel')) {
		roomNum = room.split(' ')[1];
		slice = 'channelMessages';
		setRoom(hashingRoom(id));
	} else {
		roomNum = id;
		setRoom(hashingRoom(userId, id));
		slice = 'directMessages';
	}

	const messages = useSelector((state) => state['channelMessages'])

	useEffect(() => {
		if (!channel_messages[id]) {
			dispatch(getChannelMessages(id));
		}
		if (!direct_messages[id]) {
			dispatch(getDirectMessages(id));
		}
	}, [room, dispatch, id]);

	console.log(Object.entries(messages[id] ? messages[id] : {}))

	return (
		<div class="main">
			<header class="main__header">
				<div class="main__channel-info">
					<h1 class="main__h3">#2021-01-group02-juice-and-the-thunks</h1>
				</div>
				<div class="main__channel-members">
					<div>
						<i class="fas fa-user-friends"></i> <span class="main_channel-members-h3">View Members</span>
					</div>
					<div>
						<i class="fas fa-user-plus"></i> <span class="main_channel-members-h3">Add Members</span>
					</div>
				</div>
			</header>
			<div class="main__content">
				<div class="main__container">
					<section class="main__chat">
						{messages[id] && Object.entries(messages[id]).map(([id, msg])=> (
							<Message key={msg.id} msg={msg} modules={modules} formats={formats}/>
						))}
					</section>
					<section class="main__chat-textarea">
						<ReactQuill
							placeholder={`Message #${messages[id]?.channel?.name}`}
							modules={modules}
							formats={formats}
							inputClass="main__chat-textarea"
							actionText="Send"
							// onChange={handleChange}
						>
							<div className="my-editing-area"></div>
						</ReactQuill>
						<button
							className="main__chat-send"
							// onClick={}
						>
							<i class="fas fa-paper-plane"></i>
						</button>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Content;
