const text =
`
http-loop: send requests in a loop

Usage:
  http-loop init
  http-loop [method] [url] [num-iterations]
  http-loop [--options]

set necessary input in the input/ directory

Arguments:
  init              Initializes the work directory called http-loop,
                      which contains the input files
  [method]          Request method: GET, POST, or PUT (case insensitive)
  [url]             The url to which send the request
  [iterations]      The number of times to send the request (default 1)

Options:
  --help, -h        help
  --clear-logs,     delete files in logs/ directory
    -clr
  --head            print the last log registered
`

module.exports = () => {
  console.log(text);
};
