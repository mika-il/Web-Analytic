<template>
  <div>
    <div class="mb-6">
      <v-btn small color="error" @click="$emit('backBtn')">Back</v-btn>
      <v-btn small class="ml-4" color="success" @click="$emit('needExcel')"
        >Export</v-btn
      >
      <span class="body-1 ml-4 font-weight-black" v-if="policy_id.length > 0">
        Viewing policy :
        <strong>{{ policy_id.join() }}</strong>
      </span>
    </div>
    <v-row>
      <ReportDisplayBox
        v-for="person in Object.keys(analyticdata)"
        :key="person"
        :data="analyticdata[person]"
        :persondata="person"
        :isAllOverview="isAllOverview"
      ></ReportDisplayBox>
    </v-row>
  </div>
</template>

<script>
import ReportDisplayBox from "./ReportDisplayBox";

export default {
  name: "report-display",
  components: {
    ReportDisplayBox: ReportDisplayBox
  },
  props: {
    analyticdata: [Object, Array],
    policy_id: [Array, String],
    isAllOverview: Boolean
  },
  data() {
    return {};
  },
  methods: {
    personName(val) {
      let returnName = "";

      this.$store.state["Report"].HRMembers.forEach(element => {
        if (element.account_id == val) {
          returnName = `${element.display_name} - ${element.username} - ${element.email}`;
        }
      });
      return returnName;
    }
  }
};
</script>

<style lang="scss" scoped></style>
