const arrayRango = []
for (let i = 1; i <= 1000; i++ ) {
    arrayRango.push([i, 0]) // el 0 va a ser las veces que se repita
}

const arrayDestructuring = (array) => {
    const object = {}
    array.forEach(([key, value]) => object[key] = value)
    return object
}

const array = arrayDestructuring(arrayRango)

const numeroRandomArray = ( num ) => { // Recibe dos números enteros y devuelve un número entero al azar entre ellos
    const numero = Math.floor(Math.random() * num + 1)
    return numero
}

const numerosAleatorios = (array, cant = 200) => {
    for (let i = 1; i < cant; i++) {
        const numeroArray = numeroRandomArray(1000)
        array[numeroArray]++
    }
    // console.log(array)
    return array
}

const numRandom = (req, res) => {
    const { cant } = req.query;
    if(!cant) numerosAleatorios(array) // recibe los datos en numAleatorios.js
    else numerosAleatorios(array, cant)
    res.send({ status: "sucess" })
}

export default {
    numRandom
}