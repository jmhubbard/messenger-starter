import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { updateMessageStatusDb, updateNotificationCount, setMessagesToReadInStore } from '../../store/utils/thunkCreators';
import store from "../../store";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  componentDidUpdate(){
    const fullStore = store.getState();
    const activeConversation = fullStore.activeConversation;
    const lastMessage = this.props.conversation.messages[this.props.conversation.messages.length - 1];
    const otherUser = this.props.conversation.otherUser.username;
    const otherUserId = this.props.conversation.otherUser.id;

    if (activeConversation === otherUser && lastMessage.senderId === otherUserId && lastMessage.readStatus === false) {
      const reqBody = {
        conversationId: this.props.conversation.id,
      };
      //If the user is currently viewing a conversation that is recieving messages
      //the messages status will be updated to readStatus = true inside the database
      //and the message status will be updated to readStatus = true inside the store
      //There is no need to change notification count because the notification count only increases if the user isn't viewing the chat.
      // This is done when a message is added to the store from socket.io
      this.props.updateMessageStatusDb(reqBody);
      this.props.setMessagesToReadInStore(reqBody);
    }
}

  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    const conversationId = conversation.id;
    const reqBody = {
      conversationId: conversationId,
    };
    //Updates the all of the users unread messages to readStatus = true inside the database 
    await this.props.updateMessageStatusDb(reqBody);
    //Sets the conversation.messageCount to zero inside store
    await this.props.updateNotificationCount(reqBody);
    //Sets all of the users unread messages to readStatus = true inside the store
    await this.props.setMessagesToReadInStore(reqBody);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    updateMessageStatusDb: (id) => {
      dispatch(updateMessageStatusDb(id));
    },
    updateNotificationCount: (conversationId) => {
      dispatch(updateNotificationCount(conversationId));
    },
    setMessagesToReadInStore: (conversationId) => {
      dispatch(setMessagesToReadInStore(conversationId));
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
