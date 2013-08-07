node-splain
===========

creates human-readable type diagrams of deep objects, specifically to simplify
reverse-engineering webservice APIs

## API Reference

### describe(object [, options])
Returns an object representing the internal format of the object. Valid options
are `detect_url` and `detect_int`, which will allow heuristic detection of
url strings as the 'url' type, and integral numbers as the 'integer' type.

### explain(object [, options])
Returns a string representation of the object format provided by
`util.inspect`ing the output of `describe(object)`.