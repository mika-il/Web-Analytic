\<template>
  <div :key="compcount">
    <v-breadcrumbs :items="getBreadcrumb" large class="pa-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="12" v-if="showPanelCondition('company')">
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text d-flex"
                >List of companies
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <HrActivityCompanyTable
              :getCompanies="getCompanies"
              :selected_company="selected_company"
              @update:selected_company="selected_company = $event"
            ></HrActivityCompanyTable>
            <v-row>
              <v-col cols="12" class="d-flex">
                <v-btn
                  color="info"
                  class=""
                  @click="submitalloverview"
                  small
                  :disabled="selected_company.length <= 0"
                >
                  All Overview
                </v-btn>

                <v-btn
                  color="success"
                  class="ml-auto"
                  @click="submitcompany"
                  small
                  :disabled="selected_company.length <= 0"
                >
                  Continue
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="showPanelCondition('policy')">
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text d-flex"
                >Policies of {{ active_company_name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <HrActivityPolicyTable
              :getPolicies="getPolicies"
              :selected_policy="selected_policy"
              @update:selected_policy="selected_policy = $event"
              id="policy-table-wrapper"
            ></HrActivityPolicyTable>
            <v-row>
              <v-col cols="12" class="d-flex">
                <v-btn
                  color="success"
                  class="ml-auto"
                  small
                  @click="submitpolicy"
                  :disabled="selected_policy.length <= 0"
                >
                  Continue
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" v-if="showPanelCondition('hr')">
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text d-flex"
                >HR of {{ active_company_name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <HrActivityHrTable
              :getHR="getHR"
              :selected_hr="selected_hr"
              @update:selected_hr="selected_hr = $event"
              id="hr-table-wrapper"
            ></HrActivityHrTable>
            <v-row>
              <v-col cols="12" class="d-flex">
                <v-btn
                  color="success"
                  class="ml-auto"
                  small
                  @click="submitexcel()"
                  :disabled="selected_hr.length <= 0"
                >
                  Export
                  <v-icon right dark>
                    fas fa-file-excel
                  </v-icon>
                </v-btn>
                <v-btn
                  color="info"
                  class="ml-2"
                  small
                  @click="submitreport()"
                  :disabled="selected_hr.length <= 0"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" v-if="Object.keys(getReport).length > 0" class="mb-10">
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text d-flex"
                >Report
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <HrActivityDisplayReport
              :getReport="getReport"
              @resetReport="resetReport"
              @exportexcel="submitexcel"
            ></HrActivityDisplayReport>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="mb-10"
        v-if="Object.keys(getReportAlloverview).length > 0"
      >
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text d-flex"
                >All overview
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <HrActivityDisplayReportAlloverview
              :getReportAlloverview="getReportAlloverview"
              :selected_company="selected_company"
              @resetReport="resetAlloverview"
              @goExport="exportAlloverview"
            ></HrActivityDisplayReportAlloverview>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  HrActivityCompanyTable,
  HrActivityPolicyTable,
  HrActivityHrTable,
  HrActivityDisplayReport,
  HrActivityDisplayReportAlloverview
} from "@/components/HrActivity/";
import { mapGetters } from "vuex";
export default {
  name: "HR-Acitivity",
  components: {
    HrActivityCompanyTable,
    HrActivityPolicyTable,
    HrActivityHrTable,
    HrActivityDisplayReport,
    HrActivityDisplayReportAlloverview
  },
  data() {
    return {
      selected_company: [],
      selected_policy: [],
      selected_hr: [],
      compcount: 0,
      active_company_name: ""
    };
  },

  methods: {
    resetReport() {
      this.compcount++;
      this.selected_company = [];
      this.selected_policy = [];
      this.selected_hr = [];
      this.$store.dispatch("Hractivity/resetReport");
      this.$store.dispatch("Hractivity/getCompany");
    },
    resetAlloverview() {
      this.compcount++;
      this.selected_company = [];
      this.selected_policy = [];
      this.selected_hr = [];
      this.$store.dispatch("Hractivity/resetReport");
      this.$store.dispatch("Hractivity/getCompany");
    },
    submitcompany() {
      let { group_id, name } = this.selected_company[0];
      this.active_company_name = name;
      this.selected_policy = [];
      this.$store.dispatch("Layout/SET_LOADING");
      this.$store.dispatch("Hractivity/getPolicy", group_id);
    },
    submitpolicy() {
      let policyIDArr = [];
      this.selected_policy.forEach(item => {
        policyIDArr.push(item.Policy_ID);
      });
      this.selected_hr = [];
      this.$store.dispatch("Layout/SET_LOADING");
      this.$store.dispatch("Hractivity/getHR", policyIDArr);
    },
    submitreport() {
      // console.log(JSON.parse(JSON.stringify(this.selected_hr)));
      let params = createParam(
        this.selected_hr,
        this.selected_policy,
        this.getPolicies
      );
      this.$store.dispatch("Layout/SET_LOADING");
      this.$store.dispatch("Hractivity/getReport", params);
    },
    async submitexcel() {
      let params = createParam(
        this.selected_hr,
        this.selected_policy,
        this.getPolicies
      );
      let resp = await this.$store.dispatch("Hractivity/getExcel", params);
      console.log(resp);
    },
    submitalloverview() {
      let { group_id } = this.selected_company[0];
      this.$store.dispatch("Layout/SET_LOADING");

      this.$store.dispatch("Hractivity/getAlloverview", group_id);
    },
    async exportAlloverview() {
      let { group_id } = this.selected_company[0];
      this.$store.dispatch("Layout/SET_LOADING");

      let resp = await this.$store.dispatch(
        "Hractivity/getAlloverviewExcel",
        group_id
      );
      if (resp === "ok") this.$store.dispatch("Layout/FINISH_LOADING");
    },
    showPanelCondition(panel) {
      switch (panel) {
        case "company":
          if (
            Object.keys(this.getReport).length > 0 ||
            Object.keys(this.getReportAlloverview).length > 0
          ) {
            return false;
          }
          return true;

        case "policy":
          if (
            this.getPolicies.length > 0 &&
            Object.keys(this.getReport).length <= 0
          ) {
            return true;
          }
          return false;
        case "hr":
          if (
            this.getHR.length > 0 &&
            Object.keys(this.getReport).length <= 0
          ) {
            return true;
          }
          return false;

        default:
          break;
      }
    }
  },
  watch: {
    getVersion(){
      // this.$store.dispatch("Hractivity/getCompany");
      this.resetReport();
      this.resetAlloverview();
    },
    getPolicies() {
      let scrollcheck = setTimeout(() => {
        if (this.$el.querySelector("#policy-table-wrapper")) {
          let el = this.$el.querySelector("#policy-table-wrapper");
          let topPos = el.getBoundingClientRect().top;
          window.scroll({ top: topPos });
          clearTimeout(scrollcheck);
        }
      }, 200);
      this.$store.dispatch("Layout/FINISH_LOADING");
    },
    getHR() {
      let scrollcheck = setTimeout(() => {
        if (this.$el.querySelector("#hr-table-wrapper")) {
          let el = this.$el.querySelector("#hr-table-wrapper");
          let topPos = el.getBoundingClientRect().bottom;
          window.scroll({ top: topPos });
          clearTimeout(scrollcheck);
        }
      }, 200);
      this.$store.dispatch("Layout/FINISH_LOADING");
    },
    getReport() {
      this.$store.dispatch("Layout/FINISH_LOADING");
    },
    getReportAlloverview() {
      this.$store.dispatch("Layout/FINISH_LOADING");
    }
  },
  computed: {
    ...mapGetters("Hractivity", [
      "getCompanies",
      "getPolicies",
      "getHR",
      "getReport",
      "getReportAlloverview"
    ]),
    ...mapGetters("Layout", ["getBreadcrumb", "getVersion"])
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("Hractivity/resetReport");

    this.$store.dispatch("Layout/SET_BREADCRUMB", "hr_activity");
    this.$store.dispatch("Hractivity/getCompany");
  }
};

function createParam(selected_hr, selected_policy, all_policy) {
  let params = {};
  let HR_name = {};
  params.account_id = [];
  params.policy_name = [];

  params.platform = "pcp";
  selected_hr.forEach(element => {
    params.account_id.push({ [element.account_id]: element.Policy_ID });
    HR_name[element.account_id] = element;
  });
  selected_policy.forEach(item => {
    params.policy_name.push({
      [item.Policy_ID]: item.Policy_Name || item.Policy_ID.toString()
    });
  });
  params.HR_name = HR_name;
  return params;
}
</script>

<style lang="scss" scoped></style>
