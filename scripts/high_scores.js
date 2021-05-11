window.onload = function(){
    let tableData = [{date: "2021/01/17", duration: "3:41"},
                     {date: "2021/01/21", duration: "4:01"},
                     {date: "2021/02/01", duration: "2:52"},
                     {date: "2021/02/17", duration: "3:08"},
                     {date: "2021/03/02", duration: "2:51"}];
    
    let temp = '';
    let tbody = document.getElementById('hsTable');

    for(let data of tableData){
        temp += `<tr><td>${data.date}</td><td>${data.duration}</td></tr>`
        // console.log(temp)
    }
    // console.log(temp)
    tbody.innerHTML = temp;
};

