const initialState = {
  users: [],
  alluser: [],
  skills: [],
  allskills: [],
  a: false
};
const users = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        users: action.payload
      };
    case "LOGINCHECK":
      return {
        ...state,
        a: action.payload
      };
    case "SKILLS":
      return {
        ...state,
        skills: action.payload
      };
    case "GETSKILLS": {
      return {
        ...state,
        allskills: action.payload
      };
    }
    case "GETUSER": {
      return {
        ...state,

        alluser: action.payload
      };
    }

    default:
      return state;
  }
};
export default users;
