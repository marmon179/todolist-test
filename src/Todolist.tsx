import React, {useCallback, useState} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Task} from './Task';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';

export const Todolist: React.FC<PropsType> = React.memo((
    {
        id, title, tasks, changeFilter, addTask, changeTaskStatus, changeTaskTitle,
        deleteTask, deleteTodolist, changeTodoListTitle, filter
    }
) => {
    const addTaskNew = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id]);

    const removeTodolist = () => {
        deleteTodolist(id);
    };
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodoListTitle(id, title);
    }, [id, changeTodoListTitle]);

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id]);

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    const [task, setTask] = useState(tasksForTodolist);

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        if (!destination) return;

        const items = Array.from(task);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);

        setTask(items);
    };

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskNew}/>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="task">
                {(provided => (
                    <div className="task" {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            task.map((t, index) => {
                                    return (
                                        <Draggable draggableId={t.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                >
                                                    <Task
                                                        task={t}
                                                        changeTaskStatus={changeTaskStatus}
                                                        changeTaskTitle={changeTaskTitle}
                                                        removeTask={deleteTask}
                                                        todolistId={id}
                                                        key={t.id}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                }
                            )
                        }
                        {provided.placeholder}
                    </div>
                ))

                }
            </Droppable>
        </DragDropContext>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'default'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>;
});

//type

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    changeFilter: (value: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    deleteTask: (taskId: string, todoListId: string) => void
    deleteTodolist: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterType

}

