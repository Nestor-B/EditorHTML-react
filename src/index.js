import React from "react"
import ReactDom from "react-dom"

// Importar Componente EditorHTML
import { Editor } from "./editor"
// Importar Bootstrap NO ES OBLIGATORIO
import "bootstrap/dist/css/bootstrap.min.css"
// Importar bootstrap-icons ES NECESARIO
import "bootstrap-icons/font/bootstrap-icons.css";
// Importar Estilos para el componente editor
import "./index.css"

function App(){

    // Para hacer visible el editor
    const [editor, showEditor] = React.useState(false)
    // Para guardar los datos del editor
    const [dataHTML, showDataHTML] = React.useState('')

    function setShowEditor(){
        showEditor( !editor )
    }
    function setDataHTML(e){
        showDataHTML(e)
    }
    return <div className="container">
        {
            editor?<Editor setEditor={setShowEditor} setDataHTML={setDataHTML} />:''
        }
        <div className="wrapper">
            <button className="btn btn-primary" onClick={setShowEditor}>Open Editor</button>
            <div className="content">
                <div dangerouslySetInnerHTML={{ __html: dataHTML}}></div>
            </div>
        </div>
    </div>
}

ReactDom.render(
    <App />,
    document.getElementById('root')
)