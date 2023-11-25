# FILEMANAGER - API

## How to run the project

- Install dependencies `yarn install`
- Run the project `yarn dev`

### Docker support
- Build the image with

  `docker build . -t filemanager-api`

- And then run project

  `docker run --name filemanager-api -p8000:8000 -d filemanager-api`

- To stop project

  `docker stop filemanager-api`

- To run the container created above

  `docker start filemanager-api`

## How to run tests?

- To run tests:

  `yarn test` or `npm run test`

## Endpoints

Endpoints available in this project
### GET /api/v1/files/data
Returns all files properly formatted

#### (query params):
- fileName (optional): Name of the file to search for.

Response format:
```json
[
    {
        "file": "test2.csv",
        "lines": [
            {
                "text": "GXcHLTqvTLUVUVHDtZMCcpelcp",
                "number": 79619450,
                "hex": "6f129b44b5d7e2edb44779a252491e94"
            }
        ]
    },
    {
        "file": "test3.csv",
        "lines": [
            {
                "text": "axsEAKlUQfNUWMbJJ",
                "number": 84949,
                "hex": "5a920fb1f013b0ae8282b33c99da3153"
            },
            {
                "text": "dMwczGdxPPjSxBALXdCT",
                "number": 66765742,
                "hex": "3de2128b7d1e19189c567c3fa1bfe9d9"
            },
            {
                "text": "zBjFGZjCfVwyczyvjtmvHwDsHKs",
                "number": 6627960,
                "hex": "89d1bb244c489dfba76f03288198ed20"
            }
        ]
    },
```
