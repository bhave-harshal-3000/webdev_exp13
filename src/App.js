import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('retroTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('retroTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="retro-app">
      {/* Retro Background Elements */}
      <div className="retro-bg"></div>
      <div className="sunburst"></div>
      
      <div className="retro-container">
        {/* Header */}
     

        {/* Input Section */}
        <div className="input-section">
          <div className="bubble-input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="add a todo here..."
              className="bubble-input"
            />
            <button onClick={addTask} className="retro-button add-button">
               Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          <div className="section-title">Your Groovy Tasks</div>
          
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="flower">✿</div>
              <p>No tasks yet! Far out!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <div className="task-number">{index + 1}</div>
                  
                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    <div className="task-date">{task.createdAt}</div>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`retro-button small ${task.completed ? 'completed-btn' : 'complete-btn'}`}
                    >
                      {task.completed ? '✓ Done' : '○ Do It'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="retro-button small delete-btn"
                    >
                      ✗ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="retro-footer">
          <p>Keep it groovy! ✨ {tasks.filter(t => !t.completed).length} tasks pending</p>
        </div>
      </div>
    </div>
  );
}

export default App;