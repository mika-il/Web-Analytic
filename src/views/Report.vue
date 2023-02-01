<template>
  <div>
    <v-breadcrumbs :items="getBreadcrumb" large class="pa-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col>
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text"
                >Report</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <report-form
              :polices="getAllPolicies"
              :HR_items="getAllHR"
              @policyChange="handlePolicyChange"
              @searchData="handleSearch"
              @exportData="handleExport"
              v-if="!show_report"
              :isDisabled="isDisabled"
              @haveHR="handleHR"
              @isCheckboxAllOverview="handleAllOverview"
              :loadAPI="loadAPI"
            ></report-form>
            <report-display
              :analyticdata="dataAfterCondition"
              v-if="show_report"
              @backBtn="handleBack"
              :policy_id="policy_id"
              @needExcel="handleExportFromDisplay"
              :isAllOverview="isAllOverview"
            ></report-display>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ReportForm, ReportDisplay } from "@/components/report/";
import { mapGetters } from "vuex";
export default {
  components: {
    "report-form": ReportForm,
    "report-display": ReportDisplay
  },
  data: () => ({
    show_report: false,
    policy_id: "",
    isDisabled: true,
    previous_payload: {},
    dataAfterCondition: {},
    isAllOverview: false,
    loadAPI: false
  }),
  computed: {
    ...mapGetters("Report", ["getAllPolicies", "getAllHR", "getReportData"]),
    ...mapGetters("Layout", ["getBreadcrumb"])
  },
  watch: {
    getReportData(val) {
      this.loadAPI = false;
      if (Object.keys(val).length > 0) {
        if (this.isAllOverview) {
          let finalData = {};
          finalData["All overview"] = {};
          Object.keys(val).forEach(person => {
            // val[person] => this is object value for each person ex. list_of_page_enter , list_of_bla bla
            Object.keys(val[person]).forEach(key => {
              let eachperson = val[person];
              if (!finalData["All overview"].hasOwnProperty(key)) {
                finalData["All overview"][key] = {};
              }
              Object.keys(eachperson[key]).forEach(page => {
                // finalData[key][page] = eachperson[key][page];
                if (
                  finalData["All overview"][key] &&
                  finalData["All overview"][key].hasOwnProperty(page)
                ) {
                  finalData["All overview"][key][page] += eachperson[key][page];
                } else {
                  finalData["All overview"][key][page] = eachperson[key][page];
                }
              });
            });
          });
          this.dataAfterCondition = finalData;
        } else {
          this.dataAfterCondition = val;
        }
        this.show_report = true;
      }
    }
  },
  created() {
    let { group_id } = this.$route.params;
    this.$store.dispatch("Report/getPolicyId", group_id);
    this.$store.dispatch("Layout/SET_BREADCRUMB", "report");
  },

  methods: {
    handleAllOverview(val) {
      // console.log(val);
      // if (val) {
      //   this.isDisabled = false;
      // }
      if (val) {
        this.$store.commit("Report/RESET_HR");
        this.policy_id = [];
      }
      this.isDisabled = !val;
      this.isAllOverview = val;
    },
    handlePolicyChange(val) {
      if (val) {
        this.$store.dispatch("Report/getHRMember", val);
      } else {
        this.$store.commit("Report/RESET_HR");
      }
    },
    handleSearch(val) {
      if (this.loadAPI) return; // return if still loading
      this.loadAPI = true;
      if (this.isAllOverview) {
        let { group_id } = this.$route.params;
        this.$store.dispatch("Report/getAllHRfromAPI", group_id);
      } else {
        this.previous_payload = val;
        let payload = createParam(val);
        this.policy_id = val.selected_policies;
        // this.isAllOverview = val.chk_all_overview;
        this.$store.dispatch("Report/getReport", payload);
      }
    },
    handleExport(val) {
      if (this.isAllOverview) {
        let { group_id } = this.$route.params;
        this.$store.dispatch("Report/getExcelAll", group_id);
      } else {
        this.previous_payload = val;
        let payload = createParam(val);
        this.policy_id = val.selected_policies;
        this.$store.dispatch("Report/getExcel", payload);
      }
    },
    handleExportFromDisplay() {
      let payload = createParam(this.previous_payload);
      this.policy_id = this.previous_payload.selected_policies;
      this.$store.dispatch("Report/getExcel", payload);
    },
    handleBack() {
      (this.show_report = false),
        (this.policy_id = ""),
        (this.isDisabled = true),
        (this.previous_payload = {}),
        (this.dataAfterCondition = {}),
        (this.isAllOverview = false),
        (this.loadAPI = false);
    },
    handleHR(val) {
      if (!this.isAllOverview) {
        this.isDisabled = !val;
      }
    }
  }
};

function createParam(val) {
  let params = {};
  let stat = [];
  let HR_name = {};
  params.account_id = [];
  params.stat = stat;

  params.platform = "pcp";
  val.selected_HR_member.forEach(element => {
    params.account_id.push({ [element.account_id]: element.policy_id });
    HR_name[element.account_id] = element;
  });
  params.HR_name = HR_name;
  return params;
}
</script>
