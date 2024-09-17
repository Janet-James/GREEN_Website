var currentPage = 1;
var itemsPerPage = 2;
var totalItems = 0;
var uniqueModules = new Set();
var userLogSelectedDate = null;
var filterMode = null;
var filterCategoryType = null;
var countryFilter = null;
var webTrafficChart = null;
var avgTimeStayChart = null;

$(document).ready(function () {
    GetUserLogDetails(currentPage);
    WebTrafficDetails();
    $('#prevBtn').click(function () {
        if (currentPage > 1) {
            currentPage--;
            GetUserLogDetails(currentPage);
        }
    });
    $('#nextBtn').click(function () {
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            GetUserLogDetails(currentPage);
        }
    });
    setupPagination();
});

function UsersLogfetchDateValue() {
    setTimeout(() => {
        userLogSelectedDate = $('#usersLogDatePicker').val();
        GetUserLogDetails(currentPage);
        WebTrafficDetails();
    }, 3000);
}


function UserLogFilter(filterType) {
    filterCategoryType = filterType;
    GetUserLogDetails(currentPage);
    WebTrafficDetails();
}

$(".country-based-filteration").click(function () {
    countryFilter = $(this).data("value");
    currentPage = 1;
    totalItems = 0;
    GetUserLogDetails(currentPage);
    WebTrafficDetails();
    updatePaginationInfo(0, 0, 0);
});

var currentPage = 1;
var totalItems = 0;
var itemsPerPage = 3;                                                                                     

function GetUserLogDetails(pageNumber) {
    console.log("Fetching data for page:", pageNumber);

    if (userLogSelectedDate) {
        filterMode = userLogSelectedDate;
    } else {
        var currentDate = new Date();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var year = currentDate.getFullYear().toString();
        filterMode = `${year}`;
    }
    if (filterCategoryType) {
        filterCategoryType = filterCategoryType;
    } else {
        filterCategoryType = 'Year';
    }
    if (countryFilter) {
        countryFilter = countryFilter;
    } else {
        countryFilter = 'ALL';
    }
    $('#usersLogDatePicker').val(filterMode);
    $('#UserActivityAppend').empty();
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: "https://gprogress.green.com.pg/user_ativity/",
        method: "post",
        data: {
            "filterMode": filterMode,
            "filterCategoryType": filterCategoryType,
            "countryFilter": countryFilter,
            csrfmiddlewaretoken: csrf_data
        }
    }).done(function (json_data) {
        var data = json_data;
        ajaxResponseData = data;

        if (data.Code === "001") {
            // Sort the data based on logged_in_time in descending order
            data.PageDurationList.sort(function (a, b) {
                var dateA = parseDate(a.logged_in_time);
                var dateB = parseDate(b.logged_in_time);
                return dateB - dateA; // Reverse the order of comparison
            });

            totalItems = data.PageDurationList.length;
            var startIndex = (pageNumber - 1) * itemsPerPage;
            var endIndex = Math.min(startIndex + itemsPerPage, totalItems);
            var dynamicHTML = "";
            var dynamic_class;
            for (var i = startIndex; i < endIndex; i++) {
                var currentItem = data.PageDurationList[i];
                var s_no = i + 1; // Use the index for serial number
                var contact_person_name = currentItem.contact_person_name || "N/A";
                var logged_in_status = currentItem.logged_status || "N/A";
                var contact_person_email = currentItem.contact_person_email || "N/A";
                var logged_in_time = currentItem.logged_in_time || "N/A";
                var logged_out_time = currentItem.logged_out_time || "N/A";
                var user_activity = currentItem.user_activity || [];
                var user_timezone = currentItem.user_timezone || "N/A";
                var userActivityHTML = "";
                uniqueModules = new Set();
                for (var j = 0; j < user_activity.length; j++) {
                    var activityItem = user_activity[j];
                    var add_class = (j === user_activity.length - 1) ? "last" : "";
                    if (activityItem.Module === "Service and Support") {
                        dynamic_class = "step-1";
                    } else if (activityItem.Module === "Service Call History") {
                        dynamic_class = "step-2";
                    } else if (activityItem.Module === "UserLogOut") {
                        dynamic_class = "step-4";
                    } else if (activityItem.Module === "Accounts and Statement") {
                        dynamic_class = "step-3";
                    }
                    const user_activity_view = (activityItem["Viewed Time"]);
                    const luxonDate = luxon.DateTime.fromISO(user_activity_view, { zone: 'UTC-4' });
                    const formattedDate = luxonDate.toFormat("dd-LL-yyyy hh:mm:ss a");
                    userActivityHTML += `
                        <div class="user-activity-single-data ${add_class} ${dynamic_class}">
                            <p class="data">${activityItem.Module} - <span class="date">${formattedDate}</span></p>
                        </div>
                `;
                }

                var add_class = (i === endIndex - 1) ? "last" : "";
                dynamicHTML += `
                  <tr>
                      <td scope="row">${s_no}</td>
                      <td>${contact_person_name}</td>
                      <td><span class="email">${contact_person_email}</span></td>
                      <td><p class="status ${logged_in_status}">${logged_in_status}</p></td>
                      <td>${logged_in_time}</td>
                      <td>${logged_out_time}</td>
                      <td>
                          <div class="user-activity-block">
                              <div class="user-activity-grp">
                                  <div class="user-activity-data">
                                      ${userActivityHTML}
                                  </div>
                              </div>
                          </div>
                      </td>
                  </tr>
              `;
            }
            $('#UserActivityAppend').html(dynamicHTML);

            updatePaginationInfo(startIndex + 1, endIndex, totalItems);
            setupPagination();
            generatePDF(data);
            generateExcel(data);

        }
        else {
            $('#UserActivityAppend').empty();
            dynamicHTML += ` <tr>
        <td colspan="11" class="text-center">NO DATA FOUND</td>
    
        </tr>`
            $('#UserActivityAppend').html(dynamicHTML);
        }

    });

}



