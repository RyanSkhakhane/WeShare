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

                                      .then(data => { data = {
                                        email: data.email

                                      }


                                    const template = document.getElementById('expenses-template').innerText;
                                    const compiledFunction = Handlebars.compile(template);
                                    document.getElementById('results').innerHTML = compiledFunction(data);   });
       })




};

lookupEmail();




// tag::router[]
window.addEventListener('load', () => {
  const app = $('#app');

  const defaultTemplate = Handlebars.compile($('#default-template').html());
  const expensesTemplate = Handlebars.compile($('#expenses-template').html());



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


  });



  router.addUriListener();

  $('form').on('submit', (event) => {
    event.preventDefault();
    const path = "/#expenses";
    router.navigateTo(path);
  });

  router.navigateTo('/');
});


