const ingreso = document.querySelector('#ingreso');
const btn = document.querySelector('#btn');
const total = document.querySelector('#total');
const myChart = document.querySelector('#myChart');

const opcion = document.querySelector('#opcion');

const url = 'https://mindicador.cl/api'

const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

btn.addEventListener('click', async () => {
    if (ingreso.value.trim() === '' || ingreso.value < 0) return alert('Por favor Ingresa un valor')

    const monedas = await getData(url)
    total.innerHTML = `${+ingreso.value / monedas[opcion.value].valor} - ${opcion.value}`

    mostrar(opcion.value)
})

const mostrar = async (indicador) => {
    const oldData = await getData(`${url}/${indicador}`)

    oldData.serie.splice(10, oldData.serie.length - 10)

    const labels = oldData.serie.map((product) => product.fecha)
    const data = oldData.serie.map((product) => Number(product.valor))

    const datasets = [{ label: `historial de ${indicador}`, borderColor: "rgba(255, 99, 132)", data }]
    const info = { labels, datasets }
    const config = {type: "line", data: info }
    new Chart(myChart, config)
}
