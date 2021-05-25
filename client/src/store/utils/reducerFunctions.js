export const addMessageToStore = (state, payload) => {
  const { message } = payload;

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addMessageToStoreReceiver = (state, message, sender, currentActiveConversation) => {
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if (sender !== currentActiveConversation) {
        convoCopy.notificationCount ++;
      };


      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const resetConversationNotifications = (state, conversationId) => {
  return state.map((convo) => {
    if (convo.id === conversationId && conversationId) {
      const newConvo = { ...convo };
      newConvo.notificationCount = 0;
      return newConvo;
    } else {
      return convo;
    }
  });}

  export const setMessagesToReadInStore = (state, conversationId) => {
    return state.map((convo) => {
      if (convo.id === conversationId) {
        const convoCopy = { ...convo };
        convoCopy.messages.forEach((message) => {
          if (message.readStatus === false && convoCopy.otherUser.id === message.senderId) {
            message.readStatus = true;
          };
        });
        return convoCopy;
      } else {
        return convo;
      }
    }
  )};
