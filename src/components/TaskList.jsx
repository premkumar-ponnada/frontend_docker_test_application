import TaskItem from './TaskItem'

export default function TaskList({ tasks, onDelete, disabled }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add your first one above.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} disabled={disabled} />
      ))}
    </ul>
  )
}
