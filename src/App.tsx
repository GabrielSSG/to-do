// Nesse desafio, você vai desenvolver uma aplicação de controle de tarefas no estilo **to-do list**, que contém as seguintes funcionalidades:
// - Adicionar uma nova tarefa
// - Marcar e desmarcar uma tarefa como concluída
// - Remover uma tarefa da listagem
// - Mostrar o progresso de conclusão das tarefas

import { useState } from "react";
import { Task } from "./@types/task"
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import style from './App.module.css';
import './global.css';
import classNames from "classnames";

function App() {
    const [activeTab, setActiveTab] = useState(1);
    const [tasks, setTasks] = useState<Task[]>([]);

    /* Alterna entre as abas de todas as tarefas e tarefas concuidas */ 
    const changeActiveTab = (tab: number) => setActiveTab(tab);

    /* Adiciona uma nova tarefa a lista */
    const handleAddTask = (description: string) => {
        const ids = tasks.length ? tasks.map(item => item.id) : [0];
        const lastValidId = Math.max(...ids)

        const task: Task = {
            id: lastValidId + 1,
            description,
            done: false
        }

        setTasks(state => [...state, task])
    }

      /* Remove uma tarefa da lista */
      const handleRemoveTask = (id: number) => 
      setTasks(state => state.filter(item => item.id !== id));

    /* Atualiza o estado de conclusão de uma tarefa */
    const handleTaskStateChange = (id: number) => 
        setTasks(state => state.map(item => item.id === id ? {...item, done: !item.done} : item));

    const totalTasks = tasks.length; // Indica o total de tarefas
    const totalTasksDone = tasks.filter(item => item.done).length; // Indica o total de tarefas concluidas
       

    return (
        <div className={style.wrapper}>
            <Header />
            <div>
                {/* Input de criação de tarefa */}
                <TaskInput addTask={handleAddTask} />
            </div>
            <div>
                {/* Cabeçalho da lista */}
                <div className={style.tabs}>
                    <span 
                        className={classNames(style.tab, activeTab === 1 && style.active)}
                        onClick={() => changeActiveTab(1)}
                    >
                        Tarefas criadas 
                        <small>{totalTasks}</small>
                    </span>
                    <span 
                        className={classNames(style.tab, activeTab === 2 && style.active)}
                        onClick={() => changeActiveTab(2)}
                    >
                        Concluídas
                        <small>{totalTasksDone} de {totalTasks}</small>
                    </span>
                </div>
                {/* Lista */}
                {activeTab === 1 && <TaskList data={tasks} changeTaskState={handleTaskStateChange} removeTask={handleRemoveTask} />}
                {activeTab === 2 && <TaskList data={tasks.filter(item => item.done)} changeTaskState={handleTaskStateChange} removeTask={handleRemoveTask} />}

            </div>
        </div>
    )
}

export default App
