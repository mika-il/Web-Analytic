<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
        :style="{
          backgroundImage: 'url(' + require('@/assets/bg1.webp') + ')'
        }"
        id="maincontainner"
      >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <router-view></router-view>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>

<style lang="scss">
#maincontainner {
  background-repeat: no-repeat;
  background-size: cover;
}
#pp-logo {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 5vh;
}
</style>
