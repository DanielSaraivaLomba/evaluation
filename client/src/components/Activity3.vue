<template>
  <div>
    <b-container>
      <b-form @submit="findOneAndUpdate" v-if="show" class="form">
        <b-form-group
          v-for="(res,index) in form" :key="index"
        ><div class="titles">{{ titles[index].title }}</div>
        <div class="bform" v-for="(r,inde) in form[index].responses" :key="inde">
          <dir class="subheader">{{index + 1 + '.' + (inde + 1) + ')'}}</dir>
          <b-form-textarea
            rows="3"
            type="text"
            v-model="r.response"
          />
          <div>
<b-form-file class="files" enctype="multipart/form-data"
      v-model="r.pdf"
      :state="Boolean(r.pdf_name)"
      :placeholder="r.pdf_name"
      drop-placeholder="Drop file here..."
      accept="application/pdf, image/*"
    ></b-form-file>
    <template v-if="r.pdf !== undefined">
        <v-btn small depressed id="uploadbutton" @click="uploadFile(inde,index)">Upload
     <template v-if="r.pdf_name !== undefined">
        <v-icon color="green" right>check_box</v-icon>
     </template>
     <template v-else>
 <v-icon color="orange lighten-2" right>indeterminate_check_box</v-icon></template>
      </v-btn>
     </template>
    
            <v-btn class="removebutton" @click="removeLine(inde, index)" small color="error">
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
          </div>
          <div class="mt-1">
        <b-button @click="addLine(index)" size="sm" variant="info">Adicionar Registo</b-button>
        </div>
        <v-divider dark="true" class="divider"></v-divider>
        </b-form-group>
      </b-form>
      <v-btn block type="submit" @click="findOneAndUpdate" color="info">
      <v-icon>save</v-icon>
      </v-btn>
      <!-- <v-btn block type="submit" @click="submitDocument" color="warning"> Submeter
      </v-btn> -->
        <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="orange"
          dark
          v-on="on"
        >
          Submeter
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Submissão
        </v-card-title>

        <v-card-text>
          <p>Este registo será submetido para avaliação</p>
          <p><strong>Não poderá editar/apagar</strong> o registo após a confirmação</p>
          <p>Deseja prosseguir?</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Nao
          </v-btn>
          <v-btn
            color="success"
            text
            @click="submitDocument(),dialog = false"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import message from '../global/messaging'
const global = require('../global/global')

export default {
  data () {
    return {
      dialog: false,
      file: '',
      form: [],
      titles: [
        {title: '1 - Prestação de serviços institucionais ao exterior (estudos, projetos ou pareceres)', key: 'ans1'},
        {title: '2 - Participação em órgãos colegiais e responsabilidade académicas.', key: 'ans2'},
        {title: '3 - Participação em órgãos de gestão administrativa', key: 'ans3'},
        {title: '4 - Outras atividades'},
      ],
      show: true,
      activity: {},
      activityId: '3',
      deleteFlag: false
    }
  },

  created () {
    this.initialize()
    this.initiate()
  },

  methods: {

    initiate () {
      for (let i = 0; i < this.titles.length; i++) {
        this.form.push({responses: []})
      }
    },

    initialize () {
      let uri = global.baseUrl + '/document/form/bydoc/' + sessionStorage.docId + '/activity/' + this.activityId
      console.log(uri)
      axios.get(uri).then((response) => {
        this.activity = response.data
        for (let i = 0; i < this.activity[0].answers.length; i++) {
          console.log(this.activity[0].answers.length)

          for (let z = 0; z < this.activity[0].answers[i].answer.responses.length; z++) {
            this.form[i].responses.push(this.activity[0].answers[i].answer.responses[z])
          }
        }

        console.log(response)
      })
    },

    findOneAndUpdate (deleteFlag) {
      var answers = []
      for (let i = 0; i < this.form.length; i++) {
        let answer = {title: this.titles[i].title, id: this.titles[i].key, responses: this.form[i].responses}
        answers.push({answer})
      }
      axios.put(global.baseUrl + '/document/form/' + this.activity[0]._id, {
        answers
      })
        .then(response => {
          console.log(response)
          if (this.deleteFlag === true) {
            this.$toasted.global.deleteForm()
            this.deleteFlag = false
          } else {
            console.log(this.activity[0].docId)
            this.$toasted.global.submitOk()
            }
        })
        .catch(error => {
          console.log(error)
          this.$toasted.global.submitFail()
        })
    },

    uploadFile (inde, index) {
      this.file = this.form[index].responses[inde].pdf
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('docID', sessionStorage.docId)
      formData.append('questionId', this.titles[index].key)
      formData.append('userId', '5c7e53d00940864c41aa6b5f')
      formData.append('index', inde)

      axios.post(global.baseUrl + '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        console.log('SUCCESS')
        this.form[index].responses[inde].pdf_name = response.data.pdf_name
        this.form[index].responses[inde].pdf = response.data.path
        this.findOneAndUpdate()
      })
        .catch(error => {
          console.log(error)
          console.log('ERROR')
          this.$toasted.global.uploadFail()
        })
    },

    addLine (x, y) {
      this.form[x].responses.push({response: '', index: this.form[x].responses.length})
    },
    removeLine (inde, index) {
      if (confirm('Pretende eliminar este registo?')) {
        this.form[index].responses.splice(inde, 1)
        this.deleteFlag = true
        this.findOneAndUpdate()
      }
    },
      submitDocument () {
      let state = this.activity[0].isCompleted
      state = true;
      axios.put(global.baseUrl + '/document/' + sessionStorage.docId, {
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
  }

}
</script>

<style>
</style>



Prestação de serviços institucionais ao exterior (estudos, projetos ou pareceres)

Participação em órgãos colegiais e responsabilidade académicas.
         <p id="pform">Participação em órgãos estatutários ou equivalentes; Director de Centro Investigação reconhecido pela FCT; Presidente do Conselho Científico de Centro de Investigação do IPCA; Diretor Departamento; Diretor Curso; Diretor TeSP; Responsável por Grupo Disciplinar (cf. Grelha RADD Anexo II)</p>

Participação em órgãos de gestão administrativa.
        <p id="pform">Participação em júris de seriação (M23, concursos especiais, recrutamento de pessoal não docente) e outros júris (aquisição de bens e serviços, recrutamento pessoal não docente); Membro de outras comissões institucionais (cf. Grelha RADD Anexo II)</p>

Outras atividades.
        <p id="pform">Organização de eventos científicos; eventos de disseminação institucional; ações de divulgação e promoção institucional, Organização de exposições artísticas (cf. Grelha RADD Anexo II)</p>
