<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card class="mx-auto" max-width="350">
        <v-card-title class="text-h5">
          Session Expired
        </v-card-title>
        <v-card-text>
          Your session has expired due to your inactivity. Please login again.
        </v-card-text>
        <v-card-actions class="justify-center pb-5">
          <v-btn depressed color="primary" small @click="handleClick">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      loginRoute: ["login", "YS-Login"]
    };
  },
  watch: {
    "$store.state.idleVue": {
      deep: true,
      handler(newVal) {
        if (this.loginRoute.indexOf(this.$route.name) !== -1) {
          return;
        }

        if (newVal.isIdle && this.dialog === false) {
          this.dialog = true;
          this.$store.dispatch("Auth/Logout");
        }
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push("/logout");
    }
  }
};
</script>
