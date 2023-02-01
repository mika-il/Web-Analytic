const fn = {
  SET_BREADCRUMB: "SET_BREADCRUMB",
  SET_LOADING: "SET_LOADING",
  SET_VERSION: "SET_VERSION"
};

const state = {
  breadcrumb_items: [],
  loading: false,
  version: "v1"
};

// getters
const getters = {
  getBreadcrumb: state => state.breadcrumb_items,
  getLoading: state => state.loading,
  getVersion: state => state.version
};

// actions
const actions = {
  SET_BREADCRUMB({ commit }, page) {
    commit(fn.SET_BREADCRUMB, breadcrumb[page]);
  },
  SET_LOADING({ commit }) {
    commit(fn.SET_LOADING, true);
  },
  FINISH_LOADING({ commit }) {
    commit(fn.SET_LOADING, false);
  },
  SET_VERSION({commit}, payload){
    commit(fn.SET_VERSION, payload)
  }
};

// mutations
const mutations = {
  [fn.SET_BREADCRUMB](state, payload) {
    state.breadcrumb_items = payload;
  },
  [fn.SET_LOADING](state, payload) {
    state.loading = payload;
  },
  [fn.SET_VERSION](state, payload) {
    state.version = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const host = window.location.host
const sub_folder = window.location.href.split(host)[1].split('/')[1];
const breadcrumb = {
  user_activity: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "User Activity",
      disabled: false,
      to: "/user_activity"
    },
    // {
    //   text: "Select companies",
    //   disabled: false,
    //   to: "#"
    // }
  ],
  hr_activity: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "HR Activity",
      disabled: false,
      to: "/hr_activity"
    },
    // {
    //   text: "Select companies",
    //   disabled: false,
    //   to: "/hr_activity"
    // }
  ],
  report: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "User Activity",
      disabled: false,
      to: "/user_activity"
    },
    {
      text: "Report",
      disabled: false,
      to: "#"
    }
  ],
  testreport: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "User Activity",
      disabled: false,
      to: "/user_activity"
    },
    {
      text: "Select Policy",
      disabled: false,
      to: "#"
    }
  ],
  access_history: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "Access History",
      disabled: true,
      to: "/access_log"
    }
  ],
  client_report: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "Client report",
      disabled: true,
      to: "/client_report"
    }
  ],
  resource_log: [
    {
      text: "Dashboard",
      disabled: false,
      to: "/"
    },
    {
      text: "Resource Log",
      disabled: true,
      to: "/resource_log"
    }
  ]
};
