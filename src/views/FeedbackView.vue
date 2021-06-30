<template>
  <div class="home">
    <h1>Satisfactory Planungstool Feedback</h1>
    <div id="wrapper">
    <p class="mt-3">
      Diese Seite befindet sich stätig im Aufbau. Dafür brauchen wir eure Hilfe. <br>
      Solltet ihr also Anmerkungen haben egal welcher Art, melde euch entweder mit dem Formular.
      Oder unter den unten angegebenen Seiten.
    </p>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mx-4 white--text btn-discord"
              v-bind="attrs"
              v-on="on"
              fab
              href="https://discordapp.com/users/342065206853238787"
              target="_blank"
          >
            <v-icon size="24px">
              mdi-discord
            </v-icon>
          </v-btn>
        </template>
        <span>Discord</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mx-4 white--text btn-telegram"
              v-bind="attrs"
              v-on="on"
              rounded
              href="https://t.me/Noatak95"
              target="_blank"
          >
            Telegram
          </v-btn>
        </template>
        <span>Telegram</span>
      </v-tooltip>
      <v-row class="mt-3">
        <v-col cols="12" md="6">
          <v-select
              v-model="kind"
              outlined
              @change="isDisable"
              :items="messageKind"
              :menu-props="{
                bottom: true,
                offsetY: true,
                offsetOverflow: true,
                rounded: true,
              }"
              label="Um welche Art Anliegen geht es?"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="subject"
              label="Betreff"
              outlined
              rows="3"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
              v-model="message"
              label="Deine Nachricht"
              outlined
              rows="3"
          ></v-textarea>
        </v-col>
        <v-col cols="12" v-if="error">
          <p class="errorMsg">
            Bitte geben Sie eine Nachricht und einen Betreff an.
          </p>
        </v-col>
        <v-col cols="12" v-if="success">
          <p class="successMsg">
            Die folgenden Daten wurden erfolgreich übermittelt.
          </p>
          <p><b>Datum:</b><br>{{successBody.date}}</p>
          <p><b>Art des Anliegens:</b><br>{{successBody.kind}}</p>
          <p><b>Betreff:</b><br>{{successBody.subject}}</p>
          <p><b>Nachricht:</b><br>{{successBody.message}}</p>
        </v-col>
        <v-col cols="12">
          <v-btn
              color="green darken-2"
              outlined
              rows="3"
              :disabled="disable"
              @click="sendFeedback"
          >Senden</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import {db} from "@/firebase/firebase";

export default {
  name: 'home',
  data() {
    return {
      message: "",
      subject: "",
      kind: "",
      disable: true,
      error: false,
      success: false,
      successBody: {
        subject: '',
        message: '',
        kind: '',
        date: '',
      },
      messageKind: [
        {
          text: 'Bug',
          value: 'bug'
        },
        {
          text: 'Idee',
          value: 'idee'
        },
        {
          text: 'Anmerkung',
          value: 'anmerkung'
        },
        {
          text: 'Sonstiges',
          value: 'sonstiges'
        },
      ],
    };
  },
  methods: {
    sendFeedback() {
      if (this.message !== '' && this.subject !== '') {
        let timestamp = Date.now();
        let date = new Date(timestamp);
        let humanDateShort = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
        let body = {
          subject: this.subject,
          message: this.message,
          kind: this.kind,
          date: humanDateShort,
        }
        db.collection('feedback').doc(humanDateShort+'||'+this.subject).set(body).then(() => {
          this.success = true;
          this.successBody = body;
        })
      } else {
        this.error = true;
      }
    },
    isDisable() {
      if (this.kind==='') {
        this.disable = true
      } else{
        this.disable = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variables.scss";

#wrapper {
  background-color: $background-box;
  border-radius: 20px;
  width: 90%;
  margin: 20px auto;
  padding: 10px 20px;
}
.errorMsg {
  color: $warn;
  font-weight: bold;
}
h1 {
  font-size: 1.7rem;
  color: $brand;
}
h2 {
  color: #647179;
  text-decoration: underline;
  margin-bottom: 10px;
}
</style>