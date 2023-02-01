<template>
  <v-autocomplete
    v-model="company"
    :items="items"
    multiple
    item-text="company_name"
    item-value="group_id"
    :disabled="companyDisable && resetCompanyOptionFn"
    v-on:change="changeCompany()"
    label="Client"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="removeCompany(data.item)"
      >
        {{ data.item.company_name }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>

<script>

export default {
  name: 'report-company-multi-select',
  props: {
    items: Array,
    companyDisable: Boolean,
    resetCompanyOption: Boolean,
  },
  data() {
    return {
      company: [],
    };
  },
  computed: {
    resetCompanyOptionFn() {
      if (this._props.resetCompanyOption) {
        this.company = [];
      }
      return true;
    }
  },
  methods: {
    removeCompany(item) {
      const index = this.company.indexOf(item.group_id)
        if (index >= 0) this.company.splice(index, 1)
    },
    changeCompany() {
      this.$emit("export", {company:this.company, resetCompanyOption:false});
    }
  },
  mounted() {
    this.$emit("export", {company:this.company, resetCompanyOption:false});
  }
}
</script>