const initialState = {
  name: []
};
const name = (state = initialState, action) => {
  switch (action.type) {
    case "NAME":
      return {
        ...state,
        name: action.payload
      };

    default:
      return state;
  }
};
export default name;
