<template>
  <div class="content">
    <textarea id="abc-source" v-model="tune" class="hidden"></textarea>
    <div class="listener-output hidden">
      <div class="label">
        Currently Playing:
        <span class="abc-string">{{currentAbcFragment}}</span>
      </div>
      <div class="label">Parameters sent to listener callback:</div>
      <div>Progress: {{progress.progress }}</div>
      <div>Current Time: {{progress.currentTime }}</div>
      <div>Total Duration: {{progress.duration }}</div>
      <div>New Beat? {{progress.newBeat }}</div>
    </div>
    <div id="paper"></div>
    <div id="midi"></div>
    <section class="download">
		  <div id="midi-download"></div>
  	</section>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.min.css";
import "abcjs/abcjs-midi.css";
import config from "../config/config.json"
import abcjs from "abcjs/midi";

export default {
  props: {
    tune: String
  },
  mounted: function() {
    if (config.partitura.soundFount)
      abcjs.midi.setSoundFont(config.partitura.soundFount);
    
    new abcjs.Editor("abc-source", {
      canvas_id: "paper",
      generate_midi: true,
      midi_id: "midi",
      midi_download_id: "midi-download",
      abcjsParams: {
        midiListener: this.listener,
        animate: {
          listener: this.animate
        },
        oneSvgPerLine: true,
        responsive: "resize",
        generateInline: true,
        viewportHorizontal: true,
        generateDownload: false,
        downloadLabel: '<i class="fa fa-external-link-alt" aria-hidden="true"></i> Download "%T"',
        visualTranspose: 0,
        midiTranspose: 0,
        staffwidth: 500
      }
    });

  },
  name: "Partitura",
  data() {
    return {
      progress: {},
      currentAbcFragment: "(none)"
    };
  },
  methods: {
    listener(midiControl, progress) {
      // This provides a more linear view of the progress, for a progress bar or for an unrelated animation.
      this.progress = progress;
    },
    colorRange(range, color) {
      if (range && range.elements) {
        range.elements.forEach(function(set) {
          set.forEach(function(item) {
            item.setAttribute("fill", color);
          });
        });
      }
    },
    animate(lastRange, currentRange) {
      // This provides the actual visual note being played. It can be used to create the "bouncing ball" effect.
      this.colorRange(lastRange, "#000000"); // Set the old note back to black.
      this.colorRange(currentRange, "#3D9AFC"); // Set the currently sounding note to blue.
      if (currentRange)
        this.currentAbcFragment = this.tune.substring(
          currentRange.startChar,
          currentRange.endChar
        );
      else this.currentAbcFragment = "(none)";
    }
  }
};
</script>

<style>
.content {
  text-align: center;
}

#abc-source {
  width: 460px;
  height: 160px;
  padding: 6px;
}

.listener-output {
  border: 1px solid #888888;
  padding: 6px;
  border-radius: 4px;
  width: 460px;
  margin-bottom: 20px;
  margin: auto;
}

.abc-string {
  border: 1px solid #e9ef96;
  padding: 2px;
  height: 24px;
  width: 60px;
  background: #fbf4b8;
}

pre {
  border: 1px solid #888888;
  padding: 6px;
  border-radius: 4px;
  width: 460px;
}

#midi {
  width: 756px;
  margin: auto;
}

.label {
  font-weight: bold;
}

.hidden {
  display: none;
}
</style>