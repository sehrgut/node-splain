## TODO

* Do something about cycles. Probably not a huge issue, since JSON-originated
  data won't have cycles anyway.
  * https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
  
* Detect when an object is a collection, and only show the schema of one
  member.

* Detect when an array is a tuple, not a collection, and show the schema of
  each member.

* Rewrite the recursive pretty-printer, to get prettier output that `inspect`.

* Add UUID as specially-detected datatype.