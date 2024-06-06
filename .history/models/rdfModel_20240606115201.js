const { QueryEngineComunica } = require("graphql-ld-comunica");
const comunicaConfig = require("graphql-ld-comunica").defaultConfig;

class RDFModel {
  constructor() {
    this.engine = new QueryEngineComunica(comunicaConfig);
  }

  async searchTracksByKeyword(keyword) {
    const queryString = `
            PREFIX ex: <http://example.org/>
            SELECT ?trackName ?singer
            WHERE {
                ?track ex:hasName ?trackName ;
                       ex:hasSinger ?singer .
                FILTER regex(?trackName, "${keyword}", "i") || regex(?singer, "${keyword}", "i")
            }
        `;

    const { data } = await this.engine.query(queryString);

    return data;
  }
}

module.exports = RDFModel;
