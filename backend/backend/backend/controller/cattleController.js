const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Cattle = require('../model/cattleModel')
const cloudinary = require('cloudinary')


//ADD Cattle
exports.createCattle = catchAsyncError(async (req, res, next) => {
    try {
        console.log('1');
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "cattle-images",
            width: 150,
            crop: "scale",
        });

        console.log('2');
        const images = [];
        console.log('3');

        images.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        });
        console.log('4');

        req.body.images = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        console.log('5');
        // console.log(req.body.images);
        console.log('6');
        console.log(req.body);
        console.log('7');
        req.body.trackPerformance = [{
            date: Date.now(),
            weight: '0',
            milkProduction: 0,
            feedCost: 0,
        }];
        const cattle = await Cattle.create(req.body)
        console.log('8');
        res.status(201).json({
            success: true,
            cattle
        })
    } catch (error) {
        console.log(`Error Ocurred While Creating Cattle: ${error}`);
    }
});




//GET Cattles
exports.getCattles = async (req, res) => {
    try {
        let cattles = await Cattle.find()

        const quantity = cattles.length
        if (cattles) {
            res.status(200).json({
                success: true,
                quantity,
                cattles
            })
        } else {
            cattles = ''
            res.status(200).json({
                success: true,
                quantity,
                cattles
            })
        }
    } catch (error) {
        const err = error
        console.log(`Error Ocurred : ${error}`);
        res.json({
            success: false,
            error: err
        })
    }
}



//GET Single Cattle
exports.getCattleById = async (req, res) => {
    try {
        const id = req.params.id

        let cattle = await Cattle.findById(req.params.id)


        if (cattle) {

            console.log(cattle);

            res.status(200).json({
                success: true,
                cattle
            })
        }
        // else{
        //     cattle = ''
        //     res.status(200).json({
        //         success:true,
        //         cattle
        //     })
        // }
    } catch (error) {
        console.log(`Error Ocurred While Creating Cattle: ${error}`);
    }
}



//Update Single Cattle
exports.updateCattleById = async (req, res) => {
    try {
        let cattle = await Cattle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        )
        if (cattle) {
            res.status(200).json({
                success: true,
                cattle
            })
        } else {
            cattle = ''
            res.status(200).json({
                success: true,
                cattle,
                isUpdated: true
            })
        }
    } catch (error) {
        console.log(`Error Ocurred While Updating Cattle: ${error}`);
    }

}



// //Update Cattle Milk
// exports.updateCattle = async (req, res) => {
//     try {
//         const { cattleId, updatedData } = req.body;

//         console.log(updatedData);

//         // Find the cattle
//         const cattle = await Cattle.findById(cattleId);

//         if (!cattle) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Cattle not found",
//             });
//         }

//         // Update milk production
//         if (updatedData.milk !== undefined) {
//             updatedData.milk = parseInt(updatedData.milk, 10)
//             const updatedMilkProduction = cattle.trackPerformance[0].milkProduction + updatedData.milk;
//             updatedData["trackPerformance.0.milkProduction"] = updatedMilkProduction;
//         }
//         if (updatedData.weight !== undefined) {
//             const updatedWeight = cattle.trackPerformance[0].weight = updatedData.weight;
//             updatedData["trackPerformance.0.weight"] = updatedWeight;
//         }
//         if (updatedData.cost !== undefined) {
//             updatedData.cost = parseInt(updatedData.cost, 10)
//             const updatedCost = cattle.trackPerformance[0].feedCost + updatedData.cost;
//             updatedData["trackPerformance.0.feedCost"] = updatedCost;
//         }

//         // Check if the last entry in trackPerformance is older than a week
//         const lastEntryDate = cattle.trackPerformance[0]?.createdAt || cattle.createdAt;
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//         if (new Date(lastEntryDate) < oneWeekAgo) {
//             // If older than a week, create a new entry in trackPerformance
//             const newTrackPerformance = {
//                 weight: updatedData.trackPerformance[0]?.weight || "0",
//                 milkProduction: updatedMilkProduction || 0,
//                 feedCost: updatedData.trackPerformance[0]?.feedCost || 0,
//                 createdAt: new Date(),
//             };

