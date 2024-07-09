const mongoose = require('mongoose');

mongoose.connect(process.env.MONG_URL).then(()=>{
    console.log(`Connection Successful`)
}).catch((e)=>{
    console.log(`Unable to connect`)
}) 