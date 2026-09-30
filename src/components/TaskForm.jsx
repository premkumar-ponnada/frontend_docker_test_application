import { useState } from 'react'

export default function TaskForm({ onAdd, disabled }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={title}
        placeholder="What needs to be done?"
        onChange={(event) => setTitle(event.target.value)}
        disabled={disabled}
        maxLength={200}
        aria-label="Task title"
      />
      <button className="btn btn-primary" type="submit" disabled={disabled || !title.trim()}>
        Add Task
      </button>
    </form>
  )
}
