<template>
  <v-card style="cursor:pointer" :to="'/report/' + groupId" :ripple="false">
    <v-card-title class="white--text" :style="randomColor()">
      {{ companyName }}
    </v-card-title>
  </v-card>
</template>

<script>
// const colorPack = ["#ED5314", "#FFB92A"];
const colorPack = ["#a8dadc", "#457b9d"];

export default {
  name: "company-card",
  props: {
    companyName: String,
    logoPath: String,
    groupId: [Number, String],
    index: Number
  },
  methods: {
    randomColor() {
      return { backgroundColor: colorPack[this.index % 2] };
    }
  }
};
</script>
