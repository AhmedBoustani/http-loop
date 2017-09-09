const text =
`
loop-request: send requests in a loop

Usage:
\tyarn send <request-method> <destination-url> <num-iterations>

Available request methods: GET POST PUT

set necessary input in the usr/ directory
`

module.exports = () => {
  console.log(text);
};
