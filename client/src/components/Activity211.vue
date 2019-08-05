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
        <b-button @click="addLine(index)" class="addbutton" size="sm" >Adicionar Registo</b-button>
        </div>
        <v-divider dark="true" class="divider"></v-divider>
        </b-form-group>
      </b-form>
      <v-btn block type="submit" @click="findOneAndUpdate" color="info">
      <v-icon>save</v-icon>
      </v-btn>
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
      file: '',
      form: [
      ],
      titles: [
        {title: '1 - Publicação de artigo completo em atas de congresso de investigação, com comissão científica, indexada extended-ISI ou equivalente', key: 'ans1' },
        {title: '2 - Apresentação de comunicação por poster em participação em congresso de investigação (sem apresentação oral)', key: 'ans2'},
        {title: '3 - Coautoria de comunicação oral ou poster em congresso de investigação com comissão científica (não cumulativo com autoria)', key: 'ans3'},
        {title: '4 - Publicação de artigo completo em atas de congresso de investigação, com comissão científica, indexada extended-ISI ou equivalente'},
        {title: '5 - Publicação de artigo completo em atas de congresso de investigação, com comissão científica, não indexada'},
        {title: '6 - Publicação de artigos em revista de circulação, nacional ou internacional, sem peer review'},
        {title: '7 - Publicação de artigos em revista científica, com peer review, indexada (não ISI)'},
        {title: '8 - Publicação de artigos em revista científica indexada (ISI ou equivalente)'},
        {title: '9 - Publicação de capítulos em livros de cariz científico de circulação nacional'},
        {title: '10 - Publicação de capítulos em livros de cariz científico de circulação internacional'},
        {title: '11 - Autor ou coautor de obra completa de cariz científico (exclui-se a publicação direta de teses)'},
        {title: '12 - Editor ou coeditor de obra multi-autor (excluindo a compilação de artigos já publicados)'},
        {title: '13 - Editor ou coeditor de atas de conferências nacionais ou internacionais'},
        {title: '14 - Membro de comissões científicas de conferências com publicação de atas'},
        {title: '15 - Ad-hoc reviewer em revista de cariz científico'},
        {title: '16 - Editor ou coeditor principal de revista científica indexada com peer review (ISI ou equivalente)'},
        {title: '17 - Editor ou coeditor principal de revista científica indexada com peer review (não ISI)'},
      ],
      show: true,
      activity: {},
      activityId: '211',
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
          } else { this.$toasted.global.submitOk() }
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
    getInde(inde, index){
     return inde;
    }
  }
}
</script>

<style>
</style>
