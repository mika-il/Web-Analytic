<template>
  <div @click="goto('/report/' + groupId)">
    <v-alert
      :color="randomColor()"
      elevation="2"
      dense
      class="py-1"
      border="left"
      colored-border
      style="cursor:pointer;"
      @click="router.push('/report/' + groupId)"
    >
      <span class="caption">{{ companyName }}</span>
    </v-alert>
  </div>
</template>

<script>
const colorPack = ["#a8dadc", "#457b9d"];

export default {
  name: "company-list",
  props: {
    companyName: String,
    logoPath: String,
    groupId: [Number, String],
    index: Number
  },
  methods: {
    randomColor() {
      return colorPack[this.index % 2];
    },
    goto(url) {
      this.$router.push(url);
    }
  }
};
</script>