function generatePDF(data) {

    $(".export_pdf").off("click").on("click", function () {
        var doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [297, 210], // You can adjust the format as needed
        });

        // Table headers
        var headers = ["S. No", "Contact Person Name", "Email", "Status", "Logged In Time", "Logged Out Time", "User Activity"];

        // Set the position for the table
        var startX = 10;
        var startY = 10;

        // Set column widths
        var colWidths = [20, 40, 60, 20, 40, 40, 180];

        // Set font size
        var fontSize = 8;

        // Set text options for the table
        doc.setFontSize(fontSize);
        doc.setFont('helvetica');

        // Function to add a new page and draw headers
        function addNewPage() {
            doc.addPage();
            startY = 10;
            for (var i = 0; i < headers.length; i++) {
                doc.text(startX, startY, headers[i]);
                startX += colWidths[i];
            }
        }

        // Draw headers on the first page
        for (var i = 0; i < headers.length; i++) {
            doc.text(startX, startY, headers[i]);
            startX += colWidths[i];
        }

        // Data for the table
        var tableData = data.PageDurationList.map(function (currentItem, i) {
            return [
                (i + 1).toString(), // Convert to string
                currentItem.contact_person_name || "N/A",
                currentItem.contact_person_email || "N/A",
                currentItem.logged_status || "N/A",
                currentItem.logged_in_time || "N/A",
                currentItem.logged_out_time || "N/A",
                (currentItem.user_activity || []).map(function (activityItem) {
                    return activityItem.Module + " - " + activityItem["Viewed Time"].split(' GMT')[0];
                }).join("\n")
            ];
        });

        // Draw table data
        for (var i = 0; i < tableData.length; i++) {
            var rowHeight = 40;
            if (startY + rowHeight > doc.internal.pageSize.height - 10) {
                // If there isn't enough space on the current page, add a new page
                addNewPage();
            }

            // Move to the next row
            startY += rowHeight;
            startX = 10; // Reset X position

            for (var j = 0; j < tableData[i].length; j++) {
                doc.text(startX, startY, tableData[i][j]);
                startX += colWidths[j];
            }
        }

        // Save the PDF
        doc.save('userLogDetails.pdf');
    });
}



