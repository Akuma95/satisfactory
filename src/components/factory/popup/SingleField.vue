<template>
  <v-dialog
      transition="dialog-top-transition"
      max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          :color="color"
          v-bind="attrs"
          v-on="on"
          x-small
          icon
          style="margin-top: -4px"
      ><v-icon>mdi-pencil</v-icon></v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            :color="color"
            dark
        >Bearbeitung für: {{name}}</v-toolbar>
        <v-card-text>
          <br>
          <v-text-field
              v-model="newValue"
              :label="name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              :color="color"
              @click="dialog.value = false"
          >Schließen und Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
name: "SingleField",
  props: [
    'name',
    'value',
    'color'
  ],
  emits: [
    'changeValue'
  ],
  data() {
    return {
      newValue: this.value,
    };
  },
  methods: {
    save() {
      this.$emit('changeValue', this.value);
      this.dialog.value = false;
    }
  },
}
</script>

<style scoped>

</style>