import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../src";
import { API } from "../src/api/files";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

chai.use(chaiHttp);

const mock = new MockAdapter(axios);

describe("SERVER - API", () => {
  describe("GET /api/v1/files/data", () => {
    it("should be able to get list of files", () => {
      mock.onGet(`${API}/v1/secret/files`).reply(200, {
        files: ["test2.csv"],
      });

      mock
        .onGet(`${API}/v1/secret/file/test2.csv`)
        .reply(
          200,
          "test2.csv,HF,77\ntest2.csv,uzUVbPfNKGawHWZHeqiO,777459,1ec4c6a048194c9b72fad4b0273f2533"
        );

      chai
        .request(server.app)
        .get("/api/v1/files/data")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql([
            {
              file: "test2.csv",
              lines: [
                {
                  text: "uzUVbPfNKGawHWZHeqiO",
                  number: 777459,
                  hex: "1ec4c6a048194c9b72fad4b0273f2533",
                },
              ],
            },
          ]);
        });
    });

    it("should be able to get file from query", () => {
      const fileName = "test2.csv";

      mock
        .onGet(`${API}/v1/secret/file/${fileName}`)
        .reply(
          200,
          `${fileName},HF,77\n${fileName},uzUVbPfNKGawHWZHeqiO,777459,1ec4c6a048194c9b72fad4b0273f2533\n${fileName},angel,888,4f9e5d1c3a7b2eca8fb3456789012345`
        );

      chai
        .request(server.app)
        .get("/api/v1/files/data")
        .query({ fileName: fileName })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql([
            {
              file: "test2.csv",
              lines: [
                {
                  text: "uzUVbPfNKGawHWZHeqiO",
                  number: 777459,
                  hex: "1ec4c6a048194c9b72fad4b0273f2533",
                },
                {
                  text: "angel",
                  number: 888,
                  hex: "4f9e5d1c3a7b2eca8fb3456789012345",
                },
              ],
            },
          ]);
        });
    });

    it("should be able to return empty array if there is no data", () => {
      mock.onGet(`${API}/v1/secret/files`).reply(200, {
        files: [],
      });
      chai
        .request(server.app)
        .get("/api/v1/files/data")
        .end((err, res) => {
          expect(res.body).to.be.eql([]);
        });
    });
  });
});
