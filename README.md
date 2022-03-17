## viewmodeljs

![npm](https://img.shields.io/npm/v/viewmodeljs?logo=viewmodeljs)
![NPM](https://img.shields.io/npm/l/viewmodeljs?logo=viewmodeljs)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/viewmodeljs?logo=viewmodeljs)

<!-- ![npm](https://img.shields.io/npm/dm/viewmodeljs?logo=viewmodeljs) -->

Transform your api results to typed model objects

### Intall

```bash
npm i viewmodeljs
```

### Usage

```js
import { Model, Record } from 'viewmodeljs'

export const Transaction = Model(
  class Transaction {
    // scalar values
    id = String
    transaction_id = String
    account_id = String
    user_id = String
    category = String
    subcategory = String
    name = String
    label = String
    keywords = String
    merchant_name = String
    amount = Number
    goal_id = String
    pending = Boolean
    hidden = Number
    istransfer = Number
    isrecurring = Number

    // complex types use Record
    account = Record({
      account_id: String,
      mask: String,
      name: String,
      official_name: String,
      type: String,
      subtype: String,
    })

    // custom parsers too
    date = (s) => new Date(s.replace('Z', ''))

    // other business logic
    isIncome() {
      return this.amount < 0
    }

    isExpense() {
      return this.amount > 0
    }

    toString() {
      return this.label || this.merchant_name
    }
  }
)
```

In the example, the `Transaction` class is wrapped with `Model`, which will add mixin methods for loading and transforming.

Later on, when you want to apply this model to some data:

```js
let data = [...items]
// Convert the data to a Lazy.Sequence
let transactions = Transaction._lazy(data)
  .pluck('merchant_name')
  .filter((name) => name.startsWith('Amazon'))
  .take(5)
// Get a regular JS array
let arr = transactions.toArray()
```

Under the hood, when you load some data using the `_lazy` method, a new [Lazy.js Sequence](http://danieltao.com/lazy.js/docs/#Sequence) is created which chains together transform operations and only evaluates them when iterating, without creating intermediate representations. To learn more about Lazy.js, check out [the docs](https://danieltao.com/lazy.js/).

When the data is iterated over (or converted to JS array) every object is converted to an instance of the model class with the corresponding field types.

### TypeScript support

Sorry, no typescript support just native js types but if you are working on a typescript project you may create a `*.d.ts` file to export your typedefs for the model classes.
