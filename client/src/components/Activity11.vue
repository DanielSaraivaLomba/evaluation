
<template>
<div class="table">
        <b-card-body>
        <v-toolbar flat id="toolbartable">
          <v-toolbar-title id="toolbar">Avaliação Pedagógica</v-toolbar-title>
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
                        <v-text-field placeholder="LESI-D" v-model="editedItem.curso" label="Curso"></v-text-field>
                      </v-flex>                
                    <v-flex xs12 sm6 md4>
                      <v-text-field placeholder="Processamento de Linguagens" v-model="editedItem.unidadecurricular" label="Unidade Curricular"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field placeholder="Adjunto Convidado (50%)" v-model="editedItem.regime" label="Regime de Serviço"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field placeholder="6,32" v-model="editedItem.avaliacao" label="Avaliação"></v-text-field>
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
        <v-data-table dense striped hover :headers="headers" :items="atividade" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.curso }}</td>
            <td>{{ props.item.unidadecurricular }}</td>
            <td>{{ props.item.regime }}</td>
            <td>{{ props.item.avaliacao }}</td>
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
      { text: 'Curso', value: 'curso' },
      { text: 'Unidade Curricular', value: 'unidadecurricular' },
      { text: 'Regime', value: 'regime' },
      { text: 'Avaliação', value: 'avaliacao'}
    ],
    atividade: [],
    editedIndex: -1,
    editedItem: {
      curso: '',
      unidadecurricular:'',
      regime: '',
      avaliacao:''

    },
    defaultItem: {
      curso: '',
      unidadecurricular:'',
      regime: '',
      avaliacao:''
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
      let uri = 'http://localhost:8082/api/document/table3/' + sessionStorage.docId
      axios.get(uri).then((response) => {
        this.atividade = response.data
        console.log(response)
      })
    },

    updateTable () {
      axios.put('http://localhost:8082/api/document/table3/' + this.editedItem._id, {
        curso: this.editedItem.curso,
        unidadecurricular: this.editedItem.unidadecurricular,
        regime: this.editedItem.regime,
        avaliacao: this.editedItem.avaliacao
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
        'curso': this.editedItem.curso,
        'unidadecurricular': this.editedItem.unidadecurricular,
        'regime': this.editedItem.regime,
        'avaliacao': this.editedItem.avaliacao
      }
      let uri = 'http://localhost:8082/api/document/table3/'
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
      let uri = 'http://localhost:8082/api/document/table3/' + this.editedItem._id
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