//             // Push the new entry to the trackPerformance array
//             updatedData.trackPerformance.unshift(newTrackPerformance);
//         }

//         // Update the cattle with the new data
//         const updatedCattle = await Cattle.findByIdAndUpdate(cattleId, updatedData, {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false,
//         });

//         res.status(200).json({
//             success: true,
//             isUpdated: true,
//             cattle: updatedCattle,
//         });
//     } catch (error) {
//         console.log(`Error Occurred Updating Milk Cattle: ${error}`);
//         res.status(500).json({
//             success: false,
//             error: "Internal Server Error",
//         });
//     }
// };

// Update Cattle Milk
exports.updateCattle = async (req, res) => {
    try {
        const { cattleId, updatedData } = req.body;

        console.log(updatedData);

        // Find the cattle
        const cattle = await Cattle.findById(cattleId);
        console.log('1');

        if (!cattle) {
            return res.status(404).json({
                success: false,
                message: "Cattle not found",
            });
        }
        console.log('2');

        const length = cattle.trackPerformance.length - 1;
        console.log(length);

        // // Update milk production
        // if (updatedData.milk !== undefined) {
        //     updatedData.milk = parseInt(updatedData.milk, 10);
        //     const updatedMilkProduction = cattle.trackPerformance[length]?.milkProduction + updatedData.milk;
        //     cattle.trackPerformance[length].milkProduction = updatedMilkProduction;
        // }
        // console.log(Updated Milk Production: ${cattle.trackPerformance[length].milkProduction});

        // // Update weight
        // if (updatedData.weight !== undefined) {
        //     const updatedWeight = parseInt(cattle.trackPerformance[length].weight, 10) + parseInt(updatedData.weight, 10);
        //     cattle.trackPerformance[length].weight = updatedWeight.toString();
        // }
        // console.log(Updated Weight: ${cattle.trackPerformance[length].weight});

        // // Update cost
        // if (updatedData.cost !== undefined) {
        //     updatedData.cost = parseInt(updatedData.cost, 10);
        //     const updatedCost = cattle.trackPerformance[length]?.feedCost + updatedData.cost;
        //     cattle.trackPerformance[length].feedCost = updatedCost;
        // }

        // console.log(Updated Feed Cost: ${cattle.trackPerformance[length].feedCost});

        // Check if the last entry in trackPerformance is older than a week
        const lastEntry = cattle.trackPerformance[length];
        console.log(`LastEntry: ${lastEntry}`);
        const lastEntryDate = lastEntry.date;
        console.log(`LastEntry Date: ${lastEntryDate}`);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        console.log('6', lastEntryDate);
        console.log('6.1', oneWeekAgo);
        console.log(new Date(lastEntryDate) < oneWeekAgo);

        if (lastEntry && new Date(lastEntryDate) < oneWeekAgo) {
            console.log('New Array Added');
            // If older than a week, create a new entry in trackPerformance
            const newTrackPerformance = {
                weight: updatedData.weight || "0",
                milkProduction: updatedData.milk || 0,
                feedCost: updatedData.feedCost || 0,
                createdAt: new Date(),
            };

            console.log('7');

            cattle.trackPerformance.push(newTrackPerformance);

            // Save the changes to the database
            await cattle.save();

            // Fetch the updated document
            const updatedCattle = await Cattle.findById(cattleId);

            console.log('7.1');
            res.status(200).json({
                success: true,
                isUpdated: true,
                cattle: updatedCattle,
            });

            return;
        }

        console.log('8');
        if (lastEntry && new Date(lastEntryDate) > oneWeekAgo) {
            console.log('Updating Last Entry in trackPerformance');

            // Update milk production
            if (updatedData.milk !== undefined) {
                console.log('last entry milk');
                updatedData.milk = parseInt(updatedData.milk, 10);
                const updatedMilkProduction = lastEntry.milkProduction + updatedData.milk;
                lastEntry.milkProduction = updatedMilkProduction;
            }
            console.log(`Updated Milk Production: ${lastEntry.milkProduction}`);

            // Update weight
            if (updatedData.weight !== undefined) {
                console.log('last entry weight');
                const updatedWeight = parseInt(updatedData.weight, 10);
                lastEntry.weight = updatedWeight.toString();
            }
            console.log(`Updated Weight: ${lastEntry.weight}`);

            // Update cost
            if (updatedData.cost !== undefined) {
                console.log('last entry cost');
                updatedData.cost = parseInt(updatedData.cost, 10);
                const updatedCost = lastEntry.feedCost + updatedData.cost;
                lastEntry.feedCost = updatedCost;
            }

            console.log(`Updated Feed Cost: ${lastEntry.feedCost}`);

            // Update the cattle with the new data
            console.log(cattle);

            const mergedCattle = {
                ...cattle.toObject(),
                ...updatedData
            };

            const updatedCattle = await Cattle.findByIdAndUpdate(cattleId, mergedCattle, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            console.log('9');

            res.status(200).json({
                success: true,
                isUpdated: true,
                cattle: updatedCattle,
                lastEntry: lastEntry, // Add lastEntry to the response
            });

            return;
        }

        // // Update the cattle with the new data
        // const updatedCattle = await Cattle.findByIdAndUpdate(cattleId, updatedData, {
        //     new: true,
        //     runValidators: true,
        //     useFindAndModify: false,
        // });
        // console.log('9');

        // res.status(200).json({
        //     success: true,
        //     isUpdated: true,
        //     cattle: updatedCattle,
        // });
        // console.log('10');
    } catch (error) {
        console.log(`Error Occurred Updating Milk Cattle: ${error}`);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};


//Delete Single Cattle
exports.deleteCattleById = async (req, res) => {
    try {
        console.log(req.params.id);
        let cattle = await Cattle.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Successfully Deleted Cattle",
            isDeleted: true
        })
    } catch (error) {
        console.log(`Error Ocurred While Creating Cattle: ${error}`);
    }

}



