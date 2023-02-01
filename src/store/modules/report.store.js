import { } from "@/api/pcp.api";
import {
  getAnalyticData,
  getAnalyticDataExcel,
  getAnalyticDataAll,
  getAnalyticDataExcelAll,
  getPolicyUnderCompany,
  getHRUnderPolicy,
  getAllHRunderCompany
} from "@/api/ppanalytic.api";
import FileDownload from "js-file-download";

const fn = {
  SET_POLICIES: "SET_POLICIES",
  SET_HR: "SET_HR",
  RESET_HR: "RESET_HR",
  SET_REPORT_DATA: "SET_REPORT_DATA"
};

const state = {
  policies: [],
  HRMembers: [],
  reportData: {}
};

// getters
const getters = {
  getAllPolicies: state => state.policies,
  getReportData: state => state.reportData,
  getAllHR: state => state.HRMembers
};

// actions
const actions = {
  async getPolicyId({ commit }, group_id) {
    try {
      let resp = await getPolicyUnderCompany({ 'company' : group_id });
      commit(fn.SET_POLICIES, resp.data.policies);
    } catch (err) {
      console.log(err);
    }
  },
  async getHRMember({ commit }, payload) {
    try {
      let resp = await getHRUnderPolicy({ policy_id: payload });

      commit(fn.SET_HR, resp.data.accounts);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllHRfromAPI({ commit, dispatch }, group_id) {
    try {
      let resp = await getAllHRunderCompany({group_id});
      if (resp.data) {
        let accounts_array = [];
        resp.data.length > 0 && resp.data.accounts.forEach(item => {
          accounts_array.push(item.account_id);
        });
        dispatch("getReportAlloverview", {
          account_id: accounts_array,
          platform: "pcp"
        });
      }
      // commit(fn.SET_HR, resp.data.accounts);
    } catch (err) {
      console.log(err);
    }
  },
  async getReportAlloverview({ commit }, payload) {
    try {
      let resp = await getAnalyticDataAll(payload);
      commit(fn.SET_REPORT_DATA, resp.data);
    } catch (err) {
      console.log(err);
    }
  },
  async getReport({ commit }, payload) {
    try {
      let resp = await getAnalyticData(payload);
      commit(fn.SET_REPORT_DATA, resp.data);
    } catch (err) {
      console.log(err);
    }
  },
  async getExcel({ commit }, payload) {
    try {
      let resp = await getAnalyticDataExcel(payload);
      let d = new Date();
      let datename = `${d.getMonth() + 1}${d.getDate()}${d.getFullYear()}`;
      FileDownload(resp.data, `useractivity_${datename}.xlsx`);
    } catch (err) {
      console.log(err);
    }
  },
  async getExcelAll({ commit }, group_id) {
    try {
      let resp = await getAllHRunderCompany({group_id});
      if (resp.data) {
        let accounts_array = [];
        resp.data.length > 0 && resp.data.accounts.forEach(item => {
          accounts_array.push(item.account_id);
        });
        let dataall = await getAnalyticDataExcelAll({
          account_id: accounts_array,
          platform: "pcp"
        });
        let d = new Date();
        let datename = `${d.getMonth() + 1}${d.getDate()}${d.getFullYear()}`;
        FileDownload(dataall.data, `useractivity_${datename}.xlsx`);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

// mutations
const mutations = {
  [fn.SET_POLICIES](state, payload) {
    state.policies = payload;
  },
  [fn.SET_HR](state, payload) {
    state.HRMembers = payload;
  },
  [fn.RESET_HR](state, payload) {
    state.HRMembers = [];
  },
  [fn.SET_REPORT_DATA](state, payload) {
    state.reportData = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
