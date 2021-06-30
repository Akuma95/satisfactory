<template>
  <div class="home">
    <h1>Satisfactory Planungstool Services</h1>
    <div class="wrapper w1">
      <h2>Firebase</h2>
      <p>
        Firebase ist eine Entwicklungs-Plattform für mobile und Webanwendung. <br>
        Diese Plattform dient als Datenbank und zum Hosten der Website. <br>
        Es handelt sich hierbei um einen Service der Google LLC.
      </p>
      <h3>Was wird in der Datenbank gespeichert?</h3>
      <p>
        In der Datenbank werden folgende Informationen gespeichert:
      </p>
      <ul>
        <li>allgemeine Angaben:</li>
        <ul>
          <li>Nodes</li>
          <li>Ressourcen</li>
        </ul>
        <li>Spielstand<sup>1</sup> bezogen:</li>
        <ul>
          <li>Namen des Spielstandes</li>
          <li>Passwort zum Spielstand</li>
          <li>belegte Nodes</li>
          <li>benötigte Ressourcen</li>
          <li>verfügbare Ressourcen</li>
          <li>Fabriken</li>
          <li>Bahnhöfe / LKW-Stationen</li>
          <li>Vekehrslinien</li>
        </ul>
      </ul>
      <br>
      <p style="text-align: start">
        1 - Spielstand bedeutet in diesem Kontext, dass du einen Frei wählbaren Namen für dein Gruppe haben kannst, über welchen alles gespeichert wird.
      </p>
    </div>
    <div class="wrapper w2">
      <h2>Localstorage</h2>
      <p>
        Local Storage stellt persistenten (haltbaren) Speicher im Browser des Benutzers zur Verfügung. <br>
        Dabei werden die User-Daten nicht mehr wie Cookies mit jedem HTTP-Request auf den Server übertragen, <br>
        sondern sie werden lediglich auf dem Browser des Benutzers gespeichert.
      </p>
      <h3>Was wird im localStorage gespeichert?</h3>
      <p>
        Wir hinterlegen den <b>Names des Spielstandes</b> und das <b>Passwort</b> im localstorage, damit du nicht bei jedem neuen Besuch den Namen eingeben musst und direkt starten kannst.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variables.scss";

.wrapper {
  background-color: $background-box;
  border-radius: 20px;
  width: 90%;
  margin: 20px auto;
  padding: 10px 20px;
}
.w1 {
  background-color: $background-box1;
}
.w2 {
  background-color: $background-box2;
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
ul {
  width: 220px;
  margin: auto;
  text-align: start;
}
</style>