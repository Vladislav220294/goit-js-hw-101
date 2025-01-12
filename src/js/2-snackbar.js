import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', event => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    const promiseHandler = (delay, state) => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                 
                    resolve(delay);
                }
                else {
                 
                    reject(delay);
                }
            }, delay);
          
        }); return promise;  
    }
    promiseHandler(delay, state).then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    }).catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    })
    
})