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
        {title: '1 - Orientação ou Coorientação de Dissertação de Mestrado (concluída)', key: 'ans1' },
        {title: '2 - Orientação ou Coorientação de Tese de Doutoramento (concluída)', key: 'ans2'},
        {title: '3 - Arguente de Dissertação de Mestrado ou júri de Especialista', key: 'ans3'},
        {title: '4 - Arguente de Tese de Doutoramento'},
        {title: '5 - Orientação de estágios ou projetos finais de curso, não incluídos na distribuição de serviço docente (concluídos)'},
        {title: '6 - Júris de avaliação, com acompanhamento permanente, não incluídos na distribuição de serviço docente'},
        {title: '7 - Júri de Outras Provas Académicas Públicas de concursos de pessoal docente politécnico ou universitário'},
        {title: '8 - Responsável de projeto de investigação com financiamento através de concurso público'},
        {title: '9 - Membro da equipa de projeto de investigação com financiamento através de concurso público'},
        {title: '10 - Responsável de projeto de investigação com financiamento externo direto'},
        {title: '11 - Membro da equipa de projeto de investigação com financiamento externo direto'},
        {title: '12 - Prémio ou Distinção Nacional ou Internacional por entidade de reconhecido prestígio'},
        {title: '13 - Participante como autor em exposições individuais ou autor de obra original de reconhecido mérito'},
        {title: '14 - Participante como autor em exposições coletivas'},
        {title: '15 - Patentes registadas'}

      ],
      show: true,
      activity: {},
      activityId: '212',
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
