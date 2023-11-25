import { expect } from "chai";
import { formatFile } from "../src/utils/format-file";
describe("format-file", () => {
  it("should be able to format file", () => {
    const input = formatFile(
      "file,text,number,hex\ntest2.csv,krWfm\ntest2.csv,aweCtJgszLJWxtJngfhysmBOKqH,7407,e9ee764d1ee44a96db2221838b25ef11"
    );

    const output = [
      {
        file: "test2.csv",
        lines: [
          {
            text: "aweCtJgszLJWxtJngfhysmBOKqH",
            number: 7407,
            hex: "e9ee764d1ee44a96db2221838b25ef11",
          },
        ],
      },
    ];

    expect(input).to.eql(output);
  });
});
