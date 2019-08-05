<template>
  <div>
    <b-container>
      <b-form v-if="show" class="form">
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
<template v-if="r.pdf === undefined">
  <p>
  </p>
  </template>
  <template v-else>
          <div id="download">
            <v-icon large @click="downloadFile(inde,index)" color="blue" >cloud_download</v-icon>
            <div id="pdfname">{{r.pdf_name}}</div>
   </div></template>

          </div>
          </div>
        <v-divider class="divider"></v-divider>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import message from '../../global/messaging'
const global = require('../../global/global')

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

    downloadFile (inde, index) {
      axios({
        url: global.baseUrl + '/download',
        method: 'GET',
        responseType: 'blob',
        params: {path: this.form[index].responses[inde].pdf}
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.form[index].responses[inde].pdf_name) // or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },


  }
}
</script>

<style>
</style>
