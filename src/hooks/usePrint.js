function usePrint() {

  function print(impresion) {
    const content = document.getElementById(impresion);
    console.log(content)
    const newWindow = window.open( "","_blank", "popup");
    console.log(newWindow);
    
    let printContent = `<!DOCTYPE html>
    <html>
    <head>
    <title>Print List</title>
    <style>
    body {
      font-family: Arial; /* Choose a suitable font */
      font-size: 14pt;
      margin: 2cm; /* Add margins for printing */
    }
    ul, ol {
      list-style-type: none; /* Or circle, square, etc. as needed */
      margin-left: 20px;
      padding-left: 0;  /*Remove default padding */
    }


    li {
      border-bottom: 1px solid #2b2b2b20;
      padding: 8px;
    }


    .headerDetails{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: .72;
  font-weight: 500;
}
    .medicBackgroundItemHeader {
  padding-bottom: 8px;
  background-color: white;
}
    .ItemHeaderTwo{
    font-weight: 600;
    opacity: .82;
    font-size: 17px;
    margin-bottom: 8px;
    }

    .ItemHeaderThree {
     font-weight: 600;
    opacity: .82;
    font-size: 16px;
    margin-bottom: 8px;
    }

    table {
  width: 100%;
  margin-top: 10px;
  text-align: left;
  background-color: #afafaf20;
}
  thead {  
  font-size: 16px;
  background-color: #bebebe20;
  font-weight: 500;
  color: #333333;
}

th {
  padding: 6px 4px;
  border: 1px solid #2b2b2b20;
}

td {
  padding: 6px 4px;
  font-size: 15px;
  border-top: 1px solid #2b2b2b20;
  border-right: 1px solid #2b2b2b20;
  border-left: 1px solid #2b2b2b20;
}

    </style>
    </head>
    <body>
    `;  
    printContent += content?.innerHTML;
    newWindow.document.open();
    newWindow.document.write(printContent);
    newWindow.document.close();

    newWindow.focus()
    newWindow.print();
  }
  return [print];
}
export default usePrint;