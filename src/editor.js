import React from "react" 

function Editor({setEditor, setDataHTML}){
    const edit = React.useRef()
    function CaptureData(event){
        setTimeout((e)=>{
            setDataHTML(e.target.innerHTML)
        }, 300, event)
    }
    var savedRange;
    function restoreSel() {
        edit.current.focus()
        if (savedRange != null) {
            if (window.getSelection){
                var s = window.getSelection();
                if (s.rangeCount > 0)
                    s.removeAllRanges();
                s.addRange(savedRange);
            }
            else if (document.createRange){
                window.getSelection().addRange(savedRange);
            }
            else if (document.selection){
                savedRange.select();
            }
        }
    }
    function saveSel() {
        if (window.getSelection){
            savedRange = window.getSelection().getRangeAt(0);
        }
        else if (document.selection){
            savedRange = document.selection.createRange();
        }
    }
    function execC(c, i, v){
        restoreSel()
        document.execCommand(c, i, v)
    }
    return <div className="modalEditor">
        <div className="editor">
            <div className="header">
                <div></div>
                <div onClick={setEditor}>
                    <i className="bi bi-x-lg" style={{color:'red'}}></i>
                </div>
            </div>
            <div className="contentEditable" ref={edit} contentEditable={true} onMouseUp={(e)=>{CaptureData(e)}} onPaste={(e)=>{CaptureData(e)}} onKeyUp={(e)=>{CaptureData(e)}} onBlur={saveSel}>
                <div>Escribe aqui</div>
            </div>
            <div className="footer auto-grid">
                <div className="bi" onClick={()=>{execC('bold', false, null)}}> 
                    <i class="bi bi-type-bold"></i> 
                </div>
                <div className="bi" onMouseUp={()=>{execC('italic', false, null)}}> 
                    <i class="bi bi-type-italic"></i> 
                </div>
                <div className="bi" onMouseDown={()=>{execC('insertHTML', false, '<h1>Escribe tu encabezado</h1>')}}> 
                    <i class="bi bi-type-h1"></i> 
                </div>
                <div className="bi" onMouseDown={()=>{execC('justifyLeft', false, null)}}> 
                    <i class="bi bi-text-left"></i> 
                </div>
                <div className="bi" onMouseDown={()=>{execC('justifyCenter', false, null)}}> 
                    <i class="bi bi-text-center"></i> 
                </div>
                <div className="bi" onMouseDown={()=>{execC('justifyRight', false, null)}}> 
                    <i class="bi bi-text-right"></i> 
                </div>
                <div className="bi" onMouseDown={()=>{execC('insertUnorderedList', false, null)}}> 
                    <i class="bi bi-list-ul"></i> 
                </div>
                <div className="bi" onMouseDown={()=>{execC('insertImage', false, prompt('URL de imagen?'))}}> 
                    <i class="bi bi-image"></i> 
                </div>
                <div className="bi" onMouseDown={execC}> 
                    <i class="bi bi-upload"></i> 
                </div>
            </div>
        </div>
    </div>
}

export {Editor}
