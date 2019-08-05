import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

Vue.toasted.register('uploadOk', 'Upload', {
  theme: 'bubble',
  position: 'top-right',
  duration: 6000,
  icon: 'save',
  type: 'success',
  action: {text: 'Sucesso'}
})

Vue.toasted.register('uploadFail', 'Upload falhou!', {
  theme: 'bubble',
  position: 'top-right',
  duration: 6000,
  icon: 'save',
  type: 'error',
  action: {text: 'Tente de novo'}
})

Vue.toasted.register('submitOk', 'Salvo!', {
  theme: 'bubble',
  position: 'top-right',
  duration: 6000,
  icon: 'save',
  type: 'success',
  action: {text: 'Sucesso'}
})

Vue.toasted.register('submitFail', 'Falha a salvar o seu ficheiro!', {
  theme: 'bubble',
  position: 'top-right',
  duration: 6000,
  icon: 'save',
  type: 'error',
  action: {text: 'Tente de novo'}
})

Vue.toasted.register('deleteForm', 'Apagado!', {
  theme: 'bubble',
  position: 'top-right',
  duration: 6000,
  icon: 'delete',
  type: 'info'
})
