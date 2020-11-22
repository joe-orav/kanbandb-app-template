import React from "react"
import "./App.css"
import KanbanDB from "kanbandb"

const Status = ({ name }) => (
  <div className="status">
    <p className="status-name">{name}</p>
  </div>
)

const Board = ({ children }) => <div className="board">{children}</div>

function App() {
  return (
    <div className="container">
      <Board>
        <Status name="To-do" />
        <Status name="In Progress" />
        <Status name="Done" />
      </Board>
    </div>
  )
}

export default App

// async function initialize() {
//   /**
//    * Use KanbanDB like so (but you might want to move it) - types are provided
//    * by jsconfig.json, which will utilize d.ts files and give you autocompletion for
//    * KanbanDB, in Visual Studio Code, if that is your preferred IDE.
//    *
//    * This code (initialize function) is for demonstration only.
//    */
//   const instance = await KanbanDB.connect(null);
//   instance.addCard({
//     name: 'Test',
//     description: 'Test',
//     status: 'IN_PROGRESS'
//   });
// }

// function App() {
//   // Initialize DB communications.
//   initialize();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
