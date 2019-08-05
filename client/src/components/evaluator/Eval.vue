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
                  <evaluatorActivity1></evaluatorActivity1>
                </b-card-text>
                <b-card-text>
                  <evaluatorActivity11></evaluatorActivity11>
                </b-card-text>
                <b-card-text>
                  <evaluatorActivity111></evaluatorActivity111>
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
                  <evaluatorActivity211></evaluatorActivity211>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Orientações e Projetos">
                <b-card-title class="atividade">Dimenssão Científica</b-card-title>
                <p class="subatividade">
                  Orientação e arbitragem (júri) de trabalhos e projetos de investigação
                </p>
                <b-card-text>
                  <evaluatorActivity212></evaluatorActivity212>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Actividades Pedagógicas">
                <b-card-title class="atividade">Dimenssão Pedagogica</b-card-title>
                <p class="subatividade">
                  Elaboração de manuais originais, textos de apoio ao ensino, software didático original, editados pela escola ou entidade de reconhecido prestígio
                </p>
                <b-card-text>
                  <evaluatorActivity221></evaluatorActivity221>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Actividades Acadêmicas">
                <b-card-title class="atividade">Dimenssão Pedagogica</b-card-title>
                <p class="subatividade">
                  Participação em atividades académicas
                </p>
                <b-card-text>
                  <evaluatorActivity222></evaluatorActivity222>
                </b-card-text>
              </b-tab>
              <b-tab class="atividadetab"  title="Actividades de Gestão">
                <b-card-title class="atividade">Dimensão Organizacional</b-card-title>
                <b-card-text>
                  <evaluatorActivity3></evaluatorActivity3>
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

import EvaluatorActivity1 from './EvaluatorActivity1'
import EvaluatorActivity11 from './EvaluatorActivity11'
import EvaluatorActivity111 from './EvaluatorActivity111'
import EvaluatorActivity211 from './EvaluatorActivity211'
import EvaluatorActivity212 from './EvaluatorActivity212'
import EvaluatorActivity221 from './EvaluatorActivity221'
import EvaluatorActivity222 from './EvaluatorActivity222'
import EvaluatorActivity3 from './EvaluatorActivity3'

export default {
  name: 'Document',
  components: {
    EvaluatorActivity1,
    EvaluatorActivity11,
    EvaluatorActivity111,
    EvaluatorActivity211,
    EvaluatorActivity212,
    EvaluatorActivity221,
    EvaluatorActivity222,
    EvaluatorActivity3,

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
