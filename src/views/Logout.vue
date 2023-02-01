<template>
  <div>
    logout
  </div>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    this.$store.dispatch("Auth/Logout");
    this.$router.push("/login");
  }
};
</script>
