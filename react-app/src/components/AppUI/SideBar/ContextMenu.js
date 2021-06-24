import React from 'react';
import './ContextMenu.css';
import { useContextMenuEvent } from 'react-context-menu-wrapper';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../store/channels';

const MyContextMenu = ({ setEditOn }) => {
	const dispatch = useDispatch();
	const menuEvent = useContextMenuEvent();

	if (!menuEvent || !menuEvent.data) return null;

	const handleDeleteChannel = () => {
		dispatch(deleteChannel(menuEvent.data.id));
	};

	const toggleEditChannel = () => {
		setEditOn(menuEvent.data.id);
	};

	return (
		<div className="context-menu">
			<li>
				<button
					className="context-menu--btn"
					onClick={toggleEditChannel}
				>
					<span className="context-menu--text">
						<i className="fas fa-pencil-alt context--menu-text-icon"></i>Edit Channel
					</span>
				</button>
			</li>
			<li>
				<button className="context-menu--btn" onClick={handleDeleteChannel}>
					<span className="context-menu--text">
						<i className="fas fa-trash-alt context--menu-text-icon"></i>Leave Channel
					</span>
				</button>
			</li>
		</div>
	);
};
export default MyContextMenu;
