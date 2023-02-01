<template>
  <div>
    <section class="content">
      <v-row v-for="item in details" :key="item.company">
        <v-col cols="9">{{
          item.company !== "zzz" ? item.company : "Other"
        }}</v-col>
        <v-col cols="3" class="text-right">{{ item.times }} time(s)</v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "DashboardSummary",
  props: {
    compData: [Object, Array]
  },
  data: () => {
    return {
      details: [{ company: "", times: 0 }]
    };
  },
  watch: {
    compData(val) {
      this.details = [];
      val.forEach(element => {
        let { company, times } = element;
        this.details.push({ company: company, times: times });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
section.content {
  // padding: 0 30px;
  padding: 0 3rem;
  max-height: 400px;
  overflow: auto;
  .col {
    padding: 6px 0px;
  }
}
</style>
