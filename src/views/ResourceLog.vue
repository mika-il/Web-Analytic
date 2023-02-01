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
                >Resource Log</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-autocomplete
                  v-model="company"
                  :items="getCompany"
                  label="Company"
                  item-text="name"
                  item-value="id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="policy"
                  :items="companyPolicy"
                  item-text="policy_id"
                  item-value="policy_id"
                  label="Policy"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-menu
                  v-model="menuStartDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      label="From"
                      clearable
                      prepend-icon="far fa-calendar-alt"
                      readonly
                      v-on="on"
                      @click:clear="startDate = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    :show-current="show_current_date"
                    no-title
                    scrollable
                    @input="menuStartDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="2">
                <v-menu
                  v-model="menuEndDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endDate"
                      clearable
                      label="To"
                      prepend-icon="far fa-calendar-alt"
                      readonly
                      v-on="on"
                      @click:clear="endDate = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :show-current="show_current_date"
                    :disabled="endDateDisable"
                    :min="endDateMin"
                    no-title
                    scrollable
                    @input="menuEndDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn
                  class="ma-2"
                  color="info"
                  @click="handleClick"
                  :disabled="buttonDisable || isLoading"
                  >Filter</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-text-field
        color="primary"
        loading
        disabled
        v-if="isLoading"
      ></v-text-field>
    </div>
    <div v-if="!isLoading">
      <v-row v-if="isResourceLog">
        <v-col cols="7" md="7">
          <PolicyDocumentsLog
            :items="getResourceLog.policyDocuments"
            :userViewed="getUserViewed"
            :loading="isUserViewedLoading"
            @getUsers="handleGetUsers"
          ></PolicyDocumentsLog>
        </v-col>
        <v-col cols="5" md="5">
          <PolicyDocumentUrlsLog
            :items="getResourceLog.policyUrl"
            :userViewed="getUserViewed"
            :loading="isUserViewedLoading"
            @getUsers="handleGetUsers"
            title="Policy URLs"
          ></PolicyDocumentUrlsLog
        ></v-col>
      </v-row>
      <v-row>
        <v-col
          cols="7"
          md="7"
          v-if="
            getResourceLog.policySubgroupFile &&
              getResourceLog.policySubgroupFile.length > 0
          "
        >
          <PolicySubgroupDocumentsLog
            :items="getResourceLog.policySubgroupFile"
            :userViewed="getUserViewed"
            :loading="isUserViewedLoading"
            @getUsers="handleGetUsers"
            title="Policy SubGroup Documents"
          ></PolicySubgroupDocumentsLog>
        </v-col>
        <v-col
          cols="5"
          md="5"
          v-if="
            getResourceLog.policySubgroupUrl &&
              getResourceLog.policySubgroupUrl.length > 0
          "
        >
          <PolicyDocumentUrlsLog
            :items="getResourceLog.policySubgroupUrl"
            :userViewed="getUserViewed"
            :loading="isUserViewedLoading"
            @getUsers="handleGetUsers"
            title="Policy SubGroup URLs"
          ></PolicyDocumentUrlsLog
        ></v-col>
      </v-row>
      <v-row>
        <v-col
          cols="7"
          md="7"
          v-if="
            getResourceLog.lifePolicySubGroupFile &&
              getResourceLog.lifePolicySubGroupFile.length > 0
          "
        >
          <PolicySubgroupDocumentsLog
            :items="getResourceLog.lifePolicySubGroupFile"
            :userViewed="getUserViewed"
            :loading="isUserViewedLoading"
            @getUsers="handleGetUsers"
            title="Life Policy SubGroup Documents"
          ></PolicySubgroupDocumentsLog>
        </v-col>
        <v-col
          cols="5"
          md="5"
          v-if="
            getResourceLog.lifePolicySubgroupUrl &&
              getResourceLog.lifePolicySubgroupUrl.length > 0
          "
        >
          <PolicyDocumentUrlsLog
            :items="getResourceLog.lifePolicySubgroupUrl"
            :userViewed="getUserViewed"
            :loading="isUserViewedLoading"
            @getUsers="handleGetUsers"
            title="Life Policy SubGroup URLs"
          ></PolicyDocumentUrlsLog
        ></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { compareAsc } from "date-fns";
