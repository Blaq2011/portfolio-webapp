import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Charts");
        
    }

    async getHtml() {
        return `
        <!--Plotting Graph-->
        <div id = "myplotly-div" class = "content-div" ></div>
        <div id = "mydecriptive-div" class = "content-div" >
            <table id="descriptiveRoot"></table>
        </div>


        <div class="chartStatTab", id= "mychartStatTab">
            <button type = "button" class = "chartStatTabButton" id = "descriptiveButton">Descriptive Statistics</button>
            <button type = "button" class = "chartStatTabButton" id = "visualizeButton"> Visualize Data</button>
        </div>
        

  
           
        <div class="sec", id= "mySec">
          <span id ="mychartCloseIcon" class= "chartCloseIcon"  >&#12298;</span>
          <span id ="mychartOpenIcon" class= "chartOpenIcon"  >&#12299;</span>
        <div id = "myChartMenu">
            <!--Adding axes selection combo Box starts -->
      
        <!--xaxis-->
        <div class="axesbox" id= "myAxesBox">
            <label id="selectx"> xaxis : </label>
            </br>
            <select class ="xcolumn" id= "Xcolumn" > </select>
        <!--yaxis-->
            </br>
            <label id="selecty" > yaxis : </label>
            </br>
            <select class ="ycolumn" id= "Ycolumn" ></select>
         <!--Submit Button-->
         </br>
            <button id = "subButton" class ="button submit" >Submit</button>
      
        </div>

<!--Adding axes selection combo Box ends -->
<!--Adding Order Box starts -->
            <div class="orderbox" id="myOrderBox">
              <label class = 'selectorder', id="mySelectOrder"> Select Order : </label>
              <select class ="orders" id="myOrders" >
                <option id = "mygraph1" value = "graph1" >First Order</option>
                <option id = "mygraph2" value="graph2" >Second Order</option>
                <option id = "mygraph3" value="graph3">Third Order</option>
                <option id = "mygraph4" value="graph4">Fourth Order</option>
              </select>
            </div>
      <!--Adding Order Box ends -->
   
      <!--Adding ErrorBar Toggle Box starts-->
      
      <div class="wrapper" id= "myWrapper">
      <label class = 'errorBars', id="myErrorBars"> Error Bars : </label>
          <div class="switch_box box_4">
              <div id = 'toggleerrorbar'></div>
              <div class="input_wrapper">
                  <input id = "myCheckbox" type="checkbox" class="switch_4" >
                  <svg  class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67" >
                <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
              </svg>
                  <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
                <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
              </svg>
                </div>
          </div>
      </div>
      <!--Adding ErrorBar Toggle Box ends-->   

      <!--Adding Export Button starts-->  

      <button  id = "myexportButton" class ="exportButton" >Export Chart</button>

      <!--Adding Export Button ends-->  

      <!--Adding Close Button starts-->  

        <button  "href": "javascript:void(0)" id = "closeButton" class ="destroyHomebtn" >Close</button>

        <!--Adding Close Button ends-->  

        
     
        
      </div>
  </div>



        `;
    }
    async executeViewScript(divNumber) // 
    {
      
        
        
               
        console.log("Executed")
        // Giving divs on different tabs Unique IDs
        async function changeId(Original_ID,New_ID ){
            document.getElementById(Original_ID).id = New_ID;
        }


      
        await changeId("mydecriptive-div", `mydecriptive-div${divNumber}`)
                await changeId("descriptiveRoot", `mydescriptiveRoot${divNumber}`)
                document.getElementById(`mydecriptive-div${divNumber}`).style.backgroundColor = "green"
        await changeId("myplotly-div", `myplotly-div${divNumber}`)
                document.getElementById(`myplotly-div${divNumber}`).style.backgroundColor = "white"

        await changeId("mychartStatTab", `mychartStatTab${divNumber}`)
            await changeId("visualizeButton", `myvisualizeButton${divNumber}`)
                document.getElementById(`myvisualizeButton${divNumber}`).setAttribute("onclick",`switchTab(event,${divNumber}, 0)` )
            await changeId("descriptiveButton", `mydescriptiveButton${divNumber}`)
                document.getElementById(`mydescriptiveButton${divNumber}`).setAttribute("onclick",`switchTab(event,${divNumber}, 1)` )
       
        await changeId("mySec", `mySec${divNumber}`)
            await changeId("mychartCloseIcon", `mychartCloseIcon${divNumber}`)
            await changeId("mychartOpenIcon", `mychartOpenIcon${divNumber}`)
                document.getElementById(`mychartCloseIcon${divNumber}`).setAttribute("onclick",`closeChart(${divNumber})` ) 
                document.getElementById(`mychartOpenIcon${divNumber}`).setAttribute("onclick",`openChart(${divNumber})`) 
            await changeId("myChartMenu", `myChartMenu${divNumber}`)
                await changeId("myAxesBox", `myAxesBox${divNumber}`)
                    await changeId("Xcolumn", `Xcolumn${divNumber}`)
                    await changeId("Ycolumn", `Ycolumn${divNumber}`)
                    await changeId("subButton", `subButton${divNumber}`)
                await changeId("myOrderBox", `myOrderBox${divNumber}`)
                    await changeId("myOrders", `myOrders${divNumber}`) 
                        await changeId("mygraph1", `mygraph1${divNumber}`)
                            document.getElementById(`mygraph1${divNumber}`).value = `graph1${divNumber}`
                        await changeId("mygraph2", `mygraph2${divNumber}`) 
                            document.getElementById(`mygraph2${divNumber}`).value = `graph2${divNumber}`
                        await changeId("mygraph3", `mygraph3${divNumber}`)
                            document.getElementById(`mygraph3${divNumber}`).value = `graph3${divNumber}` 
                        await changeId("mygraph4", `mygraph4${divNumber}`) 
                            document.getElementById(`mygraph4${divNumber}`).value = `graph4${divNumber}`
                await changeId("myWrapper", `myWrapper${divNumber}`)
                    await changeId("myCheckbox", `myCheckbox${divNumber}`)
                await changeId("myexportButton", `myexportButton${divNumber}`)
                await changeId("closeButton", `mydestroyDivbtn${divNumber}`)
                    document.getElementById(`mydestroyDivbtn${divNumber}`).setAttribute("onclick",`destroyChartDiv(${divNumber})`)





      
        //Filling the axes boxes starts
        const xTrack = document.getElementById(`Xcolumn${divNumber}`);
        const yTrack = document.getElementById(`Ycolumn${divNumber}`);
        const submitButton = document.getElementById(`subButton${divNumber}`)
        // const resetOrder = document.getElementById("orders")


        async function get_column(track){
            const getPost = async () => {
          const response = await fetch("http://127.0.0.1:8000/column-data/");
          const data = await response.json();
          return data.cols;
        };
        
        const displayOption = async () => {
             
                const options = await getPost();
                options.forEach(option => {
                    const newOption = document.createElement("option");
                    newOption.value = option;
                    newOption.text = option;
                    track.appendChild(newOption);
                    
                });
            };
            displayOption();
        }
        
        get_column(xTrack);
        get_column(yTrack);
        console.log(xTrack) 
        console.log(yTrack) 
        //Filling the axes boxes ends
        
        //submitting post request of selected columns starts
        
        
            
        submitButton.onclick = function(){ submitColumn(xTrack, yTrack, divNumber); submitData(divNumber);}
        
        //submitting post request of selected columns ends
      

    }
}

