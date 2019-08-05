<template>
  <div class>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense>
        <template v-if="getEvaluatorID === 'evaluatorID'">
        <template v-for="item in menuItemsEval">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text"></a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator></template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="changeRoute(item.route)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon v-on:click="changeRoute(item.route)">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title id="menu" v-on:click="changeRoute(item.route)">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        </template>
               <template v-else>
        <template v-for="item in menuItems">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text"></a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator></template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="changeRoute(item.route)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon v-on:click="changeRoute(item.route)">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title id="menu" v-on:click="changeRoute(item.route)">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        </template>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="#004d30" dark app fixed>
      <v-toolbar-title class="ml-0 pl-6">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Avaliação Docentes</span>
      </v-toolbar-title>
       <v-spacer></v-spacer>
      
              <v-menu
      transition="slide-y-transition"
      bottom
    > 
              <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
              >
                <v-icon large>account_circle</v-icon>
              </v-btn>
            </template>


            <v-list>
              <v-list-tile
                v-for="(item, i) in moreVertIcon"
                :key="i"
                @click="logout"
              >
              <v-list-tile-title id="menu" v-on:click="changeRoute(item.route)">{{ item.text }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: null,
    moreVertIcon: [
      {text: 'Logout'}
      ],
    menuItems: [
      { icon: 'home', text: 'Home', route: '/home' },
      { icon: 'create', text: 'Novo Documento', route: '/document/newdocument' },
      { icon: 'all_inbox', text: 'Consultar Registos', route: '/document/consult' },
      // { icon: 'all_inbox', text: 'Avaliador', route: '/listdocs'}
    ],
    menuItemsEval:[
      { icon: 'home', text: 'Home', route: '/home/eval' },
      { icon: 'all_inbox', text: 'Consultar Registos', route: '/listdocs' },     
    ]
  }),
  computed: {
    getEvaluatorID: function () {
        return sessionStorage.evaluatorID
    }
},
  methods: {
    changeRoute: function (routeValue) {
      this.$router.push({ path: routeValue })
    },
    logout() {
      this.$emit("authenticated", false);
      sessionStorage.clear();
      this.$router.go()
      console.log(1231)
    }
  }
}
</script>

<style>
#menu{
  font-size: 16px;
  cursor: pointer;
}

.hidden-sm-and-down{
  font-size: 24px
}
</style>
