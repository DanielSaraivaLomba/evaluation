<template>
  <v-content>
    <div class="table">
        <b-card-body>
          <v-toolbar id="toolbartable" flat color="#004d30">
            <v-toolbar-title id="toolbar">Avaliação</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="px">
            </v-dialog>
          </v-toolbar>
          <v-data-table striped hover :headers="headers" :items="atividade" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.year }}</td>
              <template v-if="props.item.isCompleted === true">
<td  class="text-xs-left"><v-icon color="green">check_box</v-icon></td>
</template>
<template v-else>
   <td><v-icon color="red">indeterminate_check_box</v-icon></td></template>

<v-spacer></v-spacer>
              <td class="justify-center layout px-0">
                <template v-if="props.item.isCompleted === false">
                <v-icon label class="tablebutton" color="green darken-2" @click="consultDoc(props.item)">search</v-icon>
                <v-icon label class="tablebutton" color="blue darken-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon class="tablebutton" color="red darken-2" @click="deleteItem(props.item)">delete</v-icon>
                </template>
                <template v-else>
                  <v-icon label class="tablebutton" color="green darken-2" @click="consultDoc(props.item)">search</v-icon>
                </template>
              </td>
            </template>
          </v-data-table>
        </b-card-body>
    </div>
  </v-content>
</template>
<script>

import axios from 'axios'
import message from '../global/messaging'
const global = require('../global/global')

export default {
  data () {
    return {
      headers: [
        { text: 'Ano Letivo', value: 'year' },
        { text: 'Registo submetido', value: 'isCompleted' }
      ],
      selected: null,
      atividade: [],
      editedIndex: -1,
      editedItem: {
        year: '',
        isCompleted: ''
      }

    }
  },
  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      let uri = global.baseUrl + '/document/user/' + '5c7e53d00940864c41aa6b5f'
      console.log(global.baseUrl)
      axios.get(uri).then((response) => {
        this.atividade = response.data
        console.log(response)
      })
    },

    editItem (item) {
      this.editedIndex = this.atividade.indexOf(item)
      this.editedItem = Object.assign({}, item)
      sessionStorage.setItem('docId', this.editedItem._id)
      this.$router.push('/document')
    },

    consultDoc (item) {
      this.editedIndex = this.atividade.indexOf(item)
      this.editedItem = Object.assign({}, item)
      sessionStorage.setItem('docId', this.editedItem._id)
      this.$router.push('/listdocs/evaluation')
    },

    changeState (item) {
      let index = this.atividade.indexOf(item)
      this.atividade[index].isCompleted = !this.atividade[index].isCompleted
      this.finishDocument(item)
    },

    finishDocument (item) {
      let state = item.isCompleted
      axios.put(global.baseUrl + '/document/' + item._id, {
        state
      })
        .then(response => {
          console.log(response)
          this.$toasted.global.submitOk()
        })
        .catch(error => {
          console.log(error)
          this.$toasted.global.submitFail()
        })
    },

    deleteItem (item) {
      const index = this.atividade.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (confirm('Vai eliminar este documento!Tem a certeza?')) {
        this.atividade.splice(index, 1)
        let uri = global.baseUrl + '/document/' + this.editedItem._id
        let uriForm = global.baseUrl + '/document/form/all/' + this.editedItem._id
        let uriTable1 = global.baseUrl + '/document/table1/all' + this.editedItem._id
        let uriTable2 = global.baseUrl + '/document/table2/all' + this.editedItem._id
        axios.delete(uri).then((response) => {
          axios.delete(uriForm).then((response) => {
            axios.delete(uriTable1).then((response) => {
              axios.delete(uriTable2).then((response) => {
              })
            })
          })
        })
          .then(response => {
            console.log(response)
            this.$toasted.global.submitOk()
          })
          .catch(error => {
            console.log(error)
            this.$toasted.global.submitFail()
          })
      }
    }
  }
}
</script>

<style>
.table {
  width: 100%;
  height: 100%;
}
#main {
  width: 100%;
  height: 100%;
}

#play_button {
  position: absolute;
  transition: 0.5s ease;
  left: 100%;
}

</style>
