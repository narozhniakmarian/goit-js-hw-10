
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


function promiseGeneration() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const delay = Number(form.elements.delay.value);
        const state = form.elements.state.value;

        document.getElementById('spinner').style.display = 'block';


        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === "fulfilled") {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });


        promise
            .then((delay) => {
                document.getElementById('spinner').style.display = 'none';
                iziToast.success({
                    title: 'Success',
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    position: 'topRight'
                });
            })
            .catch((delay) => {
                document.getElementById('spinner').style.display = 'none';
                iziToast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${delay}ms`,
                    position: 'topRight'
                });
            });
    });

}

promiseGeneration();