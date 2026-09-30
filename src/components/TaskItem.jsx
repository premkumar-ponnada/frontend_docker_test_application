export default function TaskItem({ task, onDelete, disabled }) {
  return (
    <li className="task-item">
      <span className="task-title">{task.title}</span>
      <button
        className="btn btn-danger"
        onClick={() => onDelete(task.id)}
        disabled={disabled}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  )
}
