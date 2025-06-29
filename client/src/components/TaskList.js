// client/src/components/TaskList.js
import React, { useEffect, useState } from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/progress')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>My Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>{task.task}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
