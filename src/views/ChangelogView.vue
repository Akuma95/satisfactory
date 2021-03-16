<template>
  <div class="home">
    <h1>Satisfactory Planungstool Changelog</h1>
    <div class="wrapper">
      <h2>Wieso Changelogs?</h2>
      <p>
        Ich möchte das Ihr direkt sehen könnt was sich ändert. So könnt ihr die Entwicklung nachvollziehen.
      </p>
    </div>
    <v-row>
      <v-col cols="12" md="3">
        <v-col cols="12" md="3"></v-col>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="12" md="4">
        <v-col cols="12" md="3"></v-col>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="12" md="3">
        <v-col cols="12" md="3"></v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
}
</script>

<style scoped>
.wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  width: 90%;
  margin: 20px auto;
  padding: 10px 20px;
}
h1 {
  font-size: 1.7rem;
  color: #F2C800;
}
h2 {
  color: #647179;
  text-decoration: underline;
  margin-bottom: 10px;
}
</style>