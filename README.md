# http-loop

Send one HTTP request multiple times or one POST/PUT request with multiples inputs using http-loop.

This is useful if you can't enter data in bulk to your API or you want to test its consistency.

## Install
```
npm install -g http-loop
```

## Usage

```
http-loop init
```
This initializes the workspace by creating the following tree:
```
http-loop/
└── input/
  ├── headers.json
  ├── body.json
  └── params.json
```
set necessary headers, body, and params in the corresponding files
```
http-loop [method] [url] [iterations]
```
This sends the requests and stores the results in a single file in `logs/` named after the current time you made the request.
```
http-loop/
├── input/
|  ├── headers.json
|  ├── body.json
|  └── params.json
└── logs
   ├── ${timestamp}.json
   ├── ${timestamp}.json
   ├── ${timestamp}.json
   ...
```
```
http-loop [--options]
```

### Arguments:
```
init              Initializes the work directory called http-loop,
                    which contains the input files
[method]          Request method: GET, POST, or PUT (case insensitive)
[url]             The url of the request
[iterations]      The number of times to send the request (default 1)
```

### Options:
```
--help, -h        help
--clear-logs,     delete files in logs/ directory
  -clr
--head            print the last log registered
```