//Get Cattles Via Search through Categories
exports.searchCattleByCategory = async (req, res) => {
    try {
        const { category } = req.query
        let cattles = await Cattle.find({
            category: { $regex: category, $options: 'i' },
        });
        const quantity = cattles.length
        res.status(200).json({
            success: true,
            quantity,
            cattles
        })
        if (quantity > 0) {
            res.status(200).json({
                success: true,
                cattles
            })
        } else {
            cattles = ''
            res.status(200).json({
                success: true,
                cattles
            })
        }
    } catch (error) {
        console.log(`Error Ocurred While Creating Cattle: ${error}`);
    }
}





// exports.createCattle = catchAsyncError(async (req, res, next) => {
//     try {
//         // const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
        //                 folder: "cattle-doctor-images",
        //                 width: 150,
        //                 crop: "scale",
        //             });

        //             const images = [];

        //             images.push({
        //                 public_id: myCloud.public_id,
        //                 url: myCloud.secure_url,
        //             });

        //             req.body.images = {
        //                 public_id: myCloud.public_id,
        //                 url: myCloud.secure_url,
        //             };
        //             console.log(req.body.images);
//         const cattle = await Cattle.create(req.body);

//         res.status(201).json({
//             success: true,
//             cattle,
//         });
//     } catch (error) {
//         // Handle the error appropriately
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             error: "An error occurred while creating the cattle.",
//         });
//     }
// });



//Get ALL Cattles
// exports.getCattle = catchAsyncError(async (req,res) => {

//     const cattles = await Cattle.find()

//     res.status(200).json({
//         success:true,
//         cattles
//     })
// })

