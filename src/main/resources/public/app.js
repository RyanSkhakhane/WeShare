function lookupEmail() {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const email= data.get("email");

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


                                    });
       })




};

lookupEmail();




// tag::router[]
window.addEventListener('load', () => {
  const app = $('#app');

  const defaultTemplate = Handlebars.compile($('#default-template').html());




  const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
      const html = defaultTemplate();
      app.html(html);
    }
  });





  router.addUriListener();


  router.navigateTo('/');
});

