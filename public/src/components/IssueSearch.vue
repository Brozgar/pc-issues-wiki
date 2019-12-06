<template>
  <div class="search-container pt-5">
    <autocomplete
                  :search="search"
                  @submit="showSolutions"
                  placeholder="Please describe your issue:"
                  aria-label="Please describe your issue:"
                  class=""
    />
    <b-card
      v-for="solutionByCategory of solutionsByCategory" v-bind:key="solutionByCategory.issueType"
      class="mt-3"
      :title="solutionByCategory.issueType | capitalize"
    >
      <b-card-text>
        <b-list-group>
          <b-list-group-item
            v-for="solution of solutionByCategory.solutions"
            v-bind:key="solution"
            class="d-flex"
          >
            <font-awesome-icon icon="minus" class="align-self-center small mr-3"/>
            <div>{{solution}}</div>
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'IssueDetector',
  components: {
    Autocomplete,
  },
  data() {
    return {
      wiki: {},
      solutionsByCategory: [],
      issueTypes: ['hardware', 'internet', 'windows'],
    };
  },
  created() {
    axios.get('http://localhost:3000/wiki').then((response) => {
      // const { hardware, internet, windows } = response.data;
      // this.wiki = { hardware, internet, windows };
      this.issueTypes.forEach((issueType) => {
        if (response.data[issueType]) {
          this.wiki[issueType] = response.data[issueType] || [];
        }
      });
    });
  },
  methods: {
    search(input) {
      if (_.isEmpty(input) || _.isEmpty(this.wiki) || !input.replace(/[^\w\s!?]/g, '').trim()) {
        this.solutionsByCategory = [];
        return [];
      }

      const inputRegex = new RegExp(input.replace(/[^\w\s!?]/g, '').trim(), 'i');
      let symptoms = [];

      Object.keys(this.wiki).forEach((issueType) => {
        symptoms = symptoms.concat(this.wiki[issueType].map(issue => issue.symptom));
      });

      symptoms = symptoms.filter(symptom => inputRegex.test(symptom.replace(/[^\w\s!?]/g, '')));

      // remove duplicates when we have same solution under multiple issue types
      return [...new Set(symptoms)];
    },

    showSolutions(input) {
      this.solutionsByCategory = [];
      this.issueTypes.forEach((issueType) => {
        this.wiki[issueType].forEach((issue) => {
          if (issue.symptom === input) {
            this.solutionsByCategory.push({
              issueType,
              solutions: issue.solutions,
            });
          }
        });
      });
    },
  },
};
</script>

<style scoped>
  .search-container {
    max-width: 80%;
    margin: 0 auto;
  }
</style>
