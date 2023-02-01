<template>
  <div>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>PP Analytic System</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Login"
          name="username"
          prepend-icon="fas fa-user"
          type="text"
          :rules="[v => !!v || 'Username is required']"
          :error-messages="formErrors.username"
          v-model="form.username"
        />

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="fas fa-unlock-alt"
          type="password"
          :rules="[v => !!v || 'Password is required']"
          :error-messages="formErrors.password"
          v-model="form.password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="!isFormValid" @click="loginHandle"
        >Login</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      formErrors: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("Auth", ["isLoggedIn"]),
    isFormValid() {
      return (
        Object.values(this.form).filter(value => value !== "").length === 2 &&
        Object.values(this.formErrors).filter(value => value === "").length ===
          2
      );
    }
  },
  mounted() {
    if (this.$store.getters["Auth/isLoggedIn"]) {
      this.$router.push("/");
    }
  },
  watch: {
    "form.username"(val) {
      this.formErrors.username = "";
    },
    "form.password"(val) {
      this.formErrors.password = "";
      if (this.form.username && this.formErrors.username) {
        this.formErrors.username = "";
      }
    },
    isLoggedIn(val) {
      this.$store.dispatch("Layout/FINISH_LOADING");
      this.$router.push("/");
    }
  },
  methods: {
    async loginHandle() {
      this.$store.dispatch("Layout/SET_LOADING");
      let resp = await this.$store.dispatch("Auth/Login", {
        username: this.form.username,
        password: this.form.password
      });

      if (resp.data.code && resp.data.code === 401) {
        this.formErrors.username = "Invalid username or password";
        this.$store.dispatch("Layout/FINISH_LOADING");
      }
    }
  }
};
</script>