import PolicyDocumentsLog from "../components/ResourceLog/PolicyDocumentsLog.vue";
import PolicyDocumentUrlsLog from "../components/ResourceLog/PolicyDocumentUrlsLog.vue";
import PolicySubgroupDocumentsLog from "../components/ResourceLog/PolicySubgroupDocumentsLog.vue";
import PolicySubgroupDocumentUrlsLog from "../components/ResourceLog/PolicySubgroupDocumentUrlsLog.vue";

const MEDICAL_POLICY = "MedicalPolicy";
const SEC_BENEFIT_POLICY = "SecBenefitPolicy";

export default {
  name: "resource",
  components: {
    PolicyDocumentsLog: PolicyDocumentsLog,
    PolicyDocumentUrlsLog: PolicyDocumentUrlsLog,
    PolicySubgroupDocumentsLog: PolicySubgroupDocumentsLog
  },
  data() {
    return {
      company: "",
      companyPolicy: [],
      policy: "",
      startDate: "",
      endDate: "",
      show_current_date: false,
      menuStartDate: false,
      menuEndDate: false,
      endDateDisable: true,
      endDateMin: "",
      isLoading: false,
      isUserViewedLoading: true,
      buttonDisable: true
    };
  },
  computed: {
    ...mapGetters("Layout", ["getBreadcrumb", "getVersion"]),
    ...mapGetters("Resourcelog", [
      "getCompany",
      "getPolicy",
      "getPolicyType",
      "getResourceLog",
      "getUserViewed"
    ]),
    isSecBenefit() {
      return this.getPolicyType === SEC_BENEFIT_POLICY;
    },
    isMedical() {
      return this.getPolicyType === MEDICAL_POLICY;
    },
    isResourceLog() {
      return [MEDICAL_POLICY, SEC_BENEFIT_POLICY].includes(this.getPolicyType);
    }
  },
  watch: {
    getVersion() {
      this.company = "";
      this.policy = "";
      this.startDate = "";
      this.endDate = "";
      if (this.getPolicyType) {
        this.resetPolicyType();
      }

      this.$store.dispatch("Resourcelog/getCompanyAndPolicyData");
    },
    getResourceLog(value) {
      this.isLoading =
        Object.keys(value).length > 0 && this.policy ? false : true;
    },
    getUserViewed(value) {
      this.isUserViewedLoading = false;
    },
    company(id) {
      this.companyPolicy = this.getPolicy.filter(
        item => item.company_id === id
      );

      this.buttonDisable = true;
    },
    policy() {
      this.buttonDisable = false;
    },
    startDate() {
      this.endDateDisable = this.startDate ? false : true;
      this.endDateMin = this.startDate;

      if (
        compareAsc(new Date(this.startDate), new Date(this.endDate)) === 1 &&
        this.policy
      ) {
        this.buttonDisable = false;
      } else {
        this.buttonDisable = true;
      }

      if (!this.startDate && !this.endDate && this.policy) {
        this.buttonDisable = false;
      } else {
        this.buttonDisable = true;
      }
    },
    endDate() {
      this.buttonDisable =
        this.startDate && this.endDate && this.policy ? false : true;

      if (!this.endDate && !this.startDate && this.policy) {
        this.buttonDisable = false;
      }
    }
  },
  methods: {
    ...mapMutations({
      resetPolicyType: "Resourcelog/RESET_POLICY_TYPE",
      resetResourceLog: "Resourcelog/RESET_RESOURCE_LOG"
    }),
    handleClick() {
      this.isLoading = true;
      this.$store.dispatch("Resourcelog/getResorceLogData", {
        startDate: this.startDate,
        endDate: this.endDate,
        policyId: this.policy
      });
    },
    handleGetUsers(resource) {
      this.isUserViewedLoading = true;
      this.$store.dispatch("Resourcelog/getUserViewedData", {
        policyId: resource.policyId,
        section: resource.section,
        fileName: resource.fileName,
        startDate: this.startDate,
        endDate: this.endDate
      });
    }
  },
  created() {
    this.$store.dispatch("Layout/SET_BREADCRUMB", "resource_log");
    this.$store.dispatch("Resourcelog/getCompanyAndPolicyData");

    if (this.getPolicyType) {
      this.resetPolicyType();
    }
  }
};
</script>
