<template>
  <div class="hello">
    <Tonal/>
    <Partitura :tune="template" :key="template" v-on:nota-atual="getNotaAtual"/>
    <h1>Nota Atual: {{notaAtual}}</h1>
    <section class="opcoes">
      <select v-model="tom">
        <option v-for="(item, key) in notas" :value="item" v-bind:key="key">{{item}}</option>
      </select>
      <select v-model="modo">
        <option v-for="(item, key) in modos" :value="item" v-bind:key="key">{{item}}</option>
      </select>
      <button v-on:click="template = tune[1]">Mudar música</button>
    </section>
  </div>
</template>

<script>
import Partitura from "./Partitura.vue";
import Tonal from "./Tonal.vue";
import { Scale, Note, transpose } from "tonal";
const Abc = require("tonal-abc-notation");
import tune from "../assets/tune.js";

const notas = ["C", "D", "E", "F", "G", "A", "B"];

export default {
  name: "Principal",
  components: {
    Partitura,
    Tonal
  },
  mounted: function() {
    this.template = this.getScaleTemplate(this.tom, this.modo);
  },
  data() {
    return {
      tune: tune,
      template: "",
      notas: notas,
      modos: Scale.names(),
      tom: "C",
      modo: "major",
      notaAtual: ""
    };
  },
  watch: {
    tom: function(newTom, oldTom) {
      this.template = this.getScaleTemplate(newTom, this.modo);
    },
    modo: function(newModo, oldModo) {
      this.template = this.getScaleTemplate(this.tom, newModo);
    }
  },
  methods: {
    getScaleTemplate(tom, modo) {
      const menorNota = tom + "4";
      let scale = Scale.notes(menorNota, modo).map(Abc.toAbc);
      scale.push(Abc.toAbc(transpose(menorNota, "8M")));
      const scaleMinima = scale.map(t => t + "2");
      return (
        this.tune[0].replace("nome", modo + " scale in " + tom) +
        this.getTemplate(scaleMinima)
      );
    },
    getTemplate(scale) {
      // TODO arrumar caso a escala tenha mais de 8 notas
      const first = scale.slice(0, 4);
      const last = scale.slice(4, 8);
      const template = ["|", first, "|", last, "|]"].flatMap(t => t).join(" ");
      return template;
    },
    getNotaAtual(abcNote) {
      console.log(abcNote.trim());
      abcNote = abcNote.trim();
      abcNote = abcNote.substring(0, abcNote.length - 1);
      // TODO regex para todos os comprimentos de nota
      // http://abcnotation.com/blog/2010/01/31/how-to-understand-abc-the-basics/
      this.notaAtual = Abc.toNote(abcNote);
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 0;
}

.opcoes {
  margin: 15px;
}

select {
  text-transform: capitalize;
}
</style>
