import { getAllCompanies } from "@/api/ppanalytic.api";

const fn = {
  SET_COMPANY: "SET_COMPANY"
};

const state = {
  companies: []
};

// getters
const getters = {
  getCompanies: state => state.companies
};

// actions
const actions = {
  async getCompany({ commit }) {
    try {
      let resp = await getAllCompanies();
      commit(fn.SET_COMPANY, resp.data.companies);
    } catch (err) {
      console.log(err);
    }
  }
};

// mutations
const mutations = {
  [fn.SET_COMPANY](state, payload) {
    state.companies = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
