
const Tasker = {
    scheduler: { scheduledTasks: [] }
}


class ScheduledTask {
    constructor(task, duration, mode = "LATER") {
        this.task = task;
        this.mode = mode;
        this.duration = duration;

        if(this.mode == "LATER") {
            this.scheduledTimer = setTimeout(() => this.task.runTask(), duration)
        }
        if(this.mode == "TIMER") {
            this.scheduledTimer = setInterval(() => this.task.runTask(), duration)
        }
    }
    stop() {
        if(this.mode == "LATER") {
            clearTimeout(this.scheduledTimer)
        }
        if(this.mode == "TIMER") {
            clearInterval(this.scheduledTimer)
        }
    }
}

class Task {
    constructor(func) {
        this._functionToRun = func;
        this.isRunning = false;
    } 
    runTask() {
        this.isRunning = true;
        this._functionToRun.call()
    }
    schedule(duration, mode) {
        Tasker.scheduler.scheduledTasks.push(new ScheduledTask(this, duration, mode))
    }
}

Function.prototype.toTask = function() {
    return new Task(this)
}