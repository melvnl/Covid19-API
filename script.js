axios
  .get("https://api.covid19api.com/summary")
  .then(function (response) {
    var rawData = myData(response.data.Countries);
    myTable(rawData);
  })
  .catch(function (error) {
    console.log(error);
  });

function myData(data) {
  var list = [];
  data.forEach(function (item) {
    list.push({
      country:
        '<img src="flags/' +
        item.CountryCode.toLowerCase() +
        '.svg" width="36"> ' +
        item.Country,
      newcases: item.NewConfirmed,
      totalcases: item.TotalConfirmed,
      newdeaths: item.NewDeaths,
      totaldeaths: item.TotalDeaths,
      newrecoveries: item.NewRecovered,
      totalrecoveries: item.TotalRecovered,
      lastupdate:
        new Date(item.Date).getDate() +
        "/" +
        new Date(item.Date).getMonth() +
        "/" +
        new Date(item.Date).getFullYear(),
    });
  });
  return list;
}

function myTable(arr) {
  var myTable = $("#table").bootstrapTable({
    height: 600,
    locale: "en_US",
    columns: [
      [
        {
          field: "country",
          title: "Countries and territories",
          rowspan: 2,
          align: "left",
          valign: "middle",
          footerFormatter: countFormatter,
        },
        {
          title: "Confirmed infections",
          colspan: 2,
          align: "center",
          valign: "middle",
        },
        {
          title: "Confirmed deaths",
          colspan: 2,
          align: "center",
          valign: "middle",
        },
        {
          title: "Reported recoveries",
          colspan: 2,
          align: "center",
          valign: "middle",
        },
        {
          field: "lastupdate",
          title: "Date",
          rowspan: 2,
          align: "center",
          valign: "middle",
        },
      ],
      [
        {
          field: "newcases",
          title: "New Cases",
          sortable: true,
          align: "right",
          formatter: numberFormatter,
          footerFormatter: totalFormatter,
        },
        {
          field: "totalcases",
          title: "Total Cases",
          sortable: true,
          align: "right",
          formatter: numberFormatter,
          footerFormatter: totalFormatter,
        },
        {
          field: "newdeaths",
          title: "New Deaths",
          sortable: true,
          align: "right",
          formatter: numberFormatter,
          footerFormatter: totalFormatter,
        },
        {
          field: "totaldeaths",
          title: "Total Deaths",
          sortable: true,
          align: "right",
          formatter: numberFormatter,
          footerFormatter: totalFormatter,
        },
        {
          field: "newrecoveries",
          title: "New Recovered",
          sortable: true,
          align: "right",
          formatter: numberFormatter,
          footerFormatter: totalFormatter,
        },
        {
          field: "totalrecoveries",
          title: "Total Recovered",
          sortable: true,
          align: "right",
          formatter: numberFormatter,
          footerFormatter: totalFormatter,
        },
      ],
    ],
    data: arr,
  });
  return myTable;
}

function countFormatter(data) {
  return data.length;
}

function numberFormatter(value, row) {
  return value.toLocaleString("en-US");
}

function totalFormatter(data) {
  var field = this.field;
  var total = data
    .map(function (row) {
      return row[field];
    })
    .reduce(function (sum, i) {
      return sum + i;
    }, 0);
  return total.toLocaleString("en-US");
}
1;
