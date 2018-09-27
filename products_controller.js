module.exports={
    create:(req,res,next)=>{
        const dbInstance=req.app.get('db') //grabs the info from app.set in the index.js file and places it on the dbInstance variable

        const {name,description,price,image_url} = req.body  //shortens req.body.name down to {name}

        //now that dbInstance has access to 'db' we can grab the sql files in the db folder by chaining a .file_name after dbInstance. Once that is done we set a .then with our desired function and a .catch if an error occurs. 
        dbInstance.create_product([name,description,price,image_url]) //The values inside the array are using the dollar sign values from the sql files, for example name=$1 from the create_product sql file and the array is using the shortened req.body requests.  
            .then(()=>res.sendStatus(200)) //since we are not modifying the information we can leave the argument in ()=> empty as we are just sending the information on
            .catch(err=>{
                res.status(500).send({errorMessage:'Oops something went wrong. Engineering has been informed'}); //on a received 500 status send the errorMessage object.
                console.log(err)
            })
    },

    getOne:(req,res,next)=>{
        const dbInstance=req.app.get('db');
        const {id}=req.params;

        dbInstance.read_product([id]) //modifies the id field in read_product.sql
            .then(product=>res.status(200).send(product)) //sends the product argument
            .catch(err=>{
                res.status(500).send({errorMessage:'Oops something went wrong. Engineering has been notified.'})
                console.log(err);
            })
    },

    getAll:(req,res,next)=>{
        const dbInstance=req.app.get('db');

        dbInstance.read_products()
            .then(products=>res.status(200).send(products)) //sends the products argument
            .catch(err=>{
                res.status(500).send({errorMessage:'Oops something went wrong. Engineering has been notified.'})
                console.log(err)
            })
    },

    update:(req,res,next)=>{
        const dbInstance=req.app.get('db');
        const {params,query} = req;
        console.log([params.id,query.desc])

        dbInstance.update_product([params.id,query.desc])

            .then(()=>res.sendStatus(200))
            .catch(err=>{
                res.status(500).send({errorMessage:'Oops something went wrong. Engineering has been informed.'})
                console.log(err)
            })
    },

    delete:(req,res,next)=>{
        const dbInstance=req.app.get('db');
        const {id}=req.params
        
        dbInstance.delete_product([id])
            .then(()=>res.sendStatus(200))
            .catch(err=>{
                res.status(500).send({errorMessage:'Oops something went wrong. Engineering has been informed.'})
                console.log(err)
            })
    },
}