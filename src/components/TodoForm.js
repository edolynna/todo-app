import { useState } from "react"
import styles from './TodoForm.module.css'

function TodoForm({ addTodo }) {
    const [text, setText] = useState('')
    const onSubmitHandler = (event) => {
        event.preventDefault()
        addTodo(text)
        setText('')
    }

    return (
        <div className={styles.todoFormContainer}>
            <form onSubmit={onSubmitHandler}>
                <input placeholder="Enter a new To Do" value={text} autoComplete="off" onChange={(e) => setText(e.target.value)}/>
                <button type="Submit" disabled={!text}>Submit</button>
            </form>
        </div>
    )
}

export default TodoForm