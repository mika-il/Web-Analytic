<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex py-0">
        <v-btn color="error" class="ml-auto" small @click="goback()">
          <v-icon left dark>
            fas fa-angle-left
          </v-icon>
          Back
        </v-btn>
        <v-btn color="success" class="ml-2" small @click="getexcel()">
          export
          <v-icon right dark>
            fas fa-file-excel
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- <div v-for="policyID in Object.keys(getReport)" :key="policyID">
      <h2>{{ policyID }}</h2>
      <v-divider class="mt-2"></v-divider> -->
    <v-tabs v-model="tab">
      <v-tab v-for="policyID in Object.keys(getReport)" :key="policyID">
        {{ policyID }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="policyID in Object.keys(getReport)" :key="policyID">
        <v-expansion-panels
          v-model="panel[policyID]"
          :readonly="readonly"
          multiple
        >
          <HrActivityDisplayReportCard
            v-for="hr_name in Object.keys(getReport[policyID])"
            :key="policyID + hr_name"
            :hr_name="hr_name"
            :expansionKey="policyID + hr_name"
            :hr_detail="getReport[policyID][hr_name]"
          ></HrActivityDisplayReportCard>
        </v-expansion-panels>
      </v-tab-item>
    </v-tabs-items>
  </div>
  <!-- </div> -->
</template>

<script>
import HrActivityDisplayReportCard from "./HrActivityDisplayReportCard";

export default {
  name: "display-report",
  components: { HrActivityDisplayReportCard },
  props: {
    getReport: Object,
    resetReport: Function
  },
  data() {
    return {
      panel: {},
      tab: null,
      readonly: false
    };
  },
  watch: {},
  methods: {
    goback() {
      this.$emit("resetReport");
    },
    getexcel() {
      this.$emit("exportexcel");
    }
  }
};
</script>

<style lang="scss" scoped></style>