function generateExcel(data) {
    $(".export_excel").off("click").on("click", function () {
        var excelData = [];
        var headers = ["S. No", "Contact Person Name", "Email", "Status", "Logged In Time", "Logged Out Time", "User Activity"];
        excelData.push(headers);

        data.PageDurationList.forEach(function (currentItem, i) {
            var rowData = [
                (i + 1).toString(),
                currentItem.contact_person_name || "N/A",
                currentItem.contact_person_email || "N/A",
                currentItem.logged_status || "N/A",
                currentItem.logged_in_time || "N/A",
                currentItem.logged_out_time || "N/A",
                (currentItem.user_activity || []).map(function (activityItem) {
                    return activityItem.Module + " - " + activityItem["Viewed Time"].split(' GMT')[0];
                }).join("\n")
            ];
            excelData.push(rowData);
        });

        // Create a new workbook
        var wb = XLSX.utils.book_new();

        // Add a worksheet
        var ws = XLSX.utils.aoa_to_sheet(excelData);

        // Apply styles to headers (making them bold)
        ws['!cols'] = headers.map(function () {
            return { wch: 15, s: { bold: true } };
        });

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

        // Save the Excel file
        XLSX.writeFile(wb, 'userLogDetails.xlsx');
    });
}



function parseDate(dateString) {
    // Assuming date string is in "DD-MM-YYYY hh:mm:ss A" format
    var parts = dateString.split(' ');
    var dateParts = parts[0].split('-');
    var timeParts = parts[1].split(':');
    var hours = parseInt(timeParts[0]);
    if (parts[2] === 'PM' && hours !== 12) {
        hours += 12;
    } else if (parts[2] === 'AM' && hours === 12) {
        hours = 0;
    }

    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], hours, timeParts[1], timeParts[2]);
}

function updatePaginationInfo(startIndex, endIndex, totalItems) {
    $('#paginationInfo').text(`${startIndex}-${endIndex} of ${totalItems}`);
}
function setupPagination() {

}


