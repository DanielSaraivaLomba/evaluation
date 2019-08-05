import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LoginComponent from '@/components/Login'
import About from '@/components/About'
import NewDocument from '@/components/NewDocument'
import Document from '@/components/Document'
import Consultdoc from '@/components/Consultdoc'
import Axios from 'axios'
import ListDocs from '@/components/ListDocs'
import Eval from '@/components/evaluator/Eval'

Vue.use(Router)
Vue.use(Axios)

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/document/newdocument',
      name: 'NewDocument',
      component: NewDocument
    },
    {
      path: '/document',
      name: 'Document',
      component: Document
    },
    {
      path: '/document/consult',
      name: 'Consultdoc',
      component: Consultdoc
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/listdocs',
      name: 'listdocs',
      component: ListDocs,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.evaluatorID !== undefined) {
          if (to.fullPath === '/listdocs') {
            next()
          }
        } else { next('/login') }
      }
    },
    {
      path: '/listdocs/evaluation',
      name: 'eval',
      component: Eval
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})



export default router
