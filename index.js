import Lazy from 'lazy.js'

export function Record(fields) {
  return (data) => {
    for (const [key, _types] of Object.entries(fields)) {
      const _type = fields[key]
      if (data[key] == null) fields[key] = undefined
      else fields[key] = _type(data[key])
    }
    return fields
  }
}

export function Model(Typed) {
  // x => Typed(x)
  Typed.create = function (data) {
    let _type = Record(new Typed())
    return _type(data)
  }

  // List[x] => Sequence[Typed(x)]
  Typed._lazy = (arr) => Lazy(arr).map((x) => Typed.create(x))

  return Typed
}

export const Pass = (self) => self
