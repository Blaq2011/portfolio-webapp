

var xLabel;
var yLabel;

function submitColumn(track1, track2, divNumber){
    xLabel = track1.options[track1.selectedIndex].value; 
    yLabel = track2.options[track2.selectedIndex].value; 
    console.log(xLabel); 
    console.log(yLabel);
    console.log(divNumber)

     
    const options = {
        method: 'POST',
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"xcolumnselected": xLabel,"ycolumnselected": yLabel }),
    }
    fetch("http://127.0.0.1:8000/submit-columns/", options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
       console.log(data)
       return data.json();
    })
    
    }
function submitData(divNumber){
    fetch(`http://localhost:8000/get-data/`)
    .then (response => response.json())
    .then(data => {
        console.log(data);
    
    //constant values throughout graph starts
    let xsizevalues = [];
    let xvalue = [];
    let yvalue5 = [];
    let yvalue50 = [];
    let yvalue95 = [];
    let y_errorLow5 = [];
    let y_errorLow50 = [];
    let y_errorLow95 = [];
    let y_errorHigh5 = [];
    let y_errorHigh50 = [];
    let y_errorHigh95 = [];
    //constant values throughout graph ends
    
    //First Order ypoly values start
    let First_ypolyvalue5 = [];
    let First_ypolyvalue50 = [];
    let First_ypolyvalue95 = [];
    //First Order ypoly values end
    
    //Second Order ypoly values start
    let Second_ypolyvalue5 = [];
    let Second_ypolyvalue50 = [];
    let Second_ypolyvalue95 = [];
    //Second Order ypoly values end
    
    //Third Order ypoly values start
    let Third_ypolyvalue5 = [];
    let Third_ypolyvalue50 = [];
    let Third_ypolyvalue95 = [];
    //Third Order ypoly values end
    
    //Fourth Order ypoly values start
    let Fourth_ypolyvalue5 = [];
    let Fourth_ypolyvalue50 = [];
    let Fourth_ypolyvalue95 = [];
    //Fourth Order ypoly values end
    
    let Allxvalues = [];
    let Allyvalues = [];
    
    let Allypolyvalues1 = [];
    let Allypolyvalues2 = [];
    let Allypolyvalues3 = [];
    let Allypolyvalues4 = [];
    
    let Ally_errorHigh = [];
    let Ally_errorLow = []

    let Allcoeffvalues1 = [];
    let Allcoeffvalues2 = [];
    let Allcoeffvalues3 = [];
    let Allcoeffvalues4 = [];
   //First Order ypoly values start
   let First_coeff5 = [];
   let First_coeff50 = [];
   let First_coeff95 = [];
   //First Order ypoly values end
   
   //Second Order ypoly values start
   let Second_coeff5 = [];
   let Second_coeff50 = [];
   let Second_coeff95 = [];
   //Second Order ypoly values end
   
   //Third Order ypoly values start
   let Third_coeff5 = [];
   let Third_coeff50 = [];
   let Third_coeff95 = [];
   //Third Order ypoly values end
   
   //Fourth Order ypoly values start
   let Fourth_coeff5 = [];
   let Fourth_coeff50 = [];
   let Fourth_coeff95 = [];
   //Fourth Order ypoly values end

    //Grab Graph data starts
    function fillOrderValues(polyOrderToFill,mainPolyList, coeffToFill, mainCoeffList){
        polyOrderToFill.forEach(d =>{
            const {
              xaxis,
              ypoly,

          
            } = d[1];
          
              Allxvalues.push(xaxis);
              mainPolyList.push(ypoly);
          
          })
          coeffToFill.forEach(d =>{
            const {
              coeff
          
            } = d[1];
              mainCoeffList.push(coeff);
          
          })
        //Getting all ypoly values(all orders)
        pushOrderValues = function (specificPolyList5, specificPolyList50, specificPolyList95, specificCoeffList5, specificCoeffList50, specificCoeffList95)  {
    
            for (let i = 0; i < mainPolyList[0].length; i ++){
                specificPolyList5.push(mainPolyList[0][i]);
        
            }
            console.log("ypolyvalue5",specificPolyList5);
        
            for (let i = 0; i < mainPolyList[1].length; i ++){
                specificPolyList50.push(mainPolyList[1][i]);
        
            }
            console.log("ypolyvalue50",specificPolyList50);
        
            for (let i = 0; i < mainPolyList[2].length; i ++){
                specificPolyList95.push(mainPolyList[2][i]);
        
            }
            console.log("ypolyvalue95",specificPolyList95);


            for (let i = 0; i < mainCoeffList[0].length; i ++){
                specificCoeffList5.push(mainCoeffList[0][i]);
        
            }
            console.log("coeff5",specificCoeffList5);
        
            for (let i = 0; i < mainCoeffList[1].length; i ++){
                specificCoeffList50.push(mainCoeffList[1][i]);
        
            }
            console.log("coeff50",specificCoeffList50);
        
            for (let i = 0; i < mainCoeffList[2].length; i ++){
                specificCoeffList95.push(mainCoeffList[2][i]);
        
            }
            console.log("coeff95",specificCoeffList95);






        }
        return pushOrderValues
    }   
    
    fillOrderValues(data.firstorder.outpoly, Allypolyvalues1,data.firstorder.outcoeff, Allcoeffvalues1)(First_ypolyvalue5,First_ypolyvalue50,First_ypolyvalue95,First_coeff5,First_coeff50,First_coeff95)
    fillOrderValues(data.secondorder.outpoly, Allypolyvalues2,data.secondorder.outcoeff, Allcoeffvalues2)(Second_ypolyvalue5,Second_ypolyvalue50,Second_ypolyvalue95,Second_coeff5,Second_coeff50,Second_coeff95)
    fillOrderValues(data.thirdorder.outpoly, Allypolyvalues3,data.thirdorder.outcoeff, Allcoeffvalues3)(Third_ypolyvalue5,Third_ypolyvalue50,Third_ypolyvalue95,Third_coeff5,Third_coeff50,Third_coeff95)
    fillOrderValues(data.fourthorder.outpoly, Allypolyvalues4,data.fourthorder.outcoeff, Allcoeffvalues4)(Fourth_ypolyvalue5,Fourth_ypolyvalue50,Fourth_ypolyvalue95,Fourth_coeff5,Fourth_coeff50,Fourth_coeff95)
    

    function ValueDistributor(AllValues, TargetContainer, TargetIndex, ContainerName){
        for (let i = 0; i < AllValues[TargetIndex].length; i ++){
           TargetContainer.push(AllValues [TargetIndex][i]);
          
        }
        console.log(ContainerName,TargetContainer);
      }

     //Getting all y values
    data.firstorder.outquantile.forEach(d =>{
        const {
          y
      
        } = d[1];
    
          Allyvalues.push(y);
    })
    //Getting all x values size
    data.firstorder.outxsize.forEach(d =>{
        const {
          xsize
      
        } = d;
    
          xsizevalues.push(xsize);
      
      })
    

    //Getting all x values
    ValueDistributor(Allxvalues,xvalue,0,"xvalue")

    //Getting y values for each percentile
    ValueDistributor(Allyvalues,yvalue5,0,"yvalue5")
    ValueDistributor(Allyvalues,yvalue50,1,"yvalue50" )
    ValueDistributor(Allyvalues,yvalue95,2,"yvalue95")
   
    console.log("xsize ", xsizevalues)

 //Getting all y_error values
 data.firstorder.outerrorbars.forEach(d =>{
        const {
          y_high,
          y_low,

      
        } = d[1];
      
          Ally_errorHigh.push(y_high);
          Ally_errorLow.push(y_low);
      
      })

    // console.log("Ally_errorHigh", Ally_errorHigh)
    // console.log("Ally_errorLow", Ally_errorLow)

 //Getting y_error values for each percentile
        //HIGH ERROR
    ValueDistributor(Ally_errorHigh, y_errorHigh5,0," y_errorHigh5")
    ValueDistributor(Ally_errorHigh, y_errorHigh50,1," y_errorHigh50" )
    ValueDistributor(Ally_errorHigh, y_errorHigh95,2," y_errorHigh95")
    
     //LOW ERROR
    ValueDistributor(Ally_errorLow, y_errorLow5,0," y_errorLow5")
    ValueDistributor(Ally_errorLow, y_errorLow50,1," y_errorLow50" )
    ValueDistributor(Ally_errorLow, y_errorLow95,2," y_errorLow95")

    //Grab Graph data ends
    
    
    
    
    
    
    //Creating traces for plotting starts
    function tracesScatter (xaxis, yaxis, Name, colr ){
        return{
         x : xaxis,
         y : yaxis,
         mode : 'markers',
         type : 'scatter',
         name : Name,
         marker:{
             color:colr
         }
         
        } 
     }
    function tracesScatterError (xaxis, yaxis, Name, colr,err_high,err_low ){
       return{
        x : xaxis,
        y : yaxis,
        mode : 'markers',
        type : 'scatter',
        name : Name,
        marker:{
            color:colr
        },
        error_y:{
        type: 'data',
        symmetric: false,
        array: err_high,
        arrayminus: err_low
        }
       } 
    }
    function tracesPoly (xaxis, yaxis, Name, colr, ){
        return{
         x : xaxis,
         y : yaxis,
         mode : 'line',
         type : 'scatter',
         name : Name,
         marker:{
             color:colr
         }

        } 
     }


// function showError(){
//     return 
// }

var graphDataActive1,  graphDataActive2,  graphDataActive3,  graphDataActive4 ,graphDataActiveError;
function graphDataCreator(errorbar){
    if(errorbar == 1){
        var trace_quantile5 = tracesScatterError(xvalue, yvalue5, '5% CL', "black", y_errorHigh5, y_errorLow5)
        var trace_quantile50 = tracesScatterError(xvalue, yvalue50,  '50% CL', "black", y_errorHigh50, y_errorLow50) 
        var trace_quantile95 = tracesScatterError(xvalue, yvalue95, '95% CL', "black", y_errorHigh95, y_errorLow95)
    }else{
        var trace_quantile5 = tracesScatter(xvalue, yvalue5, '5% CL', "black")
        var trace_quantile50 = tracesScatter(xvalue, yvalue50,  '50% CL', "black") 
        var trace_quantile95 = tracesScatter(xvalue, yvalue95, '95% CL', "black")
    }


    function polyCreator(x, ypolyvalue5,ypolyvalue50,ypolyvalue95 ,Name5, Name50, Name95, colorR,colorG){
        return{
            poly5 : tracesPoly(x, ypolyvalue5, Name5,  colorR ), 
            poly50 : tracesPoly(x,ypolyvalue50, Name50, colorG), 
            poly95 : tracesPoly(x,ypolyvalue95, Name95, colorR )
        }
    }

    let graph1 = polyCreator(xvalue, First_ypolyvalue5,First_ypolyvalue50,First_ypolyvalue95,'5% CL','50% CL','95% CL',"red","green")
    let graph2 = polyCreator(xvalue, Second_ypolyvalue5,Second_ypolyvalue50,Second_ypolyvalue95,'5% CL','50% CL','95% CL',"red","green")
    let graph3 = polyCreator(xvalue,Third_ypolyvalue5,Third_ypolyvalue50,Third_ypolyvalue95,'5% CL','50% CL','95% CL',"red","green")
    let graph4 = polyCreator(xvalue,Fourth_ypolyvalue5,Fourth_ypolyvalue50,Fourth_ypolyvalue95,'5% CL','50% CL','95% CL',"red","green")

    const graphData1 = [trace_quantile5, trace_quantile50, trace_quantile95, graph1.poly5, graph1.poly50, graph1.poly95]
    const graphData2 = [trace_quantile5, trace_quantile50, trace_quantile95,graph2.poly5, graph2.poly50, graph3.poly95]
    const graphData3 = [trace_quantile5, trace_quantile50, trace_quantile95,graph3.poly5, graph3.poly50, graph3.poly95]
    const graphData4 = [trace_quantile5, trace_quantile50, trace_quantile95,graph4.poly5, graph4.poly50, graph4.poly95]

    graphDataActive1 = graphData1,  
    graphDataActive2 = graphData2,  
    graphDataActive3 = graphData3, 
    graphDataActive4 = graphData4

}

 function graphDataSelector(divNumber, errorbar){
    
    for(i= 1; i <= divNumber; i++){
        if(divNumber == i){
            graphDataCreator(errorbar)
        }
        // console.log(divNumber, i)

    }

      
 }
 
 graphDataSelector(divNumber) //Function to select the appropriate graph data for a particular tab
 
 

function ActiveOrder(){  
    switch(OrderActive){
        case `graph1${divNumber}`: plotgraph(graphDataActive1); break;
        case `graph2${divNumber}`: plotgraph(graphDataActive2); break;
        case `graph3${divNumber}`: plotgraph(graphDataActive3); break;
        case `graph4${divNumber}`: plotgraph(graphDataActive4); break;
        
        default: return;
    }

}





  //Binding combobox to different graphs starts
  var OrderActive;
  OrderActive = document.getElementById(`myOrders${divNumber}`).value

  document.getElementById(`myOrders${divNumber}`).onchange  = function (){
      OrderActive = document.getElementById(`myOrders${divNumber}`).value
      ActiveOrder();
  }

  
//Binding combobox to different graphs ends


// Toggling Error Graph starts
document.getElementById(`myCheckbox${divNumber}`).onchange  = function (){
    let errorButtonChecked = document.getElementById(`myCheckbox${divNumber}`).checked 

    if ( errorButtonChecked == true){
        graphDataSelector(divNumber, 1)
        ActiveOrder();
        console.log("Checked")
    }else if ( errorButtonChecked == false){
        graphDataSelector(divNumber, 0)
        ActiveOrder();
        console.log("UnChecked")
    }
    
}
// Toggling Error Graph starts



    //Creating traces for plotting ends
    
    //setting layout of graph starts
    var layout = {
        title : "Astraia Charts",
        xaxis: {
            title : xLabel
    
        },
        yaxis : {
            title : yLabel
        }
    };
    
    var config = {responsive: true}
    //setting layout of graph ends

    let graphDiv = document.getElementById(`myplotly-div${divNumber}`)


    //plotting graph on canvas starts
    function plotgraph(SelectedGraphData){
        Plotly.react(graphDiv,SelectedGraphData, layout, config);
    }
    //plotting graph on canvas ends 
    
    plotgraph(graphDataActive1);


// ======Exporting Chart Selected On click starts======



// ======Exporting Chart Selected On click ends======

function exportChart(selectedCoeffList){  
    const options = {
        method: 'POST',
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"selected":selectedCoeffList, "xstart": xvalue[0], "xend": xvalue.pop()}),
    
    }
    console.log(options)
    fetch("http://localhost:8000/graph-export/", options)
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
       console.log(data)
       return data.json();
    })
}
document.getElementById(`myexportButton${divNumber}`).onclick  = function (){
    
    switch(OrderActive){
        case `graph1${divNumber}`: exportChart( Allcoeffvalues1 ); break;
        case `graph2${divNumber}`: exportChart( Allcoeffvalues2); break;
        case `graph3${divNumber}`: exportChart(Allcoeffvalues3); break;
        case `graph4${divNumber}`: exportChart(Allcoeffvalues4); break;
        
        default: return;
    }
    alert("Chart Exported")

}

    
function createTable(tableData, root) {

    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    root.appendChild(table);
  }
  
  function updateTable(root,tableData ) {
    clear(root);
    createTable(tableData, root);  

  }



    function clear(root) {
        root.innerHTML = "";
  }


const tableRoot = document.querySelector(`#mydescriptiveRoot${divNumber}`);

const TableData = [

    ["Grouped Values", "median", "5%", "95%", "Number of values in group"], 
    ["row 2, cell 1", "row 2, cell 2"]
]

updateTable(tableRoot, TableData)

var tableBodyList = [] 
function tableBody(){
    for(i = 0; i <= yvalue50.length;i++){
        tableBodyList.push(xvalue,yvalue50, yvalue5, yvalue95, xsizevalues)
    }
    console.log(tableBodyList)
}
tableBody()
//   createTable([["X Group", "Median", "5%", "50%", "Group Size"], ["row 2, cell 1", "row 2, cell 2"]]);







    });
    
    
}


