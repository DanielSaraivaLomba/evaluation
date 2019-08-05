<template>
<v-content>
  
 <b-card-body>
          <v-toolbar flat id="toolbartable">
            <v-toolbar-title id="toolbar">Registos</v-toolbar-title>
          </v-toolbar>
    <b-container>
    <v-card>
    <v-card-title>
      
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search_name"
        label="Nome"
        single-line
        hide-details
      ></v-text-field>

      <v-icon class="search_icon"  @click="getUser(search_name)" color="green">search</v-icon>


    </v-card-title>
    <v-data-table
    id="toolbartable" flat color="#004d30"
      :headers="headers"
      :items="users"
    >
      <template v-slot:items="props">
        <td class>{{ props.item.userName }}</td>
        <td class>{{ props.item.year }}</td>
        <template v-if="props.item.isCompleted === true">
<td><v-icon color="green">check_box</v-icon></td>
</template>
<template v-else>
   <td><v-icon color="red">indeterminate_check_box</v-icon></td></template>
        <td class="justify-center layout px-0">

              <v-icon class="mr-4" color="blue darken-2" @click="consultDocument(props.item._id)">chat</v-icon>
        </td>
      </template>
    </v-data-table>
  </v-card>
    </b-container>
  </div>
  </b-card-body>
</v-content>
</template>

<script>
import axios from 'axios'
import message from '../global/messaging'
const global = require('../global/global')

export default {
  data () {
    return {
      search_name: '',
      headers: [
        { text: 'Nome', align: 'left', value: 'nome' },
        { text: 'Ano', value: 'ano' },
        { text: 'Registo Completo', value: 'completed' }
      ],
      users: []
    }
  },

    created () {
     this.getFirst10Docs()
  },

  methods: {

    getFirst10Docs(){
      let uri = global.baseUrl + '/document/'
      console.log(uri)
      axios.get(uri).then((response) => {
        this.users = response.data
        console.log(this.users)
      })
    },

    getUser () {
      let uri = global.baseUrl + '/document/name/' + this.search_name
      console.log(uri)
      axios.get(uri).then((response) => {
        this.users = response.data
        console.log(this.users)
      })
    },
    consultDocument (id) {
      this.$emit('docId', id)
      sessionStorage.setItem('evalDocId', id)
      this.$router.push('/listdocs/evaluation')
    }
  }
}

</script>

<style>

</style>
