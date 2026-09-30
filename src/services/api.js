// Every call to the FastAPI backend lives here, so components never
// hard-code a URL. Swapping the backend address is a one-line change.

// import.meta.env.VITE_API_URL is baked in at BUILD time by Vite.
// Locally it is undefined, so we fall back to the dev backend address.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function handle(response) {
  if (!response.ok) {
    let detail = `Request failed (${response.status})`
    try {
      const body = await response.json()
      if (body?.detail) {
        detail = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail)
      }
    } catch {
      // response had no JSON body; keep the generic message
    }
    throw new Error(detail)
  }
  // 204 No Content has an empty body.
  if (response.status === 204) return null
  return response.json()
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`)
  return handle(response)
}

export async function createTask(title) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
  return handle(response)
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
  return handle(response)
}

export { API_URL }