function WebTrafficDetails() {
    $("#totalVisitorsCount").empty();
    if (webTrafficChart) {
        webTrafficChart.destroy();
    }
    if (avgTimeStayChart) {
        avgTimeStayChart.destroy();
    }
    if (userLogSelectedDate) {
        filterMode = userLogSelectedDate
    } else {
        var currentDate = new Date();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var year = currentDate.getFullYear().toString();
        filterMode = `${year}`;
    }
    if (filterCategoryType) {
        filterCategoryType = filterCategoryType
    } else {
        filterCategoryType = 'Year'
    }
    if (countryFilter) {
        countryFilter = countryFilter
    } else {
        countryFilter = 'ALL'
    }
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: "https://gprogress.green.com.pg/individual_user_log/",
        method: "post",
        data: {
            "filterMode": filterMode,
            "filterCategoryType": filterCategoryType,
            "countryFilter": countryFilter,
            csrfmiddlewaretoken: csrf_data
        }
    })
        .done(function (json_data) {
            var traffic_data = JSON.parse(json_data);

            if (traffic_data.Code === "001") {
                var totalMembersCount = traffic_data.total_members_count;
                var module_traffic = traffic_data.module_traffic;
                var most_visited_log = traffic_data.most_visited_log;
                var membersHTML = `<h3>${totalMembersCount} ${totalMembersCount === 1 ? 'Member' : 'Members'}</h3>`;
                $('#totalVisitorsCount').html(membersHTML)

                // ---------------------------------------------- Website Trafic --------------------------------------------------
                var option = {
                    series: module_traffic,
                    chart: {
                        type: 'donut',
                    },
                    plotOptions: {
                        pie: {
                            startAngle: -90,
                            endAngle: 90,
                            offsetY: 10,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    grid: {
                        padding: {
                            bottom: -80
                        }
                    },
                    colors: ['#31DD03', '#EAD610', '#B6E94A', '#FF9E44', '#54CBF1', '#5493F1', '#9954F1'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 230
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                };
                webTrafficChart = new ApexCharts(document.querySelector("#webTraffic"), option);
                webTrafficChart.render();

                // ---------------------------------------------- Avg . Visits on Pages --------------------------------------------------
                var options = {
                    series: [{
                        name: "Invoices",
                        data: most_visited_log
                    }],
                    chart: {
                        id: 'fb',
                        group: 'social',
                        type: 'line',
                        height: 300
                    },
                    colors: ['#333', '#EAD610', '#B6E94A', '#FF9E44', '#54CBF1', '#5493F1', '#9954F1'],
                    markers: {
                        colors: ['#31DD03', '#EAD610', '#B6E94A', '#FF9E44', '#54CBF1', '#5493F1', '#9954F1'],
                        size: 6,
                        hover: {
                            size: 10
                        }
                    },
                    stroke: {
                        curve: 'straight',
                        width: [1],
                        colors: ['#333']
                    },
                    grid: {
                        show: false
                    },
                    toolbar: {
                        show: false
                    },
                    dataLabels: {
                        enabled: false
                    },
                    tooltip: {
                        followCursor: false,
                        theme: 'dark',
                        x: {
                            show: false
                        },
                        marker: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function () {
                                    return ''
                                }
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            formatter: function (value) {
                                return value + " visits";
                            }
                        }
                    },
                    labels: ['Service & Support', 'Service History', 'Environmental Saving', 'Financial ROI', 'Site Monitoring', 'Project Monitoring', 'Accounts & Statement'],
                    xaxis: {
                        type: "",
                        tickPlacement: 'between',
                        axisBorder: {
                            show: true,
                            color: '#E5E4E4',
                        },
                        labels: {
                            // formatter: function(value) {
                            // var label = value.split(' ').join('\n');
                            // return label;
                            // },
                            style: {
                                fontSize: '12px',
                                colors: '#ff0000'
                            }
                        }
                    },
                };
                avgTimeStayChart = new ApexCharts(document.querySelector("#avgTimeStay"), options);
                avgTimeStayChart.render();
            } if (traffic_data.Code === "002") {
                var option = {
                    series: module_traffic,
                    chart: {
                        type: 'donut',
                    },
                    plotOptions: {
                        pie: {
                            startAngle: -90,
                            endAngle: 90,
                            offsetY: 10,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    grid: {
                        padding: {
                            bottom: -80
                        }
                    },
                    colors: ['#31DD03', '#EAD610', '#B6E94A', '#FF9E44', '#54CBF1', '#5493F1', '#9954F1'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 230
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                };
                webTrafficChart = new ApexCharts(document.querySelector("#webTraffic"), option);
                webTrafficChart.render();
                // ---------------------------------------------- Avg . Visits on Pages --------------------------------------------------
                var options = {
                    series: [{
                        name: "Invoices",
                        data: []
                    }],
                    chart: {
                        id: 'fb',
                        group: 'social',
                        type: 'line',
                        height: 300
                    },
                    colors: ['#333', '#EAD610', '#B6E94A', '#FF9E44', '#54CBF1', '#5493F1', '#9954F1'],
                    markers: {
                        colors: ['#31DD03', '#EAD610', '#B6E94A', '#FF9E44', '#54CBF1', '#5493F1', '#9954F1'],
                        size: 6,
                        hover: {
                            size: 10
                        }
                    },
                    stroke: {
                        curve: 'straight',
                        width: [1],
                        colors: ['#333']
                    },
                    grid: {
                        show: false
                    },
                    toolbar: {
                        show: false
                    },
                    dataLabels: {
                        enabled: false
                    },
                    tooltip: {
                        followCursor: false,
                        theme: 'dark',
                        x: {
                            show: false
                        },
                        marker: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function () {
                                    return ''
                                }
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 2,
                        labels: {
                            formatter: function (value) {
                                return value + " visits";
                            }
                        }
                    },
                    labels: ['Service & Support', 'Service History', 'Environmental Saving', 'Financial ROI', 'Site Monitoring', 'Project Monitoring', 'Accounts & Statement'],

                    xaxis: {
                        type: "",
                        tickPlacement: 'between',
                        axisBorder: {
                            show: true,
                            color: '#E5E4E4',
                        },
                        labels: {
                            // formatter: function(value) {
                            // var label = value.split(' ').join('\n');
                            // return label;
                            // },
                            style: {
                                fontSize: '12px',
                                colors: '#ff0000'
                            }
                        }
                    },
                };
                avgTimeStayChart = new ApexCharts(document.querySelector("#avgTimeStay"), options);
                avgTimeStayChart.render();
            }
        })
}
