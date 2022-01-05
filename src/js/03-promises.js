import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}
refs.form.addEventListener('submit', onFormDubmit)

function onFormDubmit (e) {
  e.preventDefault();

  const firstDelay = Number(refs.form.elements.delay.value);
  const stepDelay = Number(refs.form.elements.step.value);
  let delay = firstDelay - stepDelay;
  const amount = refs.form.elements.amount.value;
  const shouldResolve = Math.random() > 0.3;
  let position = 0;

  for (let i = 1; i <= amount; i +=1){
    position += 1;
    delay += stepDelay;
    createPromise(position, delay).then(result => Notify.success(result)).catch(error => Notify.failure(error));
  };
}

function createPromise (position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve (`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject (`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  })
}
