<template>
  <div class="table">

      <b-card-body>
        <v-toolbar flat id="toolbartable">
          <v-toolbar-title id="toolbar">Experiência no Ensino Superior</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="px">
            <template v-slot:activator="{ on }">
              <v-btn  small id="tablebutton" v-on="on">Novo Registo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field placeholder="2010/2017" v-model="editedItem.ano" label="Período"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field placeholder="Instituto Politécnico do Cávado e do Ave" v-model="editedItem.instituicao" label="Instituição"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field placeholder="Adjunto Convidado (50%)" v-model="editedItem.regime" label="Regime de Serviço"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="close">Sair</v-btn>
                  <template v-if="this.editedIndex === -1">
                  <v-btn color="blue darken-1" flat @click="addItem">Gravar</v-btn>
                  </template>
                  <template v-else>
                  <v-btn color="blue darken-1" flat @click="updateTable">Gravar</v-btn>
                  </template>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table striped hover :headers="headers" :items="atividade" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.ano }}</td>
            <td>{{ props.item.instituicao }}</td>
            <td>{{ props.item.regime }}</td>
            <td class="justify-center layout px-0">
              <v-icon small color="green darken-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small color="red darken-2" @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </template>
            <template v-slot:no-data>
              <span>Sem registos</span>
            </template>
        </v-data-table>
      </b-card-body>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Ano Letivo', value: 'ano' },
      { text: 'Instituição', value: 'instituicao' },
      { text: 'Regime', value: 'regime' }
    ],
    atividade: [],
    editedIndex: -1,
    editedItem: {
      ano: '',
      instituicao: '',
      regime: ''
    },
    defaultItem: {
      ano: '',
      instituicao: 0,
      regime: 0
    },
    deletedItem: {
      _id: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Registo' : 'Editar Registo'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      let uri = 'http://localhost:8082/api/document/table2/' + sessionStorage.docId
      axios.get(uri).then((response) => {
        this.atividade = response.data
        console.log(response)
      })
    },

    updateTable () {
      axios.put('http://localhost:8082/api/document/table2/' + this.editedItem._id, {
        ano: this.editedItem.ano,
        regime: this.editedItem.regime,
        instituicao: this.editedItem.instituicao
      })
        .then(response => {
          Object.assign(this.atividade[this.editedIndex], this.editedItem)
          console.log(response)
          this.close()
        })
        .catch(error => {
          console.log(error)
        })
    },

    addItem () {
      let params = {
        'docId': sessionStorage.docId,
        'ano': this.editedItem.ano,
        'instituicao': this.editedItem.instituicao,
        'regime': this.editedItem.regime
      }
      let uri = 'http://localhost:8082/api/document/table2/'
      axios.post(uri, params).then((response) => {
        console.log(response)
        if (response.request.status === 200) {
          if (this.editedIndex > -1) {
            Object.assign(this.atividade[this.editedIndex], this.editedItem)
          } else {
            this.atividade.push(response.data)
          }
          this.close()
        }
      })
    },
    editItem (item) {
      this.editedIndex = this.atividade.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.atividade.indexOf(item)
      this.editedItem = Object.assign({}, item)
      confirm('Are you sure you want to delete this item?') && this.atividade.splice(index, 1)
      let uri = 'http://localhost:8082/api/document/table2/' + this.editedItem._id
      axios.delete(uri).then((response) => {
        console.log(response)
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>
.table {
  width: 100%;
  height: 100%;
}
</style>
