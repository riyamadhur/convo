import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFirestore } from "../config/Build/firestore";

export const sentMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      //sender, receiver, time, text, img
      const store = useFirestore();
      console.log(data);
      const { message, chatId } = data;
      const { sender, receiver } = message;
      const chatData = await store.getADocsFromFirestore("chats", chatId);
      const messages = chatData.messages;
      const updatedMessages = [...messages, message]
      await store.setDataToFirestoreRef("chats", chatId, { messages: updatedMessages});
      await store.updateDataFromFirestore("users", sender, {
        lastMessege: message.text ? message.text : "image received",
      });
      await store.updateDataFromFirestore("users", receiver, {
        lastMessege: message.text ? message.text : "image received",
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createChatSession = createAsyncThunk(
  "chat/createChatSession",
  async ({ userId, selectedUserId }, { rejectWithValue }) => {
    try {
      const store = useFirestore();
      const user = await store.getADocsFromFirestore("users", userId);
      const selectedUser = await store.getADocsFromFirestore(
        "users",
        selectedUserId
      );

      const combinedUID =
        user.uid < selectedUser.uid
          ? selectedUser.uid + user.uid
          : user.uid + selectedUser.uid;

      const data = await store.getADocsFromFirestore("chats", combinedUID);
      if (!data) {
        await store.setDataToFirestoreRef("chats", combinedUID, {
          messages: [],
        });
        await store.updateDataFromFirestore("userChats", user.uid, {
          [combinedUID + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedUID + ".date"]: new Date().toDateString(),
        });
        await store.updateDataFromFirestore("userChats", selectedUser.uid, {
          [combinedUID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedUID + ".date"]: new Date().toDateString(),
        });
        return { combinedUID, selectedUser };
      } else {
        return { combinedUID, selectedUser };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Add the async thunk action creator to the reducers
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    selectedUser: {},
  },
  reducers: {
    clearChatId: (state, action) => {
      state.chatId = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatSession.pending, (state) => {
        // You may handle pending state if needed
      })
      .addCase(createChatSession.fulfilled, (state, action) => {
        const { combinedUID, selectedUser } = action.payload;
        state.selectedUser = selectedUser;
        state.chatId = combinedUID;
      })
      .addCase(createChatSession.rejected, (state, action) => {
        // You may handle rejected state if needed
      });
  },
});

// Export your slice and actions
export const chatReducer = chatSlice.reducer;
export const { clearChatId } = chatSlice.actions;
export const chatSelector = (state) => state.chatReducer;
