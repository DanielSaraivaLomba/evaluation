<template>
  <div>
    <b-container>
      <b-form  v-if="show" class="form">
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



Prestação de serviços institucionais ao exterior (estudos, projetos ou pareceres)

Participação em órgãos colegiais e responsabilidade académicas.
         <p id="pform">Participação em órgãos estatutários ou equivalentes; Director de Centro Investigação reconhecido pela FCT; Presidente do Conselho Científico de Centro de Investigação do IPCA; Diretor Departamento; Diretor Curso; Diretor TeSP; Responsável por Grupo Disciplinar (cf. Grelha RADD Anexo II)</p>

Participação em órgãos de gestão administrativa.
        <p id="pform">Participação em júris de seriação (M23, concursos especiais, recrutamento de pessoal não docente) e outros júris (aquisição de bens e serviços, recrutamento pessoal não docente); Membro de outras comissões institucionais (cf. Grelha RADD Anexo II)</p>

Outras atividades.
        <p id="pform">Organização de eventos científicos; eventos de disseminação institucional; ações de divulgação e promoção institucional, Organização de exposições artísticas (cf. Grelha RADD Anexo II)</p>
