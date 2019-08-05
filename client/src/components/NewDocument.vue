<template>
  <v-content>
    <div>
      <h2>Iniciar Novo Registo</h2>
    </div>
    <!-- <div>
      <b-table striped hover :items="atividade" :fields="fields"></b-table>
    </div>-->
    <v-container fluid>
      <h2>Escolha o ano</h2>
      <v-layout>
        <b-form-select :state="Boolean(selected)" v-model="selected" :options="options"></b-form-select>
      </v-layout>
      <p></p>
      <template v-if="selected === null">  
        </template>
          <template v-else>
      <b-button class="play_button" size="lg" variant="success" @click="addItem">Iniciar</b-button>
      </template>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'
const global = require('../global/global')
import message from '../global/messaging'

export default {
  data () {
    return {
      fields: ['year', 'isCompleted'],
      selected: null,
      options: [
        { value: '2018/2019', text: '2018/2019' },
        { value: '2019/2020', text: '2019/2020' },
        { value: '2020/2021', text: '2020/2021' },
      ]
    }
  },
  computed: {

  },
  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      let uri = global.baseUrl + '/document/user/' + '5c7e53d00940864c41aa6b5f'
      axios.get(uri).then((response) => {
        this.atividade = response.data
        console.log(response)
      })
    },

    getYear() {
  var d = new Date();
  var n = d.getFullYear();
  this.year = n;
},

    addItem () {
      let params = {
        'userId': '5c7e53d00940864c41aa6b5f',
        'userName': 'Joao Carlos Peixoto',
        'year': this.selected
      }
      let uri = global.baseUrl + '/document'
      axios.post(uri, params).then((response) => {
        console.log(response)
        if (response.request.status === 200) {
          sessionStorage.setItem('docId', response.data._id)
          this.addForm('211')
          this.addForm('2112')
          this.addForm('212')
          this.addForm('221')
          this.addForm('222')
          this.addForm('3')
          this.$router.push('/document')
        }
      })
    },
    deleteItem (id) {
      let uri = 'http://localhost:4000/items/delete/' + id
      this.items.splice(id, 1)
      this.axios.get(uri)
    },

    addForm (activity) {
      let params = {
        'docId': sessionStorage.docId,
        'activity': activity
      }
      let uri = global.baseUrl + '/document/form/'
      axios.post(uri, params).then((response) => {
      })
    }
  }
}
</script>

<style>
.main {
  width: 100%;
  height: 100%;
}

.play_button {
  
    width:100px; 
    margin: -20px -50px; 
    position:relative;
    top:50%; 
    left:50%;
}
</style>
