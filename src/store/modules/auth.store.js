import { Login, YSLogin } from "@/api/users.api";

const fn = {
  SET_USER_DETAIL: "SET_USER_DETAIL",
  LOGOUT: "LOGOUT"
};

const state = {
  token: localStorage.getItem("uid") || "",
  user: {}
};

// getters
const getters = {
  isLoggedIn: state => !!state.token
};

// actions
const actions = {
  async Login({ commit }, payload) {
    try {
      let resp = await Login(payload);
      if (resp.data.token && resp.data.user) {
        localStorage.setItem("uid", resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        commit(fn.SET_USER_DETAIL, resp.data);
      }
      return resp;
    } catch (err) {
      return err.response.status;
    }
  },
  async YSLogin({ commit, dispatch }, payload) {
    try {
      let resp = await YSLogin(payload);
      if (!resp.data.errormsg) {
        let data = resp.data;
        localStorage.setItem("uid", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        commit(fn.SET_USER_DETAIL, data);
        // let respLOGIN = await dispatch("Login", {
        //   username: data.user,
        //   password: atob(data.pwd),
        //   is_ys: true
        // });
        // if (respLOGIN.data.code === 401) {
        //   return 401;
        // }
      } else {
        localStorage.removeItem("uid");
        localStorage.removeItem("user");
        commit(fn.LOGOUT);
        return 401;
      }
    } catch (err) {
      console.error(err);
    }
  },
  async Logout({ commit }) {
    localStorage.removeItem("uid");
    localStorage.removeItem("user");
    commit(fn.LOGOUT);
  }
};

// mutations
const mutations = {
  [fn.SET_USER_DETAIL](state, payload) {
    state.token = payload.token;
    state.user = payload.user;
  },
  [fn.LOGOUT](state, payload) {
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
