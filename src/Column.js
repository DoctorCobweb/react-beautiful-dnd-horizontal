import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'


const Container = styled.div`
  margin: 8px;
  border: 3px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;

  &:focus {
    outline: none;
    border-color: red;
  }
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'skyblue': 'white')}
  padding: 8px;

  display:flex;
`

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable
          droppableId={this.props.column.id}
          direction="horizontal"

          // WAY 2: control droppable columns
          isDropDisabled={this.props.isDropDisabled}

          //
          // WAY 1: control droppable columns.
          // columns with the same type (col 1 and 2)
          // can have items moved between them. col 3 has 'done' type (which is
          // different to others), so no movement of items to it can happen.
          //type={this.props.column.id === 'column-3' ? 'done': 'active'}
        >
          { (provided, snapshot) => (
            <TaskList
              ref={provided.innerRef} // styled-components crap
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}
