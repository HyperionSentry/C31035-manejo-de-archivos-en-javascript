const fs = require('fs')

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }

    async readFAsync() {
        try {
            const data = await fs.promises.readFile(this.archivo,'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log('Error leyendo el archivo');
        }
        
    }

    async writeFAsync(obj) {
       return await fs.promises.writeFile(this.archivo, JSON.stringify(obj, null, '\t'))
    }

    async save(obj){
        //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.    

        if (fs.existsSync(this.archivo)) {
            const data = await this.readFAsync()
            obj.id = data.length + 1
            console.log(`El archivo existe, guardando album con id: ${obj.id}...`)
            data.push(obj);
            await this.writeFAsync(data)
            
        } else {
            obj.id = 1
            console.log(`El archivo no existe, creando uno nuevo con album de id: ${obj.id}...`)
            let arrObj = [obj]
            await this.writeFAsync(arrObj)
        }

        return obj.id

    }

    async getById(id){
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const dataObj = await this.readFAsync()
            const found = dataObj.find( element => element.id === id)
            if (found == undefined) {
                console.log(`No existe un album con el id: ${id}`);
                return null
            } else {
                return found
            }
        } catch (error) {
            console.log('Error: '+ error);
        }
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        try {
            const dataObj = await this.readFAsync()
            return dataObj
        } catch (error) {
            console.log('Error: '+ error);
        }  
    }

    async deleteById(id){
        try {
            const dataObj = await this.readFAsync()
            const found = dataObj.find( element => element.id === id )
            if (found == undefined) {
                console.log(`No existe un album con el id: ${id}`);
            } else {
                console.log(`Se eliminara el album con el id: ${id}`);
                dataObj.splice(dataObj.indexOf(found), 1)
                await this.writeFAsync(dataObj)
            }
        } catch (error) {
            console.log('Error: '+ error);
        }
    }


    async deleteAll(){
        //Elimina todos los objetos presentes en el archivo.
        try {
            await this.writeFAsync([])
        } catch (error) {
            console.log('Error: '+ error);
        }
    }
}


const album1 = {
    title: 'The Very Best of the Doors 2CD',
    price: 13.07,
    thumbnail: 'https://m.media-amazon.com/images/I/91hrbype4aL._SY355_.jpg'
}

const album2 = {
    title: 'Blood Sugar Sex Magik',
    price: 9.99,
    thumbnail: 'https://m.media-amazon.com/images/I/81hS2wgxbhL._SY355_.jpg'
}

const album3 = {
    title: 'Pearl Jam Completely Unplugged Limited Edition',
    price: 49.77,
    thumbnail: 'https://m.media-amazon.com/images/I/81NDZb-JShL._SY355_.jpg'
}

const contenedor1 = new Contenedor('./producto.txt')
const contenedor2 = new Contenedor('./producto.txt')
const contenedor3 = new Contenedor('./producto.txt')


// contenedor1.save(album1).then( (result) => {
//     console.log(result);
//     contenedor2.save(album2).then( (result) => {
//         console.log(result);
//         contenedor3.save(album3).then( (result) => {
//             console.log(result);
//         } )
//     } )
// } )

// contenedor1.getById(1).then( (result) => {
//     console.log(result);
// } )

// contenedor2.getById(2).then( (result) => {
//     console.log(result);
// } )

// contenedor3.getById(3).then( (result) => {
//     console.log(result);
// } )

// contenedor1.getAll().then( (result) => {
//     console.log(result);
// } )

// contenedor1.deleteById(1).then( (result) => {
//     console.log(result);
// } )

// contenedor2.deleteById(2).then( (result) => {
//     console.log(result);
// } )

// contenedor3.deleteById(3).then( (result) => {
//     console.log(result);
// } )

// contenedor1.deleteAll().then( (result) => {
//     console.log(result);
// } )