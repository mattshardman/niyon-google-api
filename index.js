const a = axios;
const inp = document.getElementById('inp');

console.log('hello');

inp.addEventListener('change', async (e) => {
    const { value } = e.target;
    const result = await a.post('http://localhost:5000/api/auto', {
        input: value,
    });
    console.log(result.data)
});