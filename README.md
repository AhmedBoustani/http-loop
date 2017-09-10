# http-loop :construction:

Send an HTTP request in a loop

## Usage

`yarn send <request-method> <destination-url> <num-iterations>`

Available request methods: GET POST PUT

### Help
`node index.js --help` or `-h`

### Input
Insert necessary data in the `usr/` directory.

`body.json`: body of the request  
`headers.json`: headers of the request  
`params.json`: the query of the request

## TODO:
- Add tests
- switch to .json for the logs
- clear body, headers, and params
- set an rc
- write better documentation
- write better usage
- add linter and setup .editorconfig
