<template>
  <div>
    <b-container>
      <h2>Vai iniciar o preenchimento das atividades desenvolvidas</h2>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
const global = require('../global/global')
import message from '../global/messaging'

export default {
  data() {
    return {
      form: {

      },
      show: true,
      atividade: [],
      editedIndex: -1,
      editedItem: {
        ano: '',
        instituicao: '',
        regime: ''
      },
      defaultItem: {
        ano: '2018',
        instituicao: 0,
        regime: 0
      },
      deletedItem: {
        _id: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.initialize()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.response1 = ''
      this.form.response2 = ''
      this.form.response3 = ''
      this.form.response4 = ''
      this.form.name = ''
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    initialize() {
      let uri = 'http://localhost:8082/api/document/form/' + sessionStorage.docId;
      axios.get(uri).then((response) => {
        this.atividade = response.data;
        console.log(response)
      });
    },

    updateTable() {
      axios.put('http://localhost:8082/api/document/table2/' + this.editedItem._id, {
        ano: this.editedItem.ano,
        regime: this.editedItem.regime,
        instituicao: this.editedItem.instituicao
      })
        .then(response => {
          Object.assign(this.atividade[this.editedIndex], this.editedItem)
          console.log(response);
          this.close()
        })
        .catch(error => {
          console.log(err);
        });
    },

    addItem() {

      let params = {
        'docId': sessionStorage.docId,
        'ano': this.editedItem.ano,
        'instituicao': this.editedItem.instituicao,
        'regime': this.editedItem.regime
      }
      let uri = 'http://localhost:8082/api/document/table2/';
      axios.post(uri, params).then((response) => {
        console.log(response)
        if (response.request.status === 200) {
          if (this.editedIndex > -1) {
            Object.assign(this.atividade[this.editedIndex], this.editedItem)
          } else {
            this.atividade.push(this.editedItem)
          }
          this.close()
        }
      })
    },
    editItem(item) {
      this.editedIndex = this.atividade.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.atividade.indexOf(item);
      this.editedItem = Object.assign({}, item)
      confirm('Are you sure you want to delete this item?') && this.atividade.splice(index, 1);
      let uri = 'http://localhost:8082/api/document/table2/' + this.editedItem._id
      axios.delete(uri).then((response) => {
        console.log(response)
      })
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
  }
}
</script>

<style>
</style>
