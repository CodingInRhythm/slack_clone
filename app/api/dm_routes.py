from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import DirectMessage, User
from flask_login import current_user

dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/')
def direct_messages():
    sent_messages = DirectMessage.query.filter(
        DirectMessage.sender_id == current_user.id).all()
    received_messages = DirectMessage.query.filter(
        DirectMessage.recipient_id == current_user.id).all()

    users = []
    for user in sent_messages:
        if (user.recipient not in users and user.recipient_id != current_user.id):
            users.append(user.recipient)
    for user in received_messages:
        if (user.user not in users and user.sender_id != current_user.id):
            users.append(user.user)

    print("******************************************")
    print(users)
    print(sent_messages)
    print(received_messages)
    print("******************************************")

    return {'dm_people': [user.to_dict() for user in users]}
    # return {'direct_messages': [message.to_dict() for message in direct_messages]}

# direct_messages.id, direct_messages.sender_id, direct_messages.recipient_id, users.id, users.firstname, users.lastname
