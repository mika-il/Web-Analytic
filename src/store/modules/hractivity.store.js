import {
  getAnalyticData,
  getAnalyticDataExcel,
  getAnalyticDataAll,
  getAnalyticDataExcelAll,
  getHRActivityAlloverview,
  getHRActivity,
  getHRActivityAlloverviewExcel,
  getAllCompanies,
  getPolicyUnderCompany,
  getHRUnderPolicy,
  getAllHRunderCompany
} from "@/api/ppanalytic.api";

import FileDownload from "js-file-download";

const fn = {
  SET_COMPANY: "SET_COMPANY",
  SET_POLICIES: "SET_POLICIES",
  SET_HR: "SET_HR",
  SET_REPORT_DATA: "SET_REPORT_DATA",
  SET_REPORT_DATA_ALLOVERVIEW: "SET_REPORT_DATA_ALLOVERVIEW",
  RESET_DATA: "RESET_DATA",
  RESET_AFTER_COMPANY: "RESET_AFTER_COMPANY",
  RESET_AFTER_POLICY: "RESET_AFTER_POLICY",
  RESET_AFTER_HR: "RESET_AFTER_HR"
};

const state = {
  companies: [],
  policies: [],
  total_hr: [],
  final_report: {},
  final_report_alloverview: {}
};

// getters
const getters = {
  getCompanies: state => state.companies,
  getPolicies: state => state.policies,
  getHR: state => state.total_hr,
  getReport: state => state.final_report,
  getReportAlloverview: state => state.final_report_alloverview
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
  },
  async getPolicy({ commit }, group_id) {
    try {
      commit(fn.RESET_AFTER_COMPANY);
      let resp = await getPolicyUnderCompany({ 'company' : group_id });
      commit(fn.SET_POLICIES, resp.data.policies);
    } catch (err) {
      console.log(err);
    }
  },
  async getHR({ commit }, payload) {
    try {
      let resp = await getHRUnderPolicy({ policy_id: payload });
      commit(fn.RESET_AFTER_POLICY);
      let account_index = resp.data.accounts.map((item, index) => ({
        id: index,
        ...item
      }));
      /* have to do this because datatable use key to identify HR so there are multiple
       account_id that why we have to create our own index
      */
      commit(fn.SET_HR, account_index);
    } catch (err) {
      console.log(err);
    }
  },
  async getReport({ commit }, payload) {
    try {
      let resp = await getHRActivity(payload);
      commit(fn.SET_REPORT_DATA, resp.data);
    } catch (err) {
      console.log(err);
    }
  },
  resetReport({ commit }) {
    commit(fn.RESET_DATA);
  },

  async getExcel({ commit }, payload) {
    try {
      let resp = await getAnalyticDataExcel(payload);
      let d = new Date();
      let datename = `${d.getMonth() + 1}${d.getDate()}${d.getFullYear()}`;
      FileDownload(resp.data, `hr_activity_${datename}.xlsx`);
      return "ok";
    } catch (err) {
      console.log(err);
    }
  },
  async getAlloverview({ commit }, group_id) {
    try {
      let resp = await getAllHRunderCompany({group_id});
      if (resp.data.accounts.length <= 0) return false; // no data !!!!
      let { accounts } = resp.data;
      let payload = {
        account_id: accounts,
        platform: "pcp"
      };
      let respfinal = await getHRActivityAlloverview(payload);
      commit(fn.SET_REPORT_DATA_ALLOVERVIEW, respfinal.data);
    } catch (err) {
      console.log(err);
    }
  },
  async getAlloverviewExcel({ commit }, group_id) {
    try {
      let resp = await getAllHRunderCompany({group_id});
      if (resp.data.accounts.length <= 0) return false; // no data !!!!
      let { accounts } = resp.data;
      let payload = {
        account_id: accounts,
        platform: "pcp"
      };
      let respfinal = await getHRActivityAlloverviewExcel(payload);
      let d = new Date();
      let datename = `${d.getMonth() + 1}${d.getDate()}${d.getFullYear()}`;

      FileDownload(respfinal.data, `hr_activity_all_overview_${datename}.xlsx`);
      return "ok";
    } catch (err) {
      console.log(err);
    }
  }
};

// mutations
const mutations = {
  [fn.SET_COMPANY](state, payload) {
    state.companies = payload;
  },
  [fn.SET_POLICIES](state, payload) {
    state.policies = payload;
  },
  [fn.SET_HR](state, payload) {
    state.total_hr = payload;
  },
  [fn.SET_REPORT_DATA](state, payload) {
    state.final_report = payload;
  },
  [fn.RESET_DATA](state, payload) {
    state.companies = [];
    state.policies = [];
    state.total_hr = [];
    state.final_report = {};
    state.final_report_alloverview = {};
  },
  [fn.SET_REPORT_DATA_ALLOVERVIEW](state, payload) {
    state.final_report_alloverview = payload;
  },
  [fn.RESET_AFTER_COMPANY](state, payload) {
    state.policies = [];
    state.total_hr = [];
    state.final_report = {};
    state.final_report_alloverview = {};
  },
  [fn.RESET_AFTER_POLICY](state, payload) {
    state.total_hr = [];
    state.final_report = {};
    state.final_report_alloverview = {};
  },
  [fn.RESET_AFTER_HR](state, payload) {
    state.final_report = {};
    state.final_report_alloverview = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
