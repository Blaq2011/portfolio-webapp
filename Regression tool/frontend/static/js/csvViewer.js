


class TableCsv {
  
    /**
     * @param {HTMLTableElement} root The table element which will display the CSV data.
     */
    constructor(root) {
      this.root = root;
    }
  
    /**
     * Clears existing data in the table and replaces it with new data.
     *
     * @param {string[][]} data A 2D array of data to be used as the table body
     * @param {string[]} headerColumns List of headings to be used
     */
    update(data, headerColumns = []) {
      this.clear();
      this.setHeader(headerColumns);
      this.setBody(data);
    }
  
    /**
     * Clears all contents of the table (incl. the header).
     */
    clear() {
      this.root.innerHTML = "";
    }
  
    /**
     * Sets the table header.
     *
     * @param {string[]} headerColumns List of headings to be used
     */
    setHeader(headerColumns) {
      this.root.insertAdjacentHTML(
        "afterbegin",
        `
              <thead>
                  <tr>
                      ${headerColumns.map((text) => `<th>${text}</th>`).join("")}
                  </tr>
              </thead>
          `
      );
    }
  
    /**
     * Sets the table body.
     *
     * @param {string[][]} data A 2D array of data to be used as the table body
     */
    setBody(data) {
      const rowsHtml = data.map((row) => {
        return `
                  <tr>
                      ${row.map((text) => `<td>${text}</td>`).join("")}
                  </tr>
              `;
      });
  
      this.root.insertAdjacentHTML(
        "beforeend",
        `
              <tbody>
                  ${rowsHtml.join("")}
              </tbody>
          `
      );
    }
  }
  
  const tableRoot = document.querySelector("#csvRoot");
  const csvFileInput = document.querySelector("#csvFileInput");
  const tableCsv = new TableCsv(tableRoot);
  var heads;
  csvFileInput.addEventListener("change", (e) => {
        Papa.parse(csvFileInput.files[0], {
            delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
            fastMode: false,
            preview: 100,
            download: true,
            // comments: true,
            // quoteChar: '\"',
            // escapeChar: '\\', 
            skipEmptyLines: true,
         
            complete: async (results) => {
                tableCsv.update(results.data.slice(1), results.data[0]);
                heads = results.data[0]
                console.log(csvFileInput.files[0])
                await closeMainSection()
                console.log(results)
                // // alert(`' ${csvFileInput.files[0].name} ' Selected `)
                // // seding filepath to backend starts
              
                // const options = {
                //     method: 'POST',
                //     headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                // },
                // body: JSON.stringify({"fileData":results}),
                
                // }
                // console.log(options)
                // fetch("http://localhost:8000/filepath-collector/", options)
                // .then(data => {
                // if (!data.ok) {
                //     throw Error(data.status);
                // }
                // console.log(data)
                // return data.json();
                // })
    
                
                 // seding file name to backend ends
              
          }
        });
        console.log(csvFileInput.value);
  
    
  });

async function closeMainSection(){
    var section = document.getElementById("myHome")
    document.querySelectorAll(".tabcontent").forEach(el => el.remove());
    document.querySelectorAll(".tablinks").forEach(el => el.remove());
    section.style.display = "none";
    
    Papa.parse(csvFileInput.files[0], {
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
        fastMode: false,
        download: true,
        // comments: true,
        // quoteChar: '\"',
        // escapeChar: '\\', 
        skipEmptyLines: true,
     
        complete: (results) => {
          
            const options = {
                method: 'POST',
                headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"fileData":results}),
            
            }
            console.log(options)
            fetch("http://localhost:8000/filepath-collector/", options)
            .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            console.log(data)
            return data.json();
            })

            
             // seding file name to backend ends
          
      }
    });
}

