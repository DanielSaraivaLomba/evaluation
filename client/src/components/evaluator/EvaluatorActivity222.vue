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
        {title: '1 - Responsável por ou participação em grupos de trabalho e comissões académicas; organização de seminários, jornadas ou ações locais; organização de visitas de estudo; lecionação de unidades extracurriculares', key: 'ans1' },
        {title: '2 - Organização de visitas de estudos', key: 'ans2'},
        {title: '3 - Lecionação de seminários, cursos de formação, e UCs extracurriculares sem remuneração nem inclusão no serviço docente', key: 'ans3'},
        {title: '4 - Responsável ou membro da comissão de organização de conferências, seminários, jornadas, exposições ou ações formativas locais (não acumula com "membro de")'},
        {title: '5 - Participação em programa de Mobilidade: Estadias docentes e de investigação (tipo Erasmus+)'},

      ],
      show: true,
      activity: {},
      activityId: '222',
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
