const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part}></Part>
    )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const initial = 0
  const total = parts.reduce(
    (accumulator, current) => accumulator + current.exercises,
    initial,
  )
  //console.log(total)
  return (
    <div>
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course