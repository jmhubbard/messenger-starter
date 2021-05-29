import io from "socket.io-client";
import store from "./store";
import {
  removeOfflineUser,
  addOnlineUser,
  setNewMessageReceiver,
} from "./store/conversations";

const socket = io(window.location.origin, { autoConnect: false });

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("add-online-user", (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on("remove-offline-user", (id) => {
  store.dispatch(removeOfflineUser(id));
});
socket.on("new-message", (data) => {
  const fullStore = store.getState();
  const currentActiveConversation = fullStore.activeConversation;
  store.dispatch(
    setNewMessageReceiver(
      data.message,
      data.from.username,
      currentActiveConversation
    )
  );
});

export default socket;
