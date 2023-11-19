import { Task } from "@/@types/task";
import { useState } from "react";
import style from './TaskInput.module.css';
import plus from '../assets/plus.svg';

type TaskInputProps = {
    addTask: (description: string) => void;
}

export function TaskInput({ addTask }: TaskInputProps) {
    const [value, setValue] = useState('');

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => 
        setValue(event.target.value);

    const handleOnClick = () => {
        if (!value.length) {
            return null;
        }

        addTask(value);
        setValue('');
    }

    return (
        <div className={style.container}>
            <input type="text" value={value} onChange={handleOnChange} placeholder="Adicione uma nova tarefa" />
            <button type="button" onClick={handleOnClick}>
                Criar
                <img src={plus} alt={'Icone de adição'} />
            </button>
            
        </div>
    )
}