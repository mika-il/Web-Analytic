import { getCompanyAccess } from "@/api/ppanalytic.api";

const fn = {
  SET_COMPANY_ACCESS: "SET_COMPANY_ACCESS"
};

const state = {
  company_access_details: []
};

// getters
const getters = {
  get_comp_access: state => state.company_access_details
};

// actions
const actions = {
  async GET_COMPANY_ACCESS({ commit }, payload) {
    try {
      let resp = await getCompanyAccess(payload);
      commit(fn.SET_COMPANY_ACCESS, resp.data);
    } catch (err) {
      console.log(err);
    }
  }
};

// mutations
const mutations = {
  [fn.SET_COMPANY_ACCESS](state, payload) {
    state.company_access_details = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
