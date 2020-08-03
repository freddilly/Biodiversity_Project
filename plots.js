function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
  })}
  
  init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    var str1 = "ID: ";
    var res_1 = str1.concat(result.id);
    PANEL.append("h6").text(res_1);

    var str2 = "ETHNICITY: ";
    var res_2 = str2.concat(result.ethnicity);
    PANEL.append("h6").text(res_2)

    var str3 = "GENDER: ";
    var res_3 = str3.concat(result.gender);
    PANEL.append("h6").text(res_3);

    var str4 = "AGE: ";
    var res_4 = str4.concat(result.age);
    PANEL.append("h6").text(res_4);

    var str5 = "LOCATION: ";
    var res_5 = str5.concat(result.location);
    PANEL.append("h6").text(res_5);

    var str6 = "BBTYPE: ";
    var res_6 = str6.concat(result.bbtype);
    PANEL.append("h6").text(res_6);

    var str7 = "WFREQ: ";
    var res_7 = str7.concat(result.wfreq);
    PANEL.append("h6").text(res_7);
    
    //PANEL.append("h6").text(result.location);
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    var sampleResult = sampleArray[0];
    var barChart = d3.select("#bar");
    var sample_count = sampleResult.sample_values;
    var bact_ids = sampleResult.otu_ids;
    var otu_labels = sampleResult.otu_labels;
    var sample_ct_bar = sample_count.slice(0,10);
    var bact_ids_bar_1 = bact_ids.slice(0, 10);
    var bact_ids_bar = bact_ids_bar_1.map(otuID => `OTU ${otuID}`)
    var trace = {
      x : sample_ct_bar,
      y : bact_ids_bar,
      type: "bar", text: otu_labels.slice(0,10),
      orientation: 'h'
      };
    var bar_layout = {
      yaxis: {
        autorange: 'reversed'
      }
    };
    Plotly.newPlot("bar",[trace],bar_layout)}
    );
  d3.json("samples.json").then((data) => {
    samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    var sampleResult = sampleArray[0];
    var sample_count = sampleResult.sample_values;
    var bact_ids = sampleResult.otu_ids;
    var otu_labels = sampleResult.otu_labels;
    var sample_ct_bar = sample_count;
    var trace1 = {
      x: bact_ids,
      y: sample_ct_bar,
      text: otu_labels,
      mode: 'markers',
      marker: {size: sample_ct_bar,
      color: bact_ids,
    colorscale:"Earth"} 
    }
    var bubbleDetails = {
      xaxis: {title: "OTU ID"}
    }
    Plotly.newPlot("bubble",[trace1],bubbleDetails)
    });
  d3.json("samples.json").then((data => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var washingFrequency = result.wfreq; 
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFrequency,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {range: [null, 9]}
        }
      }
    ];
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 }, xaxis:{showgrid: false, range: [-1,1]} };
    Plotly.newPlot('gauge', data, layout);
  }))
};


