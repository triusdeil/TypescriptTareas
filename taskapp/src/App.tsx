import React, { useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    console.log(tasks);
    setNewTask("");
  };

  const addTask = (name: string):void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i:number):void =>{
    const newTasks : ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks)
  }

  const removeTask = (i:number):void =>{
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i,1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className={"form-control"}
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus
                />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success mt-2">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.name}
                </h2>
                <div>
                  <button className='btn btn-secondary' onClick={() => toggleDoneTask(i)}>
                    {t.done ? '✅' : '❌'}
                  </button>

                  <button className='btn btn-danger' style={{marginLeft:'10px'}} onClick={()=>removeTask(i)}>
                  🗑
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
