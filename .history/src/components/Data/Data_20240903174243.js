import './Data.css'

const tasks = [
  {
    id: 1,
    liClass: 'completed',
    descriptionText: 'Completed task',
    createdText: 'created 17 seconds ago',
  },

  {
    id: 2,
    liClass: 'editing',
    descriptionText: 'Editing task',
    createdText: 'created 5 minutes ago',
    input2Class: 'edit',
    input2Type: 'text',
    input2defaultValue: 'Editing task',
  },

  {
    id: 3,
    descriptionText: 'Active task',
    createdText: 'created 5 minutes ago',
  },
]

export default tasks
