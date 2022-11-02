const FRAME_HEIGHT = 450;
const FRAME_WIDTH = 450; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

const LEFT = d3.select("#left") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const MIDDLE = d3.select("#middle") 
                    .append("svg") 
                        .attr("height", FRAME_HEIGHT)   
                        .attr("width", FRAME_WIDTH)
                        .attr("class", "frame"); 

const RIGHT = d3.select("#right") 
                    .append("svg") 
                        .attr("height", FRAME_HEIGHT)   
                        .attr("width", FRAME_WIDTH)
                        .attr("class", "frame"); 



// Next, open file 
d3.csv("data/city-hall.csv").then((data) => { 
    // find max X
    const MAX_X_LEFT = d3.max(data, (d) => { return parseInt(d.DateTime_Measured); });

    // find max Y
    const MAX_Y_LEFT = d3.max(data, (d) => { return parseInt(d.Total_Demand_KW); });

    // Define scale functions that maps our data values 
    // (domain) to pixel values (range)
    const X_SCALE_LEFT = d3.scaleLinear() 
            .domain([0, MAX_X_LEFT + 1]) // add some padding  
            .range([0, VIS_WIDTH]); 

    const Y_SCALE_LEFT = d3.scaleLinear() 
            .domain([0, MAX_Y_LEFT + 1]) // add some padding  
            .range([VIS_HEIGHT, 0]);
    
    LEFT.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
            "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE_LEFT).ticks(6)) 
            .attr("font-size", '20px'); 

    // Add an y-axis to the vis  
    LEFT.append('g')  // g is a general SVG
        .attr('transform', "translate(" + MARGINS.left +
            "," + (MARGINS.bottom) +")") 
        .call(d3.axisLeft(Y_SCALE_LEFT).ticks(10))
            .attr('font-size', '20px');

    


    
})