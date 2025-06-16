const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length < 4) {
  console.log('give name as argument')
  process.exit(1)
}

if (process.argv.length < 5) {
  console.log('give number as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3].toString()
const newNumber = process.argv[4].toString()

const url = 'url_here'

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber
})

person.save().then(result => {
  console.log(`added ${newName} number ${newNumber} to phonebook`)
  mongoose.connection.close()
})

// Person.find({}).then(result => {
//   result.forEach(person => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })