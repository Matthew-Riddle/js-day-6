import fs from 'fs'

const promise = new Promise((resolve, reject) => {
  if (resolve) {
    resolve('This promise has a resolution')
  } else {
    reject(Error('Promise rejected'))
  }
})

promise.then(val => console.log(val), err => console.log(err))

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const pa = wait(3000)
const pb = wait(5000)

const pc = pb
  .then(() => {
    console.log('Waited 5 seconds')
    return 42
  })
  .catch(err => {
    console.log(err)
  })

const pd = pa.then(() => {
  console.log('Waited 3 seconds')
  return 'nein'
})

pc
  .then(val => {
    console.log(val)
    return 80
  })
  .then(val => console.log(val)) // 42 80

pd.then(val => console.log(val)) // 'nein'

Promise.all([pa, pb]).then(() => console.log('Waited 5 seconds as well'))

Promise.all([pc, pd, pc, pc, pc, pd, pd, pd]).then(result =>
  console.log(result)
)

Promise.race([pc, pd]).then(val => console.log(val)) // 'nein'

const writeFile = (fileName, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(
      `${fileName}.json`,
      JSON.stringify(data),
      err => (err ? reject(Error(err)) : resolve('File saved successfully'))
    )
  )

writeFile('test', { greeting: 'Hello', id: 1 }).then(
  val => console.log(val),
  err => console.log(err)
)

const readFile = fileName =>
  new Promise((resolve, reject) =>
    fs.readFile(
      fileName,
      (err, data) =>
        (err
          ? reject(Error(err))
          : resolve(['Hey it worked', JSON.parse(data)]))
    )
  )

readFile('test.json')
  .then(([val1, val2]) => console.log(val1, val2))
  .catch(err => console.log(err))
