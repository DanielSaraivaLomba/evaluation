<template>
  <div class="footer">
    <v-footer height="auto" color="#004d30">
      <v-layout justify-center row wrap>
        <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link }}</v-btn>
         <span id="copyright"> &copy;{{year}} — <strong>IPCA</strong></span>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
    ],
    year: '',
  }),

  created () {
    this.getYear()
  },

  methods: {
  getYear() {
  var d = new Date();
  var n = d.getFullYear();
  this.year = n;
}
  }
  
}
</script>

<style>
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #993d3d;
  text-align: center;
}

#copyright{
    
    color: #ffffff; 
    font-family: 'Helvetica Neue', sans-serif; 
    font-size: 15px;
    font-weight: normal; 
    line-height: 24px; 
    margin: 0 0 24px; 
    text-align: justify; 
    text-justify: inter-word;
}
</style>
