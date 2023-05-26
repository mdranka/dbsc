const getTables = async (tab) => {
    let dbdata;
    if (tab === 'tab01'){
        dbdata = {
            "host1": document.getElementById('host1').value,
            "user1": document.getElementById('dbuser1').value,
            "pass1": document.getElementById('dbpass1').value,
            "db1": document.getElementById('dbname1').value,
        }
    } else if(tab === 'tab02'){
        dbdata = {
            "host2": document.getElementById('host2').value,
            "user2": document.getElementById('dbuser2').value,
            "pass2": document.getElementById('dbpass2').value,
            "db2": document.getElementById('dbname2').value
        };
    };

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: `${JSON.stringify(dbdata)}`
      };
      
      fetch(`http://localhost:3001/${tab}`, options)
        .then(response => response.json())
        .then(response => listTables(response, tab))
        .catch(err => console.error(err));
}

const listTables = async(res, tab) => {
    let tables = res;
    document.getElementById(`list-${tab}`).innerHTML = '';
    let selector = `<select id="${tab}">`;
    for (let i=0; i < tables.length; i++){
        selector += `<option value="${tables[i].tabela}">${tables[i].tabela}</option>`;
    }
    document.getElementById(`list-${tab}`).innerHTML += selector + `</select>`
}

const analyzeData = async () => {
    document.getElementById('result').innerHTML = '';
    displayLoading();
    let dbdata = {
        "host1": document.getElementById('host1').value,
        "user1": document.getElementById('dbuser1').value,
        "pass1": document.getElementById('dbpass1').value,
        "db1": document.getElementById('dbname1').value,
        "table1": document.getElementById('tab01').value,

        "host2": document.getElementById('host2').value,
        "user2": document.getElementById('dbuser2').value,
        "pass2": document.getElementById('dbpass2').value,
        "db2": document.getElementById('dbname2').value,
        "table2": document.getElementById('tab02').value
    };

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: `${JSON.stringify(dbdata)}`
      };
      response = '';
      await fetch(`http://localhost:3001/result`, options)
        .then(response => response.json())
        .then(response => listResult(response))
        .catch(err => console.error(err));
    hideLoading();
}

// Animação de carregamento
function displayLoading() {
    document.querySelector("#loading").classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        document.querySelector("#loading").classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    document.querySelector("#loading").classList.remove("display");
}

const listResult = async(resTable) => {
    let result = resTable;
    let finalTable = `<div id="table">` +
    `<table class="resTable">`+
    `<thead>`+
    `<tr>`+
    `<th class="tableHead">Name1</th>`+
    `<th class="tableHead par">Name2</th>`+
    `<th class="tableHead">Type1</th>`+
    `<th class="tableHead par">Type2</th>`+
    `<th class="tableHead">Size1</th>`+
    `<th class="tableHead par">Size2</th>`+
    `<th class="tableHead">PK1</th>`+
    `<th class="tableHead par">PK2</th>`+
    `<th class="tableHead">Nullable1</th>`+
    `<th class="tableHead par">Nullable2</th>`+
    `<th class="tableHead">Updatable1</th>`+
    `<th class="tableHead par">Updatable2</th>`+
    `<th class="tableHead">FK1</th>`+
    `<th class="tableHead par">FK2</th>`+
    `<th class="tableHead">simScore</th>`+
    `</tr>`+
    `</thead>`+
    `<tbody>`;
    for (let i=0; i < result.length; i++){
        let line;
        if(result[i].simScore <= 30) {
            line = `<tr class="t_line red"><td>${result[i].name1}</td>`;
        } else if (result[i].simScore > 30 && result[i].simScore <= 85) {
            line = `<tr class="t_line orange"><td>${result[i].name1}</td>`;
        } else if (result[i].simScore > 85) {
            line = `<tr class="t_line green"><td>${result[i].name1}</td>`;
        };
        line += `<td class="par">${result[i].name2}</td>` +
                `<td>${result[i].type1}</td>` +
                `<td class="par">${result[i].type2}</td>` +
                `<td>${result[i].size1}</td>` +
                `<td class="par">${result[i].size2}</td>` +
                `<td>${result[i].pk1}</td>` +
                `<td class="par">${result[i].pk2}</td>` +
                `<td>${result[i].nullable1}</td>` +
                `<td class="par">${result[i].nullable2}</td>` +
                `<td>${result[i].updatable1}</td>` +
                `<td class="par">${result[i].updatable2}</td>` +
                `<td>${result[i].fk1}</td>` +
                `<td class="par">${result[i].fk2}</td>` +
                `<td>${result[i].simScore.toFixed(1)}%</td></tr>`;
        finalTable += line;
    }
    finalTable += `</tbody></table></div>`;
    document.getElementById(`result`).innerHTML = finalTable;
    document.querySelector('#footer').scrollIntoView();
}