// exports.getCattles = catchAsyncError(async (req, res, next) => {
//     try {
//         const cattles = await Cattle.find();

//         const cattleCount = await Cattle.countDocuments();

//         res.status(200).json({
//             success: true,
//             cattles,
//             cattleCount,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });

// exports.getCattleBySearch = catchAsyncError(async (req, res, next) => {
//     try {
//         const { city, name } = req.query;

//         // Query your database based on the search parameters
//         const cattles = await Cattle.find({
//             city: { $regex: city, $options: 'i' },
//             name: { $regex: name, $options: 'i' },
//         });

//         res.status(200).json({
//             success: true,
//             cattles,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

//Get Single Cattles
// exports.getSingleCattle = catchAsyncError(async (req, res, next) => {
//     try {

//         const name = req.params.id;
//         console.log(`You seracged Cattle by ${name}`);
//         let cattle;

//         // Search by hospital name
//         if (!cattle || cattle.length === 0) {
//             cattle = await Cattle.find({ 'hospital.hospital_name': { $regex: name, $options: 'i' } });
//         }

//         if (!cattle || cattle.length === 0) {
//           // If no cattle found by hospital name, search by disease name
//             cattle = await Cattle.find({ 'disease.name': { $regex: name, $options: 'i' } });
//         }

//         if (!cattle || cattle.length === 0) {
//             if(name === 'surgeon'){
//                 // If no cattle found by hospital name, search by disease name
//                 cattle = await Cattle.find({ surgeon: true });
//                 }

//         }

//         if (!cattle || cattle.length === 0) {
//           // If no cattle found by hospital name, search by disease name
//             cattle = await Cattle.find({ 'services.name': { $regex: name, $options: 'i' } });
//         }

//         if (!cattle || cattle.length === 0) {
//           // If no cattle found by hospital name, search by disease name
//             cattle = await Cattle.find({ 'city': { $regex: name, $options: 'i' } });
//         }

//             if (!cattle || cattle.length === 0) {
//             // If no cattle found by disease name, search by symptoms name
//             cattle = await Cattle.find({ 'symptoms.name': { $regex: name, $options: 'i' } });
//             }

//             if (!cattle || cattle.length === 0) {
//             // If no cattle found by symptoms name, search by speciality
//             cattle = await Cattle.find({ 'speciality': { $regex: name, $options: 'i' } });
//             }

//             if (!cattle || cattle.length === 0) {
//             // If no cattle found by symptoms name, search by speciality
//             cattle = await Cattle.findById(req.params.id);
//             }

//             const count = cattle.length;

//             if (!cattle || cattle.length === 0) {
//             return next(new ErrorHandler(`The Cattle You Searched Does Not Exist in: ${req.params.id}`, 404));
//             }

//             res.status(200).json({
//             success: true,
//             cattle,
//             total: count,
//             });

//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });



//Update Single Cattle
// exports.updateCattle = catchAsyncError(async (req, res, next) => {
//     try {    
//     let cattle = await Cattle.findById(req.params.id)

//     if(!cattle){
//         return next(
//             new ErrorHandler(`Cattle Doesnot Exist with ID: ${req.params.id}`,404)
//         )
//     }

//     cattle = await Cattle.findByIdAndUpdate(req.params.id, req.body,
//                                         {
//                                             new:true,
//                                             runValidators:true,
//                                             useFindAndModify:false
//                                         }) 

//     res.status(200).json({
//         success:true,
//         cattle
//     })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });

//Delete Cattle
// exports.deleteCattle = catchAsyncError(async (req, res, next) => {
//     try {   
//     const cattle = await Cattle.findByIdAndDelete(req.params.id)

//     if(!cattle){
//         return next(
//             new ErrorHandler(`Cattle Doesnot Exist with ID: ${req.params.id}`,404)
//         )
//     }

//     // await Cattle.remove() 
//     else{
//         res.status(200).json({
//             success:true,    
//             message:"Cattle Deleted Successfully"
//         })
//     }
// } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });