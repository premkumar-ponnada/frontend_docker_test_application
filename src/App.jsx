import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks, createTask, deleteTask } from './services/api'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)   // initial load
  const [busy, setBusy] = useState(false)        // add / delete in flight
  const [error, setError] = useState(null)

  async function loadTasks() {
    setLoading(true)
    setError(null)
    try {
      setTasks(await getTasks())
    } catch (err) {
      setError(`Could not load tasks: ${err.message}. Is the backend running on port 8000?`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleAdd(title) {
    setBusy(true)
    setError(null)
    try {
      const created = await createTask(title)
      setTasks((current) => [...current, created])
    } catch (err) {
      setError(`Could not add task: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id) {
    setBusy(true)
    setError(null)
    try {
      await deleteTask(id)
      setTasks((current) => current.filter((task) => task.id !== id))
    } catch (err) {
      setError(`Could not delete task: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <p className="subtitle">React + FastAPI, tasks stored in memory</p>
      </header>

      <section className="card">
        <TaskForm onAdd={handleAdd} disabled={busy || loading} />

        {error && (
          <div className="alert" role="alert">
            <span>{error}</span>
            <button className="btn btn-ghost" onClick={loadTasks}>Retry</button>
          </div>
        )}

        {loading ? (
          <p className="loading">Loading tasks…</p>
        ) : (
          <TaskList tasks={tasks} onDelete={handleDelete} disabled={busy} />
        )}

        {!loading && (
          <footer className="count">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </footer>
        )}
      </section>
    </main>
  )
}
