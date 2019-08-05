<template>
  <div>
          <b-card-body>
          <v-toolbar flat id="toolbartable">
            <v-toolbar-title id="toolbar">Serviço Docente</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <span id="anoletivo">{{anoLetivo}}</span>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="px">
              <template v-slot:activator="{ on }">
                <v-btn small id="tablebutton" v-on="on">Novo Registo</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="editedItem.unidadecurricular"
                          label="Unidade Curricular"
                          placeholder="Processamento de Linguagens"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field placeholder="LESI-D" v-model="editedItem.curso" label="Curso"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select :items="regime" v-model="editedItem.regime" label="Regime"></v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-select :items="semestre" v-model="editedItem.semestre" label="Semestre"></v-select>
                      </v-flex>
                      <v-flex >
                        <v-text-field placeholder="4" v-model="editedItem.horassemana" label="Nº horas de contacto semanais"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field placeholder="60" v-model="editedItem.horastotal" label="Nº horas de contacto totais"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="editedItem.horaslecionadas"
                          label="Nº horas de contacto"
                          placeholder="64"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="editedItem.nestudantes"
                          label="Nº estudantes inscritos"
                          placeholder="60"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
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
          <v-data-table :headers="headers" :items="atividade" class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.unidadecurricular }}</td>
              <td>{{ props.item.curso }}</td>
              <td class="text-xs-center">{{ props.item.regime }}</td>
              <td class="text-xs-center">{{ props.item.semestre }}</td>
              <td class="text-xs-center">{{ props.item.horassemana }}</td>
              <td class="text-xs-center">{{ props.item.horastotal }}</td>
              <td class="text-xs-center">{{ props.item.horaslecionadas }}</td>
              <td class="text-xs-center">{{ props.item.nestudantes }}</td>
              <td class="justify-center layout px-0">
                <v-icon small color="green darken-2"  @click="editItem(props.item)">edit</v-icon>
                <v-icon small color="red darken-2" @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template v-slot:no-data>
              <span>Sem registos</span>
            </template>
          </v-data-table>
        </p>
          </b-card-body>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Unidade Curricular',
        align: 'center',
        sortable: false,
        value: 'unidadecurricular'
      },
      { text: 'Curso', value: 'curso', label:'asdsa'},
      { text: 'Regime', value: 'regime' },
      { text: 'Semestre', value: 'semestre' },
      { text: 'HS - Semana', value: 'horassemana', align: 'right' },
      { text: 'HS - Total', value: 'horastotal', align: 'right' },
      { text: 'HS - Lecionadas', value: 'horaslecionadas', align: 'right' },
      { text: 'Nº Estudantes Inscritos', value: 'nestudantes' }

    ],
    atividade: [],
    editedIndex: -1,
    editedItem: {
      unidadecurricular: '',
      curso: '',
      regime: '',
      semestre: '',
      horassemana: '',
      horastotal: '',
      horaslecionadas: '',
      nestudantes: ''
    },
    defaultItem: {
      name: '',
      curso: '',
      regime: '',
      semestre: '',
      horasSemana: 0,
      horasTotal: 0,
      horaslecionadas: 0,
      estudantes: 0
    },
    regime: ['D','PL'],
    semestre: ['1º','2º'],
    anoLetivo: ''
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
    this.getYear()
  },

  methods: {
    initialize () {
      let uri = 'http://localhost:8082/api/document/table1/' + sessionStorage.docId
      axios.get(uri).then((response) => {
        this.atividade = response.data
        console.log(response)
      })
    },
    getYear(){
      let uri = 'http://localhost:8082/api/document/' + sessionStorage.docId
        axios.get(uri).then((response) => {
        this.anoLetivo = response.data.year
        console.log()
        })
    },
    updateTable () {
      console.log("hello")
      axios.put('http://localhost:8082/api/document/table1/' + this.editedItem._id, {
        unidadecurricular: this.editedItem.unidadecurricular,
        curso: this.editedItem.curso,
        regime: this.editedItem.regime,
        semestre: this.editedItem.semestre,
        horastotal: this.editedItem.horastotal,
        horaslecionadas: this.editedItem.horaslecionadas,
        horassemana: this.editedItem.horassemana,
        nestudantes: this.editedItem.nestudantes
      })
        .then(response => {
          Object.assign(this.atividade[this.editedIndex], this.editedItem)
          this.initialize()
          this.close()
        })
        .catch(error => {
          console.log(error)
        })
    },

    addItem () {
      let params = {
        'docId': sessionStorage.docId,
        'unidadecurricular': this.editedItem.unidadecurricular,
        'curso': this.editedItem.curso,
        'regime': this.editedItem.regime,
        'semestre': this.editedItem.semestre,
        'horastotal': this.editedItem.horastotal,
        'horaslecionadas': this.editedItem.horaslecionadas,
        'horassemana': this.editedItem.horassemana,
        'nestudantes': this.editedItem.nestudantes
      }
      let uri = 'http://localhost:8082/api/document/table1'
      axios.post(uri, params).then((response) => {
        console.log(response.data)
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
      let uri = 'http://localhost:8082/api/document/table1/' + this.editedItem._id
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
