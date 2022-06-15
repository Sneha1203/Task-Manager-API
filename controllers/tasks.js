const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
// const getAllTasks = async (request, response) => {
//     try {
//         const tasks = await Task.find({})
//         response.status(200).json({ tasks })
//     } catch(error) {
//         response.status(500).json({ msg: error })
//     }
//     // response.send('get all tasks');
// }

const getAllTasks = asyncWrapper (async (request, response) => {
    const tasks = await Task.find({})
    response.status(200).json({ tasks })
    // response.send('get all tasks');
})

const createTasks = asyncWrapper (async (request, response) => {
    const task = await Task.create(request.body)
    response.status(201).json({ task })
})

const getTask = asyncWrapper (async (request, response) => {
    const{ id: taskID } = request.params
    const task = await Task.findOne({ _id: taskID })
    if(!task) {
        // const error = new Error('Not Found')
        // error.status = 404
        // return next(error)
        return next(createCustomError(`No task with id: ${taskID}`, 404))
        // return response.status(404).json({ msg: `No task with id: ${taskID}` })
    }
    response.status(200).json({ task })
})

const updateTasks = async (request, response) => {
    try {
        const { id: taskID } = request.params;
        const task = await Task.findByIdAndUpdate({ _id: taskID }, request.body, { new: true, runValidators: true })
        if(!task) {
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        response.status(200).json({ task })
    } catch (error) {

    }
    // response.send('update tasks');
}

const deleteTasks = async (request, response) => {
    try {
        const { id: taskID } = request.params;
        const task = await Task.findOneAndDelete({ _id: taskID })
        if(!task) {
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        response.status(200).json({ task })
    } catch (error) {
        response.status(500).json({ msg: error })
    }
    // response.send('delete tasks');
}


module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTasks,
    deleteTasks
}