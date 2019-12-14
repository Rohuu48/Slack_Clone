import firebase from "../Components/firebase";

export const addSkillstodb = (values, doc) => {
  return dispatch => {
    console.log("Asadfsdgwejgjhwe");
    var a = "";
    const db = firebase.firestore();

    db.collection("users")
      .doc(doc.id)
      .collection("skills")
      .get()
      .then(query => {
        query.forEach(doc2 => {
          console.log(doc.id, doc.data());
          db.collection("users")
            .doc(doc.id)
            .collection("skills")

            .doc(doc2.id)
            .set(
              {
                edu: values.edu,
                job: values.job,
                field: values.field,
                github: values.github
              },
              { merge: true }
            );
        });
        dispatch({ type: "SKILLS" });
      });
  };

  /** db.collection("users")
    .doc(doc.id)
    .collection("skills")

    .doc("g42uaCBZfwufbUCbT1fh")
    .set(
      {
        edu: values.edu,
        job: values.job,
        field: values.field,
        github: values.github
      },
      { merge: true }
    );*/
};

export const getName = email => {
  return dispatch => {
    const db = firebase.firestore();
    var list = [];
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            list = list.concat(doc.data());
          }
        });
        dispatch({ type: "NAME", payload: list });
      });
  };
};

export const getSkills = email => {
  return dispatch => {
    const db = firebase.firestore();
    var list = [];
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            db.collection("users")
              .doc(doc.id)
              .collection("skills")
              .get()
              .then(query => {
                query.forEach(doc => {
                  console.log("get skills");
                  list = list.concat(doc.data());
                });
                dispatch({ type: "GETSKILLS", payload: list });
              });
          }
        });
      });
  };
};

export const getUser = email => {
  return dispatch => {
    const db = firebase.firestore();
    var list = [];
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            list = list.concat(doc.data());
          }
        });
        dispatch({ type: "GETUSER", payload: list });
      });
  };
};

export const getRooms = email => {
  return dispatch => {
    const db = firebase.firestore();
    var list = [];
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            db.collection("users")
              .doc(doc.id)
              .collection("rooms")
              .get()
              .then(query => {
                query.forEach(doc => {
                  console.log("get Rooms");
                  list = list.concat(doc.data().name);
                });
                dispatch({ type: "GETROOM", payload: list });
              });
          }
        });
      });
  };
};

export const createRooms = (name, email) => {
  return dispatch => {
    const db = firebase.firestore();
    console.log("Room Created", name, email);

    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            db.collection("users")
              .doc(doc.id)
              .collection("rooms")
              .add({
                id: "",
                name: name,
                users: ""
              });
          }
        });
      });

    var list = [];

    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            db.collection("users")
              .doc(doc.id)
              .collection("rooms")
              .get()
              .then(query => {
                query.forEach(doc => {
                  console.log("aqwerty");
                  list = list.concat(doc.data().name);
                });
                dispatch({ type: "CREATEROOM", payload: list });
              });
          }
        });
      });
  };
};

export const addTextMsg = (email, roomname, message) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            db.collection("users")
              .doc(doc.id)
              .collection("rooms")
              .get()
              .then(query2 => {
                query2.forEach(doc2 => {
                  if (doc2.data().name === roomname) {
                    db.collection("users")
                      .doc(doc.id)
                      .collection("rooms")
                      .doc(doc2.id)
                      .collection("messages")
                      .doc("5c3Je6IRpuagVWaSPhbu")
                      .set({
                        email: email,
                        text: message
                      });
                  }
                });
              });
          }
        });
      });
  };
};

export const addtodb = (values, id, email, name) => {
  return dispatch => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(id)
      .set(
        {
          email: email,
          name: name,
          age: values.age,
          gender: values.gender,
          parent: values.parent,
          address: values.address,
          institute: values.institute,
          contact: values.contact
        },
        { merge: true }
      );
    dispatch({ type: "GETUSER" });
  };
};
export const login = email => {
  return dispatch => {
    const db = firebase.firestore();
    var list = [];
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            list = list.concat(doc.data());
          }
        });
        dispatch({ type: "LOGIN", payload: list });
      });
  };
};

export const logincheck = email => {
  return dispatch => {
    const db = firebase.firestore();
    var a = false;
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === email) {
            a = true;
          }
        });
        dispatch({ type: "LOGINCHECK", payload: a });
      });
  };
};
