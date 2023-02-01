<template>
  <div>
    <v-select
      v-model="selected_policies"
      :items="polices"
      label="Policy"
      class="select-custom"
      :item-text="custompolicytext"
      item-value="Policy_ID"
      multiple
      dense
      v-on:blur="handlePolicyChange"
      v-if="!chk_all_overview"
    ></v-select>
    <v-select
      v-model="selected_policies"
      :items="polices"
      label="All policies are selecting"
      class="select-custom"
      dense
      disabled
      v-else
    ></v-select>
    <v-select
      v-model="selected_HR_member"
      :items="HR_items"
      :item-text="customtext"
      return-object
      label="HR's name"
      class="select-custom"
      multiple
      dense
      v-if="!chk_all_overview"
    ></v-select>
    <v-select
      v-model="selected_policies"
      :items="polices"
      label="All HR are selecting"
      class="select-custom"
      dense
      disabled
      v-else
    ></v-select>
    <div class="d-flex">
      <v-btn
        color="primary"
        small
        @click="handleSearch"
        :disabled="isDisabled"
        width="100"
      >
        <v-icon v-if="loadAPI">fas fa-circle-notch fa-spin</v-icon>
        <span v-else>Search</span>
      </v-btn>
      <v-btn
        small
        class="ml-4"
        color="success"
        @click="exportExcel"
        :disabled="isDisabled"
        width="100"
        >Export</v-btn
      >
      <v-checkbox
        v-model="chk_all_overview"
        label="All Overview"
        class="mt-0 ml-6"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "report-form",
  props: {
    polices: [Object, Array],
    HR_items: [Object, Array],
    isDisabled: Boolean,
    loadAPI: Boolean
  },
  data: () => ({
    chk_list_enter: false,
    chk_list_stay: false,
    chk_list_action: false,
    chk_most_enter: false,
    chk_most_stay: false,
    chk_most_action: false,
    chk_filterdate: false,
    chk_all_overview: false,
    selected_HR_member: [],
    selected_policies: [],
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false
  }),
  watch: {
    selected_HR_member(val) {
      if (val.length > 0) {
        this.$emit("haveHR", true);
      } else {
        this.$emit("haveHR", false);
      }
    },
    chk_all_overview(val) {
      this.selected_HR_member = [];
      this.selected_policies = [];
      this.$emit("isCheckboxAllOverview", val);
    }
  },
  methods: {
    handlePolicyChange() {
      if (this.selected_policies.length > 0) {
        this.$emit("policyChange", this.selected_policies);
      }
    },
    handleSearch() {
      this.$emit("searchData", JSON.parse(JSON.stringify(this.$data)));
    },
    customtext(item) {
      return `Policy#${item.policy_id} - Display name: ${item.display_name} - Username: ${item.username} - Email: ${item.email}`;
    },
    customvalue(item) {
      return item.account_id;
    },
    custompolicytext(item) {
      return `Policy name#${
        item.Policy_Name ? item.Policy_Name : item.Policy_ID
      } - Policy ID#${item.Policy_ID}`;
    },
    custompolvalue(item) {
      return item.Policy_ID;
    },
    exportExcel() {
      this.$emit("exportData", JSON.parse(JSON.stringify(this.$data)));
    }
  },
  mounted() {
    this.$store.commit("Report/RESET_HR");
    this.$emit("haveHR", false);
  }
};
</script>

<style lang="scss" scoped>
.select-custom {
  max-width: 680px;
}
</style>
