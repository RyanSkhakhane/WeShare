function add_new_expense(){

}





function populate_expense_table(){
  console.log("Hey there buddy");

const options = {
  method: 'GET',
  };

  fetch('http://localhost:5050/expenses/person/1',options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let total = 0;

    for ( let i = 0; i < data.length; i++ ) {
      console.log(data[i].nettAmount);
      total += data[i].nettAmount;
    }

    data = {
      expenses: data,
      grandTotal: total
    }

    const template = document.getElementById('expenses-template').innerText;
    const compiledFunction = Handlebars.compile(template);
    document.getElementById('app').innerHTML =compiledFunction(data);
  });
  

}


function lookupEmail() {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const email= data.get("email");
//        console.log(email)
        const options = {
                    method: 'POST',
                    headers : {'Content-Type': 'application/json'},
                    body: JSON.stringify({ 'email' : email })

                    };

                    fetch("http://localhost:5050/people", options)
                                      .then(response => response.json())

                                      .then(data => {
                                      console.log(data);
                                       data = {
                                        email: data.email,
                                        name:data.email.split("@").at(0),
                                        Id : data.id


                                      }

                                    localStorage.setItem("personId",data.Id);
                                    console.log(data.Id);
                                    const template = document.getElementById('expenses-template').innerText;
                                    const compiledFunction = Handlebars.compile(template);
                                    document.getElementById('app').innerHTML = compiledFunction(data);   });
       })




};

lookupEmail();

function paymentrequests_sent(){
var personId=localStorage.getItem('personId');

const options = {
        method: 'GET',
    };

        fetch(`http://localhost:5050/paymentrequests/sent/${personId}`, options)


        .then(response => response.json())
        .then(data => {
        console.log(personId)
        console.log(data)
        data = {
        id: data[0].id,
        expenseId:data[0].expenseId,
        fromPersonId:data[0].fromPersonId,
        toPersonId:data[0].toPersonId,
        date:data[0].date,
        amount:data[0].amount,
        paid:data[0].paid


        }


          const template = document.getElementById('paymentrequests_sent-template').innerText;
          const compiledFunction = Handlebars.compile(template);
          document.getElementById('results').innerHTML =compiledFunction(data);

        })

}


// tag::router[]
window.addEventListener('load', () => {
  const app = $('#app');

  const defaultTemplate = Handlebars.compile($('#default-template').html());
  const expensesTemplate = Handlebars.compile($('#expenses-template').html());
  const paymentrequests_sentTemplate = Handlebars.compile($('#paymentrequests_sent-template').html());




  const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
      const html = defaultTemplate();
      app.html(html);
    }
  });

  router.add('/expenses', async () => {
    html = expensesTemplate();
    app.html(html);
    populate_expense_table();

  });


  router.add('/paymentrequests_sent', async () => {
//    html = paymentrequests_sentTemplate();
//    app.html(html);
    paymentrequests_sent();
  });

  router.add('/add_new_expense',async() =>{
    html = add_new_expenseTempalate();
    app.html(html);
    add_new_expense();
  })




  router.addUriListener();

  $('form').on('submit', (event) => {
    event.preventDefault();
    const path = "/#expenses";
    router.navigateTo(path);
  });

  router.navigateTo('/');
});


