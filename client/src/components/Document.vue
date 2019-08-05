<template>
  <v-content>
    <v-container fluid>
      <v-layout>
        <div class="main">
          <h2>Relatório de atividade do pessoal docente do IPCA</h2>
          <b-card no-body>
            
            <b-tabs pills card >
              <b-tab class="atividadetab" title="Serviço Docente">
                <b-card-text>
                  <activity1></activity1>
                </b-card-text>
                <b-card-text>
                  <activity11></activity11>
                </b-card-text>
                <b-card-text>
                  <activity111></activity111>
                </b-card-text>

                <b-card-footer>Serviço Docente / Avaliação Pedagógica / Experiência no Ensino Superior</b-card-footer>
              </b-tab>

              <b-tab class="atividadetab"  title="Publicações">
                <b-card-title class="atividade">
                  Dimensão Científica
                </b-card-title>
                <p class="subatividade">
                  Resultados da atividade de investigação (seguir obrigatoriamente as normas APA - American Psychology Association)
                </p>
                <b-card-text>
                  <activity211></activity211>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Orientações e Projetos">
                <b-card-title class="atividade">Dimenssão Científica</b-card-title>
                <p class="subatividade">
                  Orientação e arbitragem (júri) de trabalhos e projetos de investigação
                </p>
                <b-card-text>
                  <activity212></activity212>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Actividades Pedagógicas">
                <b-card-title class="atividade">Dimenssão Pedagogica</b-card-title>
                <p class="subatividade">
                  Elaboração de manuais originais, textos de apoio ao ensino, software didático original, editados pela escola ou entidade de reconhecido prestígio
                </p>
                <b-card-text>
                  <activity221></activity221>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Actividades Acadêmicas">
                <b-card-title class="atividade">Dimenssão Pedagogica</b-card-title>
                <p class="subatividade">
                  Participação em atividades académicas
                </p>
                <b-card-text>
                  <activity222></activity222>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Actividades de Gestão">
                <b-card-title class="atividade">Dimensão Organizacional</b-card-title>
                <b-card-text>
                  <activity3></activity3>
                </b-card-text>
              </b-tab>

            </b-tabs>
          </b-card>
        </div>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import Activity1 from './Activity1'
import Activity11 from './Activity11'
import Activity111 from './Activity111'
import Activity211 from './Activity211'
import Activity212 from './Activity212'
import Activity221 from './Activity221'
import Activity222 from './Activity222'
import Activity3 from './Activity3'

export default {
  name: 'Document',
  components: {
    Activity1,
    Activity11,
    Activity111,
    Activity211,
    Activity212,
    Activity221,
    Activity222,
    Activity3
  },
}

</script>

<style>
.main {
  width: 100%;
  height: 100%;
  grid-area: content;
  margin-bottom: 60px;
}
</style>
