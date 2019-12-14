const initialState = {
  rooms: [],
  allrooms: []
};
const rooms = (state = initialState, action) => {
  switch (action.type) {
    case "CREATEROOM":
      return {
        ...state,
        rooms: action.payload
      };
    case "GETROOM":
      return {
        ...state,
        allrooms: action.payload
      };
    default:
      return state;
  }
};
export default rooms;
