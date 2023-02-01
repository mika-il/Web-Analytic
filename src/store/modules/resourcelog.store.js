import {
  getCompanyAndPolicy,
  getResourceLog,
  getUserViewed
} from "@/api/ppanalytic.api";

const fn = {
  SET_COMPANY: "SET_COMPANY",
  SET_POLICY: "SET_POLICY",
  SET_RESOURCE_LOG: "SET_RESOURCE_LOG",
  SET_POLICY_TYPE: "SET_POLICY_TYPE",
  SET_USER_VIEWED: "SET_USER_VIEWED",
  RESET_POLICY_TYPE: "RESET_POLICY_TYPE",
  RESET_RESOURCE_LOG: "RESET_RESOURCE_LOG"
};

const state = {
  company: [],
  policy: [],
  resourceLog: {},
  policyType: "",
  userViewed: []
};

const getters = {
  getCompany: state => state.company,
  getPolicy: state => state.policy,
  getPolicyType: state => state.policyType,
  getResourceLog: state => state.resourceLog,
  getUserViewed: state => state.userViewed
};

// actions
const actions = {
  async getCompanyAndPolicyData({ commit }) {
    try {
      const resp = await getCompanyAndPolicy();
      if (resp.data) {
        commit(fn.SET_COMPANY, resp.data.company);
        commit(fn.SET_POLICY, resp.data.policy);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getResorceLogData({ commit }, payload) {
    try {
      const resp = await getResourceLog(payload);
      if (resp.data) {
        commit(fn.SET_POLICY_TYPE, resp.data.policyType);
        commit(fn.SET_RESOURCE_LOG, resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getUserViewedData({ commit }, payload) {
    try {
      const resp = await getUserViewed(payload);
      if (resp.data) {
        commit(fn.SET_USER_VIEWED, resp.data.userViewed);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

// mutations
const mutations = {
  [fn.SET_COMPANY](state, payload) {
    state.company = payload;
  },
  [fn.SET_POLICY](state, payload) {
    state.policy = payload;
  },
  [fn.SET_POLICY_TYPE](state, payload) {
    state.policyType = payload;
  },
  [fn.SET_RESOURCE_LOG](state, payload) {
    state.resourceLog = payload;
  },
  [fn.SET_USER_VIEWED](state, payload) {
    state.userViewed = payload;
  },
  [fn.RESET_POLICY_TYPE](state) {
    state.policyType = "";
  },
  [fn.RESET_RESOURCE_LOG](state) {
    state.resourceLog = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
